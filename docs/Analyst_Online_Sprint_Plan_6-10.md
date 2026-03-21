# Analyst Online + OmniDash — Sprint Plan 6–10

Дата: 2026-03-17  
Статус: 📋 Roadmap / Planning

---

## Контекст

Спринты 1–5 завершены. Сайт имеет:

- рабочую структуру страниц (Home, Services, Contact, Cases, Privacy, OmniDash, Blog)
- локализацию (ru / ua / ro) с geo-routing
- рабочую контактную форму (Telegram + Google Sheets)
- SEO-фундамент (metadata, sitemap, robots, JSON-LD, hreflang)
- production assets (favicon, OG image, логотип)

Следующий этап — CMS, блог, кейсы, аналитика.

---

## Сводная таблица

| Sprint | Фокус                                    | Оценка | Зависимости                         |
| ------ | ---------------------------------------- | ------ | ----------------------------------- |
| **6**  | Sanity CMS: подключение + схемы + Studio | 4–6 ч  | Создать Sanity project              |
| **7**  | Миграция контента + preview + ISR        | 6–8 ч  | Sprint 6                            |
| **8**  | Blog: инфраструктура                     | 5–7 ч  | Sprint 7                            |
| **9**  | Cases: реальный контент                  | 5–7 ч  | Sprint 7 + реальные кейсы           |
| **10** | Аналитика + конверсия                    | 4–6 ч  | Независим (можно параллельно с 8–9) |

**Общая оценка: ~24–34 часа**

### Рекомендуемый порядок

```
Sprint 6 → Sprint 7 → Sprint 8 ──┐
                      Sprint 10 ──┤→ Sprint 9
```

- Sprint 6 → Sprint 7: строго последовательно
- Sprint 10: можно начать параллельно с Sprint 8
- Sprint 9: блокируется реальными кейсами от клиента

---

## Sprint 6 — Sanity CMS: подключение + контент-модель

**Статус:** 🔜 Backlog  
**Оценка:** 4–6 часов

### Цель

Подключить Sanity CMS к проекту, описать контент-схемы, поднять Studio, подготовить инфраструктуру для миграции контента. Страницы продолжают работать на `.copy.ts` — ничего не ломается.

### Предварительные условия

- Создать Sanity project на sanity.io (бесплатный план достаточен)
- Получить `projectId` и `dataset` (обычно `production`)

### Задачи

#### 6.1 — Установка зависимостей

```bash
npm install next-sanity @sanity/image-url @sanity/vision sanity
```

#### 6.2 — Конфигурация Sanity client

Создать файлы:

- `sanity/config.ts` — projectId, dataset, apiVersion, useCdn
- `sanity/client.ts` — экспорт `sanityClient` для GROQ-запросов
- `sanity/image.ts` — хелпер `urlFor(source)` через `@sanity/image-url`

```typescript
// sanity/config.ts
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};
```

#### 6.3 — Контент-схемы (Sanity schemas)

Создать папку `sanity/schemas/` со следующими документами:

| Schema          | Назначение                            | Ключевые поля                                                                                    |
| --------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `page`          | Общая страница (Home, Privacy и т.д.) | `slug`, `locale`, `title`, `description`, `body` (Portable Text)                                 |
| `service`       | Услуга                                | `slug`, `locale`, `title`, `description`, `icon`, `order`                                        |
| `caseStudy`     | Кейс                                  | `slug`, `locale`, `title`, `client`, `challenge`, `solution`, `results`, `images[]`, `metrics[]` |
| `faq`           | FAQ-элемент                           | `locale`, `question`, `answer`, `category` (omnidash / general)                                  |
| `omnidashBlock` | Блоки лендинга OmniDash               | `locale`, `blockType`, `content`, `order`                                                        |
| `blogPost`      | Статья блога                          | `slug`, `locale`, `title`, `excerpt`, `body`, `publishedAt`, `author`, `coverImage`              |

> **Важно:** каждая схема содержит поле `locale` (enum: `ru`, `ua`, `ro`). Это проще, чем document-level i18n плагин, и соответствует текущей архитектуре проекта.

#### 6.4 — Sanity Studio (embedded)

