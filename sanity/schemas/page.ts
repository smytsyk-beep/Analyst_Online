// sanity/schemas/page.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'Russian', value: 'ru' },
          { title: 'Ukrainian', value: 'ua' },
          { title: 'Romanian', value: 'ro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'routePath',
      title: 'Route Path',
      type: 'string',
      description:
        'Localized path without locale prefix, e.g. obuchenie-ai or services/ai-dlya-biznesa',
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Service / Offer', value: 'offer' },
          { title: 'Services Index', value: 'services' },
          { title: 'Contact', value: 'contact' },
          { title: 'Privacy', value: 'privacy' },
          { title: 'Cases', value: 'cases' },
          { title: 'Generic', value: 'generic' },
        ],
      },
      initialValue: 'generic',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'published',
    }),
    defineField({
      name: 'content',
      title: 'Structured Page Content',
      type: 'object',
      description:
        'Structured fallback override used by frontend. Keep keys aligned with the page copy type.',
      fields: [
        {
          name: 'data',
          title: 'JSON Data',
          type: 'text',
          rows: 12,
          description: 'Optional JSON object for structured sections and CTA/FAQ blocks.',
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Editable Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Key', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'text', title: 'Text', type: 'text', rows: 3 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        { name: 'primary', title: 'Primary Label', type: 'string' },
        { name: 'secondary', title: 'Secondary Label', type: 'string' },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Page FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 4 },
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'locale',
      slug: 'slug.current',
    },
    prepare({ title, subtitle, slug }) {
      return {
        title: `${title} (${subtitle})`,
        subtitle: slug,
      };
    },
  },
});
