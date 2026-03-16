// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n';

const BASE_URL = 'https://analyst-online.com';

const PAGES = ['', '/omnidash', '/services', '/contact', '/cases', '/privacy', '/blog'];

export default function sitemap(): MetadataRoute.Sitemap {
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

  return entries;
}
