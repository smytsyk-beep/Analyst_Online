// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder, type StructureResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { sanityConfig } from './sanity/config';

const locales = [
  { title: 'Russian', value: 'ru' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Romanian', value: 'ro' },
];

function localeList(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .child(
      S.list()
        .title(title)
        .items(
          locales.map((locale) =>
            S.listItem()
              .title(locale.title)
              .child(
                S.documentList()
                  .title(`${title} - ${locale.title}`)
                  .filter('_type == $type && locale == $locale')
                  .params({ type, locale: locale.value }),
              ),
          ),
        ),
    );
}

const structure: StructureResolver = (S) =>
  S.list()
    .title('Analyst Online')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              locales.map((locale) =>
                S.listItem()
                  .title(locale.title)
                  .child(
                    S.documentList()
                      .title(`Pages - ${locale.title}`)
                      .filter('_type == "page" && locale == $locale')
                      .params({ locale: locale.value })
                      .defaultOrdering([{ field: 'routePath', direction: 'asc' }]),
                  ),
              ),
            ),
        ),
      localeList(S, 'blogPost', 'Blog Posts'),
      localeList(S, 'service', 'Services'),
      localeList(S, 'caseStudy', 'Case Studies'),
      S.divider(),
      localeList(S, 'contactInfo', 'Contact Info'),
      localeList(S, 'omnidashBlock', 'OmniDash Blocks'),
      localeList(S, 'faq', 'FAQ'),
    ]);

export default defineConfig({
  name: 'analyst-online',
  title: 'Analyst Online CMS',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
