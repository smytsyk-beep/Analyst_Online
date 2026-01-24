// app/[lang]/layout.tsx
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import { COUNTRY_COOKIE, getI18nPolicy, isLocale, type Locale } from '@/lib/i18n';

export const dynamicParams = false;

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

  return (
    <div className="min-h-dvh flex flex-col">
      <Header lang={lang as Locale} policy={policy} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
