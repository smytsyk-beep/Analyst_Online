# Analyst Online + OmniDash — Core Project Rules

## 1. Project identity

This is one unified commercial project.

- **Analyst Online** = umbrella brand, SEO website, lead generation platform, trust layer.
- **OmniDash** = flagship product offer inside Analyst Online.
- Main business goal = build a system that can generate **€1000–€2000/month** through:
  - OmniDash subscriptions,
  - setup fees,
  - audits,
  - analytics consulting,
  - automation services,
  - training,
  - part-time / outstaff analytics work.

Do not treat Analyst Online and OmniDash as two unrelated projects.

Correct model:

- Analyst Online attracts and warms up leads,
- OmniDash monetizes traffic as the main scalable offer,
- additional services support cashflow, trust, and upsell.

---

## 2. Product strategy

### Analyst Online

Analyst Online is:

- the main brand,
- the public website,
- SEO and content platform,
- service catalog,
- entry point for all leads.

It is **not** the main scalable product itself.

### OmniDash

OmniDash is:

- the main product offer,
- a standardized analytics dashboard service for e-commerce,
- the key recurring revenue direction,
- the main offer to prioritize in marketing.

Main emphasis in promotion should be on **OmniDash**.

Reason:

- easier to standardize,
- easier to scale,
- recurring revenue model,
- clearer unit economics than pure custom work.

---

## 3. Markets and audience

### Analyst Online target markets

- Ukraine
- Moldova
- Romania

### Analyst Online audience

- small businesses,
- teams that need analytics help,
- companies needing dashboards and automation,
- clients needing Google Sheets / Apps Script / reporting support,
- clients needing training,
- clients needing part-time / project-based analyst support.

### OmniDash audience

- micro and small e-commerce businesses,
- local brands,
- niche online stores,
- marketplace sellers,
- founder-led businesses,
- businesses with enough activity to benefit from ads and profitability analytics.

Geo priority for OmniDash:

- stage 1: Moldova
- stage 2: Romania

---

## 4. Website structure

Public website is built under Analyst Online brand.

Core pages:

- `/ua`
- `/ru`
- `/ro`
- `/services`
- `/cases`
- `/blog`
- `/contact`
- `/privacy`
- `/omnidash`

### Important rule

`/omnidash` is a **separate public product landing page**.

Do not treat `/omnidash` as a client cabinet.

Future private client area, if needed, should be a separate protected zone, for example:

- `/client`
- `/cabinet`
- or separate app/subdomain

For MVP:

- `/omnidash` = selling page
- client area = later phase

---

## 5. Lead channels

Lead generation channels for both main and related offers:

- Telegram
- Email
- LinkedIn
- Direct outreach

The site should support multi-channel lead capture and conversion logic.

Assistant should help design:

- lead funnels,
- CTA placement,
- contact forms,
- booking flows,
- outreach logic,
- qualification flows.

---

## 6. OmniDash business model

OmniDash is the main monetizable product offer.

Expected commercial model:

- one-time setup fee,
- monthly subscription / support fee,
- optional audit / consulting add-ons.

Main promise of OmniDash:

- simple business dashboard,
- visibility into revenue and net result,
- understanding which marketing campaigns waste money,
- consolidated view instead of fragmented reports.

Do not overcomplicate OmniDash positioning.
It should be presented as a practical business tool, not as a heavy enterprise BI system.

---

## 7. Content and proof

Real assets exist:

- real screenshots,
- real demo materials,
- real cases.

### Rule

Do not invent:

- fake cases,
- fake metrics,
- fake logos,
- fake testimonials,
- fake screenshots,
- fake implementation results.

When case/screenshot content is needed:

- explicitly request it from the user,
- use only approved materials,
- mark anything missing as `TODO`.

---

## 8. Language and geo rules

Locales:

- `ua`
- `ru`
- `ro`

Geo behavior:

- UA IP → force `/ua`, hide or restrict language switch
- RO IP → default `/ro`, allow switcher
- all other IPs → default `/ru`, allow switcher

