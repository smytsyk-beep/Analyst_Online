// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';
import { sanityClient } from '@/sanity/client';
import { allBlogPostsForSitemapQuery, allPagesForSitemapQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { sanityFetchOptions } from '@/sanity/fetch';
import { getAllOfferPages, getOfferAlternates } from '@/content/offer-pages.copy';

const BASE_URL = 'https://analyst-online.com';

const PAGES = ['', '/omnidash', '/services', '/contact', '/cases', '/privacy', '/blog'];

type CmsSitemapPage = {
  slug: string;
  routePath?: string;
  locale: string;
  pageType?: string;
  _updatedAt: string;
};

type CmsSitemapPost = {
  slug: string;
  locale: string;
  publishedAt: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const lang of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/services' ? 0.85 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l === 'ua' ? 'uk' : l, `${BASE_URL}/${l}${page}`]),
          ),
        },
      });
    }
  }

  for (const { lang, page } of getAllOfferPages()) {
    const alternatePaths = getOfferAlternates(page.path);

    entries.push({
      url: `${BASE_URL}/${lang}/${page.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority:
        page.path.includes('obuchenie') ||
        page.path.includes('navchannia') ||
        page.path.includes('curs')
          ? 0.9
          : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternatePaths).map(([locale, offerPath]) => [
            locale === 'ua' ? 'uk' : locale,
            `${BASE_URL}/${locale}/${offerPath}`,
          ]),
        ),
      },
    });
  }

  // Add blog posts from CMS
  if (isSanityConfigured()) {
    try {
      const knownUrls = new Set(entries.map((entry) => entry.url));
      const pages = await sanityClient.fetch<CmsSitemapPage[]>(
        allPagesForSitemapQuery,
        {},
        sanityFetchOptions('page'),
      );

      for (const page of pages) {
        const routePath = page.routePath || (page.slug === 'home' ? '' : page.slug);
        const url = `${BASE_URL}/${page.locale}${routePath ? `/${routePath}` : ''}`;

        if (!knownUrls.has(url)) {
          entries.push({
            url,
            lastModified: new Date(page._updatedAt),
            changeFrequency: page.pageType === 'home' ? 'weekly' : 'monthly',
            priority: page.pageType === 'home' ? 1.0 : page.pageType === 'offer' ? 0.8 : 0.7,
          });
          knownUrls.add(url);
        }
      }

      const posts = await sanityClient.fetch<CmsSitemapPost[]>(
        allBlogPostsForSitemapQuery,
        {},
        sanityFetchOptions('blogPost'),
      );
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
