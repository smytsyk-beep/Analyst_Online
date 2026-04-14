# Rebrand Status — OmniDash Visual Identity

**Дата:** 2025-03-17  
**Статус:** 🟡 В процессе (30% завершено)

---

## Что сделано ✅

### Инфраструктура

- ✅ Шрифт Inter подключён (400-800 weights)
- ✅ OmniDash цвета добавлены в Tailwind config
- ✅ Светлая тема настроена в globals.css
- ✅ Border radius обновлён (8px max)
- ✅ Particles отключены
- ✅ Создан полный гайд `VISUAL_DESIGN_GUIDE.md`

### Компоненты

- ✅ Header — светлый, omni-blue акценты
- ✅ Footer — светлый, omni-navy текст
- ✅ Hero (Home) — чистый градиент, brand кнопки
- ✅ Flagship — border-2 omni-blue, padding для изображений
- ✅ Services Preview — белые карточки
- ✅ Social Proof — lime-accent
- ✅ CTA Section — белая карточка, brand кнопки
- ✅ Section Divider — grid-divider

---

## Что нужно обновить 🔄

### Критичные компоненты (OmniDash page)

```
components/omnidash/
├── hero.tsx          ❌ Нужно: светлый фон, убрать glow, brand кнопки
├── pain-points.tsx   ❌ Нужно: белые карточки, omni-navy текст
├── features.tsx      ❌ Нужно: белые карточки, padding для mockup-2
├── how-it-works.tsx  ❌ Нужно: белые карточки, omni-blue акценты
├── pricing.tsx       ❌ Нужно: белые карточки, brand кнопки
├── faq.tsx           ❌ Нужно: белые карточки, omni-navy текст
└── cta-bottom.tsx    ❌ Нужно: белая карточка, убрать glow
```

### Страницы

```
app/[lang]/
├── services/page.tsx  ❌ Нужно: белые карточки, brand кнопки
├── cases/page.tsx     ❌ Нужно: белая empty state
├── contact/page.tsx   ❌ Нужно: белые карточки, форма
├── blog/page.tsx      ❌ Нужно: белая empty state
└── blog/[slug]/       ❌ Нужно: белый фон, omni-navy текст
```

### Вспомогательные компоненты

```
components/
├── blog/
│   ├── post-card.tsx    ❌ Нужно: белая карточка
│   └── post-header.tsx  ❌ Нужно: omni-navy текст
├── contact/
│   └── contact-form.tsx ❌ Нужно: белая карточка, brand кнопки
└── ui/
    └── button.tsx       ⚠️  Проверить: дефолтные стили
```

---

## Как обновлять компоненты

### Паттерн 1: Карточка

**Было:**
```tsx
<Card className="rounded-2xl border border-white/10 bg-neutral-950/30">
```

**Стало:**
```tsx
<Card className="rounded-lg border border-grid-divider bg-white shadow-sm hover:border-omni-blue hover:shadow-md">
```

### Паттерн 2: Заголовок

**Было:**
```tsx
<h2 className="text-3xl font-semibold text-white">
```

**Стало:**
```tsx
<h2 className="text-3xl font-bold text-omni-navy md:text-4xl">
```

### Паттерн 3: Текст

**Было:**
```tsx
<p className="text-white/60">
```

**Стало:**
```tsx
<p className="text-omni-navy/70">
```

### Паттерн 4: Кнопка Primary

**Было:**
```tsx
<Button className="rounded-full px-8 shadow-lg shadow-blue-500/20">
```

**Стало:**
```tsx
<Button className="rounded-lg bg-omni-blue px-8 font-bold text-white shadow-md hover:bg-royal-blue">
```

### Паттерн 5: Кнопка Outline

**Было:**
```tsx
<Button variant="outline" className="rounded-full border-white/10">
```

**Стало:**
```tsx
<Button variant="outline" className="rounded-lg border-2 border-omni-blue font-bold text-omni-blue hover:bg-omni-blue hover:text-white">
```

### Паттерн 6: Изображение в карточке

**Было:**
```tsx
<Card>
  <Image src="..." />
</Card>
```

**Стало:**
```tsx
<Card className="p-4">
  <div className="overflow-hidden rounded-md">
    <Image src="..." />
  </div>
</Card>
```

---

## Быстрый чеклист для каждого компонента

Перед коммитом проверь:

- [ ] Фон: `bg-white` или `bg-soft-bg`
- [ ] Текст: `text-omni-navy` (не `text-white`)
- [ ] Заголовки: `font-bold` или `font-extrabold`
- [ ] Карточки: `rounded-lg` (не `rounded-2xl/3xl`)
- [ ] Кнопки: `rounded-lg` (не `rounded-full`)
- [ ] Границы: `border-grid-divider` (не `border-white/10`)
- [ ] Hover: `hover:border-omni-blue` (не `hover:border-white/20`)
- [ ] Изображения: padding 16px + `rounded-md`
- [ ] Убраны: glow эффекты, тёмные фоны, particles

---

## Приоритет обновления

### Фаза 1 (критично — видно сразу)
1. `components/omnidash/hero.tsx`
2. `components/omnidash/pricing.tsx`
3. `components/omnidash/cta-bottom.tsx`

### Фаза 2 (важно)
4. `components/omnidash/features.tsx`
5. `components/omnidash/pain-points.tsx`
6. `app/[lang]/services/page.tsx`

### Фаза 3 (остальное)
7. Все остальные компоненты из списка выше

---

## Полезные ссылки

- **Полный гайд**: `docs/VISUAL_DESIGN_GUIDE.md`
- **Брендбук**: `docs/OmniDash_logo_favicon_pack_v4/OmniDash_brand_guide.md`
- **Tailwind config**: `tailwind.config.js` (смотри секцию `colors`)
- **Global styles**: `app/globals.css`

---

## Команды для работы

```bash
# Проверить lint
npm run lint

# Форматирование
npm run format

# Билд (долго, ~2 мин)
npm run build

# Dev сервер
npm run dev
```

---

## Вопросы?

Открой `docs/VISUAL_DESIGN_GUIDE.md` — там все паттерны с примерами кода.
