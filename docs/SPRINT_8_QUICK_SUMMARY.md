# Sprint 8 — Quick Summary

**Статус:** ✅ Завершён  
**Дата:** 2026-03-22

---

## Что сделано

### 1. Зависимости

✅ `@portabletext/react` — рендер Portable Text  
✅ `@tailwindcss/typography` — типографика для статей

### 2. Компоненты блога

✅ `components/blog/post-card.tsx` — карточка статьи  
✅ `components/blog/post-header.tsx` — шапка статьи  
✅ `components/blog/portable-text.tsx` — рендер контента

### 3. Страницы блога

✅ `/[lang]/blog` — список статей (CMS-driven)  
✅ `/[lang]/blog/[slug]` — страница статьи (SSG)  
✅ Graceful degradation если нет статей

### 4. SEO

✅ Metadata для обеих страниц  
✅ JSON-LD Article schema  
✅ Blog posts в sitemap  
✅ OG images из coverImage

### 5. Типографика

✅ Tailwind Typography подключён  
✅ Кастомные стили для Portable Text  
✅ Заголовки, списки, blockquote, code, links

---

## Build Status

```bash
npm run build
```

✅ **Успешно** — все роуты собраны

**Новые роуты:**

- `/[lang]/blog` — dynamic
- `/[lang]/blog/[slug]` — SSG (●)

---

## Как использовать

1. Откройте Studio: `https://analyst-online.vercel.app/studio`
2. Создайте Blog Post
3. Заполните title, slug, locale, excerpt, body, publishedAt
4. Publish
5. Статья автоматически появится на сайте через ~5 сек

---

## Следующий шаг

**Sprint 9 — Cases: реальный контент**

Требуется:

- Реальные кейсы от клиента
- Скриншоты дашбордов
- Метрики / KPI
- Разрешение на публикацию

План: `docs/Analyst_Online_Sprint_Plan_6-10.md`

---

**Sprint 8 готов к деплою!** 🚀
