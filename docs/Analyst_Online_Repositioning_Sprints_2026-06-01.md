# Analyst Online — Sprint Plan Repositioning

**Дата:** 2026-06-01  
**Источник правил:** `docs/Analyst_Online_vs_OmniDash_updated.md`  
**Статус:** ✅ финализировано и опубликовано

**Легенда:** ✅ сделано, ⬜ осталось сделать

---

## Summary

Цель спринтов — перевести проект с OmniDash-first позиционирования на новую архитектуру:

- **Analyst Online** — зонтичный бренд, SEO-сайт, каталог услуг и система лидогенерации.
- **Основной фокус** — AI, аналитика, автоматизация и part-time аналитическая поддержка.
- **OmniDash** — вторичное продуктовое направление для e-commerce dashboards.
- Все публичные страницы должны иметь локализации `ru`, `ua`, `ro`.
- Публичный контент должен быть редактируемым через Sanity с fallback-копией в коде.

**Финальный результат:** основной repositioning-релиз опубликован. По подтверждению после публикации сайт работает на трёх локалях: `ru`, `ua`, `ro`.

---

## Sprint 1 — Rules, IA, And Repositioning Cleanup

**Статус:** ✅ Done

- ✅ Переписаны правила `.continue/rules/02-Analyst_vs_OmniDash.md`.
- ✅ Analyst Online зафиксирован как umbrella brand.
- ✅ OmniDash убран из роли основного продукта в live-copy.
- ✅ Старые документы с прежней стратегией помечены как archived/outdated.
- ✅ Обновлён `README.md`.
- ✅ Обновлены metadata, JSON-LD и публичные описания.
- ✅ Удалён OmniDash из первого уровня header navigation.
- ✅ Добавлены локализованные nav/footer labels для `ru`, `ua`, `ro`.

**Затронуто:**

- `.continue/rules/02-Analyst_vs_OmniDash.md`
- `README.md`
- `lib/schema.ts`
- `app/layout.tsx`
- `components/site/header.tsx`
- `components/site/footer.tsx`
- `components/site/mobile-nav.tsx`
- archived docs in `docs/`

---

## Sprint 2 — Flagship Homepage Redesign

**Статус:** ✅ Done

- ✅ Главная пересобрана как длинный landing Analyst Online.
- ✅ Hero сфокусирован на “AI, аналитика и автоматизация для бизнеса”.
- ✅ Добавлены три CTA-пути:
  - узнать стоимость,
  - задать вопрос,
  - получить бесплатную консультацию.
- ✅ Добавлены блоки:
  - аудитория и боли,
  - основные направления услуг,
  - AI Training highlight,
  - примеры автоматизации,
  - процесс работы,
  - proof/TODO блок,
  - FAQ,
  - финальный CTA.
- ✅ Copy переведена на командную подачу: “мы”, “команда”, “помогаем”, “настраиваем”.
- ✅ Удалён глобальный `ParticlesBackground` из публичного layout.
- ✅ Старые home-компоненты с `flagship`-структурой удалены.

**Затронуто:**

- `app/[lang]/page.tsx`
- `content/home.copy.ts`
- `components/home/landing.tsx`
- `app/[lang]/layout.tsx`

---

## Sprint 3 — AI Training Positioning And SEO Pages

**Статус:** ✅ Done

- ✅ Добавлены локализованные AI SEO страницы:
  - `/ru/obuchenie-ai`
  - `/ua/navchannia-ai`
  - `/ro/curs-ai`
- ✅ Добавлены service SEO страницы:
  - `/ru/services/ai-dlya-biznesa`
  - `/ua/services/ai-dlya-biznesu`
  - `/ro/services/ai-pentru-business`
  - `/ru/services/avtomatizatsiya-ai`
  - `/ua/services/avtomatyzatsiya-ai`
  - `/ro/services/automatizare-ai`
  - `/ru/services/ai-google-sheets-excel`
  - `/ua/services/ai-google-sheets-excel`
  - `/ro/services/ai-google-sheets-excel`
- ✅ Добавлен блок “почему обучение с нами”:
  - актуальная информация без старья,
  - онлайн-встречи без видеозаписей,
  - индивидуальный выбор тем,
  - групповые занятия по уровню и тематике,
  - unit-экономика AI-моделей и стоимость реализации.
- ✅ Services hierarchy обновлена: AI Training и AI-направления идут перед OmniDash.
- ✅ n8n/Make не выделены в отдельную first-stage service page.

**Затронуто:**

