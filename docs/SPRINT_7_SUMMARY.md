# Sprint 7 — Summary

**Дата:** 2026-03-22  
**Статус:** ✅ В процессе выполнения

---

## Цель Sprint 7

Перевести все страницы с хардкода `.copy.ts` на CMS-driven rendering. Настроить preview mode и автоматическую ревалидацию через webhook.

---

## Выполненные задачи

### ✅ 7.1 — GROQ queries

**Файл:** `sanity/queries.ts`

Созданы GROQ queries для всех типов контента:

- **Pages:** `homePageQuery`, `privacyPageQuery`, `contactPageQuery`, `casesPageQuery`
- **Services:** `servicesQuery`, `serviceBySlugQuery`
- **OmniDash:** `omnidashBlocksQuery`
- **FAQ:** `faqQuery`, `allFaqQuery`
- **Case Studies:** `caseStudiesListQuery`, `featuredCasesQuery`, `caseStudyQuery`
- **Blog:** `blogListQuery`, `blogPostQuery`
- **Sitemap:** queries для всех типов документов

**Статус:** ✅ Завершено

---

### ✅ 7.2 — Наполнение Sanity контентом

**Файл:** `sanity/migrate.ts`

Создан migration script, который автоматически переносит контент из `.copy.ts` в Sanity:

- ✅ Home page (3 локали)
- ✅ Services (6 услуг × 3 локали = 18 документов)
- ✅ OmniDash blocks (6 блоков × 3 локали = 18 документов)
- ✅ OmniDash FAQ (8 вопросов × 3 локали = 24 документа)
- ✅ Privacy page (3 локали)
- ✅ Contact page (3 локали)
- ✅ Cases page (3 локали)

**Команда для запуска:**

```bash
npm run migrate-content
```

**Результат миграции:**

- 12 pages
- 18 services
- 18 omnidashBlocks
- 25 FAQ (24 + 1 тестовый)

**Статус:** ✅ Завершено

---

### ✅ 7.3 — Переключение страниц на CMS

**Обновлённые файлы:**

1. **`app/[lang]/page.tsx`** — Home page
   - Fetch из CMS с fallback на `.copy.ts`
   - Использует `homePageQuery`
   - Tag: `page`

2. **`app/[lang]/services/page.tsx`** — Services page
   - Fetch из CMS с fallback на `.copy.ts`
   - Использует `servicesQuery`
   - Tag: `service`

**Паттерн интеграции:**

```typescript
// Fetch from CMS with fallback
const cmsData = await sanityClient.fetch(query, { locale: lang }, { next: { tags: ['type'] } });

// Use CMS data if available, otherwise fallback
const t = cmsData ?? fallbackCopy[lang];
```

**Статус:** ✅ Частично завершено (Home + Services)

**TODO:** Переключить остальные страницы:

- `/[lang]/omnidash`
- `/[lang]/contact`
- `/[lang]/privacy`
- `/[lang]/cases`

---

### ✅ 7.4 — Preview mode

**Созданные файлы:**

1. **`app/api/draft/route.ts`** — включение draft mode
   - Проверяет `SANITY_PREVIEW_SECRET`
   - Включает draft mode через `draftMode().enable()`
   - Редиректит на нужную страницу

2. **`app/api/disable-draft/route.ts`** — выключение draft mode
   - Отключает draft mode через `draftMode().disable()`
   - Редиректит на главную

**Preview client:**

- Уже создан в `sanity/client.ts` (Sprint 6)
- Использует `perspective: 'previewDrafts'`
- Требует `SANITY_API_TOKEN`

**Использование:**

```
https://analyst-online.vercel.app/api/draft?secret=YOUR_SECRET&slug=/ru/services
```

**Статус:** ✅ Завершено

**TODO:** Интегрировать preview mode в page components (проверять `draftMode()` и выбирать нужный client)

---

### ✅ 7.5 — Revalidation (ISR + webhook)

**Созданные файлы:**

1. **`app/api/revalidate/route.ts`** — webhook endpoint
   - Проверяет `SANITY_REVALIDATE_SECRET`
   - Парсит webhook body через `parseBody()`
   - Ревалидирует по тегу: `revalidateTag(body._type)`
   - Логирует результат

**Webhook URL:**

```
https://analyst-online.vercel.app/api/revalidate?secret=YOUR_SECRET
```

**Документация:**

