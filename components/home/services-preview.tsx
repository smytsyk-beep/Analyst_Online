// components/home/services-preview.tsx
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { HomeCopy } from '@/content/home.copy';

type Props = { t: HomeCopy; lang: string };

export default function HomeServicesPreview({ t, lang }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.servicesTitle}</h2>
            <p className="mt-2 text-foreground/70">{t.servicesSubtitle}</p>
          </div>
          <Link
            href={`/${lang}/services`}
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:text-primary md:flex"
          >
            {t.servicesLinkAll}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map((service) => (
            <Card
              key={service.title}
              className="rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="font-bold text-foreground">{service.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href={`/${lang}/services`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary"
          >
            {t.servicesLinkAll}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
