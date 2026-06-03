import { createClient } from '@sanity/client';
import { homeCopy } from '../content/home.copy';
import { servicesCopy } from '../content/services.copy';
import { contactCopy } from '../content/contact.copy';
import { privacyCopy } from '../content/privacy.copy';
import { casesCopy } from '../content/cases.copy';
import { omniDashCopy } from '../content/omnidash.copy';
import { offerPages } from '../content/offer-pages.copy';
import type { Locale } from '../lib/i18n';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const locales: Locale[] = ['ru', 'ua', 'ro'];

type PageSeed = {
  slug: string;
  locale: Locale;
  title: string;
  description?: string;
  routePath: string;
  pageType: string;
  status: 'published';
  seoTitle?: string;
  seoDescription?: string;
  content?: { data: string };
};

type ExistingPage = {
  _id: string;
  slug?: { current?: string };
  title?: string | null;
  description?: string | null;
  routePath?: string | null;
  pageType?: string | null;
  status?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  content?: unknown;
};

const blogCopy: Record<Locale, { title: string; description: string }> = {
  ru: {
    title: 'Блог',
    description: 'Статьи об AI, аналитике, автоматизации, отчётах и дашбордах для бизнеса.',
  },
  ua: {
    title: 'Блог',
    description: 'Статті про AI, аналітику, автоматизацію, звіти й дашборди для бізнесу.',
  },
  ro: {
    title: 'Blog',
    description:
      'Articole despre AI, analytics, automatizare, rapoarte și dashboard-uri pentru business.',
  },
};

const omnidashMeta: Record<Locale, { title: string; description: string }> = {
  ru: {
    title: 'OmniDash',
    description:
      'Готовая система аналитики для малого e-commerce. Реклама, продажи и расходы в одном дашборде.',
  },
  ua: {
    title: 'OmniDash',
    description:
      'Готова система аналітики для малого e-commerce. Реклама, продажі та витрати в одному дашборді.',
  },
  ro: {
    title: 'OmniDash',
    description:
      'Sistem gata de analytics pentru e-commerce mic. Reclamă, vânzări și cheltuieli într-un singur dashboard.',
  },
};

function jsonContent(value: unknown) {
  return { data: JSON.stringify(value, null, 2) };
}

function slugFromPath(path: string) {
  return path.split('/').at(-1) ?? path;
}

function isBlank(value: unknown) {
  return value === undefined || value === null || value === '';
}

function standardPages(locale: Locale): PageSeed[] {
  const home = homeCopy[locale];
  const services = servicesCopy[locale];
  const contact = contactCopy[locale];
  const privacy = privacyCopy[locale];
  const cases = casesCopy[locale];
  const blog = blogCopy[locale];
  const omnidash = omnidashMeta[locale];

  return [
    {
      slug: 'home',
      locale,
      title: home.heroTitle,
      description: home.heroSubtitle,
      routePath: '',
      pageType: 'home',
      status: 'published',
      seoTitle: home.metaTitle,
      seoDescription: home.heroSubtitle,
      content: jsonContent(home),
    },
    {
      slug: 'services',
      locale,
      title: services.pageTitle,
      description: services.pageSubtitle,
      routePath: 'services',
      pageType: 'services',
      status: 'published',
      seoTitle: `${services.pageTitle} — Analyst Online`,
      seoDescription: services.pageSubtitle,
    },
    {
      slug: 'blog',
      locale,
      title: blog.title,
      description: blog.description,
      routePath: 'blog',
      pageType: 'blog',
      status: 'published',
      seoTitle: `${blog.title} — Analyst Online`,
      seoDescription: blog.description,
    },
    {
      slug: 'omnidash',
      locale,
      title: omnidash.title,
      description: omnidash.description,
      routePath: 'omnidash',
      pageType: 'omnidash',
      status: 'published',
      seoTitle: `OmniDash — Analyst Online`,
      seoDescription: omnidash.description,
      content: jsonContent({
        heroTitle: omniDashCopy[locale].heroTitle,
        heroSubtitle: omniDashCopy[locale].heroSubtitle,
      }),
    },
    {
      slug: 'contact',
      locale,
      title: contact.pageTitle,
      description: contact.pageSubtitle,
      routePath: 'contact',
      pageType: 'contact',
      status: 'published',
    },
    {
      slug: 'privacy',
      locale,
      title: privacy.pageTitle,
      description: privacy.pageSubtitle,
      routePath: 'privacy',
      pageType: 'privacy',
      status: 'published',
      content: jsonContent(privacy),
    },
    {
      slug: 'cases',
      locale,
      title: cases.pageTitle,
      description: cases.pageSubtitle,
      routePath: 'cases',
      pageType: 'cases',
      status: 'published',
      content: jsonContent(cases),
    },
  ];
}

