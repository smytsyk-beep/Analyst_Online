'use client';

// components/omnidash/faq.tsx
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashFaq({ t }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-white">{t.faqTitle}</h2>

        <div className="mt-10 space-y-2">
          {t.faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-colors hover:border-white/[0.1]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-white hover:bg-white/[0.04]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-white/40 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {open === i && (
                <div className="border-t border-white/[0.06] px-6 py-4 text-sm leading-relaxed text-white/60">
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
