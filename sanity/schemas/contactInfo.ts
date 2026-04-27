// sanity/schemas/contactInfo.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
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
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Main heading on contact page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle below main heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'channelsTitle',
      title: 'Channels Section Title',
      type: 'string',
      description: 'Title for contact channels section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'channels',
      title: 'Contact Channels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              type: 'string',
              title: 'ID',
              description: 'telegram, email, or linkedin',
              options: {
                list: [
                  { title: 'Telegram', value: 'telegram' },
                  { title: 'Email', value: 'email' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'Display name (e.g., "Telegram", "Email")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'Contact value (e.g., @username, email@example.com)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              type: 'url',
              title: 'Link',
              description: 'Full URL (https://t.me/..., mailto:..., https://linkedin.com/...)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Description',
              rows: 2,
              description: 'Short description of this contact method',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Subtitle',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formNameLabel',
      title: 'Form: Name Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formNamePlaceholder',
      title: 'Form: Name Placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formEmailLabel',
      title: 'Form: Email Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formEmailPlaceholder',
      title: 'Form: Email Placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formMessengerLabel',
      title: 'Form: Tel / Messenger Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formMessengerPlaceholder',
      title: 'Form: Tel / Messenger Placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formContactHint',
      title: 'Form: Contact Method Hint',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formMessageLabel',
      title: 'Form: Message Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formMessagePlaceholder',
      title: 'Form: Message Placeholder',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formSubmit',
      title: 'Form: Submit Button',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formSending',
      title: 'Form: Sending State',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formSuccessTitle',
      title: 'Form: Success Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Form: Success Message',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formErrorTitle',
      title: 'Form: Error Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formErrorMessage',
      title: 'Form: Error Message',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'locale',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} (${subtitle})`,
        subtitle: 'Contact Info',
      };
    },
  },
});
