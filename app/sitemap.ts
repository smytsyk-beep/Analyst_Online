// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { sanityClient } from '@/sanity/client';
import { allBlogPostsForSitemapQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';

const BASE_URL = 'https://analyst-online.com';

const PAGES = ['', '/omnidash', '/services', '/contact', '/cases', '/privacy', '/blog'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const lang of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/omnidash' ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l === 'ua' ? 'uk' : l, `${BASE_URL}/${l}${page}`]),
          ),
        },
      });
    }
  }

  // Add blog posts from CMS
  if (isSanityConfigured()) {
    try {
      const posts = await sanityClient.fetch(allBlogPostsForSitemapQuery);
      for (const post of posts) {
        entries.push({
          url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt || post.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    } catch (error) {
      console.error('Failed to fetch blog posts for sitemap:', error);
    }
  }

  return entries;
}
