// components/omnidash/features.tsx
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashFeatures({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">{t.featuresTitle}</h2>
          <p className="mt-3 text-lg text-omni-navy/70">{t.featuresSubtitle}</p>
        </div>

        {/* Core features grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-grid-divider bg-white p-6 shadow-sm transition-all duration-200 hover:border-growth-green hover:shadow-md"
            >
              <CheckCircle2 size={18} className="text-growth-green" />
              <div className="mt-3 font-bold text-omni-navy">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-omni-navy/70">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Second mockup */}
        <div className="mt-14 overflow-hidden rounded-lg border border-grid-divider bg-white p-4 shadow-md">
          <div className="overflow-hidden rounded-md">
            <Image
              src="/images/omnidash/mockup-2.png"
              alt="OmniDash — Ad Campaign Optimizer"
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Advanced features */}
        <div className="mt-10 rounded-lg border border-grid-divider bg-white p-6 shadow-sm md:p-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-omni-navy/50">
            {t.featuresAdvancedTitle}
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {t.featuresAdvanced.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-omni-navy/80">
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
