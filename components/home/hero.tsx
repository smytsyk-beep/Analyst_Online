// components/home/hero.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeHero({ t, lang }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
          {t.heroTitle}
        </h1>
        <p className="mt-6 text-lg opacity-80 md:text-xl">{t.heroSubtitle}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.ctaPrimary}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${lang}/services`}>{t.ctaSecondary}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
