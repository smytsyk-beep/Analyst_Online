# Analyst Online + OmniDash — Sprint Status

Дата обновления: 2026-03-16

---

## 1. Краткий итог по проекту

Проект **Analyst Online** развивается как основной бренд и SEO-платформа для лидогенерации, а **OmniDash** — как флагманский продукт с подписочной моделью и отдельной публичной страницей `/omnidash`.

На текущий момент:

- **Sprint 1 завершён**
- **Sprint 2 завершён**
- **Sprint 3 завершён**
- **Sprint 4–5 ещё не выполнены**
- **Sprint 6–12 находятся в backlog / future roadmap**

Текущее состояние проекта можно считать таким:

- базовая структура сайта уже собрана;
- ключевые страницы ядра уже существуют;
- OmniDash уже оформлен как отдельный лендинг;
- Home / Services / Contact уже переведены из черновика в рабочую структуру;
- до **Deployable MVP** осталось закрыть в первую очередь **SEO / Privacy / Cases / Footer / JSON-LD / lead capture / polish**.

---

## 2. Что уже сделано

## Sprint 1 — Фикс фундамента + навигация

**Статус:** ✅ Завершён

### Выполнено

- [x] Проверена и финализирована geo-логика для Next.js
- [x] Подтверждено, что в текущей версии проекта используется `proxy.ts` как рабочее соглашение версии Next.js 16
- [x] Удалены тестовые shadcn-артефакты с Home page
- [x] Создана файловая структура core pages-заглушек:
  - `app/[lang]/omnidash/page.tsx`
  - `app/[lang]/services/page.tsx`
  - `app/[lang]/contact/page.tsx`
  - `app/[lang]/cases/page.tsx`
  - `app/[lang]/privacy/page.tsx`
  - `app/[lang]/blog/page.tsx`
- [x] Обновлён Header:
  - реальные ссылки вместо `#anchors`
  - добавлен `OmniDash` в navigation
- [x] Подключены реальные CTA-ссылки:
  - Telegram
  - Email
- [x] Реализовано mobile menu / burger menu
- [x] `next build` проходит без ошибок
- [x] Структура готова к CI / production

### Итог Sprint 1

Sprint 1 закрыл технический фундамент фронтенда: навигация стала рабочей, структура страниц подготовлена, тестовые блоки удалены, responsive header внедрён.

---

## Sprint 2 — Страница /omnidash (лендинг)

**Статус:** ✅ Завершён

### Выполнено

- [x] Создан `content/omnidash.copy.ts`
- [x] Подготовлен контент на 3 локали:
  - RU
  - UA
  - RO
- [x] Созданы секционные компоненты для OmniDash
- [x] Собрана полноценная страница `app/[lang]/omnidash/page.tsx`
- [x] Добавлен `generateMetadata()` для `/omnidash`
- [x] Подключены OG/meta-данные по локалям
- [x] Добавлены реальные mockup / dashboard screenshots
- [x] Проверены lint / prettier / build

### Финальная структура страницы `/omnidash`

- Hero
- Pain Points
- Features
- How it works
- Pricing
- FAQ
- CTA Bottom

### Что получилось по содержанию

- 6 болей клиента
- 6 core features + 5 advanced features
- 4 шага в how-it-works
- 3 тарифа (`€99 setup / €49 mo / €150 mo`)
- 8 FAQ вопросов

### Итог Sprint 2

OmniDash оформлен как отдельный продуктовый лендинг внутри Analyst Online. Это уже не placeholder, а полноценная продающая страница, которую можно использовать как основной оффер в маркетинге.

---

## Sprint 3 — Home page v2 + Services + Contact

**Статус:** ✅ Завершён

### Выполнено

- [x] Полностью переработана Home page
- [x] Home стал брендовой главной страницей Analyst Online с акцентом на OmniDash
- [x] Секции Home вынесены в отдельные компоненты:
  - `components/home/hero.tsx`
  - `components/home/flagship.tsx`
  - `components/home/services-preview.tsx`
  - `components/home/social-proof.tsx`
  - `components/home/cta-section.tsx`
- [x] Создана страница `app/[lang]/services/page.tsx`
- [x] Создана страница `app/[lang]/contact/page.tsx`
- [x] Обновлён `content/home.copy.ts`
- [x] Создан `content/services.copy.ts`
- [x] Создан `content/contact.copy.ts`
- [x] Проверена навигация между страницами

