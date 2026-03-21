// components/omnidash/pain-points.tsx
import { AlertTriangle } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashPainPoints({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-white">{t.painTitle}</h2>
          <p className="mt-3 text-lg text-white/60">{t.painSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 transition-colors hover:border-white/15 hover:bg-white/5"
            >
              <AlertTriangle size={18} className="text-amber-400" />
              <div className="mt-3 font-semibold text-white">{pain.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