```typescript
// app/studio/[[...tool]]/page.tsx
'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

```typescript
// sanity.config.ts (корень проекта)
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { sanityConfig } from './sanity/config';

export default defineConfig({
  name: 'analyst-online',
  title: 'Analyst Online CMS',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

#### 6.5 — Env-переменные

Добавить в `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
```

### Чеклист Sprint 6

- [ ] Зависимости установлены
- [ ] `sanity/config.ts`, `sanity/client.ts`, `sanity/image.ts` созданы
- [ ] Все 6 схем описаны в `sanity/schemas/`
- [ ] `sanity.config.ts` создан в корне
- [ ] `/studio` открывается и показывает Sanity Studio
- [ ] Можно создать тестовый документ в Studio
- [ ] `sanityClient.fetch()` возвращает данные
- [ ] `next build` проходит без ошибок

### Результат Sprint 6

Sanity подключён, Studio работает по адресу `/studio`, схемы описаны. Инфраструктура готова к наполнению контентом. Существующие страницы продолжают работать без изменений.

---

## Sprint 7 — Sanity: миграция контента + preview + ISR

**Статус:** 🔜 Backlog  
**Оценка:** 6–8 часов  
**Зависит от:** Sprint 6

### Цель

Перевести все страницы с хардкода `.copy.ts` на CMS-driven rendering. Настроить preview mode и автоматическую ревалидацию через webhook.

### Задачи

#### 7.1 — GROQ queries

Создать `sanity/queries.ts`:

```typescript
import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home" && locale == $locale][0]
`;

export const servicesQuery = groq`
  *[_type == "service" && locale == $locale] | order(order asc)
`;

export const omnidashBlocksQuery = groq`
  *[_type == "omnidashBlock" && locale == $locale] | order(order asc)
`;

export const faqQuery = groq`
  *[_type == "faq" && locale == $locale && category == $category]
`;

export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && locale == $locale] | order(publishedAt desc)
`;

export const privacyPageQuery = groq`
  *[_type == "page" && slug.current == "privacy" && locale == $locale][0]
`;
```

#### 7.2 — Наполнение Sanity контентом

Перенести данные из 6 файлов `.copy.ts` в Sanity:

| Источник           | Тип документа          | Количество    |
| ------------------ | ---------------------- | ------------- |
| `home.copy.ts`     | `page` (slug: home)    | 3 (по локали) |
| `services.copy.ts` | `service`              | 3 × N услуг   |
| `omnidash.copy.ts` | `omnidashBlock`        | 3 × N блоков  |
| `contact.copy.ts`  | `page` (slug: contact) | 3             |
| `privacy.copy.ts`  | `page` (slug: privacy) | 3             |
| `cases.copy.ts`    | `page` (slug: cases)   | 3             |

> **Опция:** написать migration script `sanity/migrate.ts`, который читает `.copy.ts` и создаёт документы через Sanity API. Это быстрее, чем вбивать вручную.

#### 7.3 — Переключение страниц на CMS

Паттерн для каждой страницы — fetch из CMS с fallback на хардкод:

```typescript
// app/[lang]/page.tsx — пример паттерна
import { sanityClient } from '@/sanity/client';
import { homePageQuery } from '@/sanity/queries';
import { homeCopy } from '@/content/home.copy'; // fallback

export default async function LangHome({ params }: Props) {
  const { lang } = await params;

  const cmsData = await sanityClient.fetch(homePageQuery, { locale: lang });
  const t = cmsData ?? homeCopy[lang]; // fallback если CMS недоступен

  // ... render
}
```

Страницы для переключения:

- `app/[lang]/page.tsx`
- `app/[lang]/services/page.tsx`
- `app/[lang]/omnidash/page.tsx`
- `app/[lang]/contact/page.tsx`
- `app/[lang]/privacy/page.tsx`
- `app/[lang]/cases/page.tsx`

#### 7.4 — Preview mode

- `app/api/draft/route.ts` — включение draft mode через Sanity preview URL
- `app/api/disable-draft/route.ts` — выключение draft mode
- В `sanity/client.ts` добавить `previewClient` с `token` и `perspective: 'previewDrafts'`
- В page компонентах проверять `draftMode()` и выбирать нужный client

#### 7.5 — Revalidation (ISR + webhook)

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const type = body._type;

  revalidateTag(type); // 'page', 'service', 'caseStudy', etc.

  return NextResponse.json({ revalidated: true });
}
```

- В Sanity Dashboard → Settings → Webhooks → добавить URL `https://analyst-online.com/api/revalidate?secret=xxx`
- В fetch-запросах использовать `{ next: { tags: ['page'] } }`

