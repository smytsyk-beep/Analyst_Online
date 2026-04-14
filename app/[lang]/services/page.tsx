// app/[lang]/services/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { servicesCopy } from '@/content/services.copy';
import { sanityClient } from '@/sanity/client';
import { servicesQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };
type CmsService = {
  slug: { current: string };
  title: string;
  description: string;
  bullets?: string[];
  cta?: string;
  featured?: boolean;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = servicesCopy[lang];

  const titles: Record<Locale, string> = {
    ru: 'Услуги — Analyst Online',
    ua: 'Послуги — Analyst Online',
    ro: 'Servicii — Analyst Online',
  };

  return {
    title: titles[lang],
    description: t.pageSubtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/services`,
      languages: {
        uk: '/ua/services',
        ru: '/ru/services',
        ro: '/ro/services',
      },
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;

  // Fetch services from CMS
  let cmsServices: CmsService[] | null = null;
  if (isSanityConfigured()) {
    try {
      cmsServices = await sanityClient.fetch<CmsService[]>(
        servicesQuery,
        { locale: lang },
        { next: { tags: ['service'] } },
      );
    } catch (error) {
      console.warn('Failed to fetch services from Sanity CMS, using fallback:', error);
    }
  }

  // Use CMS data if available, otherwise fallback to .copy.ts
  const t = servicesCopy[lang];
  const services =
    cmsServices && cmsServices.length > 0
      ? cmsServices.map((s) => ({
          id: s.slug.current,
          title: s.title,
          description: s.description,
          bullets: s.bullets || [],
          cta: s.cta || t.ctaPrimary,
          highlighted: s.featured || false,
        }))
      : t.services;

  return (
    <div className="page space-y-16 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: t.pageTitle, href: `/${lang}/services` },
        ])}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg text-white/60">{t.pageSubtitle}</p>
      </div>

      {/* Services grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service: (typeof t.services)[0]) => (
          <Card
            key={service.id}
            className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
              service.highlighted
                ? 'border-blue-500/25 bg-blue-500/[0.06] hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.08)]'
                : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.05]'
            }`}
          >
            <CardContent className="p-6 md:p-8 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold">{service.title}</h2>
                {service.highlighted && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    Flagship
                  </Badge>
                )}
              </div>
              <p className="leading-relaxed opacity-70">{service.description}</p>
              <ul className="space-y-1.5">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm opacity-80">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                {service.id === 'omnidash' ? (
                  <Button asChild size="sm">
                    <Link href={`/${lang}/omnidash`}>{service.cta}</Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
                      {service.cta}
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold">{t.ctaTitle}</h3>
        <p className="text-white/60">{t.ctaSubtitle}</p>
        <Button className="rounded-full px-8 shadow-lg shadow-blue-500/20" asChild>
          <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
            {t.ctaPrimary}
          </a>
        </Button>
      </div>
    </div>
  );
}
