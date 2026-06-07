# SEO CMS editing guide

Этот документ описывает, где в Sanity Studio менять SEO-тексты, preview-картинки и видимый контент для страниц Analyst Online.

Studio: `https://analyst-online.vercel.app/studio`

## Главное правило

Для каждой обычной страницы открывай:

`Pages` -> нужная локаль -> нужная страница

В документе страницы для SEO чаще всего нужны эти поля:

| Поле в CMS                                       | Что меняет                                                       | Рекомендация                                       |
| ------------------------------------------------ | ---------------------------------------------------------------- | -------------------------------------------------- |
| `Title`                                          | Видимый заголовок страницы, обычно H1                            | Вставляй основной узкий запрос естественно         |
| `Description`                                    | Видимое описание под заголовком, иногда fallback для SEO         | 1-2 предложения с пользой и ключевым запросом      |
| `SEO Title`                                      | Заголовок в Google и в preview ссылки                            | 50-65 символов, главный запрос ближе к началу      |
| `SEO Description`                                | Описание в Google и preview ссылки                               | 120-155 символов, запрос + польза + конкретика     |
| `Social Preview Image`                           | Картинка при отправке ссылки в Telegram/WhatsApp/Facebook и т.п. | 1200x630, понятный скрин/баннер без мелкого текста |
| `Alternative text` внутри `Social Preview Image` | Alt-текст картинки                                               | Кратко опиши изображение и тему страницы           |

Не меняй без необходимости:

| Поле         | Почему осторожно                                    |
| ------------ | --------------------------------------------------- |
| `Slug`       | Может поменять идентификатор документа              |
| `Route Path` | Используется для URL страницы                       |
| `Locale`     | Привязка документа к языку                          |
| `Page Type`  | Используется фронтендом для логики страницы         |
| `Status`     | `Draft` скрывает страницу из некоторых CMS-запросов |

## Локали

| Локаль в CMS | URL prefix | Язык       |
| ------------ | ---------- | ---------- |
| `Russian`    | `/ru`      | Русский    |
| `Ukrainian`  | `/ua`      | Украинский |
| `Romanian`   | `/ro`      | Румынский  |

## Pages: Russian

Открывай: `Pages` -> `Russian`

| URL                                   | Документ в списке                        | Route/slug под названием          | Основные SEO поля                                                              |
| ------------------------------------- | ---------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| `/ru`                                 | `Аналитика, дашборды и автоматизация...` | `home`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/blog`                            | `Блог (ru)`                              | `blog`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/cases`                           | `Кейсы (ru)`                             | `cases`                           | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/contact`                         | `Контакты (ru)`                          | `contact`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/omnidash`                        | `OmniDash (ru)`                          | `omnidash`                        | `SEO Title`, `SEO Description`, `Social Preview Image`, `Hero Image`           |
| `/ru/privacy`                         | `Политика конфиденциальности (ru)`       | `privacy`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/services`                        | `AI, автоматизация и аналитика...`       | `services`                        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/obuchenie-ai`                    | `AI / ChatGPT обучение для бизнеса...`   | `obuchenie-ai`                    | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/services/ai-dlya-biznesa`        | `AI для бизнеса и сотрудников...`        | `services/ai-dlya-biznesa`        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/services/ai-google-sheets-excel` | `AI + Google Sheets / Excel (ru)`        | `services/ai-google-sheets-excel` | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ru/services/avtomatizatsiya-ai`     | `Автоматизация бизнес-процессов...`      | `services/avtomatizatsiya-ai`     | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |

## Pages: Ukrainian

Открывай: `Pages` -> `Ukrainian`

| URL                                   | Документ в списке                         | Route/slug под названием          | Основные SEO поля                                                              |
| ------------------------------------- | ----------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| `/ua`                                 | `Аналітика, дашборди та автоматизація...` | `home`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/blog`                            | `Блог (ua)`                               | `blog`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/cases`                           | `Кейси (ua)`                              | `cases`                           | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/contact`                         | `Контакти (ua)`                           | `contact`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/omnidash`                        | `OmniDash (ua)`                           | `omnidash`                        | `SEO Title`, `SEO Description`, `Social Preview Image`, `Hero Image`           |
| `/ua/privacy`                         | `Політика конфіденційності (ua)`          | `privacy`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/services`                        | `AI, автоматизація та аналітика...`       | `services`                        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/navchannia-ai`                   | `AI / ChatGPT навчання для бізнесу...`    | `navchannia-ai`                   | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/services/ai-dlya-biznesu`        | `AI для бізнесу та співробітників...`     | `services/ai-dlya-biznesu`        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/services/ai-google-sheets-excel` | `AI + Google Sheets / Excel (ua)`         | `services/ai-google-sheets-excel` | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ua/services/avtomatyzatsiya-ai`     | `Автоматизація бізнес-процесів...`        | `services/avtomatyzatsiya-ai`     | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |

