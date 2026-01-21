import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';

const LOCALES = ['ua', 'ru', 'ro'] as const;
type Locale = (typeof LOCALES)[number];

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!LOCALES.includes(lang as Locale)) notFound();
  const locale = lang as Locale;

  return (
    <div className="min-h-dvh flex flex-col">
      <Header lang={locale} />
      <main className="page flex-1">{children}</main>
      <Footer />
    </div>
  );
}
