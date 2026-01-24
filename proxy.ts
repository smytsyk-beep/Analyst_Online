// proxy.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  COUNTRY_COOKIE,
  DEFAULT_LOCALE,
  getCountryFromHeaders,
  getI18nPolicy,
  isLocale,
} from './lib/i18n';

function getLocaleFromPathname(pathname: string) {
  const seg = pathname.split('/')[1] ?? '';
  return isLocale(seg) ? seg : null;
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаем next/static, файлы и api
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const country = getCountryFromHeaders(req.headers); // "UA" | "RO" | null
  const policy = getI18nPolicy(country);

  const currentLocale = getLocaleFromPathname(pathname);

  // helper: собрать redirect + поставить cookie
  const withCookie = (res: NextResponse) => {
    if (country) {
      res.cookies.set(COUNTRY_COOKIE, country, {
        path: '/',
        sameSite: 'lax',
      });
    }
    return res;
  };

  // 1) UA IP => принудительно /ua (и любые /ru,/ro редиректим в /ua)
  if (policy.forcedLocale) {
    const forced = policy.forcedLocale;

    if (currentLocale !== forced) {
      const url = req.nextUrl.clone();
      const rest = currentLocale ? pathname.slice(currentLocale.length + 1) : pathname; // "/ru/abc" -> "/abc"
      url.pathname = `/${forced}${rest === '/' ? '' : rest}`;
      return withCookie(NextResponse.redirect(url));
    }

    return withCookie(NextResponse.next());
  }

  // 2) Если нет префикса локали — редиректим на дефолт по стране
  if (!currentLocale) {
    const url = req.nextUrl.clone();
    const base = policy.defaultLocale ?? DEFAULT_LOCALE;

    url.pathname = `/${base}${pathname === '/' ? '' : pathname}`;
    return withCookie(NextResponse.redirect(url));
  }

  // 3) Иначе пропускаем
  return withCookie(NextResponse.next());
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
