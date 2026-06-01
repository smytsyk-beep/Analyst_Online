# Git Push Guide — Решение проблем с авторизацией

## Проблема

При попытке `git push` через командную строку возникает ошибка:

```
fatal: could not read Username for 'https://github.com': No such file or directory
```

---

## Решение 1: GitHub Desktop (рекомендуется)

Это самый простой способ — GitHub Desktop автоматически управляет авторизацией.

### Шаги:

1. **Открыть GitHub Desktop**
2. **Выбрать репозиторий** `Analyst_Online`
3. **Выбрать ветку** `feat/vercel-test` (в верхнем меню)
4. **Нажать кнопку** `Push origin` (справа вверху)

Готово! GitHub Desktop автоматически запушит все коммиты.

---

## Решение 2: Настроить Git Credential Manager (для командной строки)

Если хочешь использовать командную строку, нужно настроить авторизацию.

### Вариант A: Git Credential Manager (рекомендуется для Windows)

1. **Проверить, установлен ли GCM:**

   ```bash
   git credential-manager --version
   ```

2. **Если не установлен, скачать:**
   https://github.com/git-ecosystem/git-credential-manager/releases

3. **После установки настроить:**

   ```bash
   git config --global credential.helper manager
   ```

4. **Попробовать push снова:**

   ```bash
   git push origin feat/vercel-test
   ```

   При первом push откроется окно авторизации GitHub — войти через браузер.

### Вариант B: Personal Access Token (классический способ)

1. **Создать Personal Access Token:**
   - Перейти: https://github.com/settings/tokens
   - Нажать `Generate new token (classic)`
   - Scopes: выбрать `repo` (full control of private repositories)
   - Скопировать токен (показывается только один раз!)

2. **Использовать токен как пароль:**

   ```bash
   git push origin feat/vercel-test
   ```

   Когда попросит:
   - Username: `smytsyk-beep`
   - Password: вставить токен (не обычный пароль!)

3. **Сохранить токен в credential helper:**

   ```bash
   git config --global credential.helper store
   git push origin feat/vercel-test
   ```

   После первого успешного push токен сохранится.

---

## Решение 3: SSH вместо HTTPS

Если хочешь использовать SSH ключи вместо токенов:

1. **Сгенерировать SSH ключ:**

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Добавить ключ в SSH agent:**

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. **Добавить публичный ключ на GitHub:**
   - Скопировать содержимое `~/.ssh/id_ed25519.pub`
   - Перейти: https://github.com/settings/keys
   - Нажать `New SSH key`
   - Вставить ключ

4. **Изменить remote URL на SSH:**

   ```bash
   git remote set-url origin git@github.com:smytsyk-beep/Analyst_Online.git
   ```

5. **Push через SSH:**
   ```bash
   git push origin feat/vercel-test
   ```

---

## Текущее состояние

### Коммиты готовы к push:

```
c08b5ce chore: sync package-lock.json
cebf3ad Merge branch 'main' into feat/vercel-test
38d7a61 fix(studio): add fallback UI when Sanity is not configured
e75d22d Feat/vercel test (#93)
637a3e0 docs: add push and deploy instructions for Sprint 6
e31d19e feat(sprint6): complete Sanity CMS infrastructure
```

### Ветка: `feat/vercel-test`

### Проверки пройдены:

- ✅ `npm run build`
- ✅ `npm run lint`
- ✅ `npm run format`

---

## После успешного push

1. **Перейти на GitHub:** https://github.com/smytsyk-beep/Analyst_Online
2. **Создать Pull Request** из `feat/vercel-test` в `main`
3. **Дождаться прохождения CI** (lint, format, build)
4. **Merge в main**
5. **Vercel автоматически задеплоит**

---

## Troubleshooting

### "Updates were rejected because the remote contains work that you do not have locally"

Сделать pull перед push:

```bash
git pull origin feat/vercel-test --rebase
git push origin feat/vercel-test
```

### "fatal: Authentication failed"

- Проверить, что используется токен, а не пароль
- Создать новый токен: https://github.com/settings/tokens
- Проверить, что токен имеет scope `repo`

### GitHub Desktop не видит изменения

- Убедиться, что выбран правильный репозиторий
- Нажать `Fetch origin` для обновления
- Проверить, что выбрана ветка `feat/vercel-test`

---

## Рекомендация

**Используй GitHub Desktop** — это самый простой и надёжный способ для Windows. Он автоматически управляет авторизацией и не требует настройки токенов или SSH ключей.
