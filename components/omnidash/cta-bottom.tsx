// components/omnidash/cta-bottom.tsx
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy };

export default function OmniDashCtaBottom({ t }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-lg border-2 border-primary bg-primary/5 p-10 text-center shadow-sm md:p-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/70">{t.ctaSubtitle}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="px-8 font-bold" asChild>
              <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                {t.ctaPrimary}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="px-8 font-bold" asChild>
              <a href="mailto:s.mytsyk@gmail.com">{t.ctaSecondary}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
