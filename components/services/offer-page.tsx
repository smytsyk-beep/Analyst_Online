import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { OfferPageCopy } from '@/content/offer-pages.copy';
import { siteCopy } from '@/content/site.copy';
import type { Locale } from '@/lib/i18n';

type Props = {
  t: OfferPageCopy;
  lang: string;
};

function purposeFromCta(label: string) {
  const value = label.toLowerCase();
  if (value.includes('стоимость') || value.includes('варт') || value.includes('cost')) {
    return 'price';
  }
  if (value.includes('вопрос') || value.includes('питан') || value.includes('întrebare')) {
    return 'question';
  }
  return 'consultation';
}

export default function OfferPage({ t, lang }: Props) {
  const site = siteCopy[lang as Locale];
  const hasWhy = t.whyTitle || t.why.length > 0;
  const hasProcess = t.processTitle || t.process.length > 0;
  const hasFaqs = t.faqTitle || t.faqs.length > 0;

  return (
    <div>
      <section className="border-b border-border bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              {t.badge}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl">
              {t.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-bold" asChild>
                <Link href={`/${lang}/contact?purpose=${purposeFromCta(t.ctaPrimary)}`}>
                  {t.ctaPrimary}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold" asChild>
                <Link href={`/${lang}/contact?purpose=${purposeFromCta(t.ctaSecondary)}`}>
                  {t.ctaSecondary}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{t.includedTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.intro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.included.map((item) => (
              <Card key={item} className="rounded-lg border border-border bg-card shadow-sm">
                <CardContent className="flex gap-3 p-5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-growth-green" />
                  <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {hasWhy ? (
        <section className="border-y border-border bg-card py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {t.whyTitle ? (
              <h2 className="text-3xl font-bold text-foreground">{t.whyTitle}</h2>
            ) : null}
            {t.why.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {t.why.map((item) => (
                  <div key={item} className="rounded-lg border border-border bg-background p-5">
                    <p className="text-sm leading-relaxed text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasProcess ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {t.processTitle ? (
              <h2 className="text-3xl font-bold text-foreground">{t.processTitle}</h2>
            ) : null}
            {t.process.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-4">
                {t.process.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-lg border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="text-sm font-extrabold text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasFaqs ? (
        <section className="border-y border-border bg-card py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {t.faqTitle ? (
              <h2 className="text-3xl font-bold text-foreground">{t.faqTitle}</h2>
            ) : null}
            {t.faqs.length > 0 ? (
              <div className="mt-8 space-y-4">
                {t.faqs.map((faq) => (
                  <Card
                    key={faq.q}
                    className="rounded-lg border border-border bg-background shadow-sm"
                  >
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground">{faq.q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm md:p-12">
            <h2 className="text-3xl font-bold text-foreground">{t.description}</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button className="font-bold" asChild>
                <Link href={`/${lang}/contact?purpose=${purposeFromCta(t.ctaPrimary)}`}>
                  {t.ctaPrimary}
                </Link>
              </Button>
              <Button variant="ghost" className="font-semibold" asChild>
                <Link href={`/${lang}/services`}>
                  <ArrowRight size={16} />
                  {site.nav.services}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
