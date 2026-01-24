// components/site/header.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { I18nPolicy, Locale } from '@/lib/i18n';

export default function Header({ lang, policy }: { lang: Locale; policy: I18nPolicy }) {
  return (
    <header className="w-full border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href={`/${lang}`} className="font-semibold tracking-wide">
          Analyst Online
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${lang}#services`} className="opacity-80 hover:opacity-100">
            Services
          </Link>
          <Link href={`/${lang}#cases`} className="opacity-80 hover:opacity-100">
            Cases
          </Link>
          <Link href={`/${lang}#contact`} className="opacity-80 hover:opacity-100">
            Contact
          </Link>

          {policy.showSwitcher && (
            <div className="flex items-center gap-2 pl-4">
              {policy.allowedLocales.map((l) => (
                <Button key={l} asChild variant={l === lang ? 'secondary' : 'outline'} size="sm">
                  <Link href={`/${l}`}>{l.toUpperCase()}</Link>
                </Button>
              ))}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
