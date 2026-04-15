// components/omnidash/hero.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy; lang: string };

export default function OmniDashHero({ t, lang }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t.heroBadge}
        </div>

        {/* Title */}
        <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[3.75rem] md:leading-[1.1]">
          {t.heroTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground/70">{t.heroSubtitle}</p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="px-8 font-bold" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.heroCtaPrimary}
            </a>
          </Button>
          <Button size="lg" variant="outline" className="px-8 font-bold" asChild>
            <Link href={`/${lang}/cases`}>{t.heroCtaSecondary}</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap gap-8">
          {t.heroStats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              {i > 0 && <div className="h-8 w-px bg-border" />}
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="mt-0.5 text-sm text-foreground/60">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="mt-14 overflow-hidden rounded-lg border border-border bg-card p-4">
          <div className="overflow-hidden rounded-md">
            <Image
              src="/images/omnidash/mockup-1.png"
              alt="OmniDash — business analytics dashboard"
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
