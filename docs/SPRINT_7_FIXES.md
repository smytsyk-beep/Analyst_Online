# Sprint 7 — Fixes (Codex Review)

**Дата:** 2026-03-22  
**Статус:** ✅ Исправлено

---

## Проблемы от Codex

### 1. ❌ Prettier formatting error

**Проблема:**

```
Code style issues found in 13 files. Run Prettier with --write to fix.
```

**Исправление:**

```bash
npm run format
```

**Статус:** ✅ Исправлено

---

### 2. 🔒 Preview redirect vulnerability

**Проблема:**

```typescript
// app/api/draft/route.ts
redirect(slug || '/');
```

Preview endpoint редиректит напрямую из user-controlled `slug` query param. Если preview secret утекает (logs, shared links, referrers), это может быть использовано как open redirect от вашего trusted domain.

**Исправление:**

```typescript
// app/api/draft/route.ts
// Validate slug to prevent open redirect vulnerabilities
// Only allow internal paths starting with /
const safePath = slug && slug.startsWith('/') ? slug : '/';
redirect(safePath);
```

**Статус:** ✅ Исправлено

---

### 3. 🎯 OmniDash block type mismatch

**Проблема:**

Transform switch обрабатывает `'pain'`, `'how'`, и `'cta'`, но Sanity schema для `omnidashBlock.blockType` использует `'painPoints'`, `'howItWorks'`, и `'ctaBottom'`. Когда редакторы создают/обновляют эти блоки в Studio, эти cases никогда не выполняются, поэтому опубликованный CMS контент молча игнорируется и страница продолжает показывать fallback текст для этих секций.

**Исправление:**

1. **Migration script** (`sanity/migrate.ts`):

```typescript
// Было:
blockType: 'pain';
blockType: 'how';
blockType: 'cta';

// Стало:
blockType: 'painPoints';
blockType: 'howItWorks';
blockType: 'ctaBottom';
```

2. **Transform function** (`app/[lang]/omnidash/page.tsx`):

```typescript
// Было:
case 'pain':
case 'how':
case 'cta':

// Стало:
case 'painPoints':
case 'howItWorks':
case 'ctaBottom':
```

3. **Cleanup script** (`sanity/cleanup-blocks.ts`):

- Создан скрипт для удаления старых блоков с неправильными blockType
- Команда: `npm run cleanup-blocks`

**Статус:** ✅ Исправлено

---

### 4. 🛡️ Skip CMS fetch when Sanity is not configured

**Проблема:**

Страницы вызывают `sanityClient.fetch(...)` перед применением hardcoded fallback, поэтому когда `NEXT_PUBLIC_SANITY_PROJECT_ID` не установлен (или оставлен как новое значение `'placeholder'` в `sanity/config.ts`), fetch падает и request завершается с 500 вместо graceful degradation на fallback copy. Тот же паттерн появляется в новых services/omnidash pages, поэтому deployments без полной Sanity env setup будут ломаться вместо graceful degradation.

**Исправление:**

1. **Home page** (`app/[lang]/page.tsx`):

```typescript
// Fetch from CMS with fallback to hardcoded copy
let cmsData = null;
if (isSanityConfigured()) {
  try {
    cmsData = await sanityClient.fetch(
      homePageQuery,
      { locale: lang },
      { next: { tags: ['page'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch from Sanity CMS, using fallback:', error);
  }
}

// Use CMS data if available, otherwise fallback to .copy.ts
const t = cmsData
  ? { ...homeCopy[lang], heroTitle: cmsData.title, heroSubtitle: cmsData.description }
  : homeCopy[lang];
```

2. **Services page** (`app/[lang]/services/page.tsx`):

```typescript
// Fetch services from CMS
let cmsServices = null;
if (isSanityConfigured()) {
  try {
    cmsServices = await sanityClient.fetch(
      servicesQuery,
      { locale: lang },
      { next: { tags: ['service'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch services from Sanity CMS, using fallback:', error);
  }
}
```

3. **OmniDash page** (`app/[lang]/omnidash/page.tsx`):

```typescript
// Fetch OmniDash blocks from CMS
let cmsBlocks = null;
let cmsFaq = null;

if (isSanityConfigured()) {
  try {
    cmsBlocks = await sanityClient.fetch(
      omnidashBlocksQuery,
      { locale: lang },
      { next: { tags: ['omnidashBlock'] } },
    );

    cmsFaq = await sanityClient.fetch(
      faqQuery,
      { locale: lang, category: 'omnidash' },
      { next: { tags: ['faq'] } },
    );
  } catch (error) {
    console.warn('Failed to fetch OmniDash content from Sanity CMS, using fallback:', error);
  }
}
```

**Статус:** ✅ Исправлено

---

## Новые файлы

```
sanity/
  cleanup-blocks.ts           # Скрипт для удаления старых блоков

docs/
  SPRINT_7_FIXES.md           # Этот файл
```

---

## Новые npm scripts

```json
{
  "cleanup-blocks": "dotenv -e .env.local -- tsx sanity/cleanup-blocks.ts"
}
```

---

## Обновлённые файлы

```
app/
  api/
    draft/
      route.ts                # Исправлен open redirect vulnerability
  [lang]/
    page.tsx                  # Добавлена проверка isSanityConfigured()
    services/
      page.tsx                # Добавлена проверка isSanityConfigured()
    omnidash/
      page.tsx                # Исправлены blockType names + проверка isSanityConfigured()

sanity/
  migrate.ts                  # Исправлены blockType names

package.json                  # Добавлен cleanup-blocks script
```

---

## Тестирование

### 1. Build проходит

```bash
npm run build
```

✅ Успешно

### 2. Cleanup + Migration

```bash
npm run cleanup-blocks
npm run migrate-content
```

✅ Удалено 9 старых блоков (3 × 3 локали)  
✅ Создано 9 новых блоков с правильными blockType

### 3. Prettier

```bash
npm run format
```

✅ Все файлы отформатированы

---

## Готово к деплою

Все замечания от Codex исправлены:

- ✅ Prettier formatting
- ✅ Preview redirect vulnerability
- ✅ OmniDash block type mismatch
- ✅ Graceful degradation без Sanity

**Следующий шаг:** Деплой согласно `docs/DEPLOY_SPRINT7.md`

---

**Дата исправлений:** 2026-03-22
