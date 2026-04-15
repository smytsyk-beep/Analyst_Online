// components/site/language-switcher.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, replaceLocalePrefix } from '@/lib/i18n';

type LanguageSwitcherProps = {
  currentLang: Locale;
  availableLocales: readonly Locale[];
};

export default function LanguageSwitcher({ currentLang, availableLocales }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex gap-1">
      {availableLocales.map((locale) => (
        <Link
          key={locale}
          href={replaceLocalePrefix(pathname, locale)}
          className={`rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
            locale === currentLang
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border text-foreground/70 hover:border-primary/30 hover:text-foreground'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