#### 7.6 — Удаление хардкода (финал)

После подтверждения стабильности:

- Удалить или пометить как deprecated файлы `content/*.copy.ts`
- Убрать fallback-логику из страниц

### Чеклист Sprint 7

- [ ] `sanity/queries.ts` создан со всеми GROQ-запросами
- [ ] Контент перенесён в Sanity (все 6 типов × 3 локали)
- [ ] Все страницы рендерятся из CMS
- [ ] Fallback на `.copy.ts` работает при недоступности CMS
- [ ] Preview mode работает (видны черновики)
- [ ] Webhook настроен в Sanity Dashboard
- [ ] Изменение в Studio → webhook → страница обновляется за ~5 сек
- [ ] `next build` проходит

### Результат Sprint 7

Весь контент управляется через Sanity Studio. Можно редактировать тексты без деплоя. Preview и ISR работают.

---

## Sprint 8 — Blog: инфраструктура

**Статус:** 🔜 Backlog  
**Оценка:** 5–7 часов  
**Зависит от:** Sprint 7

### Цель

Полноценная блоговая система: список статей, страница статьи, SEO, типографика. Контент управляется через Sanity.

### Задачи

#### 8.1 — Уточнение Sanity schema `blogPost`

```typescript
// sanity/schemas/blogPost.ts
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (r) => r.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'locale', type: 'string', options: { list: ['ru', 'ua', 'ro'] } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    {
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'seoTitle', type: 'string' },
    { name: 'seoDescription', type: 'text', rows: 2 },
  ],
  orderings: [
    {
      title: 'Published',
      name: 'published',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
};
```

#### 8.2 — GROQ queries для блога

```typescript
// Добавить в sanity/queries.ts

export const blogListQuery = groq`
  *[_type == "blogPost" && locale == $locale && defined(publishedAt)]
  | order(publishedAt desc) {
    title, slug, excerpt, coverImage, publishedAt, tags
  }
`;

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && locale == $locale][0] {
    title, slug, excerpt, coverImage, body, publishedAt, tags,
    seoTitle, seoDescription
  }
`;
```

#### 8.3 — Страница списка статей

Переработать `app/[lang]/blog/page.tsx`:

- Если есть статьи в CMS → показать карточки
- Если нет → показать текущий placeholder (graceful degradation)
- Карточка: coverImage, title, excerpt, дата, теги

#### 8.4 — Страница статьи

Создать `app/[lang]/blog/[slug]/page.tsx`:

- Fetch по slug + locale
- Рендер Portable Text через `@portabletext/react`
- `generateMetadata()` с seoTitle/seoDescription из CMS
- JSON-LD `Article` schema
- Breadcrumbs: Home → Blog → Статья
- Навигация «← Назад к блогу»

```bash
npm install @portabletext/react
```

#### 8.5 — Типографика для статей

Создать `components/blog/portable-text.tsx` — кастомные компоненты для Portable Text:

- Заголовки h2–h4
- Параграфы, списки, ссылки
- Изображения с подписями

Стилизация через Tailwind Typography:

```bash
npm install @tailwindcss/typography
```

```javascript
// tailwind.config.js
plugins: [require('@tailwindcss/typography')];
```

Использование:

```tsx
<article className="prose prose-invert max-w-none">
  <PortableText value={post.body} components={portableTextComponents} />
