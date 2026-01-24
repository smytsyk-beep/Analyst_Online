// app/[lang]/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Locale } from '@/lib/i18n';
import { homeCopy } from '@/content/home.copy';

export const dynamicParams = false;

export default async function LangHome({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const t = homeCopy[lang];

  return (
    <div className="page space-y-16">
      {/* HERO */}
      <Card className="relative overflow-hidden rounded-3xl border bg-neutral-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
        <CardContent className="relative p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-80">
                {t.localeBadge}
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                {t.heroTitle}
              </h1>
              <p className="mt-4 text-lg opacity-80">{t.heroSubtitle}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button>{t.ctaPrimary}</Button>
                <Button variant="secondary">{t.ctaSecondary}</Button>
              </div>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
                {t.bullets.map((b) => (
                  <li key={b} className="list-disc ml-4">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* shadcn/ui demo card */}
            <Card className="rounded-2xl border bg-neutral-950/50">
              <CardContent className="p-6">
                <div className="text-sm font-semibold">{t.shadcnTitle}</div>
                <div className="mt-1 text-sm opacity-80">{t.shadcnSubtitle}</div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                  <Button size="sm" variant="outline">
                    Outline
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* SERVICES */}
      <section id="services" className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">{t.servicesTitle}</h2>
          <p className="mt-2 opacity-80">{t.servicesSubtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.services.map((s) => (
            <Card key={s.title} className="rounded-2xl border bg-neutral-950/30">
              <CardContent className="p-6">
                <div className="text-xl font-semibold">{s.title}</div>
                <ul className="mt-4 space-y-2 opacity-90">
                  {s.bullets.map((b) => (
                    <li key={b} className="list-disc ml-4">
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold">{t.casesTitle}</h2>
          <p className="mt-2 opacity-80">{t.casesSubtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {t.cases.map((c) => (
            <Card key={c.title} className="rounded-2xl border bg-neutral-950/30">
              <CardContent className="p-6">
                <div className="text-xl font-semibold">{c.title}</div>
                <p className="mt-2 opacity-80">{c.text}</p>
                <div className="mt-4 inline-flex rounded-full border px-3 py-1 text-xs opacity-80">
                  {c.badge}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Card className="rounded-3xl border bg-neutral-950/30">
          <CardContent className="p-8 md:p-10">
            <h2 className="text-3xl font-semibold">{t.contactTitle}</h2>
            <p className="mt-2 opacity-80">{t.contactSubtitle}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>{t.contactCtaTelegram}</Button>
              <Button variant="secondary">{t.contactCtaEmail}</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
