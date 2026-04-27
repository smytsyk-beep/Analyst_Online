// scripts/fix-contact-channels.ts
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

async function fixContactChannels() {
  console.log('🔧 Fixing Contact Channels with missing keys...\n');

  const locales = ['ru', 'ua', 'ro'] as const;

  for (const locale of locales) {
    const data = contactCopy[locale];

    try {
      // Find existing document
      const existing = await client.fetch(
        `*[_type == "contactInfo" && locale == $locale][0]{ _id, _rev }`,
        { locale },
      );

      if (!existing) {
        console.log(`⚠️  Contact Info (${locale}) not found, skipping...`);
        continue;
      }

      // Update with channels that have _key
      const channelsWithKeys = data.channels.map((channel) => ({
        _key: randomUUID(),
        ...channel,
      }));

      await client
        .patch(existing._id)
        .set({
          channels: channelsWithKeys,
          formMessengerLabel: data.formMessengerLabel,
          formMessengerPlaceholder: data.formMessengerPlaceholder,
          formContactHint: data.formContactHint,
        })
        .commit();

      console.log(`✅ Fixed Contact Info (${locale}): ${existing._id}`);
    } catch (error) {
      console.error(`❌ Failed to fix Contact Info (${locale}):`, error);
    }
  }

  console.log('\n✅ Contact Channels fix complete!');
}

fixContactChannels().catch((error) => {
  console.error('❌ Fix failed:', error);
  process.exit(1);
});
