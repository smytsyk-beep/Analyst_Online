import type { Metadata } from 'next';
import { sanityImageUrl, type SanityImageValue } from '@/sanity/image';

export const defaultSocialImageUrl = 'https://analyst-online.vercel.app/og-image.png';

type SocialPreviewInput = {
  title: string;
  description: string;
  url: string;
  locale: string;
  image?: SanityImageValue;
  imageAlt?: string;
};

export function localeToOpenGraphLocale(locale: string) {
  if (locale === 'ua') return 'uk_UA';
  if (locale === 'ro') return 'ro_RO';
  return 'ru_RU';
}

export function socialPreviewMetadata({
  title,
  description,
  url,
  locale,
  image,
  imageAlt,
}: SocialPreviewInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const imageUrl =
    sanityImageUrl(image, { width: 1200, height: 630, fit: 'crop' }) ?? defaultSocialImageUrl;
  const alt = image?.alt || imageAlt || title;

  return {
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: localeToOpenGraphLocale(locale),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
