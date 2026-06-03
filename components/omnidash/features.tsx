// components/omnidash/features.tsx
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';
import { BentoCard, BentoGrid } from '@/components/shared/bento';
import { sanityImageUrl, type SanityImageValue } from '@/sanity/image';

type Props = {
  t: OmniDashCopy;
  dashboardImage?: SanityImageValue;
};

export default function OmniDashFeatures({ t, dashboardImage }: Props) {
  const dashboardImageUrl = sanityImageUrl(dashboardImage, {
    width: 1200,
    height: 675,
    fit: 'crop',
  });

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.featuresTitle}</h2>
          <p className="mt-3 text-lg text-foreground/70">{t.featuresSubtitle}</p>
        </div>

        {/* Core features grid */}
        <BentoGrid className="mt-12 lg:grid-cols-3">
          {t.features.map((f, index) => (
            <BentoCard
              key={f.title}
              className={index === 0 ? 'sm:col-span-2' : ''}
              featured={index === 0}
            >
              <CheckCircle2 size={18} className="text-growth-green" />
              <div className="mt-3 font-bold text-foreground">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{f.text}</p>
            </BentoCard>
          ))}
        </BentoGrid>

        {/* Second mockup */}
        <div className="glass-card mt-14 overflow-hidden rounded-lg p-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src={dashboardImageUrl ?? '/images/omnidash/mockup-2.png'}
              alt={dashboardImage?.alt || 'OmniDash - Ad Campaign Optimizer'}
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Advanced features */}
        <div className="glass-card mt-10 rounded-lg p-6 md:p-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
            {t.featuresAdvancedTitle}
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {t.featuresAdvanced.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                <span className="h-1 w-1 rounded-full bg-omni-cyan" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
