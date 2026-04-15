# Analyst Online — Visual Design Guide

**Версия:** 1.1  
**Дата:** 2026-04-15  
**Основа:** OmniDash Brand Guide

---

## 1. Философия дизайна

Analyst Online следует визуальному языку **OmniDash** — чистый SaaS-стиль, доверие к данным, ясность, премиальная простота.

### Ключевые принципы

- **Чистота**: белый/светлый фон, много воздуха, минимум декоративного шума
- **Аналитичность**: синие тона, структурированность, KPI-ориентированность
- **Доверие**: консервативная типографика, чёткие границы, предсказуемость
- **Современность**: без скевоморфизма, без тяжёлых градиентов, без глянца

### Token-first система (обязательно)

- Источник правды для темы: `app/globals.css` (`--background`, `--foreground`, `--primary`, `--border`, `--radius` и т.д.)
- В компонентах используем семантические классы: `bg-background`, `text-foreground`, `bg-primary`, `border-border`
- Бренд-алиасы (`omni-*`, `royal-*`) допустимы только как акцентные исключения, а не как базовые цвета интерфейса
- Любое изменение темы делается через CSS-переменные, без переписывания JSX/TSX

---

## 2. Цветовая палитра

### Основные цвета

```css
/* Source of truth: app/globals.css */
--background: hsl(214 41% 97%); /* #F3F6FA */
--foreground: hsl(222 37% 19%); /* #1F2A44 */
--card: hsl(0 0% 100%); /* #FFFFFF */
--primary: hsl(217 73% 53%); /* #2F6EDB */
--border: hsl(215 35% 92%); /* #DDE6F3 */

/* Primary */
--omni-navy: #1f2a44; /* Основной текст, заголовки */
--omni-blue: #2f6edb; /* Primary CTA, акценты, ссылки */

/* Secondary */
--royal-blue: #2c5cc5; /* Hover состояния primary */
--sky-blue: #3f86e8; /* Вторичные акценты */
--omni-cyan: #4ec6d8; /* Графики, иконки, highlights */

/* Success / Growth */
--growth-green: #63c05a; /* Позитивные метрики, success states */
--lime-accent: #a6d63a; /* Дополнительный акцент для графиков */

/* Neutral UI */
--soft-bg: #f3f6fa; /* Фон страницы */
--grid-divider: #dde6f3; /* Границы, разделители */
```

### Использование цветов

| Элемент              | Цвет                  | Семантический класс             |
| -------------------- | --------------------- | ------------------------------- |
| Фон страницы         | `#F3F6FA`             | `bg-background`                 |
| Фон карточки         | `#FFFFFF`             | `bg-card`                       |
| Основной текст       | `#1F2A44`             | `text-foreground`               |
| Вторичный текст      | `#1F2A44` 60% opacity | `text-foreground/60`            |
| Primary кнопка       | `#2F6EDB`             | `bg-primary text-primary-foreground` |
| Primary кнопка hover | `#2C5CC5`             | `hover:bg-primary/90`           |
| Outline кнопка       | border `#2F6EDB`      | `border-primary text-primary`   |
| Ссылки               | `#2F6EDB`             | `text-primary`                  |
| Ссылки hover         | `#2C5CC5`             | `hover:text-primary/90`         |
| Границы              | `#DDE6F3`             | `border-border`                 |
| Иконки акцент        | `#4EC6D8`             | `text-omni-cyan`                |
| Success state        | `#63C05A`             | `text-growth-green`             |

### Запрещённые цвета

- ❌ Чистый чёрный `#000000` — используй `#1F2A44`
- ❌ Тёмные фоны — только светлые
- ❌ Яркие неоновые цвета
- ❌ Градиенты на фоне (только на тексте/иконках при необходимости)

---

## 3. Типографика

### Шрифт

