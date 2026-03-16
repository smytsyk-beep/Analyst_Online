// app/[lang]/services/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { servicesCopy } from '@/content/services.copy';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };

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
  const t = servicesCopy[lang];

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
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg opacity-80">{t.pageSubtitle}</p>
      </div>

      {/* Services grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {t.services.map((service) => (
          <Card
            key={service.id}
            className={`rounded-2xl border transition-colors ${
              service.highlighted
                ? 'border-blue-500/30 bg-blue-950/10 hover:border-blue-500/50'
                : 'border-white/10 bg-neutral-950/30 hover:border-white/20'
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
        <h3 className="text-xl font-semibold">{t.ctaTitle}</h3>
        <p className="opacity-70">{t.ctaSubtitle}</p>
        <Button asChild>
          <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
            {t.ctaPrimary}
          </a>
        </Button>
      </div>
    </div>
  );
}
