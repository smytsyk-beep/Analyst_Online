// scripts/init-sheet.ts
/**
 * Script to initialize Google Sheet with headers
 * Run: npx tsx scripts/init-sheet.ts
 */

import { initializeSheet } from '../lib/google-sheets';

async function main() {
  console.log('Initializing Google Sheet...');

  const success = await initializeSheet();

  if (success) {
    console.log('✅ Sheet initialized successfully');
  } else {
    console.log('❌ Failed to initialize sheet');
    process.exit(1);
  }
}

main();
