// scripts/test-env.ts
import 'dotenv/config';

console.log('Testing environment variables...\n');

const vars = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
};

Object.entries(vars).forEach(([key, value]) => {
  if (value) {
    const displayValue = key === 'GOOGLE_PRIVATE_KEY' 
      ? `${value.substring(0, 50)}...` 
      : key.includes('TOKEN') 
        ? `${value.substring(0, 10)}...`
        : value;
    console.log(`✅ ${key}: ${displayValue}`);
  } else {
    console.log(`❌ ${key}: NOT SET`);
  }
});

console.log('\nIf all variables show ✅, your .env.local is configured correctly.');
