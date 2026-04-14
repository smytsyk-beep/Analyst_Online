// components/home/social-proof.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy };

export default function HomeSocialProof({ t }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">{t.socialProofTitle}</h2>
        <p className="mt-2 text-omni-navy/70">{t.socialProofSubtitle}</p>

        <Card className="mt-8 rounded-lg border border-lime-accent/30 bg-lime-accent/5">
          <CardContent className="flex items-start gap-3 p-6">
            <Info size={18} className="mt-0.5 shrink-0 text-lime-accent" />
            <p className="text-sm leading-relaxed text-omni-navy/80">{t.socialProofNote}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