**Inter** — единственный шрифт проекта.

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
```

### Иерархия

| Уровень        | Размер  | Вес     | Использование          | Tailwind                                    |
| -------------- | ------- | ------- | ---------------------- | ------------------------------------------- |
| **H1**         | 48-68px | 800     | Hero заголовки         | `text-5xl md:text-[4.25rem] font-extrabold` |
| **H2**         | 36-48px | 700     | Заголовки секций       | `text-3xl md:text-4xl font-bold`            |
| **H3**         | 24-30px | 700     | Подзаголовки, карточки | `text-2xl md:text-3xl font-bold`            |
| **H4**         | 18-20px | 600     | Мелкие заголовки       | `text-lg md:text-xl font-semibold`          |
| **Body Large** | 18-20px | 400     | Лиды, подзаголовки     | `text-lg md:text-xl`                        |
| **Body**       | 16px    | 400     | Основной текст         | `text-base`                                 |
| **Body Small** | 14px    | 400-500 | Вторичный текст        | `text-sm font-medium`                       |
| **Caption**    | 12px    | 500-600 | Labels, метаданные     | `text-xs font-semibold`                     |

### Правила

- **Заголовки**: всегда `font-bold` (700) или `font-extrabold` (800)
- **Основной текст**: `font-normal` (400)
- **Навигация, кнопки, labels**: `font-semibold` (600) или `font-bold` (700)
- **Цвет текста**: `text-foreground` для основного, `text-foreground/60` или `/70` для вторичного
- **Межстрочный интервал**: `leading-tight` для заголовков, `leading-relaxed` для body

### Примеры

```tsx
// Hero заголовок
<h1 className="text-4xl font-extrabold tracking-tight text-omni-navy sm:text-5xl md:text-[4.25rem] md:leading-[1.1]">
  Заголовок
</h1>

// Заголовок секции
<h2 className="text-3xl font-bold text-omni-navy md:text-4xl">
  Секция
</h2>

// Параграф
<p className="text-lg text-omni-navy/70 leading-relaxed">
  Описание
</p>

// Мелкий текст
<span className="text-sm font-medium text-omni-navy/60">
  Метаданные
</span>
```

---

## 4. Скругления (Border Radius)

### Правило

**Минимальные скругления** — OmniDash избегает сильно скруглённых форм.

```css
--radius-sm: 4px; /* Мелкие элементы */
--radius-md: 6px; /* Средние элементы */
--radius-lg: 8px; /* Крупные карточки, кнопки */
```

### Использование

| Элемент                 | Радиус | Tailwind     |
| ----------------------- | ------ | ------------ |
| Кнопки                  | 8px    | `rounded-lg` |
| Карточки                | 8px    | `rounded-lg` |
| Input поля              | 6px    | `rounded-md` |
| Badges                  | 6px    | `rounded-md` |
| Изображения в карточках | 6px    | `rounded-md` |
| Модальные окна          | 8px    | `rounded-lg` |

### Запрещено

- ❌ `rounded-full` — только для аватаров/иконок, **не для кнопок**
- ❌ `rounded-3xl`, `rounded-2xl` — слишком сильное скругление
- ❌ Разные радиусы в одном компоненте без причины

### Примеры

```tsx
// Кнопка
<Button className="rounded-lg">Click</Button>

// Карточка
<Card className="rounded-lg border border-grid-divider">
  <CardContent className="p-6">...</CardContent>
</Card>

// Изображение внутри карточки
<div className="overflow-hidden rounded-md">
  <Image src="..." />
</div>
```

---

## 5. Карточки (Cards)

### Базовый стиль

```tsx
<Card className="rounded-lg border border-grid-divider bg-white shadow-sm transition-all duration-200 hover:border-omni-blue hover:shadow-md">
  <CardContent className="p-6">{/* Контент */}</CardContent>
</Card>
```

### Анатомия карточки

```
┌─────────────────────────────────┐
│  padding: 24px (p-6)            │
│                                 │
│  [Контент с внутренними         │
│   отступами]                    │
│                                 │
│  Изображения: отступ 16px       │
│  от краёв карточки              │
│                                 │
└─────────────────────────────────┘
```

### Варианты

#### Обычная карточка

```tsx
<Card className="rounded-lg border border-grid-divider bg-white shadow-sm hover:border-omni-blue hover:shadow-md">
  <CardContent className="p-6">
    <h3 className="text-xl font-bold text-omni-navy">Заголовок</h3>
    <p className="mt-2 text-sm text-omni-navy/70">Описание</p>
  </CardContent>
</Card>
```

#### Карточка с изображением

```tsx
<Card className="overflow-hidden rounded-lg border border-grid-divider bg-white shadow-sm">
  {/* Изображение без padding */}
  <div className="relative h-48 w-full">
    <Image src="..." fill className="object-cover" />
  </div>

  {/* Контент с padding */}
  <CardContent className="p-6">
    <h3 className="text-xl font-bold text-omni-navy">Заголовок</h3>
    <p className="mt-2 text-sm text-omni-navy/70">Описание</p>
  </CardContent>
</Card>
```

#### Highlighted карточка (featured)

```tsx
<Card className="rounded-lg border-2 border-omni-blue bg-omni-blue/5 shadow-md">
  <CardContent className="p-6">
    <div className="mb-2 inline-flex items-center gap-2 rounded-md bg-omni-blue/10 px-3 py-1 text-xs font-semibold text-omni-blue">
      <span className="h-1.5 w-1.5 rounded-full bg-omni-blue" />
      Featured
    </div>
    <h3 className="text-xl font-bold text-omni-navy">Заголовок</h3>
  </CardContent>
</Card>
```

### Правила для изображений в карточках

1. **Отступ от краёв**: минимум 16px (`p-4`) внутри карточки
2. **Скругление**: `rounded-md` (6px)
3. **Aspect ratio**: фиксированный (например, `aspect-video` для 16:9)
4. **Object-fit**: `object-cover` для заполнения

```tsx
{
  /* Правильно */
}
<Card className="rounded-lg border border-grid-divider bg-white p-4">
  <div className="overflow-hidden rounded-md">
    <Image src="..." width={600} height={400} className="object-cover" />
  </div>
  <div className="mt-4">
    <h3>Заголовок</h3>
  </div>
</Card>;

{
  /* Неправильно — изображение без отступа */
}
<Card className="rounded-lg">
  <Image src="..." /> {/* ❌ */}
</Card>;
```

---

## 6. Кнопки (Buttons)

### Primary кнопка

```tsx
<Button className="rounded-lg bg-omni-blue px-6 py-2.5 font-bold text-white shadow-md hover:bg-royal-blue">
  Primary Action
</Button>
```

### Secondary (Outline) кнопка

```tsx
<Button
  variant="outline"
  className="rounded-lg border-2 border-omni-blue px-6 py-2.5 font-bold text-omni-blue hover:bg-omni-blue hover:text-white"
>
  Secondary Action
</Button>
```

### Tertiary (Ghost) кнопка

```tsx
<Button
  variant="ghost"
  className="rounded-lg px-6 py-2.5 font-semibold text-omni-blue hover:bg-omni-blue/10"
>
  Tertiary Action
</Button>
```

### Размеры

```tsx
// Small
<Button size="sm" className="rounded-lg px-4 py-2 text-sm font-semibold">
  Small
</Button>

// Default
<Button className="rounded-lg px-6 py-2.5 font-bold">
  Default
</Button>

// Large
<Button size="lg" className="rounded-lg px-8 py-3 text-lg font-bold">
  Large
</Button>
```

### Правила

- ✅ Всегда `rounded-lg` (8px)
- ✅ Всегда `font-bold` или `font-semibold`
- ✅ Primary: `bg-omni-blue`, hover: `bg-royal-blue`
- ✅ Outline: `border-2 border-omni-blue`
- ❌ Никогда `rounded-full`
- ❌ Никогда тени больше `shadow-md`

---

## 7. Spacing & Layout

### Контейнеры

```tsx
// Основной контейнер страницы
<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
  {/* Контент */}
</div>

// Узкий контейнер (для текста)
<div className="mx-auto max-w-3xl px-4">
  {/* Контент */}
</div>
```

### Вертикальные отступы

| Контекст                            | Отступ  | Tailwind                 |
| ----------------------------------- | ------- | ------------------------ |
| Между секциями                      | 64-96px | `py-16 md:py-24`         |
| Внутри секции (заголовок → контент) | 32-48px | `mt-8 md:mt-12`          |
| Между элементами списка             | 16-24px | `space-y-4 md:space-y-6` |
| Внутри карточки                     | 24px    | `p-6`                    |
| Между параграфами                   | 12-16px | `mt-3 md:mt-4`           |

### Горизонтальные отступы

| Контекст                | Отступ  | Tailwind         |
| ----------------------- | ------- | ---------------- |
| Контейнер страницы      | 16-24px | `px-4 sm:px-6`   |
| Между кнопками          | 12px    | `gap-3`          |
| Между карточками в grid | 16-24px | `gap-4 md:gap-6` |

---

## 8. Тени (Shadows)

### Правило

**Минимальные тени** — OmniDash избегает драматических теней.

```css
/* Карточки */
shadow-sm: 0 1px 3px rgba(31, 42, 68, 0.04);

/* Карточки hover */
shadow-md: 0 4px 12px rgba(47, 110, 219, 0.08);

/* Кнопки */
shadow-md: 0 2px 8px rgba(47, 110, 219, 0.12);
```

### Использование

```tsx
// Карточка
<Card className="shadow-sm hover:shadow-md">

// Кнопка
<Button className="shadow-md">

