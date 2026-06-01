// sanity/schemas/service.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Internal Link',
      type: 'string',
      description:
        'Optional localized path after the locale prefix, e.g. /services/ai-dlya-biznesa',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "BarChart3", "Zap", "LineChart")',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(0),
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
      title: 'Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'locale',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${title} (${subtitle})`,
        subtitle: `Order: ${order}`,
      };
    },
  },
});
