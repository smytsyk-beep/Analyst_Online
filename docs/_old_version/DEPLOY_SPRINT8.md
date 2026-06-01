# Deploy Sprint 8 — Инструкция

**Дата:** 2026-03-22  
**Статус:** 📋 Ready to deploy

---

## Что деплоим

Sprint 8 — Blog Infrastructure:

- ✅ Portable Text rendering
- ✅ Blog list page (CMS-driven)
- ✅ Blog post page (SSG)
- ✅ Blog components (PostCard, PostHeader, BlogPortableText)
- ✅ SEO для блога (metadata, JSON-LD, sitemap)
- ✅ Tailwind Typography

---

## Шаг 1: Проверить локальный build

```bash
npm run build
```

**Ожидаемый результат:**

```
✓ Compiled successfully
✓ Running TypeScript
✓ Generating static pages (8/8)

Route (app)
├ ƒ /[lang]/blog              # Blog list
├ ● /[lang]/blog/[slug]       # Blog post (SSG)
```

**Статус:** ✅ Build должен пройти успешно

---

## Шаг 2: Коммит и push

```bash
# Проверить изменения
git status

# Добавить все файлы
git add .

# Коммит
git commit -m "feat(sprint8): complete blog infrastructure

- Add @portabletext/react and @tailwindcss/typography
- Create BlogPortableText component with custom styles
- Create PostCard and PostHeader components
- Update blog list page with CMS integration
- Create blog post page with SSG and Portable Text
- Add Article JSON-LD schema
- Add blog posts to sitemap dynamically
- Fix deprecated @sanity/image-url import
- Add comprehensive documentation"

# Push
git push origin main
```

---

## Шаг 3: Проверить деплой в Vercel

1. Откройте https://vercel.com/your-project
2. Дождитесь завершения деплоя (~2-3 минуты)
3. Проверьте статус: **Ready**

---

## Шаг 4: Проверить работу блога

### Проверка страницы списка

1. **Blog list:** https://analyst-online.vercel.app/ru/blog
   - Должен показывать placeholder "Статьи появятся здесь в ближайшее время"
   - Или grid статей если уже созданы в Studio

### Проверка Sanity Studio

1. Откройте https://analyst-online.vercel.app/studio
2. Создайте тестовую статью:
   - **Title:** "Тестовая статья"
   - **Slug:** auto-generate
   - **Locale:** `ru`
   - **Excerpt:** "Краткое описание статьи"
   - **Body:** Добавьте несколько параграфов, заголовок h2, список
   - **Published At:** текущая дата
   - **Tags:** ["аналитика", "дашборды"]
3. Нажмите **Publish**

### Проверка автоматической публикации

1. Подождите ~5 секунд (ISR webhook)
2. Обновите https://analyst-online.vercel.app/ru/blog
3. Статья должна появиться в списке
4. Кликните на статью
5. Проверьте:
   - ✅ Title отображается
   - ✅ Дата локализована
   - ✅ Cover image (если добавили)
   - ✅ Теги отображаются
   - ✅ Body рендерится с правильной типографикой
   - ✅ "← Назад к блогу" работает

---

## Шаг 5: Проверить SEO

### Metadata

Откройте DevTools → Elements → `<head>`:

```html
<title>Тестовая статья — Analyst Online</title>
<meta name="description" content="Краткое описание статьи" />
<link rel="canonical" href="https://analyst-online.vercel.app/ru/blog/testovaya-statya" />
<link rel="alternate" hreflang="uk" href="/ua/blog/testovaya-statya" />
<link rel="alternate" hreflang="ru" href="/ru/blog/testovaya-statya" />
<link rel="alternate" hreflang="ro" href="/ro/blog/testovaya-statya" />
```

### JSON-LD

Проверьте наличие Article schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Тестовая статья",
  "datePublished": "2024-01-01",
  "author": { "@type": "Organization", "name": "Analyst Online" }
}
```

### Sitemap

Откройте https://analyst-online.vercel.app/sitemap.xml

Должна быть запись:

```xml
<url>
  <loc>https://analyst-online.com/ru/blog/testovaya-statya</loc>
  <lastmod>2024-01-01</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

---

## Шаг 6: Проверить типографику

Откройте статью и проверьте:

- ✅ Заголовки h2, h3, h4 правильного размера
- ✅ Параграфы с хорошим line-height
- ✅ Списки с правильным spacing
- ✅ Code blocks с моноширинным шрифтом
- ✅ Ссылки подчёркнуты и меняют цвет на hover
- ✅ Изображения с rounded corners
- ✅ Blockquote с border-left

---

## Шаг 7: Проверить responsive

Проверьте на разных breakpoints:

- ✅ **Mobile (375px):** карточки в 1 колонку
- ✅ **Tablet (768px):** карточки в 2 колонки
- ✅ **Desktop (1024px+):** карточки в 3 колонки
- ✅ **Страница статьи:** max-w-3xl для читаемости

---

## Troubleshooting

### Статьи не появляются в списке

1. Проверьте, что статья опубликована (не draft)
2. Проверьте, что `publishedAt` заполнено
3. Проверьте, что `locale` совпадает с языком страницы
4. Проверьте Vercel Logs → Functions

### Portable Text не рендерится

1. Проверьте, что `body` заполнено в Studio
2. Проверьте console на ошибки
3. Проверьте, что `@portabletext/react` установлен

### Типографика не применяется

1. Проверьте, что `@tailwindcss/typography` в `tailwind.config.js`
2. Проверьте, что используется `prose prose-invert prose-lg`
3. Очистите кеш браузера

### Изображения не загружаются

1. Проверьте, что изображение загружено в Sanity
2. Проверьте `urlFor()` helper
3. Проверьте CORS настройки в Sanity

---

## Rollback (если что-то пошло не так)

```bash
# Откатиться на предыдущий коммит
git revert HEAD

# Push
git push origin main
```

Или откатиться через Vercel Dashboard:

1. Deployments → Previous deployment → Promote to Production

---

## Checklist деплоя

- [ ] Локальный build проходит
- [ ] Код закоммичен и запушен
- [ ] Деплой завершён успешно
- [ ] Blog list page работает
- [ ] Тестовая статья создана в Studio
- [ ] Статья появляется в списке
- [ ] Страница статьи рендерится корректно
- [ ] Portable Text отображается правильно
- [ ] Типографика применяется
- [ ] SEO metadata корректна
- [ ] JSON-LD schema присутствует
- [ ] Статья в sitemap
- [ ] Responsive на всех breakpoints

---

## После успешного деплоя

1. ✅ Обновить `docs/Analyst_Online_Sprint_Status_2026-03-17.md`
2. ✅ Отметить Sprint 8 как завершённый
3. ✅ Начать Sprint 9 или Sprint 10 (можно параллельно)

---

**Готово к деплою!** 🚀