</article>
```

#### 8.6 — SEO для блога

- `generateMetadata()` на обеих страницах (список + статья)
- `alternates` с hreflang
- OG image из coverImage статьи
- JSON-LD `Article` schema на странице статьи
- Добавить blog posts в `app/sitemap.ts` (динамически из CMS)

#### 8.7 — `generateStaticParams` для blog

```typescript
// app/[lang]/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await sanityClient.fetch(
    groq`*[_type == "blogPost"]{ "slug": slug.current, locale }`,
  );
  return posts.map((p) => ({ lang: p.locale, slug: p.slug }));
}
```

#### 8.8 — Компоненты

- `components/blog/post-card.tsx` — карточка для списка
- `components/blog/post-header.tsx` — шапка статьи (title, date, tags, coverImage)
- `components/blog/portable-text.tsx` — рендер Portable Text

### Чеклист Sprint 8

- [ ] `blogPost` schema уточнена и работает в Studio
- [ ] GROQ queries для блога добавлены
- [ ] `/[lang]/blog` показывает список или пустое состояние
- [ ] `/[lang]/blog/[slug]` рендерит статью
- [ ] Portable Text рендерится корректно
- [ ] `@tailwindcss/typography` подключён
- [ ] SEO metadata корректна на обеих страницах
- [ ] JSON-LD `Article` schema добавлена
- [ ] Blog posts добавлены в sitemap
- [ ] `generateStaticParams` работает
- [ ] Responsive на всех breakpoints
- [ ] `next build` проходит

### Результат Sprint 8

Блог полностью функционален. Можно публиковать статьи через Sanity Studio — они автоматически появляются на сайте с правильным SEO.

---

## Sprint 9 — Cases: реальный контент

**Статус:** 🔜 Backlog  
**Оценка:** 5–7 часов  
**Зависит от:** Sprint 7 + **реальные кейсы от клиента**

### Цель

Превратить placeholder `/cases` в реальную страницу с кейсами. Подготовить инфраструктуру для детальных case pages. Интегрировать featured кейсы на Home page.

### Предварительные условия

> ⚠️ **Нужны реальные данные:**
>
> - Описания кейсов (клиент, задача, решение, результат)
> - Скриншоты дашбордов / результатов
> - Метрики / KPI (если можно показать)
> - Разрешение на публикацию (анонимизация если нужно)
>
> Без реальных данных — оставляем placeholder. Ничего не выдумываем.

### Задачи

#### 9.1 — Уточнение Sanity schema `caseStudy`

```typescript
// sanity/schemas/caseStudy.ts
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'locale', type: 'string', options: { list: ['ru', 'ua', 'ro'] } },
    { name: 'client', type: 'string', description: 'Название клиента или "Анонимный клиент"' },
    { name: 'industry', type: 'string' },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'challenge', type: 'text', rows: 4 },
    { name: 'solution', type: 'text', rows: 4 },
    { name: 'results', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
            { name: 'description', type: 'string' },
          ],
        },
      ],
    },
    { name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'featured', type: 'boolean', initialValue: false },
  ],
};
```

#### 9.2 — GROQ queries для кейсов

```typescript
// Добавить в sanity/queries.ts

export const caseStudiesListQuery = groq`
  *[_type == "caseStudy" && locale == $locale && defined(publishedAt)]
  | order(publishedAt desc) {
    title, slug, client, industry, coverImage, metrics, tags, featured
  }
`;

export const featuredCasesQuery = groq`
  *[_type == "caseStudy" && locale == $locale && featured == true]
  | order(publishedAt desc)[0...3] {
    title, slug, client, industry, coverImage, metrics
  }
`;

export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && locale == $locale][0]
`;
```

#### 9.3 — Страница списка кейсов

Переработать `app/[lang]/cases/page.tsx`:

- Если есть кейсы в CMS → показать карточки
- Если нет → показать текущий placeholder (graceful degradation)
- Карточка: coverImage, title, client, industry, краткие метрики

#### 9.4 — Детальная страница кейса

Создать `app/[lang]/cases/[slug]/page.tsx`:

- Hero с coverImage
- Блок «Клиент / Индустрия»
- Блок «Задача» (challenge)
- Блок «Решение» (solution)
- Блок «Результаты» с KPI-карточками (metrics)
- Галерея скриншотов (images)
- CTA внизу: «Хотите такой же результат?»
- JSON-LD `CreativeWork` schema
- Breadcrumbs: Home → Cases → Кейс

#### 9.5 — Компоненты

- `components/cases/case-card.tsx` — карточка для списка
- `components/cases/metrics-grid.tsx` — сетка KPI-метрик
- `components/cases/case-gallery.tsx` — галерея скриншотов

#### 9.6 — Интеграция с Home page

Обновить `components/home/social-proof.tsx`:

