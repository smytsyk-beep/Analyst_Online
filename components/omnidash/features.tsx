// components/omnidash/features.tsx
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashFeatures({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-white">{t.featuresTitle}</h2>
          <p className="mt-3 text-lg text-white/60">{t.featuresSubtitle}</p>
        </div>

        {/* Core features grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <div className="mt-3 font-semibold text-white">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Second mockup */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
          <Image
            src="/images/omnidash/mockup-2.png"
            alt="OmniDash — Ad Campaign Optimizer"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>

        {/* Advanced features */}
        <div className="mt-10 rounded-2xl border border-white/8 bg-white/3 p-6 md:p-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/40">
            {t.featuresAdvancedTitle}
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {t.featuresAdvanced.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                <span className="h-1 w-1 rounded-full bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