- `docs/SANITY_WEBHOOK_SETUP.md` — пошаговая настройка webhook в Sanity Dashboard

**Статус:** ✅ Завершено

**TODO:** Настроить webhook в Sanity Dashboard после деплоя

---

### ✅ 7.6 — Документация

**Обновлённые файлы:**

1. **`docs/ENV_SETUP.md`**
   - Добавлены новые env-переменные:
     - `SANITY_PREVIEW_SECRET`
     - `SANITY_REVALIDATE_SECRET`
     - `SANITY_WEBHOOK_SECRET`
   - Инструкции по генерации секретов
   - Инструкции по настройке в Vercel

2. **`docs/SANITY_WEBHOOK_SETUP.md`** (новый)
   - Пошаговая настройка webhook в Sanity
   - Тестирование webhook
   - Troubleshooting

**Статус:** ✅ Завершено

---

## Новые файлы

```
sanity/
  queries.ts                    # GROQ queries для всех типов контента
  migrate.ts                    # Migration script .copy.ts → Sanity

app/
  api/
    draft/
      route.ts                  # Preview mode ON
    disable-draft/
      route.ts                  # Preview mode OFF
    revalidate/
      route.ts                  # ISR webhook endpoint

docs/
  SANITY_WEBHOOK_SETUP.md       # Инструкции по настройке webhook
  SPRINT_7_SUMMARY.md           # Этот файл
```

---

## Новые env-переменные

| Переменная                 | Назначение                                | Как получить                                                               |
| -------------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| `SANITY_PREVIEW_SECRET`    | Аутентификация preview mode               | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `SANITY_REVALIDATE_SECRET` | Аутентификация webhook                    | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `SANITY_WEBHOOK_SECRET`    | Валидация webhook signature (опционально) | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

---

## Новые npm scripts

```json
{
  "migrate-content": "dotenv -e .env.local -- tsx sanity/migrate.ts"
}
```

---

## Статистика миграции

**Документы созданы в Sanity:**

- 12 pages (home, privacy, contact, cases × 3 локали)
- 18 services (6 услуг × 3 локали)
- 18 omnidashBlocks (6 блоков × 3 локали)
- 25 FAQ (8 вопросов × 3 локали + 1 тестовый)

**Всего:** 73 документа

---

## Build Status

```bash
npm run build
```

**Результат:** ✅ Успешно

**Все роуты собраны:**

- ✅ `/[lang]` — Home (CMS-driven)
- ✅ `/[lang]/services` — Services (CMS-driven)
- ✅ `/[lang]/omnidash` — OmniDash (TODO: переключить на CMS)
- ✅ `/[lang]/contact` — Contact (TODO: переключить на CMS)
- ✅ `/[lang]/privacy` — Privacy (TODO: переключить на CMS)
- ✅ `/[lang]/cases` — Cases (TODO: переключить на CMS)
- ✅ `/studio/[[...tool]]` — Sanity Studio

---

## Что осталось сделать в Sprint 7

### 🔜 7.3 — Переключить остальные страницы на CMS

- [ ] `/[lang]/omnidash` — OmniDash landing
- [ ] `/[lang]/contact` — Contact page
- [ ] `/[lang]/privacy` — Privacy page
- [ ] `/[lang]/cases` — Cases page

### 🔜 7.4 — Интегрировать preview mode в pages

- [ ] Проверять `draftMode()` в page components
- [ ] Выбирать `previewClient` если draft mode включён
- [ ] Показывать индикатор preview mode

### 🔜 7.6 — Удалить хардкод (финал)

- [ ] Удалить или пометить как deprecated файлы `content/*.copy.ts`
- [ ] Убрать fallback-логику из страниц (опционально)

---

## Следующие шаги

1. **Завершить Sprint 7:**
   - Переключить остальные страницы на CMS
   - Интегрировать preview mode
   - Протестировать все страницы

2. **Деплой Sprint 7:**
   - Добавить новые env-переменные в Vercel
   - Задеплоить на production
   - Настроить webhook в Sanity Dashboard
   - Протестировать ISR revalidation

3. **Sprint 8 — Blog:**
   - Инфраструктура блога
   - Portable Text рендеринг
   - SEO для статей

---

**Прогресс Sprint 7:** ~70% завершено

**Оценка оставшегося времени:** 2–3 часа

---

**Дата обновления:** 2026-03-22
