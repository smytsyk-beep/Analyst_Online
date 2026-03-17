// components/site/header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { LOCALES, type Locale, type I18nPolicy } from '@/lib/i18n';
import MobileNav from '@/components/site/mobile-nav';
import LanguageSwitcher from '@/components/site/language-switcher';

export type HeaderProps = {
  lang: Locale;
  /**
   * Политика i18n по GEO:
   * - allowedLocales: какие локали показывать в переключателе
   * - defaultLocale / forcedLocale мы тут не используем
   */
  policy?: I18nPolicy;
};

const NAV = [
  { id: 'home', label: 'Home', href: '' },
  { id: 'omnidash', label: 'OmniDash', href: '/omnidash' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'cases', label: 'Cases', href: '/cases' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export default function Header({ lang, policy }: HeaderProps) {
  // Какие локали показывать в переключателе
  const localesToShow = policy?.allowedLocales ?? LOCALES;

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
        {/* Логотип / бренд */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image
            src="/logo/icon.png"
            alt="Analyst Online"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="font-semibold tracking-tight">Analyst Online</span>
        </Link>

        {/* Главное меню */}
        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((item) => {
            if (item.id === 'home') {
              return (
                <Link key={item.id} href={`/${lang}`} className="opacity-80 hover:opacity-100">
                  {item.label}
                </Link>
              );
            }

            if (item.id === 'omnidash') {
              return (
                <Link
                  key={item.id}
                  href={`/${lang}${item.href}`}
                  className="font-semibold text-white hover:opacity-90"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/${lang}${item.href}`}
                className="opacity-80 hover:opacity-100"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Правая часть: lang switcher + mobile burger */}
        <div className="flex items-center gap-2">
          {/* Переключатель языков */}
          <LanguageSwitcher currentLang={lang} availableLocales={localesToShow} />

          {/* Мобильное меню */}
          <MobileNav lang={lang} nav={NAV} />
        </div>
      </div>
    </header>
  );
}
