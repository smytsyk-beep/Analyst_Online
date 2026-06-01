# Sanity CMS Setup — Sprint 6

## Статус: ✅ Инфраструктура готова

### Что уже сделано

- [x] Установлены зависимости: `next-sanity`, `@sanity/image-url`, `@sanity/vision`, `sanity`
- [x] Создана конфигурация: `sanity/config.ts`, `sanity/client.ts`, `sanity/image.ts`
- [x] Описаны 6 контент-схем:
  - `page` — общие страницы (Home, Privacy, Contact и т.д.)
  - `service` — услуги
  - `caseStudy` — кейсы
  - `faq` — FAQ элементы
  - `omnidashBlock` — блоки лендинга OmniDash
  - `blogPost` — статьи блога
- [x] Создан `sanity.config.ts` в корне проекта
- [x] Создан embedded Sanity Studio: `app/studio/[[...tool]]/page.tsx`
- [x] `next build` проходит успешно

---

## Что нужно сделать дальше

### Шаг 1: Создать Sanity project

1. Перейти на https://sanity.io
2. Зарегистрироваться / войти
3. Создать новый проект:
   - Название: `Analyst Online`
   - Dataset: `production`
4. Скопировать **Project ID** (формат: `abc123xyz`)

### Шаг 2: Создать API Token

1. Перейти в https://sanity.io/manage
2. Выбрать проект `Analyst Online`
3. Перейти в **API** → **Tokens**
4. Нажать **Add API token**
5. Настройки:
   - Name: `Next.js Server`
   - Permissions: **Editor**
6. Скопировать токен (показывается только один раз!)

### Шаг 3: Добавить переменные в `.env.local`

Открыть `.env.local` и добавить:

```bash
# Sanity CMS Configuration (Sprint 6)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Заменить:

- `abc123xyz` → реальный Project ID
- `skXXX...` → реальный API Token

### Шаг 4: Запустить dev server и открыть Studio

```bash
npm run dev
```

Открыть в браузере:

```
http://localhost:3000/studio
```

При первом открытии Sanity попросит авторизоваться — использовать тот же аккаунт, что и на sanity.io.

### Шаг 5: Проверить, что Studio работает

В Studio должны быть видны 6 типов документов:

- Page
- Service
- Case Study
- FAQ
- OmniDash Block
- Blog Post

Попробовать создать тестовый документ (например, FAQ):

- Question: "Test question"
- Answer: "Test answer"
- Locale: `ru`
- Category: `general`
- Order: `0`

Сохранить (Ctrl+S / Cmd+S или кнопка Publish).

### Шаг 6: Проверить fetch из кода

Создать тестовый файл `scripts/test-sanity.ts`:

```typescript
import { sanityClient } from '@/sanity/client';
import { groq } from 'next-sanity';

async function testSanity() {
  const result = await sanityClient.fetch(groq`*[_type == "faq"][0]`);
  console.log('Sanity test result:', result);
}

testSanity();
```

Запустить:

```bash
npx tsx scripts/test-sanity.ts
```

Должен вывести созданный FAQ документ.

---

## Troubleshooting

### Ошибка: "Configuration must contain projectId"

Проверить, что:

- `.env.local` содержит `NEXT_PUBLIC_SANITY_PROJECT_ID`
- dev server перезапущен после добавления переменных

### Ошибка: "Unauthorized" при открытии Studio

- Убедиться, что авторизованы на sanity.io
- Проверить, что Project ID правильный
- Попробовать очистить cookies и авторизоваться заново

### Studio не открывается (404)

- Проверить, что `app/studio/[[...tool]]/page.tsx` существует
- Проверить, что `sanity.config.ts` содержит `basePath: '/studio'`
- Перезапустить dev server

---

## Следующий шаг

После успешной настройки Sanity переходим к **Sprint 7** — миграция контента из `.copy.ts` файлов в CMS.

---

## Полезные ссылки

- Sanity Dashboard: https://sanity.io/manage
- Sanity Docs: https://www.sanity.io/docs
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet
