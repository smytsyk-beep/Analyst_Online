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
        <div className="absolute left-1/2 top-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[130px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-600/7 blur-[100px]" />
        <div className="absolute left-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/5 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          {t.heroBadge}
        </div>

        {/* Title */}
        <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-[3.75rem] md:leading-[1.1]">
          <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
            {t.heroTitle}
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/55">{t.heroSubtitle}</p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="rounded-full px-8 shadow-lg shadow-blue-500/20" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.heroCtaPrimary}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/10 bg-white/[0.04] px-8 text-white/80 backdrop-blur-sm hover:bg-white/[0.08] hover:text-white"
            asChild
          >
            <Link href={`/${lang}/cases`}>{t.heroCtaSecondary}</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap gap-8">
          {t.heroStats.map((s, i) => (
            <div key={s.label} className="flex items-center gap-4">
              {i > 0 && <div className="h-8 w-px bg-white/10" />}
              <div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-0.5 text-sm text-white/45">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/70 ring-1 ring-white/[0.04]">
          <div className="bg-gradient-to-b from-blue-500/5 to-transparent p-px">
            <Image
              src="/images/omnidash/mockup-1.png"
              alt="OmniDash — business analytics dashboard"
              width={1200}
              height={675}
              className="w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
