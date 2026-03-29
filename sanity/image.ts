// sanity/image.ts
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ImageSource = any;

const builder = createImageUrlBuilder(sanityClient);

/**
 * Helper для генерации URL изображений из Sanity
 * @example
 * urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: ImageSource) {
  return builder.image(source);
}
