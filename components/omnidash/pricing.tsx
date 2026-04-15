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
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.pricingTitle}</h2>
          <p className="mt-3 text-lg text-foreground/70">{t.pricingSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.plans.map((plan) => (
            <div
              key={plan.label}
              className={`relative flex flex-col rounded-lg border p-6 transition-all duration-200 md:p-8 ${
                plan.highlighted
                  ? 'border-2 border-primary bg-primary/5 shadow-sm'
                  : 'border border-border bg-card shadow-sm hover:border-primary hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}

              <div className="text-sm font-semibold uppercase tracking-widest text-foreground/50">
                {plan.label}
              </div>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="mb-1 text-sm text-foreground/60">/ {plan.period}</span>
              </div>

              <p className="mt-1 text-xs text-foreground/50">{plan.note}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-growth-green" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  className={`w-full font-bold ${
                    plan.highlighted
                      ? ''
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
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

        <p className="mt-6 text-center text-xs text-foreground/50">{t.pricingNote}</p>
      </div>
    </section>
  );
}