- `app/[lang]/[...slug]/page.tsx`
- `content/offer-pages.copy.ts`
- `components/services/offer-page.tsx`
- `content/services.copy.ts`
- `app/[lang]/services/page.tsx`

---

## Sprint 4 — Sanity Content System

**Статус:** ✅ Done in code, ⬜ CMS content migration/update still needs to be run when credentials are available

- ✅ Расширена `page` schema:
  - `routePath`,
  - `pageType`,
  - `status`,
  - `content`,
  - `sections`,
  - `cta`,
  - `faq`.
- ✅ Расширена `service` schema:
  - `bullets`,
  - `cta`,
  - `href`.
- ✅ Расширена `contactInfo` schema:
  - purpose labels/options,
  - localized “send another message” label.
- ✅ Добавлены/обновлены Sanity queries.
- ✅ Home, offer pages, contact, privacy, cases, services работают с Sanity fallback logic.
- ✅ Обновлены migration scripts для новых полей и offer pages.
- ⬜ Запустить фактическую миграцию в Sanity после проверки env/token.
- ⬜ Обновить уже существующие Sanity documents, если в CMS осталась старая OmniDash-first copy.

**Затронуто:**

- `sanity/schemas/page.ts`
- `sanity/schemas/service.ts`
- `sanity/schemas/contactInfo.ts`
- `sanity/queries.ts`
- `sanity/migrate.ts`
- `scripts/migrate-contact-info.ts`

---

## Sprint 5 — Contact, CTA, And Lead Flow

**Статус:** ✅ Done

- ✅ Contact form поддерживает ровно три цели обращения:
  - `price`,
  - `question`,
  - `consultation`.
- ✅ Цель обращения передаётся в server action.
- ✅ Цель обращения добавлена в Telegram notification.
- ✅ Цель обращения добавлена в Google Sheets append.
- ✅ Header/mobile/footer используют icon-only контакты.
- ✅ Contact page использует пиктограммы вместо видимых слов Telegram/Email/LinkedIn.
- ✅ CTA на homepage, services, offer pages, cases и OmniDash ведут в contact flow с нужной целью.

**Затронуто:**

- `components/contact/contact-form.tsx`
- `app/actions/contact.ts`
- `lib/telegram.ts`
- `lib/google-sheets.ts`
- `app/[lang]/contact/page.tsx`
- `components/omnidash/*`
- `components/site/*`

---

## Sprint 6 — QA, SEO, And Release

**Статус:** ✅ Done and published

- ✅ `npm run lint` проходит.
- ✅ `npm run build` проходит.
- ✅ Проверены smoke routes:
  - `/ru`
  - `/ru/obuchenie-ai`
  - `/ua/navchannia-ai`
  - `/ro/curs-ai`
  - `/ru/services/ai-dlya-biznesa`
  - `/ru/contact?purpose=price`
  - `/ru/services`
  - `/ru/omnidash`
- ✅ Обновлён sitemap для новых offer pages.
- ✅ Добавлен `Service` JSON-LD для offer pages.
- ✅ Проверено, что live app/content/lib не содержит старого `flagship/main product` позиционирования.
- ✅ Dev server поднят и проверен локально.
- ✅ Конфликты pull request с `main` разрешены.
- ✅ Pull request опубликован.
- ✅ Сайт после публикации работает на локалях `ru`, `ua`, `ro`.

**Локальный URL:**

```text
http://localhost:3000/ru
```

---

## Final Release Notes

- ✅ Спринты 1–6 по repositioning-релизу закрыты.
- ✅ Analyst Online опубликован как основной umbrella brand.
- ✅ OmniDash оставлен как вторичное e-commerce dashboard направление.
- ✅ Новая архитектура навигации, homepage, SEO pages, contact flow и Sanity fallback logic доставлены в релиз.
- ✅ Следующие правки будут оформляться отдельным планом в следующем цикле.

---

## Deferred To Next Planning Cycle

Эти пункты не блокируют текущий опубликованный релиз. Их нужно пересмотреть в следующем чате вместе с новыми правками и отдельным планом устранения.

- ⬜ Проверить визуально homepage на desktop/mobile и при необходимости отполировать spacing.
- ⬜ Запустить Sanity migration на реальном dataset.
- ⬜ Проверить существующие Sanity-документы на старый OmniDash-first контент.
- ⬜ Добавить реальные кейсы, скриншоты, демо и обучающие материалы вместо `TODO`.
- ⬜ При необходимости обновить Telegram username/email/LinkedIn, если контактные данные изменятся.
