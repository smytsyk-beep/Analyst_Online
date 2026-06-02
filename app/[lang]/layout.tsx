// app/[lang]/layout.tsx
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import GlobalParallaxBackground from '@/components/shared/global-parallax-background';
import MobileBottomNav from '@/components/site/mobile-bottom-nav';
import { COUNTRY_COOKIE, getI18nPolicy, isLocale, type Locale } from '@/lib/i18n';
import { siteCopy } from '@/content/site.copy';

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) notFound();

  const cookieStore = await cookies(); // ✅ важно: await
  const country = cookieStore.get(COUNTRY_COOKIE)?.value?.toUpperCase() ?? null;

  const policy = getI18nPolicy(country);
  const locale = lang as Locale;
  const t = siteCopy[locale];
  const nav = [
    { id: 'home', label: t.nav.home, href: '' },
    { id: 'services', label: t.nav.services, href: '/services' },
    {
      id: 'ai-training',
      label: t.nav.aiTraining,
      href: locale === 'ru' ? '/obuchenie-ai' : locale === 'ua' ? '/navchannia-ai' : '/curs-ai',
    },
    { id: 'cases', label: t.nav.cases, href: '/cases' },
    { id: 'blog', label: t.nav.blog, href: '/blog' },
    { id: 'contact', label: t.nav.contacts, href: '/contact' },
  ];

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <GlobalParallaxBackground />
      <Header lang={locale} policy={policy} />
      <main className="relative z-10 flex-1 pb-24 md:pb-0">{children}</main>
      <Footer lang={locale} />
      <MobileBottomNav lang={locale} nav={nav} />
    </div>
  );
}