- Если в CMS есть featured кейсы → показать 2–3 карточки
- Если нет → оставить текущий placeholder текст
- Ссылка «Все кейсы →» на `/[lang]/cases`

#### 9.7 — SEO

- `generateMetadata()` для `/cases/[slug]`
- Добавить case pages в `app/sitemap.ts` (динамически из CMS)
- JSON-LD schema
- OG image из coverImage

#### 9.8 — Наполнение контентом

- Загрузить реальные кейсы в Sanity (минимум 1–2 для старта)
- Если кейсов пока нет — оставить placeholder

### Чеклист Sprint 9

- [ ] `caseStudy` schema уточнена и работает в Studio
- [ ] GROQ queries для кейсов добавлены
- [ ] `/[lang]/cases` показывает список или placeholder
- [ ] `/[lang]/cases/[slug]` рендерит детальный кейс
- [ ] KPI-метрики отображаются как карточки
- [ ] Галерея скриншотов работает
- [ ] Home page подтягивает featured кейсы
- [ ] Case pages добавлены в sitemap
- [ ] SEO metadata корректна
- [ ] `next build` проходит

### Результат Sprint 9

Cases — полноценная секция сайта. Можно добавлять кейсы через CMS, они автоматически появляются в списке и на Home page.

---

## Sprint 10 — Аналитика + конверсия

**Статус:** 🔜 Backlog  
**Оценка:** 4–6 часов  
**Зависит от:** Независим (можно параллельно с Sprint 8–9)

### Цель

Подключить аналитику, настроить event tracking, добавить UTM support и cookie consent. Видеть трафик, конверсии и источники лидов.

### Стек аналитики

| Инструмент           | Назначение                           | Стоимость   |
| -------------------- | ------------------------------------ | ----------- |
| **Vercel Analytics** | Web Vitals, page views, zero-config  | Бесплатно   |
| **GA4**              | Полная аналитика, воронки, аудитории | Бесплатно   |
| Plausible            | Privacy-friendly альтернатива GA4    | Опционально |

Минимум для MVP: **Vercel Analytics + GA4**.

### Задачи

#### 10.1 — Vercel Analytics

```bash
npm install @vercel/analytics @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

#### 10.2 — GA4

Создать `components/analytics/google-analytics.tsx`:

```typescript
'use client';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
```

Добавить в `.env.local`:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### 10.3 — Event tracking

Создать `lib/analytics.ts` — единый интерфейс для событий:

```typescript
// lib/analytics.ts
type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export function trackEvent({ action, category, label, value }: EventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}
```

Ключевые события для трекинга:

| Событие                  | Где                     | Параметры                                                     |
| ------------------------ | ----------------------- | ------------------------------------------------------------- |
| `cta_click`              | Все CTA кнопки          | `category: 'cta'`, `label: 'telegram' / 'email' / 'omnidash'` |
| `form_submit`            | Contact form            | `category: 'lead'`, `label: locale`                           |
| `form_success`           | После успешной отправки | `category: 'lead'`, `label: 'success'`                        |
| `omnidash_pricing_click` | Pricing секция OmniDash | `category: 'omnidash'`, `label: plan_name`                    |
| `language_switch`        | Language switcher       | `category: 'navigation'`, `label: target_locale`              |
| `case_view`              | Страница кейса          | `category: 'content'`, `label: case_slug`                     |

Интегрировать `trackEvent()` в:

- `components/contact/contact-form.tsx` — при submit и success
- Все CTA кнопки (Telegram, Email, OmniDash)
- Language switcher
- Pricing кнопки на `/omnidash`

#### 10.4 — UTM support

Создать `lib/utm.ts`:

```typescript
// lib/utm.ts
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export function captureUtmParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  for (const key of UTM_PARAMS) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  if (Object.keys(utm).length > 0) {
    sessionStorage.setItem('ao_utm', JSON.stringify(utm));
  }
}