// Header
<header className="shadow-sm">
```

### Запрещено

- ❌ `shadow-2xl`, `shadow-xl` — слишком драматично
- ❌ Цветные тени (кроме лёгкого синего на hover)
- ❌ Тени на тексте

---

## 9. Иконки

### Размеры

```tsx
// Small (в тексте)
<Icon size={16} />

// Default (в карточках, списках)
<Icon size={20} />

// Large (в hero, пустых состояниях)
<Icon size={24} />
```

### Цвета

```tsx
// Primary
<Icon className="text-omni-blue" />

// Accent
<Icon className="text-omni-cyan" />

// Success
<Icon className="text-growth-green" />

// Neutral
<Icon className="text-omni-navy/60" />
```

### Правила

- ✅ Используй `lucide-react`
- ✅ Всегда указывай `size`
- ✅ Иконки в кнопках: отступ `mr-2` или `ml-2`
- ❌ Не используй разные библиотеки иконок в одном проекте

---

## 10. Формы (Forms)

### Input поля

```tsx
<input
  type="text"
  className="w-full rounded-md border border-grid-divider bg-white px-4 py-2.5 text-omni-navy placeholder:text-omni-navy/40 focus:border-omni-blue focus:outline-none focus:ring-2 focus:ring-omni-blue/20"
  placeholder="Введите текст"
/>
```

### Textarea

```tsx
<textarea
  rows={5}
  className="w-full rounded-md border border-grid-divider bg-white px-4 py-2.5 text-omni-navy placeholder:text-omni-navy/40 focus:border-omni-blue focus:outline-none focus:ring-2 focus:ring-omni-blue/20"
  placeholder="Ваше сообщение"
/>
```

### Labels

```tsx
<label className="block text-sm font-semibold text-omni-navy mb-1.5">Имя</label>
```

### Error state

```tsx
<input
  className="border-red-500 focus:ring-red-500/20"
/>
<p className="mt-1 text-xs text-red-600">Ошибка валидации</p>
```

---

## 11. Badges & Tags

### Badge

```tsx
<span className="inline-flex items-center gap-2 rounded-md bg-omni-blue/10 px-3 py-1 text-xs font-semibold text-omni-blue">
  <span className="h-1.5 w-1.5 rounded-full bg-omni-blue" />
  Featured
</span>
```

### Tag

```tsx
<span className="inline-block rounded-md border border-grid-divider bg-white px-2.5 py-1 text-xs font-medium text-omni-navy/70">
  Analytics
</span>
```

---

## 12. Состояния (States)

### Empty state

```tsx
<div className="rounded-lg border border-grid-divider bg-white p-12 text-center">
  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-grid-divider bg-soft-bg">
    <Icon size={24} className="text-omni-navy/40" />
  </div>
  <h3 className="text-xl font-bold text-omni-navy">Пусто</h3>
  <p className="mt-2 text-sm text-omni-navy/60">Описание</p>
</div>
```

### Loading state

```tsx
<div className="flex items-center gap-2 text-omni-navy/60">
  <Loader2 size={16} className="animate-spin" />
  <span className="text-sm font-medium">Загрузка...</span>
</div>
```

### Success state

```tsx
<div className="rounded-lg border border-growth-green/30 bg-growth-green/5 p-6">
  <div className="flex items-start gap-3">
    <CheckCircle2 size={20} className="text-growth-green" />
    <div>
      <h4 className="font-bold text-omni-navy">Успешно</h4>
      <p className="mt-1 text-sm text-omni-navy/70">Сообщение</p>
    </div>
  </div>
</div>
```

### Error state

```tsx
<div className="rounded-lg border border-red-500/30 bg-red-50 p-6">
  <div className="flex items-start gap-3">
    <AlertCircle size={20} className="text-red-600" />
    <div>
      <h4 className="font-bold text-red-900">Ошибка</h4>
      <p className="mt-1 text-sm text-red-700">Сообщение</p>
    </div>
  </div>
</div>
```

---

## 13. Responsive Design

### Breakpoints

```css
sm: 640px   /* Tablet portrait */
md: 768px   /* Tablet landscape */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Паттерны

```tsx
// Адаптивная типографика
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">

// Адаптивный grid
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

// Адаптивные отступы
<section className="py-12 sm:py-16 md:py-20 lg:py-24">

// Скрытие на мобильных
<div className="hidden md:block">

// Показ только на мобильных
<div className="block md:hidden">
```

---

## 14. Анимации и переходы

### Правило

**Минимальные, быстрые, функциональные** — без лишних эффектов.

### Стандартные переходы

