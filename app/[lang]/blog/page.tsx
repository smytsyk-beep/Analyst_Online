// app/[lang]/blog/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    ru: 'Блог — Analyst Online',
    ua: 'Блог — Analyst Online',
    ro: 'Blog — Analyst Online',
  };

  const descriptions: Record<Locale, string> = {
    ru: 'Статьи об аналитике, дашбордах и автоматизации для бизнеса.',
    ua: 'Статті про аналітику, дашборди та автоматизацію для бізнесу.',
    ro: 'Articole despre analytics, dashboard-uri și automatizare pentru business.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `https://analyst-online.com/${lang}/blog`,
      languages: {
        uk: '/ua/blog',
        ru: '/ru/blog',
        ro: '/ro/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;

  const labels: Record<Locale, { title: string; text: string }> = {
    ru: { title: 'Блог', text: 'Статьи появятся здесь в ближайшее время.' },
    ua: { title: 'Блог', text: "Статті з'являться тут найближчим часом." },
    ro: { title: 'Blog', text: 'Articolele vor apărea aici în curând.' },
  };

  const l = labels[lang];

  return (
    <div className="page space-y-8 py-12">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{l.title}</h1>
        <p className="mt-4 text-lg opacity-80">{l.text}</p>
      </div>
    </div>
  );
}
