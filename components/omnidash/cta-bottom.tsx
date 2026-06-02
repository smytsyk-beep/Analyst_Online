// components/omnidash/cta-bottom.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy; lang: string };

export default function OmniDashCtaBottom({ t, lang }: Props) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="glass-card neon-ring rounded-lg border-2 border-primary/45 bg-primary/10 p-10 text-center md:p-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/70">{t.ctaSubtitle}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="px-8 font-bold" asChild>
              <Link href={`/${lang}/contact?purpose=price`}>{t.ctaPrimary}</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 font-bold" asChild>
              <Link href={`/${lang}/contact?purpose=question`}>{t.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
