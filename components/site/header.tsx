import Link from 'next/link';
import { LOCALES, type Locale, type I18nPolicy } from '@/lib/i18n';

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
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'cases', label: 'Cases', href: '#cases' },
  { id: 'blog', label: 'Blog', href: '#blog' }, // пока заглушка
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Header({ lang, policy }: HeaderProps) {
  // Какие локали показывать в переключателе
  const localesToShow = policy?.allowedLocales ?? LOCALES;

  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-sm">
        {/* Логотип / бренд */}
        <Link href={`/${lang}`} className="font-semibold tracking-tight">
          Analyst Online
        </Link>

        {/* Главное меню */}
        <nav className="flex items-center gap-4">
          {NAV.map((item) => {
            if (item.id === 'home') {
              return (
                <Link key={item.id} href={`/${lang}`} className="opacity-80 hover:opacity-100">
                  {item.label}
                </Link>
              );
            }

            // Blog пока можно оставить как текст-заглушку
            if (item.id === 'blog') {
              return (
                <span key={item.id} className="opacity-40">
                  {item.label}
                </span>
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

        {/* Переключатель языков */}
        <div className="flex gap-1">
          {localesToShow.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className={`rounded-md border border-white/20 px-2 py-1 text-xs ${
                l === lang ? 'bg-white text-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
