// scripts/migrate-contact-info.ts
import { createClient } from '@sanity/client';
import { contactCopy } from '../content/contact.copy';
import { randomUUID } from 'crypto';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrateContactInfo() {
  console.log('🚀 Starting Contact Info migration to Sanity...\n');

  const locales = ['ru', 'ua', 'ro'] as const;
  const failedLocales: string[] = [];

  for (const locale of locales) {
    const data = contactCopy[locale];

    const doc = {
      _type: 'contactInfo',
      locale,
      pageTitle: data.pageTitle,
      pageSubtitle: data.pageSubtitle,
      channelsTitle: data.channelsTitle,
      channels: data.channels.map((channel) => ({
        _key: randomUUID(),
        ...channel,
      })),
      formTitle: data.formTitle,
      formSubtitle: data.formSubtitle,
      formNameLabel: data.formNameLabel,
      formNamePlaceholder: data.formNamePlaceholder,
      formEmailLabel: data.formEmailLabel,
      formEmailPlaceholder: data.formEmailPlaceholder,
      formMessengerLabel: data.formMessengerLabel,
      formMessengerPlaceholder: data.formMessengerPlaceholder,
      formContactHint: data.formContactHint,
      formMessageLabel: data.formMessageLabel,
      formMessagePlaceholder: data.formMessagePlaceholder,
      formSubmit: data.formSubmit,
      formSending: data.formSending,
      formSuccessTitle: data.formSuccessTitle,
      formSuccessMessage: data.formSuccessMessage,
      formErrorTitle: data.formErrorTitle,
      formErrorMessage: data.formErrorMessage,
    };

    try {
      // Check if document already exists
      const existing = await client.fetch(`*[_type == "contactInfo" && locale == $locale][0]`, {
        locale,
      });

      if (existing) {
        console.log(`⚠️  Contact Info (${locale}) already exists, skipping...`);
        continue;
      }

      // Create new document
      const result = await client.create(doc);
      console.log(`✅ Created Contact Info (${locale}): ${result._id}`);
    } catch (error) {
      console.error(`❌ Failed to create Contact Info (${locale}):`, error);
      failedLocales.push(locale);
    }
  }

  if (failedLocales.length > 0) {
    throw new Error(
      `Contact Info migration completed with errors. Failed locales: ${failedLocales.join(', ')}`,
    );
  }

  console.log('\n✅ Contact Info migration complete!');
}

migrateContactInfo().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
