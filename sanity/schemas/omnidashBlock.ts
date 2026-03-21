// sanity/schemas/omnidashBlock.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'omnidashBlock',
  title: 'OmniDash Block',
  type: 'document',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Pain Points', value: 'painPoints' },
          { title: 'Features', value: 'features' },
          { title: 'How It Works', value: 'howItWorks' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'FAQ', value: 'faq' },
          { title: 'CTA Bottom', value: 'ctaBottom' },
        ],
        layout: 'dropdown',
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
      name: 'content',
      title: 'Content',
      type: 'object',
      description: 'JSON content for this block',
      fields: [
        {
          name: 'data',
          type: 'text',
          rows: 10,
          description: 'JSON data (will be parsed)',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order on page (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      blockType: 'blockType',
      locale: 'locale',
      order: 'order',
    },
    prepare({ blockType, locale, order }) {
      return {
        title: `${blockType} (${locale})`,
        subtitle: `Order: ${order}`,
      };
    },
  },
});
