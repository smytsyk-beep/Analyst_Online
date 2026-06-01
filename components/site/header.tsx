// components/site/header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import { LOCALES, type Locale, type I18nPolicy } from '@/lib/i18n';
import MobileNav from '@/components/site/mobile-nav';
import LanguageSwitcher from '@/components/site/language-switcher';
import { CONTACT_LINKS, siteCopy } from '@/content/site.copy';

export type HeaderProps = {
  lang: Locale;
  /**
   * Политика i18n по GEO:
   * - allowedLocales: какие локали показывать в переключателе
   * - defaultLocale / forcedLocale мы тут не используем
   */
  policy?: I18nPolicy;
};

export default function Header({ lang, policy }: HeaderProps) {
  // Какие локали показывать в переключателе
  const localesToShow = policy?.allowedLocales ?? LOCALES;
  const t = siteCopy[lang];
  const nav = [
    { id: 'home', label: t.nav.home, href: '' },
    { id: 'services', label: t.nav.services, href: '/services' },
    {
      id: 'ai-training',
      label: t.nav.aiTraining,
      href: lang === 'ru' ? '/obuchenie-ai' : lang === 'ua' ? '/navchannia-ai' : '/curs-ai',
    },
    { id: 'cases', label: t.nav.cases, href: '/cases' },
    { id: 'blog', label: t.nav.blog, href: '/blog' },
    { id: 'contact', label: t.nav.contacts, href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/85 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm sm:px-6">
        {/* Логотип / бренд */}
        <Link href={`/${lang}`} className="flex items-center gap-2.5 group">
          <Image
            src="/logo/icon.png"
            alt="Analyst Online"
            width={32}
            height={32}
            className="h-8 w-8 transition-opacity group-hover:opacity-80"
          />
          <span className="hidden font-bold tracking-tight text-foreground transition-colors group-hover:text-primary xs:inline sm:inline">
            Analyst Online
          </span>
        </Link>

        {/* Главное меню */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            if (item.id === 'home') {
              return (
                <Link
                  key={item.id}
                  href={`/${lang}`}
                  className="rounded-md px-3 py-1.5 font-medium text-foreground/70 transition-colors hover:bg-accent/40 hover:text-foreground"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                href={`/${lang}${item.href}`}
                className="rounded-md px-3 py-1.5 font-medium text-foreground/70 transition-colors hover:bg-accent/40 hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Правая часть: lang switcher + mobile burger */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 lg:flex">
            <a
              href={CONTACT_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label={t.contact.telegram}
              title={t.contact.telegram}
            >
              <MessageCircle size={17} />
            </a>
            <a
              href={CONTACT_LINKS.email}
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label={t.contact.email}
              title={t.contact.email}
            >
              <Mail size={17} />
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-foreground/60 transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label={t.contact.linkedin}
              title={t.contact.linkedin}
            >
              <Linkedin size={17} />
            </a>
          </div>

          {/* Переключатель языков */}
          <LanguageSwitcher currentLang={lang} availableLocales={localesToShow} />

          {/* Мобильное меню */}
          <MobileNav lang={lang} nav={nav} />
        </div>
      </div>
    </header>
  );
}
