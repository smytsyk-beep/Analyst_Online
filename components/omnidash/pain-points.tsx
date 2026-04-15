// components/omnidash/pain-points.tsx
import { AlertTriangle } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashPainPoints({ t }: Props) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.painTitle}</h2>
          <p className="mt-3 text-lg text-foreground/70">{t.painSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.pains.map((pain) => (
            <div
              key={pain.title}
              className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-lime-accent hover:shadow-md"
            >
              <AlertTriangle size={18} className="text-lime-accent" />
              <div className="mt-3 font-bold text-foreground">{pain.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{pain.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
