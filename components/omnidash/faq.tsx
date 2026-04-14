'use client';

// components/omnidash/faq.tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashFaq({ t }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-soft-bg py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">{t.faqTitle}</h2>

        <div className="mt-10 space-y-3">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-grid-divider bg-white shadow-sm transition-colors hover:border-omni-blue"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-omni-navy hover:bg-soft-bg"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-omni-navy/50 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open === i && (
                <div className="border-t border-grid-divider px-6 py-4 text-sm leading-relaxed text-omni-navy/70">
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
