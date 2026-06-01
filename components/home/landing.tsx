import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileSpreadsheet,
  HelpCircle,
  MessageCircle,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { HomeCopy } from '@/content/home.copy';

type Props = {
  t: HomeCopy;
  lang: string;
};

const serviceIcons = [Bot, Workflow, FileSpreadsheet, BarChart3];

function contactHref(lang: string, purpose: 'price' | 'question' | 'consultation') {
  return `/${lang}/contact?purpose=${purpose}`;
}

function trainingHref(lang: string) {
  if (lang === 'ua') return `/${lang}/navchannia-ai`;
  if (lang === 'ro') return `/${lang}/curs-ai`;
  return `/${lang}/obuchenie-ai`;
}

export default function HomeLanding({ t, lang }: Props) {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border bg-background py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Bot size={14} />
              {t.heroBadge}
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-[4.25rem] md:leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70 md:text-xl">
              {t.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-bold" asChild>
                <Link href={contactHref(lang, 'consultation')}>
                  <MessageCircle size={18} />
                  {t.ctaConsultation}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold" asChild>
                <Link href={contactHref(lang, 'price')}>{t.ctaPrice}</Link>
              </Button>
              <Button size="lg" variant="ghost" className="font-semibold" asChild>
                <Link href={contactHref(lang, 'question')}>{t.ctaQuestion}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="rounded-lg border border-border bg-card p-4 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-md border border-border">
                  <Image
                    src="/images/omnidash/mockup-1.png"
                    alt="Dashboard and analytics preview"
                    width={1280}
                    height={720}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-3 sm:grid-cols-3">
              {t.signalCards.map((card) => (
                <div
                  key={card.value}
                  className="rounded-lg border border-border bg-card p-4 shadow-sm"
                >
                  <div className="text-lg font-extrabold text-primary">{card.value}</div>
                  <div className="mt-1 text-xs font-medium leading-relaxed text-foreground/60">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.audienceTitle}</h2>
            <p className="mt-3 text-lg leading-relaxed text-foreground/70">{t.audienceSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {t.pains.map((pain) => (
              <Card
                key={pain.title}
                className="rounded-lg border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
              >
                <CardContent className="p-6">
                  <HelpCircle size={22} className="text-primary" />
                  <h3 className="mt-4 text-xl font-bold text-foreground">{pain.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{pain.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.servicesTitle}</h2>
              <p className="mt-3 leading-relaxed text-foreground/70">{t.servicesSubtitle}</p>
            </div>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/90"
            >
              {t.servicesLinkAll}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? BarChart3;

              return (
                <Card
                  key={service.title}
                  className="rounded-lg border border-border bg-background shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md"
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <Icon size={22} className="text-primary" />
                    <h3 className="mt-4 text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                      {service.description}
                    </p>
                    <div className="mt-5">
                      <Button variant="ghost" size="sm" className="px-0 font-semibold" asChild>
                        <Link href={service.href ? `/${lang}${service.href}` : `/${lang}/services`}>
                          <ArrowRight size={16} />
                          {t.servicesLinkAll}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Bot size={14} />
              {t.trainingBadge}
            </div>
            <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
              {t.trainingTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.trainingSubtitle}</p>
            <div className="mt-6">
              <Button className="font-bold" asChild>
                <Link href={trainingHref(lang)}>{t.ctaConsultation}</Link>
              </Button>
            </div>
          </div>
          <Card className="rounded-lg border border-border bg-card shadow-sm">
            <CardContent className="p-6 md:p-8">
              <ul className="space-y-4">
                {t.trainingPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-growth-green" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.examplesTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.examplesSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {t.examples.map((example) => (
              <Card key={example.title} className="rounded-lg border border-border bg-background">
                <CardContent className="p-6">
                  <BarChart3 size={22} className="text-omni-cyan" />
                  <h3 className="mt-4 text-xl font-bold text-foreground">{example.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{example.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.processTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.processSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {t.process.map((step) => (
              <div
                key={step.step}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="text-sm font-extrabold text-primary">{step.step}</div>
                <h3 className="mt-3 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.proofTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.proofSubtitle}</p>
          </div>
          <div className="rounded-lg border border-lime-accent/30 bg-lime-accent/5 p-6 text-sm leading-relaxed text-foreground/80">
            {t.proofTodo}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 space-y-4">
            {t.faqs.map((faq) => (
              <Card key={faq.q} className="rounded-lg border border-border bg-card shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm md:p-12">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.finalTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-foreground/70">
              {t.finalSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button className="font-bold" asChild>
                <Link href={contactHref(lang, 'price')}>{t.ctaPrice}</Link>
              </Button>
              <Button variant="outline" className="font-bold" asChild>
                <Link href={contactHref(lang, 'question')}>{t.ctaQuestion}</Link>
              </Button>
              <Button variant="ghost" className="font-semibold" asChild>
                <Link href={contactHref(lang, 'consultation')}>{t.ctaConsultation}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
