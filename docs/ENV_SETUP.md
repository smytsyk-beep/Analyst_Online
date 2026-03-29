# Environment Variables Setup

## Required variables

Create `.env.local` file in the root of the project with the following variables:

```bash
# Telegram Bot Configuration (Sprint 5)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=380436858

# Google Sheets Configuration (Sprint 5)
GOOGLE_SHEET_ID=13K8W2nCEst3HVY8RW-wxEdc6vqR-ct2zQ7u0LNNb8lQ
GOOGLE_SERVICE_ACCOUNT_EMAIL=analyst-online-leads@omnidash-490418.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Sanity CMS Configuration (Sprint 6)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Sanity Preview & Revalidation (Sprint 7)
SANITY_PREVIEW_SECRET=your_random_secret_here
SANITY_REVALIDATE_SECRET=your_random_secret_here
SANITY_WEBHOOK_SECRET=your_webhook_secret_here
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

### Sanity CMS

1. Create a free account at https://sanity.io
2. Create a new project
3. Copy the Project ID → use as `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Use `production` as dataset → `NEXT_PUBLIC_SANITY_DATASET`
5. Generate an API token with Editor permissions → use as `SANITY_API_TOKEN`
   - Go to https://sanity.io/manage
   - Select your project → API → Tokens → Add API token
   - Name: "Next.js Server", Permissions: Editor

### Sanity Preview & Revalidation Secrets

Generate random secrets for preview mode and webhook revalidation:

```bash
# Generate random secrets (run in terminal)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use the generated values for:

- `SANITY_PREVIEW_SECRET` — for preview mode authentication
- `SANITY_REVALIDATE_SECRET` — for webhook revalidation authentication
- `SANITY_WEBHOOK_SECRET` — for webhook signature validation (optional)

## Vercel Deployment

When deploying to Vercel, add all environment variables in:

**Project Settings → Environment Variables**

Make sure to add them to all environments:

- Production
- Preview
- Development

## Security Notes

- Never commit `.env.local` to git
- `.env.local` is already in `.gitignore`
- Keep your tokens and keys secure
- Rotate secrets regularly
