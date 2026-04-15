# Анализ и план рефакторинга UI (OmniDash)

## Анализ проблем

### 1. Particles не видны
**Причина:** Цвет линий `#DDE6F3` на фоне `#F3F6FA` — почти одинаковые. `opacity: 0.15` слишком низкая. Нужно сделать линии и точки заметно темнее.

### 2. Переключатель языков — неактивные не видны
**Причина:** В `language-switcher.tsx` остались тёмные стили: `border-white/20`, `text-white/70`. На белом фоне это невидимо.

### 3. Hero баннер — непрозрачный, странная заливка
**Причина:** `bg-gradient-to-b from-white to-soft-bg` — непрозрачный белый фон, particles за ним не видны. Плюс остался тёмный fade: `bg-gradient-to-t from-[#050709]/60` — это чёрный градиент снизу.

### 4. Цвета размазаны по 20+ файлам
**Корневая проблема:** Цвета прописаны напрямую в каждом компоненте (`text-omni-navy`, `bg-omni-blue`, `border-grid-divider`), вместо использования CSS-переменных shadcn/ui (`text-foreground`, `bg-primary`, `border-border`).

---

## План: централизация цветов

### Ключевая идея
Не дублировать brand-цвета в компонентах. Вместо этого — маппить OmniDash палитру на CSS-переменные shadcn/ui, которые уже используются в `button.tsx`, `card.tsx`, `sheet.tsx`.

**Сопоставление (Mapping):**
* `text-foreground` = `#1F2A44` (omni-navy)
* `bg-primary` = `#2F6EDB` (omni-blue)
* `hover:bg-primary/90` = royal-blue (автоматически)
* `border-border` = `#DDE6F3` (grid-divider)
* `bg-background` = `#F3F6FA` (soft-bg)
* `bg-card` = `#FFFFFF`

---

## Файлы для изменений

| # | Файл | Что делаем |
|---|------|------------|
| 1 | `app/globals.css` | Исправить CSS-переменные (исправить формат HSL) |
| 2 | `tailwind.config.js` | Оставить brand-цвета как алиасы, но основные через CSS vars |
| 3 | `components/ui/card.tsx` | Убрать `rounded-xl` → `rounded-lg`, убрать `shadow` |
| 4 | `components/ui/button.tsx` | Обновить дефолтные стили под бренд |
| 5 | `components/shared/particles-background.tsx` | Увеличить контраст: серые линии, больше `opacity` |
| 6 | `components/site/language-switcher.tsx` | Светлая тема |
| 7 | `components/site/mobile-nav.tsx` | Светлая тема |
| 8 | `components/home/hero.tsx` | Прозрачный фон, убрать тёмный fade |
| 9 | `components/omnidash/hero.tsx` | Прозрачный фон |
| 10 | `app/[lang]/blog/[slug]/page.tsx` | Убрать `prose-invert`, тёмные стили |
| 11 | `components/blog/post-header.tsx` | Светлые стили |
| 12 | `app/[lang]/privacy/page.tsx` | `opacity-80` → `text-foreground/70` |
| 13 | `app/[lang]/not-found.tsx` | Убрать тёмные стили |

---

## Что это даёт

После этих изменений:
1. **Удобство:** Менять цвета = редактировать только `globals.css` (CSS-переменные).
2. **Консистентность:** Компоненты используют `text-foreground`, `bg-primary`, `border-border` — автоматически подхватывают тему.
3. **Визуальность:** Particles видны через прозрачные секции.
4. **Доступность:** Переключатель языков читаем на светлом фоне.

---

## Порядок реализации

1. **globals.css** — исправить CSS vars (формат сейчас сломан — `222 37% 19%` вместо `222 37 19`).
2. **card.tsx + button.tsx** — обновить дефолты.
3. **particles** — увеличить контраст.
4. **language-switcher + mobile-nav** — светлая тема.
5. **hero** — прозрачный фон.
6. **Массовое обновление** — во всех остальных файлах заменить `text-omni-navy` → `text-foreground`, `border-grid-divider` → `border-border`, `bg-omni-blue` → `bg-primary`.
7. **Документация** — обновить `VISUAL_DESIGN_GUIDE.md`, отразив новый системный подход.