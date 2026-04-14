// components/home/flagship.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeFlagship({ t, lang }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Card className="overflow-hidden rounded-lg border-2 border-omni-blue bg-omni-blue/5 shadow-md transition-all duration-200 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Left: content */}
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 rounded-md bg-omni-blue/10 px-3 py-1 text-xs font-semibold text-omni-blue">
                  <span className="h-1.5 w-1.5 rounded-full bg-omni-blue" />
                  {t.flagshipBadge}
                </div>

                <h2 className="mt-4 text-2xl font-bold text-omni-navy md:text-3xl">
                  {t.flagshipTitle}
                </h2>
                <p className="mt-3 leading-relaxed text-omni-navy/70">{t.flagshipSubtitle}</p>

                <ul className="mt-6 space-y-2">
                  {t.flagshipBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-omni-navy/80">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-growth-green" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className="rounded-lg bg-omni-blue px-6 font-bold text-white shadow-md hover:bg-royal-blue"
                    asChild
                  >
                    <Link href={`/${lang}/omnidash`}>{t.flagshipCta}</Link>
                  </Button>
                </div>
              </div>

              {/* Right: mockup */}
              <div className="relative h-64 p-4 md:h-full md:p-6">
                <div className="relative h-full overflow-hidden rounded-md">
                  <Image
                    src="/images/omnidash/mockup-1.png"
                    alt="OmniDash dashboard preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
