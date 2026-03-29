// app/[lang]/blog/page.tsx
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { sanityClient } from '@/sanity/client';
import { blogListQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import PostCard from '@/components/blog/post-card';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Locale, string> = {
    ru: 'Блог — Analyst Online',
    ua: 'Блог — Analyst Online',
    ro: 'Blog — Analyst Online',
  };

  const descriptions: Record<Locale, string> = {
    ru: 'Статьи об аналитике, дашбордах и автоматизации для бизнеса.',
    ua: 'Статті про аналітику, дашборди та автоматизацію для бізнесу.',
    ro: 'Articole despre analytics, dashboard-uri și automatizare pentru business.',
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
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

  const labels: Record<Locale, { title: string; subtitle: string; empty: string }> = {
    ru: {
      title: 'Блог',
      subtitle: 'Статьи об аналитике, дашбордах и автоматизации для бизнеса.',
      empty: 'Статьи появятся здесь в ближайшее время.',
    },
    ua: {
      title: 'Блог',
      subtitle: 'Статті про аналітику, дашборди та автоматизацію для бізнесу.',
      empty: "Статті з'являться тут найближчим часом.",
    },
    ro: {
      title: 'Blog',
      subtitle: 'Articole despre analytics, dashboard-uri și automatizare pentru business.',
      empty: 'Articolele vor apărea aici în curând.',
    },
  };

  const l = labels[lang];

  // Fetch blog posts from CMS
  let posts = null;
  if (isSanityConfigured()) {
    try {
      posts = await sanityClient.fetch(
        blogListQuery,
        { locale: lang },
        { next: { tags: ['blogPost'] } },
      );
    } catch (error) {
      console.warn('Failed to fetch blog posts from Sanity CMS:', error);
    }
  }

  const hasPosts = posts && posts.length > 0;

  return (
    <div className="page space-y-12 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: l.title, href: `/${lang}/blog` },
        ])}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{l.title}</h1>
        <p className="mt-4 text-lg opacity-80">{l.subtitle}</p>
      </div>

      {/* Posts grid or empty state */}
      {hasPosts ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <PostCard key={post.slug.current} post={post} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-neutral-950/30 p-12 text-center">
          <p className="text-lg opacity-70">{l.empty}</p>
        </div>
      )}
    </div>
  );
}
