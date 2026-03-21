# Push Instructions — Sprint 6

## Статус

✅ Коммит готов и проверен:

- `npm run format:check` — ✅ passed
- `npm run lint` — ✅ passed
- `npm run build` — ✅ passed

Коммит: `feat(sprint6): complete Sanity CMS infrastructure`  
Ветка: `feat/vercel-test`

---

## Как сделать push

### Вариант 1: Через GitHub Desktop (рекомендуется)

1. Открыть GitHub Desktop
2. Выбрать ветку `feat/vercel-test`
3. Нажать **Push origin**

### Вариант 2: Через командную строку

```bash
git push origin feat/vercel-test --force-with-lease
```

`--force-with-lease` нужен, так как мы изменили последний коммит через amend.

Если требуется авторизация:

- Username: `smytsyk-beep`
- Password: использовать **Personal Access Token** (не обычный пароль)

Создать токен: https://github.com/settings/tokens

---

## После успешного push

### 1. Создать Pull Request

1. Перейти на GitHub: https://github.com/smytsyk-beep/Analyst_Online
2. Увидите предложение создать Pull Request из `feat/vercel-test` в `main`
3. Нажать **Compare & pull request**
4. Заголовок: `feat(sprint6): complete Sanity CMS infrastructure`
5. Описание можно скопировать из `docs/SPRINT_6_SUMMARY.md`
6. Нажать **Create pull request**

### 2. Проверить CI

GitHub Actions автоматически запустит проверки:

- ✅ Lint
- ✅ Format check
- ✅ Build

Все должны пройти успешно.

### 3. Merge в main

После успешных проверок:

1. Нажать **Merge pull request**
2. Выбрать **Squash and merge** (рекомендуется)
3. Подтвердить merge

### 4. Vercel автоматически задеплоит

После merge в `main` Vercel автоматически:

- Запустит новый деплой
- Соберёт проект
- Опубликует на production

---

## Настройка Sanity на Vercel

После деплоя нужно добавить переменные окружения в Vercel.

Подробная инструкция: `docs/DEPLOY_SPRINT6.md`

### Кратко:

1. **Создать Sanity project** на https://sanity.io
2. **Получить Project ID и API Token**
3. **Добавить в Vercel** (Settings → Environment Variables):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `SANITY_API_TOKEN`
4. **Redeploy** на Vercel
5. **Открыть** `https://analyst-online.vercel.app/studio`

---

## Troubleshooting

### Push не работает (authentication failed)

Использовать Personal Access Token вместо пароля:

1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Scopes: `repo` (full control)
4. Использовать токен как пароль при push

### CI проверки не проходят

Локально проверить:

```bash
npm run lint
npm run format:check
npm run build
```

Если локально всё работает — проблема в CI, нужно смотреть логи на GitHub.

### Vercel деплой не запускается

1. Проверить, что репозиторий подключён к Vercel
2. Проверить, что ветка `main` настроена как production branch
3. Проверить логи деплоя в Vercel Dashboard

---

## Следующий шаг

После успешного деплоя и настройки Sanity:

- Открыть `/studio` на production
- Создать тестовый документ
- Переходить к **Sprint 7** — миграция контента

План: `docs/Analyst_Online_Sprint_Plan_6-10.md`