## Pages: Romanian

Открывай: `Pages` -> `Romanian`

| URL                                   | Документ в списке                             | Route/slug под названием          | Основные SEO поля                                                              |
| ------------------------------------- | --------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| `/ro`                                 | `Analytics, dashboard-uri și automatizare...` | `home`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/blog`                            | `Blog (ro)`                                   | `blog`                            | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/cases`                           | `Cazuri (ro)`                                 | `cases`                           | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/contact`                         | `Contact (ro)`                                | `contact`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/omnidash`                        | `OmniDash (ro)`                               | `omnidash`                        | `SEO Title`, `SEO Description`, `Social Preview Image`, `Hero Image`           |
| `/ro/privacy`                         | `Politica de confidențialitate (ro)`          | `privacy`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/services`                        | `AI, automatizare și analytics...`            | `services`                        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/curs-ai`                         | `Training AI / ChatGPT pentru business...`    | `curs-ai`                         | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/services/ai-pentru-business`     | `AI pentru business și angajați...`           | `services/ai-pentru-business`     | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/services/ai-google-sheets-excel` | `AI + Google Sheets / Excel (ro)`             | `services/ai-google-sheets-excel` | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |
| `/ro/services/automatizare-ai`        | `Automatizarea proceselor...`                 | `services/automatizare-ai`        | `Title`, `Description`, `SEO Title`, `SEO Description`, `Social Preview Image` |

## Blog Posts

Открывай: `Blog Posts` -> нужная локаль -> нужная статья.

Для SEO статьи:

| Поле              | Что менять                                                |
| ----------------- | --------------------------------------------------------- |
| `Title`           | Видимый H1 статьи                                         |
| `Slug`            | URL статьи. Менять осторожно, это ломает старые ссылки    |
| `Excerpt`         | Краткое описание в карточках и fallback для SEO           |
| `Cover Image`     | Картинка статьи и preview при отправке ссылки             |
| `Body`            | Основной текст статьи: H2/H3, абзацы, списки, изображения |
| `Published At`    | Если пусто, статья считается черновиком                   |
| `Tags`            | Темы статьи                                               |
| `SEO Title`       | Заголовок для Google и preview                            |
| `SEO Description` | Описание для Google и preview                             |

URL статей:

| Локаль    | Формат URL        |
| --------- | ----------------- |
| Russian   | `/ru/blog/{slug}` |
| Ukrainian | `/ua/blog/{slug}` |
| Romanian  | `/ro/blog/{slug}` |

## Services

Открывай: `Services` -> нужная локаль -> нужная услуга.

Эти документы управляют карточками услуг на страницах, но не заменяют SEO-документ страницы в `Pages`.

| Поле                           | Что меняет               |
| ------------------------------ | ------------------------ |
| `Title`                        | Название карточки услуги |
| `Description`                  | Текст карточки услуги    |
| `Bullets`                      | Пункты внутри карточки   |
| `CTA`                          | Текст кнопки             |
| `Internal Link`                | Куда ведет кнопка        |
| `Order`                        | Порядок отображения      |
| `Highlighted on services page` | Визуальный акцент        |

Для SEO конкретной услуги меняй соответствующую страницу в `Pages`, например:

| Карточка услуги            | SEO-страница                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| AI обучение                | `/ru/obuchenie-ai`, `/ua/navchannia-ai`, `/ro/curs-ai`                                                              |
| AI для бизнеса             | `/ru/services/ai-dlya-biznesa`, `/ua/services/ai-dlya-biznesu`, `/ro/services/ai-pentru-business`                   |
| AI + Google Sheets / Excel | `/ru/services/ai-google-sheets-excel`, `/ua/services/ai-google-sheets-excel`, `/ro/services/ai-google-sheets-excel` |
| AI автоматизация           | `/ru/services/avtomatizatsiya-ai`, `/ua/services/avtomatyzatsiya-ai`, `/ro/services/automatizare-ai`                |

## OmniDash

Для SEO страницы:

`Pages` -> нужная локаль -> `OmniDash`

Меняй:

