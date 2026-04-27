import 'server-only';

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { headers } from 'next/headers';
import { fetchWithTimeout } from '@/lib/timeout';

const TOKEN_MIN_AGE_MS = 2_000;
const TOKEN_MAX_AGE_MS = 30 * 60 * 1000;

type RateLimitRule = {
  key: string;
  limit: number;
  windowSeconds: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

type RequestIdentity = {
  ip: string;
  userAgent: string;
};

const memoryBuckets = new Map<string, { count: number; expiresAt: number }>();

export function createContactFormToken(): string {
  const issuedAt = Date.now().toString();
  const nonce = randomBytes(16).toString('base64url');
  const payload = `${issuedAt}.${nonce}`;

  return `${payload}.${sign(payload)}`;
}

export function verifyContactFormToken(token: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [issuedAtRaw, nonce, signature] = parts;
  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || !nonce || !signature) return false;

  const payload = `${issuedAtRaw}.${nonce}`;
  if (!safeEqual(signature, sign(payload))) return false;

  const age = Date.now() - issuedAt;
  return age >= TOKEN_MIN_AGE_MS && age <= TOKEN_MAX_AGE_MS;
}

export async function getRequestIdentity(): Promise<RequestIdentity> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = requestHeaders.get('x-real-ip')?.trim();
  const userAgent = requestHeaders.get('user-agent') || 'unknown';

  return {
    ip: forwardedFor || realIp || 'unknown',
    userAgent,
  };
}

export async function enforceContactRateLimit(input: {
  ip: string;
  email: string;
  messenger: string;
  message: string;
}): Promise<RateLimitResult> {
  const contactKey = normalizeContactKey(input.email || input.messenger);
  const messageKey = normalizeMessageKey(input.message);
  const ipHash = hash(input.ip);
  const contactHash = hash(contactKey);
  const duplicateHash = hash(`${contactKey}:${messageKey}`);

  const rules: RateLimitRule[] = [
    { key: `contact:burst:${ipHash}`, limit: 3, windowSeconds: 60 },
    { key: `contact:ip:${ipHash}`, limit: 8, windowSeconds: 15 * 60 },
    { key: `contact:identity:${contactHash}`, limit: 3, windowSeconds: 6 * 60 * 60 },
    { key: `contact:duplicate:${duplicateHash}`, limit: 1, windowSeconds: 24 * 60 * 60 },
  ];

  for (const rule of rules) {
    const result = await checkRateLimitRule(rule);
    if (!result.allowed) {
      return result;
    }
  }

  return { allowed: true };
}

export function isLikelySpam(input: {
  name: string;
  email: string;
  messenger: string;
  message: string;
}) {
  const haystack = `${input.name} ${input.email} ${input.messenger} ${input.message}`.toLowerCase();
  const linkCount = (haystack.match(/https?:\/\/|www\./g) || []).length;
  const spamTerms = [
    'casino',
    'crypto investment',
    'viagra',
    'loan offer',
    'seo backlinks',
    'rank higher',
    'guest post',
  ];

  return (
    linkCount > 2 ||
    /(.)\1{20,}/.test(haystack) ||
    spamTerms.some((term) => haystack.includes(term))
  );
}

export async function verifyTurnstileToken(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const isRequired = isTurnstileRequired();

  if (!secret) {
    return !isRequired;
  }

  if (!token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip !== 'unknown') {
    body.set('remoteip', ip);
  }

  try {
    const response = await fetchWithTimeout(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body,
        cache: 'no-store',
      },
      4_000,
    );

    if (!response.ok) return false;

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}

function isTurnstileRequired(): boolean {
  if (process.env.CONTACT_TURNSTILE_REQUIRED === 'true') return true;
  if (process.env.CONTACT_TURNSTILE_REQUIRED === 'false') return false;

  return process.env.NODE_ENV === 'production';
}

async function checkRateLimitRule(rule: RateLimitRule): Promise<RateLimitResult> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return checkUpstashRateLimitRule(rule);
  }

  return checkMemoryRateLimitRule(rule);
}

async function checkUpstashRateLimitRule(rule: RateLimitRule): Promise<RateLimitResult> {
  const count = await upstashCommand<number>(['INCR', rule.key]);

  if (count === 1) {
    await upstashCommand<number>(['EXPIRE', rule.key, rule.windowSeconds]);
  }

  if (count > rule.limit) {
    const ttl = await upstashCommand<number>(['TTL', rule.key]);
    return {
      allowed: false,
      retryAfterSeconds: ttl > 0 ? ttl : rule.windowSeconds,
    };
  }

  return { allowed: true };
}

function checkMemoryRateLimitRule(rule: RateLimitRule): RateLimitResult {
  const now = Date.now();
  const existing = memoryBuckets.get(rule.key);

  if (!existing || existing.expiresAt <= now) {
    memoryBuckets.set(rule.key, {
      count: 1,
      expiresAt: now + rule.windowSeconds * 1000,
    });
    return { allowed: true };
  }

  existing.count += 1;

  if (existing.count > rule.limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.expiresAt - now) / 1000),
    };
  }

  return { allowed: true };
}

async function upstashCommand<T>(command: Array<string | number>): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Upstash Redis is not configured');
  }

  const response = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
      cache: 'no-store',
    },
    3_000,
  );

  if (!response.ok) {
    throw new Error(`Upstash Redis request failed with ${response.status}`);
  }

  const payload = (await response.json()) as { result?: T; error?: string };
  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload.result as T;
}

function sign(payload: string): string {
  return createHmac('sha256', getContactFormSecret()).update(payload).digest('base64url');
}

function getContactFormSecret(): string {
  const secret =
    process.env.CONTACT_FORM_SECRET ||
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.GOOGLE_PRIVATE_KEY ||
    process.env.SANITY_API_TOKEN;

  if (secret) return secret;

  if (process.env.NODE_ENV === 'production') {
    throw new Error('CONTACT_FORM_SECRET is required in production');
  }

  return 'local-dev-contact-form-secret';
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function normalizeContactKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '');
}

function normalizeMessageKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 500);
}
