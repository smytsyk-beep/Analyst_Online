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
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Card className="overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent">
          <CardContent className="p-0">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Left: content */}
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                  {t.flagshipBadge}
                </div>

                <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{t.flagshipTitle}</h2>
                <p className="mt-3 leading-relaxed opacity-80">{t.flagshipSubtitle}</p>

                <ul className="mt-6 space-y-2">
                  {t.flagshipBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button asChild>
                    <Link href={`/${lang}/omnidash`}>{t.flagshipCta}</Link>
                  </Button>
                </div>
              </div>

              {/* Right: mockup */}
              <div className="relative h-64 md:h-full">
                <Image
                  src="/images/omnidash/mockup-1.png"
                  alt="OmniDash dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
