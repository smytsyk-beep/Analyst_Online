// app/[lang]/services/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { servicesCopy, type Service, type ServicesCopy } from '@/content/services.copy';
import { sanityClient } from '@/sanity/client';
import { pageByPathQuery, servicesQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { parseJsonPageContent, sanityFetchOptions } from '@/sanity/fetch';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import type { ContactPurpose } from '@/content/site.copy';
import { cn } from '@/lib/utils';
import { BentoGrid } from '@/components/shared/bento';
import type { SanityImageValue } from '@/sanity/image';
import { socialPreviewMetadata } from '@/lib/seo-metadata';

type Props = { params: Promise<{ lang: Locale }> };

type CmsService = {
  slug?: { current?: string };
  title?: string;
  description?: string;
  bullets?: string[];
  cta?: string;
  href?: string;
  featured?: boolean;
  highlighted?: boolean;
};

type CmsServicesPage = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: SanityImageValue;
  content?: unknown;
  cta?: {
    primary?: string;
    secondary?: string;
  };
};

type ServicesPageContent = Partial<Omit<ServicesCopy, 'services'>>;

const primaryServiceIds = new Set([
  'ai-training',
  'ai-business',
  'ai-automation',
  'ai-sheets-excel',
]);

const priorityLabel: Record<Locale, string> = {
  ru: 'Приоритет',
  ua: 'Пріоритет',
  ro: 'Prioritar',
};

function mergeServicesPageCopy(lang: Locale, cmsPage: CmsServicesPage | null): ServicesCopy {
  const fallback = servicesCopy[lang];
  const content = parseJsonPageContent<ServicesPageContent>(
    cmsPage?.content,
    `services page (${lang})`,
  );

  return {
    ...fallback,
    heroBadge: content?.heroBadge ?? fallback.heroBadge,
    pageTitle: content?.pageTitle ?? cmsPage?.title ?? fallback.pageTitle,
    pageSubtitle: content?.pageSubtitle ?? cmsPage?.description ?? fallback.pageSubtitle,
    heroPrimaryCta: content?.heroPrimaryCta ?? cmsPage?.cta?.primary ?? fallback.heroPrimaryCta,
    heroSecondaryCta:
      content?.heroSecondaryCta ?? cmsPage?.cta?.secondary ?? fallback.heroSecondaryCta,
    primarySectionTitle: content?.primarySectionTitle ?? fallback.primarySectionTitle,
    primarySectionSubtitle: content?.primarySectionSubtitle ?? fallback.primarySectionSubtitle,
    supportSectionTitle: content?.supportSectionTitle ?? fallback.supportSectionTitle,
    supportSectionSubtitle: content?.supportSectionSubtitle ?? fallback.supportSectionSubtitle,
    ctaTitle: content?.ctaTitle ?? fallback.ctaTitle,
    ctaSubtitle: content?.ctaSubtitle ?? fallback.ctaSubtitle,
    ctaPrimary: content?.ctaPrimary ?? fallback.ctaPrimary,
  };
}

async function loadServicesPageDoc(lang: Locale) {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<CmsServicesPage | null>(
      pageByPathQuery,
      { locale: lang, path: 'services' },
      sanityFetchOptions('page'),
    );
  } catch (error) {
    console.warn('Failed to fetch services page from Sanity CMS, using fallback:', error);
    return null;
  }
}

async function loadCmsServices(lang: Locale) {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<CmsService[]>(
      servicesQuery,
      { locale: lang },
      sanityFetchOptions('service'),
    );
  } catch (error) {
    console.warn('Failed to fetch services from Sanity CMS, using fallback:', error);
    return null;
  }
}

function mergeCmsServices(cmsServices: CmsService[] | null, fallbackServices: Service[]) {
  if (!cmsServices || cmsServices.length === 0) return fallbackServices;

  const cmsBySlug = new Map(
    cmsServices
      .map((service) => [service.slug?.current, service] as const)
      .filter(([slug]) => Boolean(slug)),
  );

  return fallbackServices.map((fallback) => {
    const cms = cmsBySlug.get(fallback.id);
    if (!cms) return fallback;

    return {
      ...fallback,
      title: cms.title ?? fallback.title,
      description: cms.description ?? fallback.description,
      bullets: cms.bullets && cms.bullets.length > 0 ? cms.bullets : fallback.bullets,
      cta: cms.cta ?? fallback.cta,
      href: cms.href ?? fallback.href,
      highlighted: cms.highlighted ?? cms.featured ?? fallback.highlighted,
    };
  });
}

function purposeForService(id: string): ContactPurpose {
  if (id === 'ai-automation' || id === 'dashboards-reports') return 'price';
  if (id === 'apps-script') return 'question';
  return 'consultation';
}

