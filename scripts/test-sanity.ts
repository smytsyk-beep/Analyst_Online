// scripts/test-sanity.ts
import { sanityClient } from '../sanity/client';
import { sanityConfig, isSanityConfigured } from '../sanity/config';

async function testSanity() {
  console.log('🔍 Testing Sanity configuration...\n');

  // Check config
  console.log('📋 Configuration:');
  console.log('  Project ID:', sanityConfig.projectId);
  console.log('  Dataset:', sanityConfig.dataset);
  console.log('  API Version:', sanityConfig.apiVersion);
  console.log('  Use CDN:', sanityConfig.useCdn);
  console.log('  Is Configured:', isSanityConfigured());
  console.log('');

  if (!isSanityConfigured()) {
    console.error('❌ Sanity is not configured!');
    console.log('');
    console.log('Please set environment variables:');
    console.log('  NEXT_PUBLIC_SANITY_PROJECT_ID');
    console.log('  NEXT_PUBLIC_SANITY_DATASET');
    console.log('  SANITY_API_TOKEN');
    process.exit(1);
  }

  // Test connection
  console.log('🔌 Testing connection...');
  try {
    const result = await sanityClient.fetch('*[_type == "page"][0]');
    console.log('✅ Connection successful!');
    console.log('');
    console.log('📄 Sample query result:', result || 'No documents found');
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('');
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error);
    }
    console.log('');
    console.log('💡 Possible issues:');
    console.log('  1. Project ID is incorrect');
    console.log('  2. Dataset does not exist');
    console.log('  3. API token is invalid or missing');
    console.log('  4. CORS is not configured in Sanity Dashboard');
    process.exit(1);
  }

  console.log('');
  console.log('✅ All checks passed!');
}

testSanity();
