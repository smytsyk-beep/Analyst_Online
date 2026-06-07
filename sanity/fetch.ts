export const CMS_REVALIDATE_SECONDS = 60;

export const CMS_CONTENT_TAGS = [
  'page',
  'service',
  'blogPost',
  'contactInfo',
  'omnidashBlock',
  'faq',
] as const;

export function sanityFetchOptions(tags: string | string[]) {
  return {
    cache: 'force-cache' as const,
    next: {
      revalidate: CMS_REVALIDATE_SECONDS,
      tags: Array.isArray(tags) ? tags : [tags],
    },
  };
}

export function parseJsonPageContent<T>(content: unknown, context: string): Partial<T> | undefined {
  if (!content || typeof content !== 'object') return undefined;

  if ('data' in content) {
    const data = (content as { data?: unknown }).data;

    if (typeof data !== 'string' || !data.trim()) return undefined;

    try {
      return JSON.parse(data) as Partial<T>;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Invalid CMS JSON Data for ${context}: ${message}`);
      return undefined;
    }
  }

  return content as Partial<T>;
}
