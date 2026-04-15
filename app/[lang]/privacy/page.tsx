// app/[lang]/privacy/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { privacyCopy } from '@/content/privacy.copy';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = privacyCopy[lang];

  return {
    title: `${t.pageTitle} — Analyst Online`,
    description: t.pageSubtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/privacy`,
      languages: {
        uk: '/ua/privacy',
        ru: '/ru/privacy',
        ro: '/ro/privacy',
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const t = privacyCopy[lang];

  return (
    <div className="page space-y-12 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: t.pageTitle, href: `/${lang}/privacy` },
        ])}
      />

      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg text-foreground/70">{t.pageSubtitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t.lastUpdated}</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {t.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-foreground/70">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
