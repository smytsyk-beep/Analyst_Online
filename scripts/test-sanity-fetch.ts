// scripts/test-sanity-fetch.ts
import { sanityClient } from '../sanity/client';
import { groq } from 'next-sanity';

async function testFetch() {
  console.log('🔍 Testing Sanity fetch...\n');

  try {
    // Test 1: Fetch all document types
    console.log('📋 Fetching all document types...');
    const types = await sanityClient.fetch(
      groq`array::unique(*[]._type) | order(@)`,
    );
    console.log('✅ Document types:', types);
    console.log('');

    // Test 2: Count documents by type
    console.log('📊 Document counts:');
    for (const type of types) {
      const count = await sanityClient.fetch(
        groq`count(*[_type == $type])`,
        { type },
      );
      console.log(`  ${type}: ${count}`);
    }
    console.log('');

    // Test 3: Fetch sample documents
    console.log('📄 Sample documents:');
    
    const samplePage = await sanityClient.fetch(
      groq`*[_type == "page"][0]{ title, locale, slug }`,
    );
    console.log('  Page:', samplePage || 'No pages found');

    const sampleService = await sanityClient.fetch(
      groq`*[_type == "service"][0]{ title, locale, order }`,
    );
    console.log('  Service:', sampleService || 'No services found');

    const sampleFaq = await sanityClient.fetch(
      groq`*[_type == "faq"][0]{ question, locale, category }`,
    );
    console.log('  FAQ:', sampleFaq || 'No FAQs found');

    console.log('');
    console.log('✅ All fetch tests passed!');
  } catch (error) {
    console.error('❌ Fetch failed!');
    console.error('');
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
}

testFetch();