### Новая структура Home

- Hero
- Flagship (OmniDash)
- Services Preview
- Social Proof
- CTA Section

### Что появилось дополнительно

- `/[lang]/services` — отдельная страница услуг
- `/[lang]/contact` — отдельная контактная страница
- контактная форма есть как UI-структура, но пока без backend-логики отправки

### Итог Sprint 3

Главная страница перестала быть черновиком. Теперь сайт уже выглядит как реальный MVP-маркетинговый сайт, а не как заготовка.

---

## 3. Что ещё нужно сделать

## Sprint 4 — SEO фундамент + Privacy + Cases placeholder

**Статус:** ⏳ Не выполнен

### Основная цель

Подготовить сайт к индексации, добавить обязательные технические SEO-элементы и закрыть все базовые публичные страницы.

### Что нужно сделать

- [ ] Добавить `generateMetadata()` для всех ключевых страниц:
  - `app/[lang]/page.tsx`
  - `app/[lang]/omnidash/page.tsx`
  - `app/[lang]/services/page.tsx`
  - `app/[lang]/contact/page.tsx`
  - `app/[lang]/cases/page.tsx`
  - `app/[lang]/privacy/page.tsx`
- [ ] Создать `app/sitemap.ts`
- [ ] Создать `app/robots.ts`
- [ ] Добавить `hreflang` и `canonical`
- [ ] Создать `content/privacy.copy.ts`
- [ ] Создать `app/[lang]/privacy/page.tsx` как полноценную страницу
- [ ] Создать `app/[lang]/cases/page.tsx` как placeholder-страницу
- [ ] Обновить Footer:
  - Services
  - OmniDash
  - Cases
  - Contact
  - Privacy
  - Telegram
  - Email
  - год + бренд
- [ ] Добавить JSON-LD schema:
  - Organization на Home
  - Product на OmniDash
  - BreadcrumbList на внутренних страницах

### Результат Sprint 4

После закрытия Sprint 4 сайт станет технически готовым к SEO-индексации и будет иметь полный обязательный набор core pages.

---

## Sprint 5 — Lead capture + CTA logic + Polish

**Статус:** ⏳ Не выполнен

### Основная цель

Сделать сайт реально конвертирующим: рабочая форма, полноценные CTA, визуальная полировка, финальная подготовка к production MVP.

### Что нужно сделать

- [ ] Подключить отправку контактной формы
  - Вариант A: Resend / Nodemailer
  - Вариант B: Telegram bot notification
  - Вариант C: внешний form-сервис
- [ ] Создать переиспользуемый компонент CTA:
  - `components/shared/cta-block.tsx`
- [ ] Проверить и доработать все CTA на сайте
- [ ] Финализировать Telegram deeplinks / email links
- [ ] Провести visual polish на брейкпоинтах:
  - 320
  - 375
  - 768
  - 1024
  - 1440
- [ ] Удалить оставшиеся тестовые артефакты, если есть
- [ ] Добавить favicon
- [ ] Добавить OG image (`1200x630`)
- [ ] Провести финальную проверку:
  - `next build`
  - CI green
  - все страницы доступны
  - все ссылки рабочие
  - geo-routing работает корректно

### Результат Sprint 5

После закрытия Sprint 5 проект можно считать **Deployable MVP**.

---

## 4. Что будет после MVP

## Sprint 6 — Sanity CMS: подключение + контент-модель

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Подключить `next-sanity`, `sanity`
- [ ] Создать Sanity project + dataset
- [ ] Описать контент-схемы:
  - Page
  - Service
  - Case
  - FAQ
  - OmniDash blocks
- [ ] Поднять Sanity Studio
- [ ] Начать перенос контента из `.copy.ts` в CMS

---

## Sprint 7 — Sanity: миграция контента + preview

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Наполнить Sanity реальным контентом
- [ ] Добавить GROQ queries
- [ ] Перевести страницы на CMS-driven rendering
- [ ] Удалить хардкод из `.copy.ts`
- [ ] Сделать preview mode
- [ ] Подключить revalidation / ISR / webhook flow

---

## Sprint 8 — Blog: инфраструктура

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Sanity schema для blog posts
- [ ] `app/[lang]/blog/page.tsx` — список статей
- [ ] `app/[lang]/blog/[slug]/page.tsx` — страница статьи
- [ ] SEO для блога
- [ ] Типографика для article pages

