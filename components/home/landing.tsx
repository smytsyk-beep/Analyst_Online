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
import AnimatedCounter from '@/components/shared/animated-counter';
import { BentoCard, BentoGrid, BentoVisual } from '@/components/shared/bento';
import HomeHeroDataScene from '@/components/home/hero-data-scene';

type Props = {
  t: HomeCopy;
  lang: string;
};

const serviceIcons = [Bot, Workflow, FileSpreadsheet, BarChart3];

const serviceMedia = [
  {
    src: '/images/home/service-ai-training.png',
    alt: 'AI training workspace preview',
  },
  {
    src: '/images/home/service-ai-automation.png',
    alt: 'AI automation workflow preview',
  },
  {
    src: '/images/home/service-spreadsheets.png',
    alt: 'Spreadsheet analytics preview',
  },
  {
    src: '/images/home/service-analyst.png',
    alt: 'Part-time analyst dashboard preview',
  },
];

const exampleMedia = [
  {
    src: '/images/home/example-report-notifications.png',
    alt: 'Automated report notifications preview',
  },
  {
    src: '/images/home/example-document-templates.png',
    alt: 'Document template automation preview',
  },
  {
    src: '/images/home/example-dashboard-analytics.png',
    alt: 'Dashboard analytics preview',
  },
];

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
    <div className="relative z-10 overflow-hidden">
      <section className="relative isolate border-b border-border/70 bg-background/10 py-16 backdrop-blur-[2px] md:py-24">
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-xl">
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
            <HomeHeroDataScene />
            <div className="grid gap-3 sm:grid-cols-3">
              {t.signalCards.map((card) => (
                <div key={card.value} className="glass-card rounded-lg p-4">
                  <AnimatedCounter
                    value={card.value}
                    className="text-lg font-extrabold text-primary"
                  />
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
              <Card key={pain.title} className="glass-card rounded-lg">
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

      <section className="border-y border-border/70 bg-muted/20 py-16 md:py-24">
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
          <BentoGrid className="mt-8 md:grid-cols-2 lg:grid-cols-2">
            {t.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? BarChart3;
              const media = serviceMedia[index] ?? serviceMedia[serviceMedia.length - 1];

              return (
                <BentoCard key={service.title} className="h-full">
                  <div className="flex h-full flex-col">
                    <BentoVisual className="aspect-[16/9]">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </BentoVisual>
                    <div className="mt-5 flex flex-1 flex-col px-1 pb-2">
                      <div className="flex items-center gap-2">
                        <Icon size={20} className="shrink-0 text-primary" />
                        <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                      </div>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                        {service.description}
                      </p>
                      <div className="mt-5">
                        <Button variant="ghost" size="sm" className="px-0 font-semibold" asChild>
                          <Link
                            href={service.href ? `/${lang}${service.href}` : `/${lang}/services`}
                          >
                            <ArrowRight size={16} />
                            {t.servicesLinkAll}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              );
            })}
          </BentoGrid>
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
          <Card className="glass-card rounded-lg p-4">
            <CardContent className="p-0">
              <BentoVisual className="aspect-[3/2]">
                <Image
                  src="/images/home/training-ai-workshop.png"
                  alt="Online AI training workspace preview"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </BentoVisual>
              <ul className="mt-6 space-y-4 px-2 pb-2 md:px-4 md:pb-4">
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

      <section className="border-y border-border/70 bg-muted/20 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.examplesTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.examplesSubtitle}</p>
          </div>
          <BentoGrid className="mt-8 md:grid-cols-3 lg:grid-cols-3">
            {t.examples.map((example, index) => {
              const media = exampleMedia[index] ?? exampleMedia[exampleMedia.length - 1];

              return (
                <BentoCard key={example.title} className="h-full">
                  <div className="flex h-full flex-col">
                    <BentoVisual className="aspect-[16/9]">
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </BentoVisual>
                    <div className="mt-5 px-1 pb-2">
                      <h3 className="text-xl font-bold text-foreground">{example.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                        {example.text}
                      </p>
                    </div>
                  </div>
                </BentoCard>
              );
            })}
          </BentoGrid>
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
              <div key={step.step} className="glass-card rounded-lg p-6">
                <div className="text-sm font-extrabold text-primary">{step.step}</div>
                <h3 className="mt-3 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/20 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.proofTitle}</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{t.proofSubtitle}</p>
          </div>
          <div className="glass-card relative overflow-hidden rounded-lg border-lime-accent/30 p-6">
            <Image
              src="/images/home/service-analyst.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-[0.08]"
            />
            <div className="relative text-sm leading-relaxed text-foreground/80">{t.proofTodo}</div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-8 space-y-4">
            {t.faqs.map((faq) => (
              <Card key={faq.q} className="glass-card rounded-lg">
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
          <div className="glass-card relative overflow-hidden rounded-lg p-8 text-center md:p-12">
            <Image
              src="/images/home/hero-ai-analytics.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-right opacity-[0.06]"
            />
            <div className="relative">
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
        </div>
      </section>
    </div>
  );
}
