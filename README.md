# Analyst Online

Multilingual commercial website for AI training, analytics, automation, dashboards, and part-time analyst services.

Active positioning and project rules live in [`docs/Analyst_Online_vs_OmniDash_updated.md`](docs/Analyst_Online_vs_OmniDash_updated.md).

Production: https://analyst-online.vercel.app/ru

## Product Model

- **Analyst Online** is the umbrella brand, public website, SEO platform, trust layer, lead generation system, and service catalog.
- **Main services** are AI/ChatGPT training, AI implementation, workflow automation, Google Sheets/Excel/Apps Script automation, dashboards, analytics consulting, and part-time analyst support.
- **OmniDash** is a secondary productized e-commerce dashboard offer inside Analyst Online, not the primary product.

## Locales And Routes

- Locales: `ua`, `ru`, `ro`.
- Base routes: `/[lang]`, `/[lang]/services`, `/[lang]/cases`, `/[lang]/blog`, `/[lang]/contact`, `/[lang]/privacy`, `/[lang]/omnidash`.
- Initial AI SEO cluster:
  - `/ru/obuchenie-ai`
  - `/ru/services/ai-dlya-biznesa`
  - `/ru/services/avtomatizatsiya-ai`
  - `/ru/services/ai-google-sheets-excel`

Equivalent UA/RO routes are implemented for locale parity.

## Tech Stack

- **Framework:** Next.js 16 App Router, TypeScript
- **UI:** Tailwind CSS, shadcn/ui, lucide-react
- **CMS:** Sanity
- **Deploy:** Vercel
- **Lead capture:** contact form, Telegram notification, Google Sheets append

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Content Rules

- All public content should be editable through Sanity for every locale.
- Hardcoded localized copy is kept as a production fallback.
- Do not invent fake cases, screenshots, logos, testimonials, metrics, or business results.
- Use team wording in public copy: "we", "our team", "we help", "we configure".
