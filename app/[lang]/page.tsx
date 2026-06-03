// app/[lang]/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from '@/content/home.copy';
import type { HomeCopy } from '@/content/home.copy';
import { sanityClient } from '@/sanity/client';
import { homePageQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';

import JsonLd from '@/components/seo/json-ld';
import { organizationSchema } from '@/lib/schema';
import HomeLanding from '@/components/home/landing';
import type { SanityImageValue } from '@/sanity/image';

type Props = { params: Promise<{ lang: Locale }> };

type CmsPageMediaItem = {
  key?: string;
  title?: string;
  image?: SanityImageValue;
};

type CmsHomePage = {
  title?: string;
  description?: string;
  content?: unknown;
  heroImage?: SanityImageValue;
  media?: CmsPageMediaItem[];
};

function parseCmsContent(content: unknown): Partial<HomeCopy> | undefined {
  if (!content || typeof content !== 'object') return undefined;
  if ('data' in content && typeof content.data === 'string' && content.data.trim()) {
    try {
      return JSON.parse(content.data) as Partial<HomeCopy>;
    } catch {
      return undefined;
    }
  }

  return content as Partial<HomeCopy>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = homeCopy[lang];

  return {
    title: t.metaTitle,
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
      title: t.metaTitle,
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

  // Fetch from CMS with fallback to hardcoded copy
  let cmsData: CmsHomePage | null = null;
  if (isSanityConfigured()) {
    try {
      cmsData = await sanityClient.fetch<CmsHomePage | null>(
        homePageQuery,
        { locale: lang },
        { next: { tags: ['page'] } },
      );
    } catch (error) {
      console.warn('Failed to fetch from Sanity CMS, using fallback:', error);
    }
  }

  // Use CMS data if available, otherwise fallback to .copy.ts
  const t = cmsData
    ? {
        ...homeCopy[lang],
        ...parseCmsContent(cmsData.content),
        heroTitle: cmsData.title ?? homeCopy[lang].heroTitle,
        heroSubtitle: cmsData.description ?? homeCopy[lang].heroSubtitle,
      }
    : homeCopy[lang];

  return (
    <div>
      <JsonLd data={organizationSchema()} />
      <HomeLanding
        t={t}
        lang={lang}
        media={{ heroImage: cmsData?.heroImage, items: cmsData?.media }}
      />
    </div>
  );
}
