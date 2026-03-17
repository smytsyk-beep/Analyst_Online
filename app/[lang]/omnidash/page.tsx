// app/[lang]/omnidash/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { omniDashCopy } from '@/content/omnidash.copy';

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
  const t = omniDashCopy[lang];

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
