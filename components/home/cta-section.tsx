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
        <Card className="rounded-3xl border border-white/10 bg-neutral-950/30">
          <CardContent className="p-8 text-center md:p-12">
            <h2 className="text-3xl font-semibold">{t.ctaTitle}</h2>
            <p className="mt-3 opacity-80">{t.ctaSubtitle}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                  {t.ctaTelegram}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:s.mytsyk@gmail.com">{t.ctaEmail}</a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href={`/${lang}/omnidash`}>{t.ctaOmniDash}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
