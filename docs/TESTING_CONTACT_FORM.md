npm run init-sheet# Testing Contact Form

## Prerequisites

1. ✅ `.env.local` file created with all required variables
2. ✅ Telegram Bot Token configured
3. ✅ Google Service Account JSON key configured
4. ✅ Google Sheet shared with Service Account email

## Step 1: Initialize Google Sheet

Run this command once to add headers to your Google Sheet:

```bash
npm run init-sheet
```

Expected output:

```
Initializing Google Sheet...
✅ Sheet initialized successfully
```

This will create the following headers in your sheet:

- Timestamp
- Name
- Email
- Message
- Locale
- Source

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Test the Form

1. Open http://localhost:3000/ru/contact
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. Click "Отправить"
4. Wait for success message

## Step 4: Verify Results

### Check Telegram

- Open your Telegram chat
- You should receive a message from your bot with the lead details

### Check Google Sheet

- Open your Google Sheet: https://docs.google.com/spreadsheets/d/13K8W2nCEst3HVY8RW-wxEdc6vqR-ct2zQ7u0LNNb8lQ/edit
- You should see a new row with the lead data

## Troubleshooting

### Form doesn't submit

- Check browser console for errors
- Check terminal for server errors
- Verify `.env.local` variables are correct

### No Telegram notification

- Verify `TELEGRAM_BOT_TOKEN` is correct
- Verify `TELEGRAM_CHAT_ID` is correct
- Check that you sent `/start` to your bot

### No Google Sheet entry

- Verify `GOOGLE_SHEET_ID` is correct
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correct
- Verify `GOOGLE_PRIVATE_KEY` is correct (with `\n` preserved)
- Check that Service Account has Editor access to the sheet
- Run `npm run init-sheet` again

### "Failed to process your request"

- This means both Telegram and Google Sheets failed
- Check server logs for detailed error messages
- Verify all environment variables

## Testing Different Locales

Test the form on all locales:

- http://localhost:3000/ru/contact (Russian)
- http://localhost:3000/ua/contact (Ukrainian)
- http://localhost:3000/ro/contact (Romanian)

Each submission should include the correct locale in both Telegram and Google Sheet.
