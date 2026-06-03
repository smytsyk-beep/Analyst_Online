// sanity/image.ts
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageSource = any;

export type SanityImageAsset = {
  _id?: string;
  _ref?: string;
  url?: string;
};

export type SanityImageValue = {
  asset?: SanityImageAsset;
  alt?: string;
};

type ImageUrlOptions = {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
};

const builder = createImageUrlBuilder(sanityClient);

/**
 * Helper для генерации URL изображений из Sanity
 * @example
 * urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: ImageSource) {
  return builder.image(source);
}

export function sanityImageUrl(image: SanityImageValue | undefined, options: ImageUrlOptions = {}) {
  if (!image) return undefined;

  if (image.asset?.url) {
    return image.asset.url;
  }

  if (!image.asset?._id && !image.asset?._ref) {
    return undefined;
  }

  let url = urlFor(image);

  if (options.width) url = url.width(options.width);
  if (options.height) url = url.height(options.height);
  if (options.fit) url = url.fit(options.fit);

  return url.url();
}
