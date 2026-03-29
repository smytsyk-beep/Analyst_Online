// scripts/test-blog-fetch.ts
import { sanityClient } from '../sanity/client';
import { groq } from 'next-sanity';

async function testBlogFetch() {
  console.log('🔍 Testing blog fetch...\n');

  try {
    // Test 1: Fetch all blog posts
    console.log('📋 Fetching all blog posts...');
    const allPosts = await sanityClient.fetch(
      groq`*[_type == "blogPost"]{ _id, title, slug, locale, publishedAt }`,
    );
    console.log('✅ All blog posts:', allPosts);
    console.log('');

    // Test 2: Fetch specific post
    if (allPosts.length > 0) {
      const firstPost = allPosts[0];
      console.log('📄 Fetching specific post...');
      console.log('  Slug object:', firstPost.slug);
      console.log('  Slug.current:', firstPost.slug?.current);
      console.log('  Locale:', firstPost.locale);
      console.log('');

      const post = await sanityClient.fetch(
        groq`*[_type == "blogPost" && slug.current == $slug && locale == $locale][0]`,
        { slug: firstPost.slug.current, locale: firstPost.locale },
      );
      console.log('✅ Fetched post:', post ? post.title : 'not found');
    }

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testBlogFetch();
