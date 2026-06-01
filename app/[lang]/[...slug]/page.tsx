import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import {
  getAllOfferPages,
  getOfferAlternates,
  getOfferPage,
  type OfferPageCopy,
} from '@/content/offer-pages.copy';
import OfferPage from '@/components/services/offer-page';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { sanityClient } from '@/sanity/client';
import { pageByPathQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { siteCopy } from '@/content/site.copy';

type Props = {
  params: Promise<{ lang: Locale; slug: string[] }>;
};

type CmsOfferPage = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  routePath?: string;
  pageType?: string;
  content?: unknown;
};

function parseCmsContent(content: unknown): Partial<OfferPageCopy> | undefined {
  if (!content || typeof content !== 'object') return undefined;
  if ('data' in content && typeof content.data === 'string' && content.data.trim()) {
    try {
      return JSON.parse(content.data) as Partial<OfferPageCopy>;
    } catch {
      return undefined;
    }
  }

  return content as Partial<OfferPageCopy>;
}

function mergePageCopy(
  lang: Locale,
  path: string,
  cmsData: CmsOfferPage | null,
  fallback: OfferPageCopy | null,
): OfferPageCopy | null {
  if (!cmsData && !fallback) return null;

  const cmsContent = parseCmsContent(cmsData?.content);
  const title = cmsContent?.title ?? cmsData?.title ?? fallback?.title ?? path;
  const description =
    cmsContent?.description ??
    cmsData?.seoDescription ??
    cmsData?.description ??
    fallback?.description ??
    '';
  const purposes = siteCopy[lang].purposes;

  return {
    path: cmsContent?.path ?? cmsData?.routePath ?? fallback?.path ?? path,
    title,
    metaTitle: cmsContent?.metaTitle ?? cmsData?.seoTitle ?? fallback?.metaTitle ?? title,
    description,
    badge: cmsContent?.badge ?? fallback?.badge ?? cmsData?.pageType ?? 'Analyst Online',
    ctaPrimary: cmsContent?.ctaPrimary ?? fallback?.ctaPrimary ?? purposes.consultation,
    ctaSecondary: cmsContent?.ctaSecondary ?? fallback?.ctaSecondary ?? purposes.question,
    intro: cmsContent?.intro ?? fallback?.intro ?? description,
    includedTitle: cmsContent?.includedTitle ?? fallback?.includedTitle ?? title,
    included: cmsContent?.included ?? fallback?.included ?? [],
    whyTitle: cmsContent?.whyTitle ?? fallback?.whyTitle ?? '',
    why: cmsContent?.why ?? fallback?.why ?? [],
    processTitle: cmsContent?.processTitle ?? fallback?.processTitle ?? '',
    process: cmsContent?.process ?? fallback?.process ?? [],
    faqTitle: cmsContent?.faqTitle ?? fallback?.faqTitle ?? '',
    faqs: cmsContent?.faqs ?? fallback?.faqs ?? [],
  };
}

async function loadPage(lang: Locale, path: string) {
  const fallback = getOfferPage(lang, path);

  if (!isSanityConfigured()) return fallback;

  try {
    const cmsData = await sanityClient.fetch<CmsOfferPage | null>(
      pageByPathQuery,
      { locale: lang, path },
      { next: { tags: ['page'] } },
    );

    return mergePageCopy(lang, path, cmsData, fallback);
  } catch (error) {
    console.warn('Failed to fetch offer page from Sanity CMS, using fallback:', error);
    return fallback;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const path = slug.join('/');
  const page = await loadPage(lang, path);

  if (!page) {
    return {
      title: 'Not Found',
    };
  }

  const alternatePaths = getOfferAlternates(path);
  const languages = Object.fromEntries(
    Object.entries(alternatePaths).map(([locale, offerPath]) => [
      locale === 'ua' ? 'uk' : locale,
      `/${locale}/${offerPath}`,
    ]),
  );

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/${path}`,
      languages,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      locale: lang === 'ua' ? 'uk_UA' : lang === 'ro' ? 'ro_RO' : 'ru_RU',
    },
  };
}

export function generateStaticParams() {
  return getAllOfferPages().map(({ lang, page }) => ({
    lang,
    slug: page.path.split('/'),
  }));
}

export default async function LangCatchAllPage({ params }: Props) {
  const { lang, slug } = await params;
  const path = slug.join('/');
  const page = await loadPage(lang, path);

  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: page.title, href: `/${lang}/${page.path}` },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          lang,
          name: page.title,
          description: page.description,
          path: page.path,
        })}
      />
      <OfferPage t={page} lang={lang} />
    </>
  );
}
