// components/home/social-proof.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy };

export default function HomeSocialProof({ t }: Props) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold">{t.socialProofTitle}</h2>
        <p className="mt-2 text-white/60">{t.socialProofSubtitle}</p>

        <Card className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] backdrop-blur-sm">
          <CardContent className="flex items-start gap-3 p-6">
            <Info size={18} className="mt-0.5 shrink-0 text-amber-400" />
            <p className="text-sm leading-relaxed text-amber-200/70">{t.socialProofNote}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
