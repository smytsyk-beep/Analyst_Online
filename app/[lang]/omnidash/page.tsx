// app/[lang]/omnidash/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { omniDashCopy } from '@/content/omnidash.copy';
import type { OmniDashCopy } from '@/content/omnidash.copy';
import { sanityClient } from '@/sanity/client';
import { omnidashBlocksQuery, faqQuery, pageByPathQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import type { SanityImageValue } from '@/sanity/image';
import { socialPreviewMetadata } from '@/lib/seo-metadata';

import JsonLd from '@/components/seo/json-ld';
import { productSchema, breadcrumbSchema } from '@/lib/schema';
import OmniDashHero from '@/components/omnidash/hero';
import OmniDashPainPoints from '@/components/omnidash/pain-points';
import OmniDashFeatures from '@/components/omnidash/features';
import OmniDashHowItWorks from '@/components/omnidash/how-it-works';
import OmniDashPricing from '@/components/omnidash/pricing';
import OmniDashFaq from '@/components/omnidash/faq';
import OmniDashCtaBottom from '@/components/omnidash/cta-bottom';

type Props = { params: Promise<{ lang: Locale }> };

type OmniDashBlockType =
  | 'hero'
  | 'painPoints'
  | 'features'
  | 'howItWorks'
  | 'pricing'
  | 'ctaBottom'
  | 'faq';

type CmsOmniDashBlock = {
  blockType: OmniDashBlockType;
  content: {
    badge?: string;
    title?: string;
    subtitle?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
    stats?: OmniDashCopy['heroStats'];
    pains?: OmniDashCopy['pains'];
    features?: OmniDashCopy['features'];
    advancedTitle?: string;
    advanced?: OmniDashCopy['featuresAdvanced'];
    steps?: OmniDashCopy['steps'];
    note?: string;
    plans?: OmniDashCopy['plans'];
  };
};

type CmsFaqItem = {
  question: string;
  answer: string;
};

type CmsPageMediaItem = {
  key?: string;
  image?: SanityImageValue;
};

type CmsOmniDashPage = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: SanityImageValue;
  heroImage?: SanityImageValue;
  media?: CmsPageMediaItem[];
};

function mediaByKey(media: CmsPageMediaItem[] | undefined) {
  return new Map(
    media
      ?.filter((item): item is Required<CmsPageMediaItem> => Boolean(item.key && item.image))
      .map((item) => [item.key, item.image]) ?? [],
  );
}

