// app/[lang]/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import type { PortableTextBlock } from '@portabletext/types';
import type { Locale } from '@/lib/i18n';
import { sanityClient } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { blogPostQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostHeader from '@/components/blog/post-header';
import BlogPortableText from '@/components/blog/portable-text';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import { groq } from 'next-sanity';

type Props = {
  params: Promise<{ lang: Locale; slug: string }>;
};

type BlogImageAsset = {
  _id?: string;
  _ref?: string;
  url?: string;
};

type BlogCoverImage = {
  asset?: BlogImageAsset;
  alt?: string;
};

type BlogPost = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: BlogCoverImage;
  body?: PortableTextBlock | PortableTextBlock[];
  publishedAt: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

type StaticBlogPostParam = {
  slug: string;
  locale: Locale;
};

function getCoverImageUrl(
  coverImage: BlogCoverImage | undefined,
  width: number,
  height: number,
): string | undefined {
  if (!coverImage) return undefined;

  if (coverImage.asset?.url) {
    return coverImage.asset.url;
  }

  if (!coverImage.asset?._id && !coverImage.asset?._ref) {
    return undefined;
  }

  try {
    return urlFor(coverImage).width(width).height(height).fit('crop').url();
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSanityConfigured()) {
    return {
      title: 'Blog Post',
    };
  }

  try {
    const post = await sanityClient.fetch<BlogPost | null>(blogPostQuery, { locale: lang, slug });

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || '';
    const ogImageUrl = getCoverImageUrl(post.coverImage, 1200, 630);

    return {
      title: `${title} — Analyst Online`,
      description,
      alternates: {
        canonical: `https://analyst-online.com/${lang}/blog/${slug}`,
        languages: {
          uk: `/ua/blog/${slug}`,
          ru: `/ru/blog/${slug}`,
          ro: `/ro/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: ['Analyst Online'],
        images: ogImageUrl
          ? [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : undefined,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata for blog post:', error);
    return {
      title: 'Blog Post',
    };
  }
}

export async function generateStaticParams(): Promise<{ lang: Locale; slug: string }[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  try {
    const posts = await sanityClient.fetch<StaticBlogPostParam[]>(
      groq`*[_type == "blogPost" && defined(slug.current) && defined(publishedAt)]{ "slug": slug.current, locale }`,
    );
    return posts.map((post) => ({ lang: post.locale, slug: post.slug }));
  } catch (error) {
    console.error('Failed to generate static params for blog:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;

  const labels: Record<Locale, { backToBlog: string; notFound: string; emptyBody: string }> = {
    ru: {
      backToBlog: '← Назад к блогу',
      notFound: 'Статья не найдена',
      emptyBody: 'Содержимое статьи пусто',
    },
    ua: {
      backToBlog: '← Назад до блогу',
      notFound: 'Статтю не знайдено',
      emptyBody: 'Вміст статті порожній',
    },
    ro: {
      backToBlog: '← Înapoi la blog',
      notFound: 'Articol negăsit',
      emptyBody: 'Conținutul articolului este gol',
    },
  };

  const l = labels[lang];

  if (!isSanityConfigured()) {
    notFound();
  }

  let post: BlogPost | null = null;
  try {
    post = await sanityClient.fetch<BlogPost | null>(
      blogPostQuery,
      { locale: lang, slug },
      { next: { tags: ['blogPost'] } },
    );
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
  }

  if (!post) {
    notFound();
  }

  const postBody = Array.isArray(post.body) ? post.body : post.body ? [post.body] : [];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Analyst Online',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Analyst Online',
      logo: {
        '@type': 'ImageObject',
        url: 'https://analyst-online.vercel.app/logo.svg',
      },
    },
  };

  return (
    <div className="page py-12">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: 'Blog', href: `/${lang}/blog` },
          { name: post.title, href: `/${lang}/blog/${slug}` },
        ])}
      />

      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {l.backToBlog}
        </Link>

        <PostHeader
          title={post.title}
          publishedAt={post.publishedAt}
          coverImage={post.coverImage}
          tags={post.tags}
          lang={lang}
        />

        {postBody.length > 0 ? (
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary">
            <BlogPortableText value={postBody} />
          </article>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <p className="text-foreground/70">{l.emptyBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}
