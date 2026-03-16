// app/[lang]/omnidash/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { omniDashCopy } from '@/content/omnidash.copy';

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
    openGraph: {
      title: titles[lang],
      description: t.heroSubtitle,
      images: ['/images/omnidash/mockup-1.png'],
    },
  };
}

export default async function OmniDashPage({ params }: Props) {
  const { lang } = await params;
  const t = omniDashCopy[lang];

  return (
    <div className="bg-black">
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
