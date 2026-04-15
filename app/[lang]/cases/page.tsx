// app/[lang]/cases/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { casesCopy } from '@/content/cases.copy';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = casesCopy[lang];

  return {
    title: `${t.pageTitle} — Analyst Online`,
    description: t.pageSubtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/cases`,
      languages: {
        uk: '/ua/cases',
        ru: '/ru/cases',
        ro: '/ro/cases',
      },
    },
  };
}

export default async function CasesPage({ params }: Props) {
  const { lang } = await params;
  const t = casesCopy[lang];

  return (
    <div className="page space-y-16 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: t.pageTitle, href: `/${lang}/cases` },
        ])}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg text-foreground/70">{t.pageSubtitle}</p>
      </div>

      {/* Coming soon */}
      <Card className="rounded-lg border border-border bg-card">
        <CardContent className="p-8 text-center md:p-12">
          <div className="mx-auto max-w-lg space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-background">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold">{t.comingSoonTitle}</h2>
            <p className="leading-relaxed text-foreground/70">{t.comingSoonText}</p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-bold">{t.ctaTitle}</h3>
        <p className="text-foreground/70">{t.ctaText}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button className="px-6 font-bold" asChild>
            <a href="https://t.me/omnidash_ai" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} className="mr-2" />
              {t.ctaTelegram}
            </a>
          </Button>
          <Button variant="outline" className="px-6 font-semibold" asChild>
            <a href="mailto:s.mytsyk@gmail.com">
              <Mail size={16} className="mr-2" />
              {t.ctaEmail}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
