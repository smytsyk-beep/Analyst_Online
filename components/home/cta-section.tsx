// components/home/cta-section.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeCtaSection({ t, lang }: Props) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Card className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/8 blur-[80px]" />
          </div>
          <CardContent className="p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold md:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-3 text-white/60">{t.ctaSubtitle}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-blue-500/20" asChild>
                <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                  {t.ctaTelegram}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/10 bg-white/[0.04] px-8 text-white/80 hover:bg-white/[0.08] hover:text-white"
                asChild
              >
                <a href="mailto:s.mytsyk@gmail.com">{t.ctaEmail}</a>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
                <Link href={`/${lang}/omnidash`}>{t.ctaOmniDash}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