async function loadOmniDashPageDoc(lang: Locale) {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<CmsOmniDashPage | null>(
      pageByPathQuery,
      { locale: lang, path: 'omnidash' },
      { next: { tags: ['page'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch OmniDash page from Sanity CMS, using fallback:', error);
    return null;
  }
}

// Transform CMS blocks to component format
function transformOmniDashBlocks(
  blocks: CmsOmniDashBlock[] | null,
  faq: CmsFaqItem[] | null,
  fallback: OmniDashCopy,
) {
  if (!blocks || blocks.length === 0) return fallback;

  const result: OmniDashCopy = { ...fallback };

  blocks.forEach((block) => {
    const content = block.content;
    switch (block.blockType) {
      case 'hero':
        result.heroBadge = content.badge ?? result.heroBadge;
        result.heroTitle = content.title ?? result.heroTitle;
        result.heroSubtitle = content.subtitle ?? result.heroSubtitle;
        result.heroCtaPrimary = content.ctaPrimary ?? result.heroCtaPrimary;
        result.heroCtaSecondary = content.ctaSecondary ?? result.heroCtaSecondary;
        result.heroStats = content.stats ?? result.heroStats;
        break;
      case 'painPoints':
        result.painTitle = content.title ?? result.painTitle;
        result.painSubtitle = content.subtitle ?? result.painSubtitle;
        result.pains = content.pains ?? result.pains;
        break;
      case 'features':
        result.featuresTitle = content.title ?? result.featuresTitle;
        result.featuresSubtitle = content.subtitle ?? result.featuresSubtitle;
        result.features = content.features ?? result.features;
        result.featuresAdvancedTitle = content.advancedTitle ?? result.featuresAdvancedTitle;
        result.featuresAdvanced = content.advanced ?? result.featuresAdvanced;
        break;
      case 'howItWorks':
        result.howTitle = content.title ?? result.howTitle;
        result.howSubtitle = content.subtitle ?? result.howSubtitle;
        result.steps = content.steps ?? result.steps;
        break;
      case 'pricing':
        result.pricingTitle = content.title ?? result.pricingTitle;
        result.pricingSubtitle = content.subtitle ?? result.pricingSubtitle;
        result.pricingNote = content.note ?? result.pricingNote;
        result.plans = content.plans ?? result.plans;
        break;
      case 'ctaBottom':
        result.ctaTitle = content.title ?? result.ctaTitle;
        result.ctaSubtitle = content.subtitle ?? result.ctaSubtitle;
        result.ctaPrimary = content.ctaPrimary ?? result.ctaPrimary;
        result.ctaSecondary = content.ctaSecondary ?? result.ctaSecondary;
        break;
      case 'faq':
        break;
    }
  });

  // Transform FAQ
  if (faq && faq.length > 0) {
    result.faqTitle = fallback.faqTitle; // Keep from fallback
    result.faqs = faq.map((item) => ({ q: item.question, a: item.answer }));
  }

  return result;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const cmsPage = await loadOmniDashPageDoc(lang);

  const titles: Record<Locale, string> = {
    ru: 'OmniDash — аналитика для e-commerce | Analyst Online',
    ua: 'OmniDash — аналітика для e-commerce | Analyst Online',
    ro: 'OmniDash — analytics pentru e-commerce | Analyst Online',
  };

  const descriptions: Record<Locale, string> = {
    ru: 'Готовая система аналитики для малого e-commerce. Реклама, продажи и расходы в одном дашборде. Настройка от €99, подписка от €49/мес.',
    ua: 'Готова система аналітики для малого e-commerce. Реклама, продажі та витрати в одному дашборді. Налаштування від €99, підписка від €49/міс.',
    ro: 'Sistem gata de analytics pentru e-commerce mic. Reclamă, vânzări și cheltuieli într-un singur dashboard. Configurare de la €99, abonament de la €49/lună.',
  };

  const title = cmsPage?.seoTitle ?? cmsPage?.title ?? titles[lang];
  const description = cmsPage?.seoDescription ?? cmsPage?.description ?? descriptions[lang];

  return {
    title,
    description,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/omnidash`,
      languages: {
        uk: '/ua/omnidash',
        ru: '/ru/omnidash',
        ro: '/ro/omnidash',
      },
    },
    ...socialPreviewMetadata({
      title,
      description,
      url: `https://analyst-online.com/${lang}/omnidash`,
      locale: lang,
      image: cmsPage?.socialImage ?? cmsPage?.heroImage,
      imageAlt: 'OmniDash',
    }),
  };
}

export default async function OmniDashPage({ params }: Props) {
  const { lang } = await params;

  // Fetch OmniDash blocks from CMS
  let cmsBlocks: CmsOmniDashBlock[] | null = null;
  let cmsFaq: CmsFaqItem[] | null = null;
  let cmsPage: CmsOmniDashPage | null = null;

  if (isSanityConfigured()) {
    try {
      [cmsBlocks, cmsFaq, cmsPage] = await Promise.all([
        sanityClient.fetch<CmsOmniDashBlock[]>(
          omnidashBlocksQuery,
          { locale: lang },
          { next: { tags: ['omnidashBlock'] } },
        ),
        sanityClient.fetch<CmsFaqItem[]>(
          faqQuery,
          { locale: lang, category: 'omnidash' },
          { next: { tags: ['faq'] } },
        ),
        loadOmniDashPageDoc(lang),
      ]);
    } catch (error) {
      console.warn('Failed to fetch OmniDash content from Sanity CMS, using fallback:', error);
    }
  }

  // Transform CMS blocks to component format
  const t = transformOmniDashBlocks(cmsBlocks, cmsFaq, omniDashCopy[lang]);
  const media = mediaByKey(cmsPage?.media);

  return (
    <div className="relative overflow-hidden">
      <JsonLd data={productSchema(lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: 'OmniDash', href: `/${lang}/omnidash` },
        ])}
      />
      <OmniDashHero
        t={t}
        lang={lang}
        dashboardImage={media.get('omnidash-hero-dashboard') ?? cmsPage?.heroImage}
      />
      <OmniDashPainPoints t={t} />
      <OmniDashFeatures t={t} dashboardImage={media.get('omnidash-features-dashboard')} />
      <OmniDashHowItWorks t={t} />
      <OmniDashPricing t={t} lang={lang} />
      <OmniDashFaq t={t} />
      <OmniDashCtaBottom t={t} lang={lang} />
    </div>
  );
}
