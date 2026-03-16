// components/omnidash/cta-bottom.tsx
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashCtaBottom({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent p-10 md:p-16 text-center">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-3xl" />
          </div>

          <h2 className="text-3xl font-semibold text-white md:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">{t.ctaSubtitle}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                {t.ctaPrimary}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:s.mytsyk@gmail.com">{t.ctaSecondary}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
