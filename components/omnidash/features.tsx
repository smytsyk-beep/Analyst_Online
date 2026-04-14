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
          <h2 className="text-3xl font-semibold text-white">{t.featuresTitle}</h2>
          <p className="mt-3 text-lg text-white/60">{t.featuresSubtitle}</p>
        </div>

        {/* Core features grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(52,211,153,0.04)]"
            >
              <CheckCircle2 size={18} className="text-emerald-400" />
              <div className="mt-3 font-semibold text-white">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Second mockup */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/70 ring-1 ring-white/[0.04]">
          <Image
            src="/images/omnidash/mockup-2.png"
            alt="OmniDash — Ad Campaign Optimizer"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>

        {/* Advanced features */}
        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
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
