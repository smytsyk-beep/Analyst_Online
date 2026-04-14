// components/home/hero.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeHero({ t, lang }: Props) {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Ambient glow layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Primary blue glow — center top */}
        <div className="absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        {/* Secondary purple glow — right */}
        <div className="absolute right-1/4 top-1/3 h-[360px] w-[360px] rounded-full bg-purple-600/6 blur-[100px]" />
        {/* Tertiary cyan glow — left */}
        <div className="absolute left-1/4 top-1/2 h-[280px] w-[280px] rounded-full bg-cyan-500/5 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          OmniDash — flagship product
        </div>

        {/* Gradient headline */}
        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-[4.25rem] md:leading-[1.1]">
          <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
            {t.heroTitle}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/55 md:text-xl">
          {t.heroSubtitle}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            className="rounded-full px-8 shadow-lg shadow-blue-500/20"
            asChild
          >
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              {t.ctaPrimary}
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/10 bg-white/[0.04] px-8 text-white/80 backdrop-blur-sm hover:bg-white/[0.08] hover:text-white"
            asChild
          >
            <Link href={`/${lang}/services`}>{t.ctaSecondary}</Link>
          </Button>
        </div>

        {/* Subtle bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050709]/60 to-transparent" />
      </div>
    </section>
  );
}
