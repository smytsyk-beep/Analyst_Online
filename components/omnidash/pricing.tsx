// components/omnidash/pricing.tsx
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashPricing({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-white">{t.pricingTitle}</h2>
          <p className="mt-3 text-lg text-white/60">{t.pricingSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.plans.map((plan) => (
            <div
              key={plan.label}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-8 ${
                plan.highlighted ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/8 bg-white/3'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">
                  Popular
                </div>
              )}

              <div className="text-sm font-semibold uppercase tracking-widest text-white/50">
                {plan.label}
              </div>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="mb-1 text-sm text-white/50">/ {plan.period}</span>
              </div>

              <p className="mt-1 text-xs text-white/40">{plan.note}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/30">{t.pricingNote}</p>
      </div>
    </section>
  );
}
