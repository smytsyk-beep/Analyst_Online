# Deploy Sprint 6 — Sanity Studio на Vercel

## Статус коммита

✅ Коммит создан локально:

```
feat(sprint6): complete Sanity CMS infrastructure
```

Ветка: `feat/vercel-test`

---

## Шаг 1: Push на GitHub

Выполнить в терминале:

```bash
git push origin feat/vercel-test
```

Если требуется авторизация:

- Использовать GitHub username
- Использовать Personal Access Token (не пароль)

Создать токен: https://github.com/settings/tokens

---

## Шаг 2: Создать Sanity project

1. Перейти на https://sanity.io
2. Войти / зарегистрироваться
3. Создать новый проект:
   - Название: `Analyst Online`
   - Dataset: `production`
4. Скопировать **Project ID** (формат: `abc123xyz`)

---

## Шаг 3: Создать API Token

1. Перейти в https://sanity.io/manage
2. Выбрать проект `Analyst Online`
3. API → Tokens → Add API token
4. Настройки:
   - Name: `Next.js Server`
   - Permissions: **Editor**
5. Скопировать токен (показывается только один раз!)

---

## Шаг 4: Добавить переменные в Vercel

1. Перейти в Vercel Dashboard: https://vercel.com/dashboard
2. Выбрать проект `analyst-online`
3. Settings → Environment Variables
4. Добавить 3 переменные:

| Name                            | Value                                                  | Environment                      |
| ------------------------------- | ------------------------------------------------------ | -------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc123xyz`                                            | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`                                           | Production, Preview, Development |
| `SANITY_API_TOKEN`              | `skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` | Production, Preview, Development |

**Важно:** Выбрать все 3 окружения для каждой переменной.

---

## Шаг 5: Redeploy на Vercel

После добавления переменных:

1. Перейти в Deployments
2. Найти последний деплой
3. Нажать `...` → **Redeploy**
4. Или просто сделать новый push (Vercel автоматически задеплоит)

---

## Шаг 6: Проверить Studio на production

После успешного деплоя:

1. Открыть: `https://analyst-online.vercel.app/studio`
2. Sanity попросит авторизоваться
3. Войти с тем же аккаунтом, что и на sanity.io
4. Проверить, что видны 6 типов документов:
   - Page
   - Service
   - Case Study
   - FAQ
   - OmniDash Block
   - Blog Post

---

## Шаг 7: Настроить CORS в Sanity

Если Studio не открывается или показывает ошибку CORS:

1. Перейти в https://sanity.io/manage
2. Выбрать проект → API → CORS Origins
3. Добавить origins:
   - `https://analyst-online.vercel.app`
   - `http://localhost:3000` (для локальной разработки)
4. Credentials: **Include**

---

## Шаг 8: Создать тестовый документ

В Studio на production создать тестовый FAQ:

- Question: "Test question"
- Answer: "Test answer"
- Locale: `ru`
- Category: `general`
- Order: `0`

Сохранить (Ctrl+S / Cmd+S).

---

## Troubleshooting

### Studio не открывается (404)

- Проверить, что деплой прошёл успешно
- Проверить, что переменные добавлены в Vercel
- Сделать Redeploy

### Ошибка "Configuration must contain projectId"

- Проверить, что `NEXT_PUBLIC_SANITY_PROJECT_ID` добавлен в Vercel
- Проверить, что выбраны все 3 окружения (Production, Preview, Development)
- Сделать Redeploy

### Ошибка CORS

- Добавить `https://analyst-online.vercel.app` в CORS Origins в Sanity Dashboard
- Credentials: Include

### Ошибка "Unauthorized"

- Проверить, что `SANITY_API_TOKEN` правильный
- Проверить, что токен имеет права Editor
- Создать новый токен если нужно

---

## Следующий шаг

После успешного деплоя Studio переходим к **Sprint 7** — миграция контента из `.copy.ts` в CMS.

---

## Полезные ссылки

- Vercel Dashboard: https://vercel.com/dashboard
- Sanity Dashboard: https://sanity.io/manage
- Production Studio: https://analyst-online.vercel.app/studio
- Sanity CORS Docs: https://www.sanity.io/docs/front-ends/cors