export function getStoredUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem('ao_utm') || '{}');
  } catch {
    return {};
  }
}
```

- Вызывать `captureUtmParams()` при загрузке (client component в layout)
- Передавать UTM в `submitContactForm()` и в Google Sheets
- Добавить колонки `utm_source`, `utm_medium`, `utm_campaign`, `page_url` в Google Sheets

#### 10.5 — Cookie consent banner

Создать `components/shared/cookie-consent.tsx`:

- Показывать баннер при первом визите
- Хранить согласие в `localStorage` (`ao_cookie_consent`)
- Если согласие не дано — **не загружать GA4 скрипт**
- Простой UI: текст + кнопки «Принять» / «Отклонить»
- Локализация на 3 языка (ru / ua / ro)

Логика загрузки аналитики:

```
consent === 'accepted'  → загружаем GA4 + Vercel Analytics
consent === 'rejected'  → только Vercel Analytics (не требует consent)
consent не установлен   → показываем баннер, GA4 не грузим
```

#### 10.6 — Расширение contact form

Обновить `app/actions/contact.ts`:

- Принимать UTM параметры в payload
- Записывать в Google Sheets дополнительные колонки: `utm_source`, `utm_medium`, `utm_campaign`, `page_url`

Обновить `scripts/init-sheet.ts`:

- Добавить новые заголовки колонок

### Чеклист Sprint 10

- [ ] `@vercel/analytics` и `@vercel/speed-insights` установлены и работают
- [ ] GA4 получает page views (проверить в GA4 Realtime)
- [ ] `lib/analytics.ts` создан
- [ ] Events трекаются: CTA clicks, form submits, form success
- [ ] `lib/utm.ts` создан
- [ ] UTM параметры сохраняются в sessionStorage
- [ ] UTM передаётся в contact form и Google Sheets
- [ ] Cookie consent баннер работает
- [ ] GA4 не загружается без согласия пользователя
- [ ] `next build` проходит

### Результат Sprint 10

Полноценная аналитика: видим трафик, конверсии, источники лидов. Cookie consent соответствует GDPR. UTM позволяет отслеживать эффективность каналов (Telegram, LinkedIn, Email outreach).

---

## Приложение: новые env-переменные

| Переменная                      | Sprint | Назначение                        |
| ------------------------------- | ------ | --------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | 6      | Sanity project ID                 |
| `NEXT_PUBLIC_SANITY_DATASET`    | 6      | Sanity dataset (production)       |
| `SANITY_API_TOKEN`              | 6      | Sanity API token для server-side  |
| `SANITY_REVALIDATE_SECRET`      | 7      | Secret для webhook revalidation   |
| `NEXT_PUBLIC_GA_ID`             | 10     | Google Analytics 4 Measurement ID |

---

## Приложение: новые зависимости

| Пакет                     | Sprint | Назначение                  |
| ------------------------- | ------ | --------------------------- |
| `next-sanity`             | 6      | Next.js интеграция с Sanity |
| `sanity`                  | 6      | Sanity Studio               |
| `@sanity/image-url`       | 6      | Хелпер для изображений      |
| `@sanity/vision`          | 6      | GROQ playground в Studio    |
| `@portabletext/react`     | 8      | Рендер Portable Text        |
| `@tailwindcss/typography` | 8      | Типографика для статей      |
| `@vercel/analytics`       | 10     | Vercel Analytics            |
| `@vercel/speed-insights`  | 10     | Vercel Speed Insights       |

---

## Приложение: новые файлы и папки

```
sanity/
  config.ts
  client.ts
  image.ts
  queries.ts
  migrate.ts              # опционально
  schemas/
    index.ts
    page.ts
    service.ts
    caseStudy.ts
    faq.ts
    omnidashBlock.ts
    blogPost.ts

sanity.config.ts          # корень проекта

app/
  studio/
    [[...tool]]/
      page.tsx            # embedded Sanity Studio
  api/
    draft/
      route.ts            # preview mode on
    disable-draft/
      route.ts            # preview mode off
    revalidate/
      route.ts            # ISR webhook
  [lang]/
    blog/
      [slug]/
        page.tsx          # страница статьи
    cases/
      [slug]/
        page.tsx          # детальный кейс

components/
  analytics/
    google-analytics.tsx
  blog/
    post-card.tsx
    post-header.tsx
    portable-text.tsx
  cases/
    case-card.tsx
    metrics-grid.tsx
    case-gallery.tsx
  shared/
    cookie-consent.tsx

lib/
  analytics.ts
  utm.ts
```
