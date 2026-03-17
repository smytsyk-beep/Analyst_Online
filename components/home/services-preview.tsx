// components/home/services-preview.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeServicesPreview({ t, lang }: Props) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold">{t.servicesTitle}</h2>
            <p className="mt-2 opacity-80">{t.servicesSubtitle}</p>
          </div>
          <Link
            href={`/${lang}/services`}
            className="hidden items-center gap-1 text-sm text-blue-400 hover:underline md:flex"
          >
            {t.servicesLinkAll}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map((service) => (
            <Card
              key={service.title}
              className="rounded-2xl border border-white/10 bg-neutral-950/30 transition-colors hover:border-white/20 hover:bg-neutral-950/50"
            >
              <CardContent className="p-6">
                <div className="font-semibold">{service.title}</div>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline"
          >
            {t.servicesLinkAll}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
