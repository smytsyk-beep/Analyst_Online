// components/omnidash/hero.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { OmniDashCopy } from '@/content/omnidash.copy';

type Props = { t: OmniDashCopy; lang: string };

export default function OmniDashHero({ t, lang }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 md:pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
          {t.heroBadge}
        </div>

        {/* Title */}
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">{t.heroSubtitle}</p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.heroCtaPrimary}
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${lang}/cases`}>{t.heroCtaSecondary}</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap gap-8">
          {t.heroStats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="mt-0.5 text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
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
    </section>
  );
}
