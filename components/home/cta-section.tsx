// components/home/cta-section.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeCtaSection({ t, lang }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Card className="rounded-lg border border-grid-divider bg-white shadow-sm">
          <CardContent className="p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-3 text-omni-navy/70">{t.ctaSubtitle}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="rounded-lg bg-omni-blue px-8 font-bold text-white shadow-md hover:bg-royal-blue"
                asChild
              >
                <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                  {t.ctaTelegram}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg border-2 border-omni-blue px-8 font-bold text-omni-blue hover:bg-omni-blue hover:text-white"
                asChild
              >
                <a href="mailto:s.mytsyk@gmail.com">{t.ctaEmail}</a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-lg px-8 font-semibold text-omni-blue hover:bg-omni-blue/10"
                asChild
              >
                <Link href={`/${lang}/omnidash`}>{t.ctaOmniDash}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
