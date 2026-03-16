// lib/schema.ts
// JSON-LD schema generators for SEO
import type { Locale } from '@/lib/i18n';

const BASE_URL = 'https://analyst-online.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Analyst Online',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'Analytics, dashboards and automation for business. Flagship product: OmniDash.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 's.mytsyk@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'Ukrainian', 'Romanian'],
    },
    sameAs: ['https://t.me/omnidash_ai', 'https://www.linkedin.com/in/pavlo-mytsyk-04022a3b3/'],
  };
}

export function productSchema(lang: Locale) {
  const names: Record<Locale, string> = {
    ru: 'OmniDash — аналитика для e-commerce',
    ua: 'OmniDash — аналітика для e-commerce',
    ro: 'OmniDash — analytics pentru e-commerce',
  };

  const descriptions: Record<Locale, string> = {
    ru: 'Готовая система аналитики для малого e-commerce. Реклама, продажи и расходы в одном дашборде.',
    ua: 'Готова система аналітики для малого e-commerce. Реклама, продажі та витрати в одному дашборді.',
    ro: 'Sistem gata de analytics pentru e-commerce mic. Reclamă, vânzări și cheltuieli într-un singur dashboard.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: names[lang],
    description: descriptions[lang],
    url: `${BASE_URL}/${lang}/omnidash`,
    image: `${BASE_URL}/images/omnidash/mockup-1.png`,
    brand: {
      '@type': 'Organization',
      name: 'Analyst Online',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Setup',
        price: '99',
        priceCurrency: 'EUR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Subscription',
        price: '49',
        priceCurrency: 'EUR',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
      },
    ],
  };
}

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`,
    })),
  };
}
