// app/[lang]/omnidash/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { omniDashCopy } from '@/content/omnidash.copy';
import { sanityClient } from '@/sanity/client';
import { omnidashBlocksQuery, faqQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';

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

// Transform CMS blocks to component format
function transformOmniDashBlocks(blocks: any[], faq: any[], fallback: typeof omniDashCopy.ru) {
  if (!blocks || blocks.length === 0) return fallback;

  const result: any = { ...fallback };

  blocks.forEach((block) => {
    const content = block.content;
    switch (block.blockType) {
      case 'hero':
        result.heroBadge = content.badge;
        result.heroTitle = content.title;
        result.heroSubtitle = content.subtitle;
        result.heroCtaPrimary = content.ctaPrimary;
        result.heroCtaSecondary = content.ctaSecondary;
        result.heroStats = content.stats;
        break;
      case 'painPoints':
        result.painTitle = content.title;
        result.painSubtitle = content.subtitle;
        result.pains = content.pains;
        break;
      case 'features':
        result.featuresTitle = content.title;
        result.featuresSubtitle = content.subtitle;
        result.features = content.features;
        result.featuresAdvancedTitle = content.advancedTitle;
        result.featuresAdvanced = content.advanced;
        break;
      case 'howItWorks':
        result.howTitle = content.title;
        result.howSubtitle = content.subtitle;
        result.steps = content.steps;
        break;
      case 'pricing':
        result.pricingTitle = content.title;
        result.pricingSubtitle = content.subtitle;
        result.pricingNote = content.note;
        result.plans = content.plans;
        break;
      case 'ctaBottom':
        result.ctaTitle = content.title;
        result.ctaSubtitle = content.subtitle;
        result.ctaPrimary = content.ctaPrimary;
        result.ctaSecondary = content.ctaSecondary;
        break;
    }
  });

  // Transform FAQ
  if (faq && faq.length > 0) {
    result.faqTitle = fallback.faqTitle; // Keep from fallback
    result.faqs = faq.map((f: any) => ({ q: f.question, a: f.answer }));
  }

  return result;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = omniDashCopy[lang];

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

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `https://analyst-online.com/${lang}/omnidash`,
      languages: {
        uk: '/ua/omnidash',
        ru: '/ru/omnidash',
        ro: '/ro/omnidash',
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
          alt: 'OmniDash - Analytics for e-commerce',
        },
      ],
      locale: lang === 'ua' ? 'uk_UA' : lang === 'ro' ? 'ro_RO' : 'ru_RU',
    },
  };
}

export default async function OmniDashPage({ params }: Props) {
  const { lang } = await params;

  // Fetch OmniDash blocks from CMS
  let cmsBlocks = null;
  let cmsFaq = null;

  if (isSanityConfigured()) {
    try {
      cmsBlocks = await sanityClient.fetch(
        omnidashBlocksQuery,
        { locale: lang },
        { next: { tags: ['omnidashBlock'] } },
      );

      cmsFaq = await sanityClient.fetch(
        faqQuery,
        { locale: lang, category: 'omnidash' },
        { next: { tags: ['faq'] } },
      );
    } catch (error) {
      console.warn('Failed to fetch OmniDash content from Sanity CMS, using fallback:', error);
    }
  }

  // Transform CMS blocks to component format
  const t = transformOmniDashBlocks(cmsBlocks, cmsFaq, omniDashCopy[lang]);

  return (
    <div className="bg-black">
      <JsonLd data={productSchema(lang)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: 'OmniDash', href: `/${lang}/omnidash` },
        ])}
      />
      <OmniDashHero t={t} lang={lang} />
      <OmniDashPainPoints t={t} />
      <OmniDashFeatures t={t} />
      <OmniDashHowItWorks t={t} />
      <OmniDashPricing t={t} />
      <OmniDashFaq t={t} />
      <OmniDashCtaBottom t={t} />
    </div>
  );
}