---

## Sprint 9 — Cases: реальный контент

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Запросить реальные кейсы и скриншоты
- [ ] Добавить Sanity schema для Case
- [ ] Собрать реальную страницу `/[lang]/cases`
- [ ] Сделать детальные case pages (опционально)
- [ ] Добавить блоки результатов / метрик / визуалов

---

## Sprint 10 — Аналитика + конверсия

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Подключить GA4 / Plausible / Vercel Analytics
- [ ] Настроить event tracking:
  - CTA clicks
  - form submits
  - page views
- [ ] Добавить UTM support
- [ ] Добавить cookie consent banner

---

## Sprint 11 — Performance + Production hardening

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Lighthouse audit
- [ ] Оптимизация изображений
- [ ] Улучшение Core Web Vitals
- [ ] Error boundaries
- [ ] 404 / 500 polish
- [ ] Security headers
- [ ] Rate limiting на формы

---

## Sprint 12 — Launch + GTM

**Статус:** 🔜 Backlog

### Что нужно сделать

- [ ] Финальный контент review для RU / UA / RO
- [ ] Production deploy на кастомный домен
- [ ] DNS + SSL
- [ ] Подготовить первые blog posts для SEO
- [ ] Подготовить анонс в LinkedIn / Telegram
- [ ] Подготовить outreach templates
- [ ] Настроить uptime / error monitoring

---

## 5. Текущая оценка готовности проекта

### Уже готово

- архитектурный каркас сайта;
- локализованная структура страниц;
- отдельный продающий лендинг OmniDash;
- Home / Services / Contact страницы;
- рабочая навигация;
- mobile menu;
- основные CTA-ссылки;
- контентовая база для первых ключевых страниц.

### Ещё не готово

- технический SEO-фундамент в полном объёме;
- privacy page;
- cases page;
- финальный footer;
- JSON-LD schema;
- рабочая отправка форм;
- аналитика сайта;
- CMS для удобного редактирования контента;
- блоговая инфраструктура;
- прод-полировка и launch toolkit.

### Итоговая стадия

Проект находится в состоянии:

**"Frontend MVP foundation complete, pre-SEO / pre-leadgen finalization stage"**

То есть:

- маркетинговый frontend уже собран,
- продуктовая структура уже понятна,
- основной remaining work — это SEO, form handling, CMS и launch readiness.

---

## 6. Что является ближайшим правильным следующим шагом

### Рекомендуемый приоритет

Следующий логичный шаг — **Sprint 4**.

Почему именно он:

1. он закрывает обязательные public pages;
2. делает сайт технически корректным для индексации;
3. подготавливает базу для будущего трафика;
4. завершает структуру MVP перед подключением lead capture.

### После Sprint 4

Сразу переходить в **Sprint 5**, чтобы получить:

- рабочие лиды,
- конверсию,
- финальную production-ready версию.

---

## 7. Формула текущего статуса проекта

### Completed

- Sprint 1 ✅
- Sprint 2 ✅
- Sprint 3 ✅

### In queue

- Sprint 4 ⏳
- Sprint 5 ⏳

### Future roadmap

- Sprint 6 🔜
- Sprint 7 🔜
- Sprint 8 🔜
- Sprint 9 🔜
- Sprint 10 🔜
- Sprint 11 🔜
- Sprint 12 🔜

---

## 8. Определение ближайшей точки MVP

Проект можно будет считать **Deployable MVP**, когда будут закрыты:

- Sprint 4
- Sprint 5

То есть когда будут готовы:

- все core pages,
- SEO foundation,
- privacy,
- cases placeholder,
- footer,
- schema,
- рабочая форма,
- финальные CTA,
- favicon / OG image,
- production polish.

---

## 9. Короткий executive summary

На сегодня проект уже прошёл наиболее сложную первую стадию упаковки фронтенда:

- структура сайта готова;
- OmniDash упакован как флагманский оффер;
- Home / Services / Contact уже работают;
- навигация и локали уже собраны.

Остаток работы до первого сильного MVP — это не перестройка проекта, а **достройка SEO, lead capture и production polish**.

Именно поэтому следующий фокус должен быть:

**Sprint 4 → Sprint 5 → первый production-ready deployable MVP**
