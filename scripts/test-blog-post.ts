// scripts/test-blog-post.ts
import { sanityClient } from '../sanity/client';
import { blogPostQuery } from '../sanity/queries';

async function testBlogPost() {
  console.log('🔍 Testing blog post fetch...\n');

  const slug = 'blog11';
  const locale = 'ru';

  try {
    console.log(`Fetching post: slug="${slug}", locale="${locale}"`);
    const post = await sanityClient.fetch(blogPostQuery, { locale, slug });

    if (!post) {
      console.log('❌ Post not found');
      return;
    }

    console.log('\n✅ Post found:');
    console.log('  Title:', post.title);
    console.log('  Slug:', post.slug);
    console.log('  Locale:', post.locale);
    console.log('  Published:', post.publishedAt);
    console.log('  Excerpt:', post.excerpt || 'N/A');
    console.log('  Body type:', typeof post.body);
    console.log('  Body is array:', Array.isArray(post.body));
    console.log('  Body length:', Array.isArray(post.body) ? post.body.length : 'N/A');
    console.log('  Body content:', JSON.stringify(post.body, null, 2));
    console.log('  Tags:', post.tags);
    console.log('  Cover image:', post.coverImage ? 'Yes' : 'No');

    console.log('\n✅ Test passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testBlogPost();
