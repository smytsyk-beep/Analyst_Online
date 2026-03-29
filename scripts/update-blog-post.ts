// scripts/update-blog-post.ts
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function updateBlogPost() {
  console.log('🔧 Updating blog post...\n');

  const postId = 'fff123b0-2b40-4f45-8350-76f15a5d8475';

  try {
    // Update post with locale
    await client.patch(postId).set({ locale: 'ru' }).commit();

    console.log('✅ Post updated with locale=ru');

    // Verify
    const post = await client.getDocument(postId);
    console.log('\nVerification:');
    console.log('  Title:', post?.title);
    console.log('  Locale:', post?.locale);
  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

updateBlogPost();
