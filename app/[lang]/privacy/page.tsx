// app/[lang]/privacy/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { privacyCopy } from '@/content/privacy.copy';
import type { PrivacyCopy } from '@/content/privacy.copy';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import { sanityClient } from '@/sanity/client';
import { privacyPageQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';

type Props = { params: Promise<{ lang: Locale }> };

function parseCmsContent(content: unknown): Partial<PrivacyCopy> | undefined {
  if (!content || typeof content !== 'object') return undefined;
  if ('data' in content && typeof content.data === 'string' && content.data.trim()) {
    try {
      return JSON.parse(content.data) as Partial<PrivacyCopy>;
    } catch {
      return undefined;
    }
  }

  return content as Partial<PrivacyCopy>;
}

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
  let t = privacyCopy[lang];

  if (isSanityConfigured()) {
    try {
      const cmsData = await sanityClient.fetch(
        privacyPageQuery,
        { locale: lang },
        { next: { tags: ['page'] } },
      );

      if (cmsData) {
        t = {
          ...t,
          ...parseCmsContent(cmsData.content),
          pageTitle: cmsData.title ?? t.pageTitle,
          pageSubtitle: cmsData.description ?? t.pageSubtitle,
        };
      }
    } catch (error) {
      console.warn('Failed to fetch privacy page from Sanity CMS, using fallback:', error);
    }
  }

  return (
    <div className="page relative z-10 space-y-12 py-12">
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

      <div className="glass-card max-w-3xl space-y-8 rounded-lg p-6 md:p-8">
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
