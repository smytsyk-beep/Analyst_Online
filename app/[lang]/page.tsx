// app/[lang]/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from '@/content/home.copy';

import JsonLd from '@/components/seo/json-ld';
import { organizationSchema } from '@/lib/schema';
import HomeHero from '@/components/home/hero';
import HomeFlagship from '@/components/home/flagship';
import HomeServicesPreview from '@/components/home/services-preview';
import HomeSocialProof from '@/components/home/social-proof';
import HomeCtaSection from '@/components/home/cta-section';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = homeCopy[lang];

  const titles: Record<Locale, string> = {
    ru: 'Analyst Online — Аналитика, дашборды и автоматизация для бизнеса',
    ua: 'Analyst Online — Аналітика, дашборди та автоматизація для бізнесу',
    ro: 'Analyst Online — Analytics, dashboard-uri și automatizare pentru business',
  };

  return {
    title: titles[lang],
    description: t.heroSubtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}`,
      languages: {
        uk: '/ua',
        ru: '/ru',
        ro: '/ro',
      },
    },
    openGraph: {
      title: titles[lang],
      description: t.heroSubtitle,
      images: [
        {
          url: 'https://analyst-online.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Analyst Online',
        },
      ],
      locale: lang === 'ua' ? 'uk_UA' : lang === 'ro' ? 'ro_RO' : 'ru_RU',
    },
  };
}

export default async function LangHome({ params }: Props) {
  const { lang } = await params;
  const t = homeCopy[lang];

  return (
    <div>
      <JsonLd data={organizationSchema()} />
      <HomeHero t={t} lang={lang} />
      <HomeFlagship t={t} lang={lang} />
      <HomeServicesPreview t={t} lang={lang} />
      <HomeSocialProof t={t} />
      <HomeCtaSection t={t} lang={lang} />
    </div>
  );
}
