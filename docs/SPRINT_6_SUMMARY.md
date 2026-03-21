# Sprint 6 — Summary

**Дата:** 2026-03-17  
**Статус:** ✅ Инфраструктура готова, ждёт настройки проекта на sanity.io

---

## Что сделано

### 1. Установлены зависимости

```bash
npm install next-sanity @sanity/image-url @sanity/vision sanity
```

### 2. Создана инфраструктура Sanity

| Файл                              | Назначение                                   |
| --------------------------------- | -------------------------------------------- |
| `sanity/config.ts`                | Конфигурация: projectId, dataset, apiVersion |
| `sanity/client.ts`                | Sanity clients (обычный + preview)           |
| `sanity/image.ts`                 | Хелпер `urlFor()` для изображений            |
| `sanity.config.ts`                | Главный конфиг Sanity Studio                 |
| `app/studio/[[...tool]]/page.tsx` | Embedded Studio по адресу `/studio`          |

### 3. Описаны 6 контент-схем

| Schema            | Файл                              | Назначение                                  |
| ----------------- | --------------------------------- | ------------------------------------------- |
| **page**          | `sanity/schemas/page.ts`          | Общие страницы (Home, Privacy, Contact)     |
| **service**       | `sanity/schemas/service.ts`       | Услуги с order и featured                   |
| **caseStudy**     | `sanity/schemas/caseStudy.ts`     | Кейсы с metrics, images, challenge/solution |
| **faq**           | `sanity/schemas/faq.ts`           | FAQ с category (omnidash/general/services)  |
| **omnidashBlock** | `sanity/schemas/omnidashBlock.ts` | Блоки лендинга OmniDash                     |
| **blogPost**      | `sanity/schemas/blogPost.ts`      | Статьи блога с Portable Text                |

Все схемы поддерживают 3 локали: `ru`, `ua`, `ro`.

### 4. Обновлена документация

- `docs/ENV_SETUP.md` — добавлены переменные для Sanity
- `docs/SANITY_SETUP.md` — пошаговая инструкция по настройке
- `docs/Analyst_Online_Sprint_Status_2026-03-17.md` — обновлён статус Sprint 6

### 5. Проверки пройдены

- ✅ `npm run build` — успешно
- ✅ `npm run lint` — без ошибок
- ✅ `npm run format` — отформатировано

---

## Что нужно сделать дальше

### Шаг 1: Создать Sanity project

1. Перейти на https://sanity.io
2. Зарегистрироваться / войти
3. Создать новый проект:
   - Название: `Analyst Online`
   - Dataset: `production`
4. Скопировать **Project ID**

### Шаг 2: Создать API Token

1. Перейти в https://sanity.io/manage
2. Выбрать проект → API → Tokens → Add API token
3. Настройки:
   - Name: `Next.js Server`
   - Permissions: **Editor**
4. Скопировать токен

### Шаг 3: Добавить переменные в `.env.local`

```bash
# Sanity CMS Configuration (Sprint 6)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Шаг 4: Запустить и проверить Studio

```bash
npm run dev
```

Открыть: http://localhost:3000/studio

При первом открытии Sanity попросит авторизоваться.

### Шаг 5: Создать тестовый документ

В Studio создать тестовый FAQ:

- Question: "Test question"
- Answer: "Test answer"
- Locale: `ru`
- Category: `general`
- Order: `0`

Сохранить (Ctrl+S / Cmd+S).

---

## Следующий Sprint

После успешной настройки Sanity переходим к **Sprint 7** — миграция контента из `.copy.ts` файлов в CMS.

Подробный план: `docs/Analyst_Online_Sprint_Plan_6-10.md`

---

## Полезные ссылки

- Sanity Dashboard: https://sanity.io/manage
- Sanity Docs: https://www.sanity.io/docs
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet
- Подробная инструкция: `docs/SANITY_SETUP.md`
