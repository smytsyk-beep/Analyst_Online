// sanity/schemas/caseStudy.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client name or "Anonymous client"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'E.g., "E-commerce", "SaaS", "Retail"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
      description: 'What problem did the client have?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
      description: 'How did you solve it?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed results and outcomes',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
            },
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({ label, value }) {
              return {
                title: `${label}: ${value}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on home page',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Published Date',
      name: 'publishedAt',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      locale: 'locale',
      media: 'coverImage',
    },
    prepare({ title, client, locale, media }) {
      return {
        title: `${title} (${locale})`,
        subtitle: client,
        media,
      };
    },
  },
});