function offerPageSeeds(locale: Locale): PageSeed[] {
  return Object.values(offerPages[locale]).map((page) => ({
    slug: slugFromPath(page.path),
    locale,
    title: page.title,
    description: page.description,
    routePath: page.path,
    pageType: 'offer',
    status: 'published',
    seoTitle: page.metaTitle,
    seoDescription: page.description,
    content: jsonContent(page),
  }));
}

function expectedPages() {
  return locales.flatMap((locale) => [...standardPages(locale), ...offerPageSeeds(locale)]);
}

async function findPage(seed: PageSeed) {
  return client.fetch<ExistingPage | null>(
    `*[_type == "page" && slug.current == $slug && locale == $locale][0]{
      _id,
      slug,
      title,
      description,
      routePath,
      pageType,
      status,
      seoTitle,
      seoDescription,
      content
    }`,
    { slug: seed.slug, locale: seed.locale },
  );
}

async function createPage(seed: PageSeed) {
  await client.create({
    _type: 'page',
    slug: { _type: 'slug', current: seed.slug },
    locale: seed.locale,
    title: seed.title,
    description: seed.description,
    routePath: seed.routePath,
    pageType: seed.pageType,
    status: seed.status,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    content: seed.content,
  });
}

async function patchMissingFields(existing: ExistingPage, seed: PageSeed) {
  const patch: Record<string, unknown> = {};

  if (isBlank(existing.slug?.current)) patch.slug = { _type: 'slug', current: seed.slug };
  if (isBlank(existing.title)) patch.title = seed.title;
  if (isBlank(existing.description) && seed.description) patch.description = seed.description;
  if (isBlank(existing.routePath)) patch.routePath = seed.routePath;
  if (isBlank(existing.pageType)) patch.pageType = seed.pageType;
  if (isBlank(existing.status)) patch.status = seed.status;
  if (isBlank(existing.seoTitle) && seed.seoTitle) patch.seoTitle = seed.seoTitle;
  if (isBlank(existing.seoDescription) && seed.seoDescription) {
    patch.seoDescription = seed.seoDescription;
  }
  if (isBlank(existing.content) && seed.content) patch.content = seed.content;

  if (Object.keys(patch).length === 0) {
    return 'unchanged';
  }

  await client.patch(existing._id).set(patch).commit();
  return 'patched';
}

async function syncPageRegistry() {
  console.log('Syncing Sanity page registry...');
  console.log(`Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`);

  let created = 0;
  let patched = 0;
  let unchanged = 0;

  for (const seed of expectedPages()) {
    const existing = await findPage(seed);

    if (!existing) {
      await createPage(seed);
      created += 1;
      console.log(`Created page: ${seed.locale}/${seed.routePath || '(home)'}`);
      continue;
    }

    const result = await patchMissingFields(existing, seed);
    if (result === 'patched') {
      patched += 1;
      console.log(`Patched page metadata: ${seed.locale}/${seed.routePath || '(home)'}`);
    } else {
      unchanged += 1;
    }
  }

  console.log('');
  console.log(`Done. Created: ${created}, patched: ${patched}, unchanged: ${unchanged}`);
}

syncPageRegistry().catch((error) => {
  console.error('Page registry sync failed:', error);
  process.exit(1);
});
