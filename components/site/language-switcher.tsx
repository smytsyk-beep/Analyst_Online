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
          className={`rounded-md border border-white/20 px-2 py-1 text-xs ${
            locale === currentLang ? 'bg-white text-black' : 'text-white/70 hover:text-white'
          }`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
