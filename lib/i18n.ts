// lib/i18n.ts
export const LOCALES = ['ua', 'ru', 'ro'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ru';

// cookie that middleware can set (optional but useful)
export const COUNTRY_COOKIE = 'ao_country';

export type I18nPolicy = {
  defaultLocale: Locale; // какая локаль по умолчанию
  allowedLocales: readonly Locale[]; // какие локали вообще доступны в свитчере
  showSwitcher: boolean; // прятать ли переключатель языков
  forcedLocale?: Locale; // если есть — всегда форсим эту локаль
};

/**
 * Locale guards
 */
export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function normalizeLocale(v: string | undefined | null): Locale {
  if (!v) return DEFAULT_LOCALE;
  return isLocale(v) ? v : DEFAULT_LOCALE;
}

export const LOCALE_LABEL: Record<Locale, string> = {
  ua: 'UA',
  ru: 'RU',
  ro: 'RO',
};

export function ensureLocale(v: string, fallback: Locale = DEFAULT_LOCALE): Locale {
  return isLocale(v) ? v : fallback;
}

/**
 * Country normalization (we care only about UA/RO rules; everything else => OTHER)
 */
export type CountryGroup = 'UA' | 'RO' | 'OTHER';

export function normalizeCountryGroup(code?: string | null): CountryGroup {
  const c = (code ?? '').toUpperCase().trim();
  if (c === 'UA') return 'UA';
  if (c === 'RO') return 'RO';
  return 'OTHER';
}

/**
 * Try to read country code from common headers (works on various proxies/CDNs).
 * In local dev this will usually be null => OTHER.
 */
export function getCountryFromHeaders(h: { get(name: string): string | null }): string | null {
  return (
    h.get('x-vercel-ip-country') ??
    h.get('cf-ipcountry') ??
    h.get('x-country') ??
    h.get('x-geo-country') ??
    null
  );
}

/**
 * Core policy based on IP (country).
 * - UA => only ua, default ua
 * - RO => default ro, but allow all switchers
 * - OTHER => default ru, allow all switchers
 */
export function getI18nPolicy(country: string | null): I18nPolicy {
  const c = (country ?? '').toUpperCase();

  if (c === 'UA') {
    return { defaultLocale: 'ua', allowedLocales: ['ua'], showSwitcher: false, forcedLocale: 'ua' };
  }

  if (c === 'RO') {
    return { defaultLocale: 'ro', allowedLocales: ['ua', 'ru', 'ro'], showSwitcher: true };
  }

  return { defaultLocale: 'ru', allowedLocales: ['ua', 'ru', 'ro'], showSwitcher: true };
}

/**
 * Helpers for URL manipulation
 */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (!seg) return null;
  return isLocale(seg) ? seg : null;
}

export function replaceLocalePrefix(pathname: string, locale: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${locale}`;
  if (isLocale(parts[0])) parts[0] = locale;
  else parts.unshift(locale);
  return '/' + parts.join('/');
}
