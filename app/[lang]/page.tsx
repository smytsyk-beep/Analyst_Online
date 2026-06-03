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
import { socialPreviewMetadata } from '@/lib/seo-metadata';

type Props = { params: Promise<{ lang: Locale }> };

type CmsPageMediaItem = {
  key?: string;
  title?: string;
  image?: SanityImageValue;
};

type CmsHomePage = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  content?: unknown;
  socialImage?: SanityImageValue;
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

async function loadHomePageDoc(lang: Locale) {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<CmsHomePage | null>(
      homePageQuery,
      { locale: lang },
      { next: { tags: ['page'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch home page from Sanity CMS, using fallback:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = homeCopy[lang];
  const cmsData = await loadHomePageDoc(lang);
  const title = cmsData?.seoTitle ?? t.metaTitle;
  const description = cmsData?.seoDescription ?? cmsData?.description ?? t.heroSubtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `https://analyst-online.com/${lang}`,
      languages: {
        uk: '/ua',
        ru: '/ru',
        ro: '/ro',
      },
    },
    ...socialPreviewMetadata({
      title,
      description,
      url: `https://analyst-online.com/${lang}`,
      locale: lang,
      image: cmsData?.socialImage,
      imageAlt: 'Analyst Online',
    }),
  };
}

export default async function LangHome({ params }: Props) {
  const { lang } = await params;

  // Fetch from CMS with fallback to hardcoded copy
  const cmsData = await loadHomePageDoc(lang);

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
