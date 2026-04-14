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
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0b18]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm sm:px-6">
        {/* Логотип / бренд */}
        <Link href={`/${lang}`} className="flex items-center gap-2.5 group">
          <Image
            src="/logo/icon.png"
            alt="Analyst Online"
            width={32}
            height={32}
            className="h-8 w-8 transition-opacity group-hover:opacity-90"
          />
          <span className="hidden font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors xs:inline sm:inline">
            Analyst Online
          </span>
        </Link>

        {/* Главное меню */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            if (item.id === 'home') {
              return (
                <Link
                  key={item.id}
                  href={`/${lang}`}
                  className="rounded-md px-3 py-1.5 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </Link>
              );
            }

            if (item.id === 'omnidash') {
              return (
                <Link
                  key={item.id}
                  href={`/${lang}${item.href}`}
                  className="rounded-md px-3 py-1.5 font-semibold text-blue-400 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/${lang}${item.href}`}
                className="rounded-md px-3 py-1.5 text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
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
