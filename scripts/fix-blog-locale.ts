// scripts/fix-blog-locale.ts
/**
 * Fix blog posts without locale field
 * Sets locale to 'ru' for all posts without locale
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function fixBlogLocale() {
  console.log('🔧 Fixing blog posts without locale...\n');

  try {
    // Find posts without locale
    const posts = await client.fetch(`*[_type == "blogPost" && !defined(locale)]{ _id, title }`);

    if (posts.length === 0) {
      console.log('✅ All blog posts have locale field');
      return;
    }

    console.log(`Found ${posts.length} posts without locale:`);

    for (const post of posts) {
      console.log(`  - ${post.title} (${post._id})`);

      // Update with locale = 'ru'
      await client.patch(post._id).set({ locale: 'ru' }).commit();

      console.log(`    ✅ Updated with locale='ru'`);
    }

    console.log('\n✅ All posts fixed!');
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  }
}

fixBlogLocale();
