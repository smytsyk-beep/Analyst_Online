// app/[lang]/blog/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { sanityClient } from '@/sanity/client';
import { blogListQuery, pageByPathQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import PostCard from '@/components/blog/post-card';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };

type BlogImageAsset = {
  _id?: string;
  _ref?: string;
  url?: string;
};

type BlogCoverImage = {
  asset?: BlogImageAsset;
  alt?: string;
};

type BlogListPost = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: BlogCoverImage;
  publishedAt: string;
  tags?: string[];
};

type CmsBlogPage = {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const blogLabels: Record<Locale, { title: string; subtitle: string; empty: string }> = {
  ru: {
    title: 'Блог',
    subtitle: 'Статьи об AI, аналитике, автоматизации, отчётах и дашбордах для бизнеса.',
    empty: 'Статьи появятся здесь в ближайшее время.',
  },
  ua: {
    title: 'Блог',
    subtitle: 'Статті про AI, аналітику, автоматизацію, звіти й дашборди для бізнесу.',
    empty: "Статті з'являться тут найближчим часом.",
  },
  ro: {
    title: 'Blog',
    subtitle:
      'Articole despre AI, analytics, automatizare, rapoarte și dashboard-uri pentru business.',
    empty: 'Articolele vor apărea aici în curând.',
  },
};

async function loadBlogPageDoc(lang: Locale) {
  if (!isSanityConfigured()) return null;

  try {
    return await sanityClient.fetch<CmsBlogPage | null>(
      pageByPathQuery,
      { locale: lang, path: 'blog' },
      { next: { tags: ['page'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch blog page from Sanity CMS, using fallback:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const cmsPage = await loadBlogPageDoc(lang);
  const l = blogLabels[lang];
  const title = cmsPage?.title ?? l.title;

  return {
    title: cmsPage?.seoTitle ?? `${title} — Analyst Online`,
    description: cmsPage?.seoDescription ?? cmsPage?.description ?? l.subtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/blog`,
      languages: {
        uk: '/ua/blog',
        ru: '/ru/blog',
        ro: '/ro/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  const fallbackLabels = blogLabels[lang];
  const cmsPage = await loadBlogPageDoc(lang);
  const l = {
    ...fallbackLabels,
    title: cmsPage?.title ?? fallbackLabels.title,
    subtitle: cmsPage?.description ?? fallbackLabels.subtitle,
  };

  // Fetch blog posts from CMS
  let posts: BlogListPost[] = [];
  if (isSanityConfigured()) {
    try {
      posts = await sanityClient.fetch<BlogListPost[]>(
        blogListQuery,
        { locale: lang },
        { next: { tags: ['blogPost'] } },
      );
    } catch (error) {
      console.warn('Failed to fetch blog posts from Sanity CMS:', error);
    }
  }

  const hasPosts = posts.length > 0;

  return (
    <div className="page relative z-10 space-y-12 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: l.title, href: `/${lang}/blog` },
        ])}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{l.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{l.subtitle}</p>
      </div>

      {/* Posts grid or empty state */}
      {hasPosts ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug.current} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-lg p-12 text-center">
          <p className="text-lg text-foreground/60">{l.empty}</p>
        </div>
      )}
    </div>
  );
}
