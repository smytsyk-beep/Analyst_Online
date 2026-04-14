// components/home/hero.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeHero({ t, lang }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-soft-bg py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-omni-blue/20 bg-omni-blue/5 px-4 py-1.5 text-xs font-semibold text-omni-blue">
          <span className="h-1.5 w-1.5 rounded-full bg-omni-blue" />
          OmniDash — flagship product
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-omni-navy sm:text-5xl md:text-[4.25rem] md:leading-[1.1]">
          {t.heroTitle}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-omni-navy/70 md:text-xl">
          {t.heroSubtitle}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-lg bg-omni-blue px-8 font-bold text-white shadow-md hover:bg-royal-blue"
            asChild
          >
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.ctaPrimary}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-lg border-2 border-omni-blue px-8 font-bold text-omni-blue hover:bg-omni-blue hover:text-white"
            asChild
          >
            <Link href={`/${lang}/services`}>{t.ctaSecondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