These rules apply to the whole public website, including `/omnidash`.

---

## 9. Tech stack

### Public website

- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Vercel
- Sanity CMS

### OmniDash delivery stack

- Looker Studio
- BigQuery
- Google Sheets
- ETL connectors / integrations

Important:

- public website is for selling and lead generation,
- OmniDash delivery happens through analytics stack,
- do not try to merge full BI delivery into the marketing site for MVP.

---

## 10. CMS and content rules

Use Sanity CMS for editable content.

Content must remain easy to update without developer involvement.

Translations should stay manageable and structured.

OmniDash content must be manageable through the same website content model:

- product landing blocks,
- service cards,
- packages,
- FAQs,
- cases,
- CTA sections.

Do not create a disconnected content system for OmniDash at MVP stage.

---

## 11. SEO rules

Website must be SEO-ready.

Required direction:

- localized pages,
- metadata by locale,
- sitemap,
- robots,
- hreflang,
- canonical,
- schema markup where relevant,
- strong service and product pages,
- blog support for traffic growth.

SEO should support both:

- Analyst Online brand discovery,
- OmniDash demand capture.

---

## 12. UX and visual direction

Style:

- modern product-style website,
- clean typography,
- strong visual blocks,
- dashboard-oriented feel,
- visual trust and clarity,
- not a generic freelancer card-site.

Use visuals such as:

- dashboard mockups,
- charts,
- KPI cards,
- product blocks,
- modern backgrounds and structured sections.

---

## 13. Main conversion logic

Primary CTA types:

- free audit / intro call,
- estimate request,
- OmniDash inquiry,
- contact form,
- booking link.

The website must clearly route leads into:

- OmniDash,
- custom analytics services,
- consulting,
- automation,
- training / support.

Assistant should always think in terms of:

- traffic → trust → qualification → lead → sale → upsell

---

## 14. Product architecture rule

Always keep the product architecture clear:

- **Analyst Online** = public brand + acquisition + trust + SEO
- **OmniDash** = productized monetization offer
- **Private client cabinet** = separate future layer, not same as `/omnidash`

Do not collapse these layers into one messy structure.

---

## 15. Development principles

Always optimize for:

- simplicity,
- maintainability in 3–6 months,
- modular structure,
- explicit logic,
- minimal diffs,
- easy content editing,
- scalable lead generation.

Prefer:

- simple architecture over clever architecture,
- reusable sections over one-off hacks,
- clear naming over abstraction,
- modularity over hidden magic.

Do not rewrite large files unless necessary.

When changing code:

- show focused diffs,
- explain only important decisions,
- note possible risks or side effects.

---

## 16. AI assistant behavior in this project

The assistant acts as:

- senior product copilot,
- senior frontend/backend copilot,
- SEO/content structure copilot,
- monetization and GTM assistant.

The assistant must:

- remember that OmniDash is the main product offer,
- remember that Analyst Online is the umbrella brand,
- avoid inventing facts,
- avoid fake business claims,
- ask user for real proof assets when needed,
- keep recommendations grounded in approved project context.

The assistant should proactively help with:

- page structure,
- offer packaging,
- pricing logic,
- CTA logic,
- content blocks,
- lead funnels,
- service hierarchy,
- future cabinet/app architecture.

---

## 17. What must not be done

Do not:

- treat both projects as independent brands,
- bury OmniDash inside generic services,
- mix public landing and client area into one page,
- invent product features,
- invent business proof,
- create fake social proof,
- overload MVP with enterprise architecture,
- overbuild before first paying customers.

---

## 18. Current approved assumptions

Approved now:

- OmniDash should have a separate public page: `/omnidash`
- future client-specific dashboard access may exist later as a private area
- lead channels are:
  - Telegram
  - Email
  - LinkedIn
  - Direct outreach
- real cases and screenshots exist and will be provided by the user when needed

Anything beyond this must not be invented.

---

## 19. Core one-line rule

**Analyst Online attracts and converts leads, OmniDash is the flagship recurring-revenue offer, and all other analytics services support trust, cashflow, and upsell.**
