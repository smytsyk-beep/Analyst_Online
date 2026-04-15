'use client';

// components/omnidash/faq.tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashFaq({ t }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.faqTitle}</h2>

        <div className="mt-10 space-y-3">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-colors hover:border-primary"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-foreground hover:bg-accent/40"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-foreground/50 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open === i && (
                <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-foreground/70">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
