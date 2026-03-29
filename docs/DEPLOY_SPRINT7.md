# Deploy Sprint 7 — Инструкция

**Дата:** 2026-03-22  
**Статус:** 📋 Ready to deploy

---

## Что деплоим

Sprint 7 — CMS migration + ISR setup:

- ✅ GROQ queries
- ✅ Migration script
- ✅ CMS-driven pages (Home, Services, OmniDash)
- ✅ Preview mode infrastructure
- ✅ ISR webhook endpoint

---

## Шаг 1: Генерация секретов

Сгенерируйте три случайных секрета:

```bash
# В терминале (запустите 3 раза)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Сохраните результаты:

1. Первый → `SANITY_PREVIEW_SECRET`
2. Второй → `SANITY_REVALIDATE_SECRET`
3. Третий → `SANITY_WEBHOOK_SECRET`

---

## Шаг 2: Добавить env-переменные в Vercel

1. Откройте https://vercel.com/your-project/settings/environment-variables
2. Добавьте три новые переменные:

| Variable                   | Value                | Environments                     |
| -------------------------- | -------------------- | -------------------------------- |
| `SANITY_PREVIEW_SECRET`    | `your_first_secret`  | Production, Preview, Development |
| `SANITY_REVALIDATE_SECRET` | `your_second_secret` | Production, Preview, Development |
| `SANITY_WEBHOOK_SECRET`    | `your_third_secret`  | Production, Preview, Development |

3. Сохраните изменения

---

## Шаг 3: Коммит и push

```bash
# Проверить изменения
git status

# Добавить все файлы
git add .

# Коммит
git commit -m "feat(sprint7): CMS migration, preview mode, and ISR setup

- Add GROQ queries for all content types
- Create migration script (sanity/migrate.ts)
- Migrate 73 documents to Sanity CMS
- Update Home, Services, OmniDash to use CMS
- Add preview mode API routes
- Add ISR webhook endpoint
- Add comprehensive documentation"

# Push
git push origin main
```

---

## Шаг 4: Проверить деплой в Vercel

1. Откройте https://vercel.com/your-project
2. Дождитесь завершения деплоя (~2-3 минуты)
3. Проверьте статус: **Ready**

---

## Шаг 5: Проверить работу сайта

### Проверка страниц

1. **Home:** https://analyst-online.vercel.app/ru
   - Должен загружаться контент из CMS
   - Проверить hero title и subtitle

2. **Services:** https://analyst-online.vercel.app/ru/services
   - Должны отображаться 6 услуг из CMS
   - Проверить порядок и highlighted статус

3. **OmniDash:** https://analyst-online.vercel.app/ru/omnidash
   - Все блоки должны загружаться из CMS
   - FAQ должен отображаться из CMS

### Проверка Sanity Studio

1. Откройте https://analyst-online.vercel.app/studio
2. Авторизуйтесь через Sanity
3. Проверьте, что видны все типы документов:
   - Page (12)
   - Service (18)
   - OmniDash Block (18)
   - FAQ (25)

---

## Шаг 6: Настроить webhook в Sanity

Следуйте инструкциям в `docs/SANITY_WEBHOOK_SETUP.md`:

1. Откройте https://sanity.io/manage
2. Выберите проект
3. API → Webhooks → Add webhook

**Настройки:**

- **Name:** `Next.js ISR Revalidation`
- **URL:** `https://analyst-online.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **Projection:** `{ _type, "slug": slug.current }`

4. Сохраните webhook

---

## Шаг 7: Протестировать ISR

1. Откройте Studio: https://analyst-online.vercel.app/studio
2. Измените любой FAQ вопрос
3. Сохраните изменения
4. Проверьте Vercel Logs → Functions → `/api/revalidate`
5. Должен появиться лог: `✅ Revalidated for type: faq`
6. Обновите страницу `/ru/omnidash` — изменения должны появиться через ~5 секунд

---

## Шаг 8: Проверить preview mode (опционально)

1. Создайте черновик документа в Studio (не публикуйте)
2. Откройте preview URL:
   ```
   https://analyst-online.vercel.app/api/draft?secret=YOUR_PREVIEW_SECRET&slug=/ru
   ```
3. Должен включиться draft mode
4. Черновики должны быть видны на странице

---

## Troubleshooting

### Страницы не обновляются из CMS

1. Проверьте Vercel Logs → Functions
2. Проверьте, что env-переменные добавлены в Vercel
3. Проверьте, что `NEXT_PUBLIC_SANITY_PROJECT_ID` и `NEXT_PUBLIC_SANITY_DATASET` корректны

### Webhook не работает

1. Проверьте URL webhook в Sanity Dashboard
2. Проверьте `SANITY_REVALIDATE_SECRET` в Vercel
3. Проверьте Vercel Logs → Functions → `/api/revalidate`
4. Проверьте Sanity Dashboard → Webhooks → Deliveries

### Studio не открывается

1. Проверьте, что `/studio` исключён из middleware (должно быть)
2. Проверьте Vercel Logs
3. Очистите кеш браузера

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

- [ ] Секреты сгенерированы
- [ ] Env-переменные добавлены в Vercel (все 3 окружения)
- [ ] Код закоммичен и запушен
- [ ] Деплой завершён успешно
- [ ] Home page загружается из CMS
- [ ] Services page загружается из CMS
- [ ] OmniDash page загружается из CMS
- [ ] Studio открывается и работает
- [ ] Webhook настроен в Sanity Dashboard
- [ ] ISR протестирован (изменение → обновление страницы)

---

## После успешного деплоя

1. ✅ Обновить `docs/Analyst_Online_Sprint_Status_2026-03-17.md`
2. ✅ Отметить Sprint 7 как завершённый
3. ✅ Начать планирование Sprint 8 (Blog infrastructure)

---

**Готово к деплою!** 🚀