```tsx
// Hover на карточках, кнопках
className = 'transition-all duration-200';

// Hover на ссылках
className = 'transition-colors duration-150';

// Появление модальных окон
className = 'transition-opacity duration-300';
```

### Запрещено

- ❌ Анимации длиннее 300ms
- ❌ Bounce, elastic easing
- ❌ Анимации при скролле (parallax и т.д.)
- ❌ Автоматические карусели

---

## 15. Чеклист перед коммитом

### Цвета

- [ ] Фон страницы `#F3F6FA` (`bg-background`)
- [ ] Карточки белые `#FFFFFF` (`bg-card`)
- [ ] Текст `#1F2A44` (`text-foreground`)
- [ ] Primary кнопки `#2F6EDB` (`bg-primary`)
- [ ] Границы `#DDE6F3` (`border-border`)

### Типографика

- [ ] Шрифт Inter
- [ ] Заголовки `font-bold` или `font-extrabold`
- [ ] Кнопки `font-bold` или `font-semibold`

### Скругления

- [ ] Кнопки `rounded-lg` (8px)
- [ ] Карточки `rounded-lg` (8px)
- [ ] Нет `rounded-full` на кнопках
- [ ] Нет `rounded-3xl` / `rounded-2xl`

### Карточки

- [ ] Padding `p-6` (24px)
- [ ] Изображения с отступом 16px от краёв
- [ ] Изображения `rounded-md` (6px)
- [ ] Border `border-border`
- [ ] Hover `hover:border-primary`

### Кнопки

- [ ] `rounded-lg`
- [ ] `font-bold`
- [ ] Primary: `bg-omni-blue hover:bg-royal-blue`
- [ ] Outline: `border-2 border-omni-blue`

### Spacing

- [ ] Между секциями `py-16 md:py-24`
- [ ] Внутри карточек `p-6`
- [ ] Между элементами `space-y-4`

---

## 16. Быстрый старт: копируй-вставляй

### Секция с заголовком

```tsx
<section className="py-16 md:py-24">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">Заголовок секции</h2>
    <p className="mt-3 text-lg text-omni-navy/70">Подзаголовок</p>

    {/* Контент */}
  </div>
</section>
```

### Grid карточек

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card
      key={item.id}
      className="rounded-lg border border-grid-divider bg-white shadow-sm hover:border-omni-blue hover:shadow-md"
    >
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-omni-navy">{item.title}</h3>
        <p className="mt-2 text-sm text-omni-navy/70">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### CTA блок

```tsx
<div className="rounded-lg border border-grid-divider bg-white p-8 text-center md:p-12">
  <h2 className="text-3xl font-bold text-omni-navy md:text-4xl">Готовы начать?</h2>
  <p className="mt-3 text-lg text-omni-navy/70">Свяжитесь с нами сегодня</p>

  <div className="mt-8 flex flex-wrap justify-center gap-3">
    <Button className="rounded-lg bg-omni-blue px-8 py-3 font-bold text-white shadow-md hover:bg-royal-blue">
      Primary CTA
    </Button>
    <Button
      variant="outline"
      className="rounded-lg border-2 border-omni-blue px-8 py-3 font-bold text-omni-blue hover:bg-omni-blue hover:text-white"
    >
      Secondary CTA
    </Button>
  </div>
</div>
```

---

## 17. Частые ошибки

### ❌ Неправильно

```tsx
// Тёмный фон
<div className="bg-black">

// Rounded-full на кнопке
<Button className="rounded-full">

// Слишком сильное скругление
<Card className="rounded-3xl">

// Нет отступа у изображения
<Card>
  <Image src="..." />
</Card>

// Неправильный цвет текста
<p className="text-white">

// Слабый font-weight на заголовке
<h2 className="font-normal">
```

### ✅ Правильно

```tsx
// Светлый фон
<div className="bg-soft-bg">

// Rounded-lg на кнопке
<Button className="rounded-lg">

// Умеренное скругление
<Card className="rounded-lg">

// Отступ у изображения
<Card className="p-4">
  <div className="rounded-md overflow-hidden">
    <Image src="..." />
  </div>
</Card>

// Правильный цвет текста
<p className="text-omni-navy">

// Жирный заголовок
<h2 className="font-bold">
```

---

## 18. Ресурсы

- **Брендбук**: `docs/OmniDash_logo_favicon_pack_v4/OmniDash_brand_guide.md`
- **Tailwind config**: `tailwind.config.js`
- **Global styles**: `app/globals.css`
- **Компоненты UI**: `components/ui/`

---

**Вопросы?** Обращайся к этому гайду при создании новых компонентов или изменении существующих.