- `SEO Title`
- `SEO Description`
- `Social Preview Image`
- `Hero Image`
- `Page Media`

Для видимых блоков страницы:

`OmniDash Blocks` -> нужная локаль -> нужный блок

| Block Type   | Что редактировать                        |
| ------------ | ---------------------------------------- |
| `hero`       | Заголовок, подзаголовок, CTA, статистика |
| `painPoints` | Боли клиента                             |
| `features`   | Возможности продукта                     |
| `howItWorks` | Шаги работы                              |
| `pricing`    | Тарифы                                   |
| `ctaBottom`  | Нижний CTA                               |

FAQ для OmniDash:

`FAQ` -> нужная локаль -> category `omnidash`

## Contact

Для SEO страницы контактов:

`Pages` -> нужная локаль -> `Contact`

Меняй:

- `SEO Title`
- `SEO Description`
- `Social Preview Image`

Для видимого контента формы и каналов связи:

`Contact Info` -> нужная локаль

| Поле                         | Что меняет                    |
| ---------------------------- | ----------------------------- |
| `Page Title`                 | H1 страницы контактов         |
| `Page Subtitle`              | Описание под H1               |
| `Channels`                   | Telegram, email, LinkedIn     |
| `Form Title`                 | Заголовок формы               |
| `Form Subtitle`              | Описание формы                |
| `Form Purpose Options`       | Варианты цели обращения       |
| `Form ... Label/Placeholder` | Тексты полей формы            |
| `Form Success/Error...`      | Сообщения результата отправки |

## Privacy

Для SEO:

`Pages` -> нужная локаль -> `Privacy`

Меняй:

- `Title`
- `Description`
- `SEO Title`
- `SEO Description`
- `Social Preview Image`

Для текста политики используется `Structured Page Content` / `JSON Data`. Меняй его осторожно: JSON должен остаться валидным.

## Cases

Для SEO страницы списка кейсов:

`Pages` -> нужная локаль -> `Cases`

Меняй:

- `Title`
- `Description`
- `SEO Title`
- `SEO Description`
- `Social Preview Image`

Если создаются отдельные кейсы:

`Case Studies` -> нужная локаль -> нужный кейс

| Поле           | Что меняет                                          |
| -------------- | --------------------------------------------------- |
| `Title`        | Название кейса                                      |
| `Slug`         | URL кейса, если отдельная страница будет подключена |
| `Cover Image`  | Обложка                                             |
| `Challenge`    | Проблема клиента                                    |
| `Solution`     | Решение                                             |
| `Results`      | Результаты                                          |
| `Metrics`      | Метрики                                             |
| `Tags`         | Темы                                                |
| `Published At` | Публикация                                          |

## Structured Page Content / JSON Data

Некоторые страницы используют поле:

`Structured Page Content` -> `JSON Data`

В нем лежат тексты секций, списков, FAQ, CTA и другие структурные данные.

Редактируй это поле только если нужно менять видимые тексты глубже, чем `Title` и `Description`.

Правила:

- Не удаляй фигурные скобки `{}`.
- Не удаляй кавычки вокруг ключей.
- После каждой строки внутри объекта, кроме последней, обычно нужна запятая.
- Не меняй имена ключей, если не уверен, что фронтенд их использует.
- Если нужно поменять только текст, меняй только значение справа от двоеточия.

Пример безопасного изменения:

```json
{
  "heroBadge": "AI для малого бизнеса",
  "pageTitle": "AI автоматизация для малого бизнеса",
  "pageSubtitle": "Настраиваем отчеты, уведомления и рабочие процессы с AI."
}
```

## Рекомендуемый процесс для узких запросов Google

Для каждой страницы и локали:

1. Выбери один главный узкий запрос.
2. Вставь его ближе к началу `SEO Title`.
3. Используй тот же запрос естественно в `Title`.
4. В `SEO Description` добавь запрос, пользу и конкретику услуги.
5. В `Description` напиши более человеческую версию описания.
6. Если страница услуговая, проверь `Structured Page Content` / `JSON Data`, чтобы секции тоже соответствовали запросу.
7. Добавь `Social Preview Image` 1200x630.
8. Нажми `Publish`.

## Проверка после публикации

После публикации в Sanity:

- Открой страницу сайта и проверь видимый текст.
- Проверь HTML metadata через View Source или SEO-инструмент.
- Telegram может кешировать старое preview. Для обновления можно использовать `@WebpageBot`.
- Google может показывать свой вариант description, если считает его более релевантным запросу.