function hrefForService(lang: Locale, service: Service) {
  if (!service.href) return `/${lang}/contact?purpose=${purposeForService(service.id)}`;
  if (/^https?:\/\//.test(service.href)) return service.href;
  if (service.href.startsWith(`/${lang}/`)) return service.href;

  const normalizedHref = service.href.startsWith('/') ? service.href : `/${service.href}`;
  return `/${lang}${normalizedHref}`;
}

async function loadServicesPage(lang: Locale) {
  const [cmsPage, cmsServices] = await Promise.all([
    loadServicesPageDoc(lang),
    loadCmsServices(lang),
  ]);
  const pageCopy = mergeServicesPageCopy(lang, cmsPage);

  return {
    pageCopy,
    services: mergeCmsServices(cmsServices, pageCopy.services),
    seoTitle: cmsPage?.seoTitle,
    seoDescription: cmsPage?.seoDescription,
    socialImage: cmsPage?.socialImage,
  };
}

function ServiceCard({
  lang,
  service,
  compact = false,
  className,
}: {
  lang: Locale;
  service: Service;
  compact?: boolean;
  className?: string;
}) {
  const href = hrefForService(lang, service);

  return (
    <Card
      className={cn(
        'glass-card h-full rounded-lg transition-colors',
        service.highlighted
          ? 'border-primary/40 bg-primary/10'
          : 'border-border hover:border-primary/25',
        className,
      )}
    >
      <CardContent className={cn('flex h-full flex-col gap-4 p-6', compact ? 'md:p-6' : 'md:p-8')}>
        <div className="flex items-start justify-between gap-3">
          <h3 className={cn('font-bold text-foreground', compact ? 'text-lg' : 'text-xl')}>
            {service.title}
          </h3>
          {service.highlighted ? (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {priorityLabel[lang]}
            </Badge>
          ) : null}
        </div>

        <p className="leading-relaxed text-foreground/70">{service.description}</p>

        <ul className="space-y-2">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/80">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-growth-green" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Button
            className="font-bold"
            variant={service.href ? 'default' : 'outline'}
            size="sm"
            asChild
          >
            <Link href={href}>
              {service.cta}
              <ArrowRight size={15} />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { pageCopy, seoTitle, seoDescription, socialImage } = await loadServicesPage(lang);
  const title = seoTitle ?? `${pageCopy.pageTitle} — Analyst Online`;
  const description = seoDescription ?? pageCopy.pageSubtitle;

  return {
    title,
    description,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/services`,
      languages: {
        uk: '/ua/services',
        ru: '/ru/services',
        ro: '/ro/services',
      },
    },
    ...socialPreviewMetadata({
      title,
      description,
      url: `https://analyst-online.com/${lang}/services`,
      locale: lang,
      image: socialImage,
      imageAlt: pageCopy.pageTitle,
    }),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  const { pageCopy, services } = await loadServicesPage(lang);
  const primaryServices = services.filter((service) => primaryServiceIds.has(service.id));
  const supportServices = services.filter((service) => !primaryServiceIds.has(service.id));

  return (
    <div>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: pageCopy.pageTitle, href: `/${lang}/services` },
        ])}
      />

      <section className="relative isolate border-b border-border/70 bg-background/10 py-16 backdrop-blur-[2px] md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:items-end">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-xl">
              <Sparkles size={14} />
              {pageCopy.heroBadge}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-foreground md:text-6xl">
              {pageCopy.pageTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl">
              {pageCopy.pageSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryServices[0] ? (
                <Button
                  size="lg"
                  className="font-bold hover:bg-primary hover:text-primary-foreground hover:shadow-lg focus-visible:bg-primary focus-visible:text-primary-foreground"
                  asChild
                >
                  <Link href={hrefForService(lang, primaryServices[0])}>
                    {pageCopy.heroPrimaryCta}
                    <ArrowRight size={17} />
                  </Link>
                </Button>
              ) : null}
              <Button
                size="lg"
                variant="outline"
                className="font-bold hover:bg-primary hover:text-primary-foreground hover:shadow-lg focus-visible:bg-primary focus-visible:text-primary-foreground"
                asChild
              >
                <Link href="#directions">{pageCopy.heroSecondaryCta}</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {primaryServices.map((service) => (
              <Link
                key={service.id}
                href={hrefForService(lang, service)}
                className="glass-card group rounded-lg p-4 transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-foreground transition-colors group-hover:text-primary-foreground group-focus-visible:text-primary-foreground">
                    {service.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-primary transition-all group-hover:translate-x-0.5 group-hover:text-primary-foreground group-focus-visible:text-primary-foreground"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="directions" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {pageCopy.primarySectionTitle}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/70">
              {pageCopy.primarySectionSubtitle}
            </p>
          </div>

          <BentoGrid className="mt-8 md:grid-cols-2 lg:grid-cols-2">
            {primaryServices.map((service) => (
              <ServiceCard key={service.id} lang={lang} service={service} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {supportServices.length > 0 ? (
        <section className="border-y border-border/70 bg-muted/20 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                {pageCopy.supportSectionTitle}
              </h2>
              <p className="mt-3 leading-relaxed text-foreground/70">
                {pageCopy.supportSectionSubtitle}
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {supportServices.map((service) => (
                <ServiceCard key={service.id} lang={lang} service={service} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-foreground">{pageCopy.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-foreground/70">
            {pageCopy.ctaSubtitle}
          </p>
          <div className="mt-8">
            <Button size="lg" className="font-bold" asChild>
              <Link href={`/${lang}/contact?purpose=consultation`}>
                {pageCopy.ctaPrimary}
                <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
