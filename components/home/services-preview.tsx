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
            <h2 className="text-3xl font-bold">{t.servicesTitle}</h2>
            <p className="mt-2 text-white/60">{t.servicesSubtitle}</p>
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
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.055] hover:shadow-[0_0_40px_rgba(59,130,246,0.05)]"
            >
              <CardContent className="p-6">
                <div className="font-semibold text-white">{service.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{service.description}</p>
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
