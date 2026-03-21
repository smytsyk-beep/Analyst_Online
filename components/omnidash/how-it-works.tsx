// components/omnidash/how-it-works.tsx
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashHowItWorks({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-white">{t.howTitle}</h2>
          <p className="mt-3 text-lg text-white/60">{t.howSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {i < t.steps.length - 1 && (
                <div className="absolute left-full top-6 hidden h-px w-6 bg-white/10 lg:block" />
              )}

              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <div className="text-3xl font-bold text-white/15">{step.number}</div>
                <div className="mt-4 font-semibold text-white">{step.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
