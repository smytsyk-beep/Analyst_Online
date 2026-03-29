// sanity/cleanup-blocks.ts
/**
 * Cleanup script: удаляет старые OmniDash блоки с неправильными blockType
 *
 * Usage:
 *   npm run cleanup-blocks
 *
 * Удаляет блоки с blockType: 'pain', 'how', 'cta'
 * После этого нужно запустить migrate-content заново
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function cleanupOldBlocks() {
  console.log('🧹 Cleaning up old OmniDash blocks...\n');

  const oldBlockTypes = ['pain', 'how', 'cta'];

  for (const blockType of oldBlockTypes) {
    const query = `*[_type == "omnidashBlock" && blockType == $blockType]._id`;
    const ids = await client.fetch(query, { blockType });

    if (ids.length > 0) {
      console.log(`Found ${ids.length} blocks with blockType: "${blockType}"`);

      for (const id of ids) {
        await client.delete(id);
        console.log(`  ✅ Deleted: ${id}`);
      }
    } else {
      console.log(`No blocks found with blockType: "${blockType}"`);
    }
  }

  console.log('\n✅ Cleanup completed!');
  console.log('\n📝 Next step: Run "npm run migrate-content" to create new blocks');
}

cleanupOldBlocks().catch((error) => {
  console.error('❌ Cleanup failed:', error);
  process.exit(1);
});
