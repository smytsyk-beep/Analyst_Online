import type { SlugIsUniqueValidator } from 'sanity';

const apiVersion = '2024-01-01';

function getDocumentIds(id: string | undefined) {
  const publishedId = id?.replace(/^drafts\./, '').replace(/^versions\.[^.]+\./, '');

  return publishedId ? [publishedId, `drafts.${publishedId}`, id].filter(Boolean) : [];
}

export const slugIsUniqueByLocale: SlugIsUniqueValidator = async (slug, context) => {
  const { document } = context;
  const locale = document?.locale;
  const type = document?._type;

  if (typeof locale !== 'string' || !type) {
    return context.defaultIsUnique(slug, context);
  }

  const client = context.getClient({ apiVersion });
  const ids = getDocumentIds(document?._id);

  const query = `!defined(*[
    _type == $type &&
    slug.current == $slug &&
    locale == $locale &&
    !(_id in $ids)
  ][0]._id)`;

  return client.fetch<boolean>(query, { type, slug, locale, ids });
};
