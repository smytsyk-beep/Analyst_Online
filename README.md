# Analyst Online

Multi-language landing for data & analytics services (UA / RU / RO), 
built on Next.js 16 (App Router) with Tailwind CSS and shadcn/ui.

Production: https://analyst-online.vercel.app/ru  

> Tech sprint S0: project bootstrap, base layout, i18n and CI/CD.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **UI:** Tailwind CSS, shadcn/ui
- **Routing & i18n:**
  - Dynamic segment `/[lang]` with locales: `ua`, `ru`, `ro`
  - Simple i18n policy based on Geo/IP + cookie
- **Tooling:**
  - ESLint (flat config)
  - Prettier 3
  - GitHub Actions (lint + build on PR)
- **Deploy:** Vercel
  - `main` → production
  - PR branches → preview deployments

---

## Getting started

### 1. Install dependencies

```bash
npm install
# или
npm ci

