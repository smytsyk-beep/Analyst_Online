// components/home/hero.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeHero({ t, lang }: Props) {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          OmniDash — flagship product
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-[4.25rem] md:leading-[1.1]">
          {t.heroTitle}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 md:text-xl">
          {t.heroSubtitle}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="px-8 font-bold" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.ctaPrimary}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="px-8 font-bold" asChild>
            <Link href={`/${lang}/services`}>{t.ctaSecondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
