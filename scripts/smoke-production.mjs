#!/usr/bin/env node

const baseUrlInput = process.argv[2] || process.env.PRODUCTION_BASE_URL;
if (!baseUrlInput) {
  console.error('Usage: npm run smoke:production -- https://example.com');
  process.exit(2);
}

const baseUrl = new URL(baseUrlInput);
const expectedOrigin = baseUrl.origin;
const routes = [
  '/ru',
  '/ua',
  '/ro',
  '/ru/services',
  '/ru/cases',
  '/ru/blog',
  '/ru/omnidash',
  '/ru/privacy',
  '/ru/contact',
  '/studio',
];

async function fetchChecked(path, init) {
  const response = await fetch(new URL(path, baseUrl), {
    signal: AbortSignal.timeout(15_000),
    ...init,
  });

  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }

  return response;
}

async function main() {
  const healthResponse = await fetchChecked('/api/health', { cache: 'no-store' });
  const health = await healthResponse.json();
  if (health.status !== 'ok' || typeof health.revision !== 'string') {
    throw new Error('/api/health returned an invalid payload');
  }

  const rootResponse = await fetch(new URL('/', baseUrl), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
  });
  const rootLocation = rootResponse.headers.get('location') || '';
  const rootRedirectPath = rootLocation ? new URL(rootLocation, baseUrl).pathname : '';
  if (![307, 308].includes(rootResponse.status) || !/^\/(ru|ua|ro)$/.test(rootRedirectPath)) {
    throw new Error(`/ returned ${rootResponse.status} with unexpected location ${rootLocation}`);
  }

  for (const route of routes) {
    const response = await fetchChecked(route);
    const body = await response.text();
    if (body.includes('analyst-online.vercel.app')) {
      throw new Error(`${route} still contains an analyst-online.vercel.app URL`);
    }
  }

  const robots = await (await fetchChecked('/robots.txt')).text();
  const sitemap = await (await fetchChecked('/sitemap.xml')).text();

  for (const [name, body] of [
    ['robots.txt', robots],
    ['sitemap.xml', sitemap],
  ]) {
    if (!body.includes('https://analyst-online.com')) {
      throw new Error(`${name} does not contain the production origin`);
    }
    if (body.includes('analyst-online.vercel.app')) {
      throw new Error(`${name} contains the legacy Vercel origin`);
    }
  }

  console.log(`Production smoke test passed for ${expectedOrigin} (${health.revision}).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
