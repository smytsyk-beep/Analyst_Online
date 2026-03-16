# Environment Variables Setup

## Required variables for Sprint 5 (Lead Capture)

Create `.env.local` file in the root of the project with the following variables:

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=380436858

# Google Sheets Configuration
GOOGLE_SHEET_ID=13K8W2nCEst3HVY8RW-wxEdc6vqR-ct2zQ7u0LNNb8lQ
GOOGLE_SERVICE_ACCOUNT_EMAIL=analyst-online-leads@omnidash-490418.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## How to get values

### Telegram Bot Token

1. Open @BotFather in Telegram
2. Send `/newbot` and follow instructions
3. Copy the token provided

### Telegram Chat ID

Your chat ID: `380436858`

### Google Service Account

1. Download JSON key file from Google Cloud Console
2. Extract `client_email` → use as `GOOGLE_SERVICE_ACCOUNT_EMAIL`
3. Extract `private_key` → use as `GOOGLE_PRIVATE_KEY`
   - Important: Keep the `\n` characters in the key
   - Wrap the entire key in double quotes

### Google Sheet ID

From the URL: `https://docs.google.com/spreadsheets/d/13K8W2nCEst3HVY8RW-wxEdc6vqR-ct2zQ7u0LNNb8lQ/edit`
The ID is: `13K8W2nCEst3HVY8RW-wxEdc6vqR-ct2zQ7u0LNNb8lQ`

## Security Notes

- Never commit `.env.local` to git
- `.env.local` is already in `.gitignore`
- Keep your tokens and keys secure
