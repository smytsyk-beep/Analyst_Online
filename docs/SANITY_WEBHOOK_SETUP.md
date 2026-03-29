# Sanity Webhook Setup — ISR Revalidation

## Цель

Настроить автоматическую ревалидацию страниц Next.js при изменении контента в Sanity Studio.

**Как работает:**
1. Редактор изменяет контент в Sanity Studio
2. Sanity отправляет webhook на ваш сервер
3. Next.js ревалидирует кеш для изменённого типа документа
4. Страница обновляется за ~5 секунд

---

## Шаг 1: Генерация секретов

Сгенерируйте два случайных секрета:

```bash
# В терминале
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Запустите команду дважды и сохраните результаты:
- Первый → `SANITY_REVALIDATE_SECRET`
- Второй → `SANITY_WEBHOOK_SECRET` (опционально)

---

## Шаг 2: Добавление переменных окружения

### Локально (`.env.local`)

```bash
SANITY_REVALIDATE_SECRET=your_first_random_secret_here
SANITY_WEBHOOK_SECRET=your_second_random_secret_here
```

### Vercel

1. Откройте **Project Settings → Environment Variables**
2. Добавьте обе переменные во все окружения (Production, Preview, Development)
3. Сохраните и передеплойте проект

---

## Шаг 3: Настройка webhook в Sanity

1. Откройте https://sanity.io/manage
2. Выберите ваш проект
3. Перейдите в **API → Webhooks**
4. Нажмите **Add webhook**

### Настройки webhook:

| Поле | Значение |
|------|----------|
| **Name** | `Next.js ISR Revalidation` |
| **URL** | `https://analyst-online.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET` |
| **Dataset** | `production` |
| **Trigger on** | Create, Update, Delete |
| **Filter** | Оставить пустым (или настроить фильтр по типам) |
| **Projection** | `{ _type, "slug": slug.current }` |
| **HTTP method** | `POST` |
| **API version** | `v2021-06-07` |
| **Include drafts** | ❌ Unchecked |
| **HTTP Headers** | Оставить пустым |
| **Secret** | `YOUR_WEBHOOK_SECRET` (если используете signature validation) |

**Важно:** Замените `YOUR_REVALIDATE_SECRET` на реальное значение из `.env.local`

---

## Шаг 4: Тестирование webhook

### Локальное тестирование (с ngrok)

Если хотите протестировать локально:

```bash
# Установите ngrok
npm install -g ngrok

# Запустите dev server
npm run dev

# В другом терминале
ngrok http 3000

# Используйте ngrok URL в webhook:
# https://abc123.ngrok.io/api/revalidate?secret=YOUR_SECRET
```

### Production тестирование

1. Откройте Sanity Studio: `https://analyst-online.vercel.app/studio`
2. Измените любой документ (например, FAQ)
3. Сохраните изменения
4. Проверьте Vercel Logs → Functions → `/api/revalidate`
5. Должен появиться лог: `✅ Revalidated tag: faq`
6. Обновите страницу — изменения должны появиться через ~5 секунд

---

## Шаг 5: Проверка работы

### Проверка через curl

```bash
curl -X POST "https://analyst-online.vercel.app/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type": "page"}'
```

**Ожидаемый ответ:**
```json
{
  "revalidated": true,
  "now": 1234567890,
  "type": "page"
}
```

### Проверка в Sanity Dashboard

1. Откройте **API → Webhooks → Your webhook**
2. Перейдите в **Deliveries**
3. Должны быть успешные запросы с кодом `200`

---

## Типы документов и теги

Каждый тип документа в Sanity имеет свой тег для ревалидации:

| Тип документа | Тег | Страницы для ревалидации |
|---------------|-----|--------------------------|
| `page` | `page` | Home, Privacy, Contact, Cases |
| `service` | `service` | Services |
| `omnidashBlock` | `omnidashBlock` | OmniDash |
| `faq` | `faq` | OmniDash FAQ |
| `caseStudy` | `caseStudy` | Cases (будущее) |
| `blogPost` | `blogPost` | Blog (будущее) |

---

## Troubleshooting

### Webhook не срабатывает

1. Проверьте URL webhook — должен быть production URL
2. Проверьте `SANITY_REVALIDATE_SECRET` в Vercel Environment Variables
3. Проверьте Vercel Logs → Functions → `/api/revalidate`

### Webhook возвращает 401 Unauthorized

- Секрет в URL webhook не совпадает с `SANITY_REVALIDATE_SECRET`
- Проверьте, что переменная добавлена в Vercel

### Webhook возвращает 500 Internal Server Error

- Проверьте Vercel Logs для деталей ошибки
- Возможно, проблема с `parseBody()` — проверьте формат webhook payload

### Страница не обновляется

1. Проверьте, что в fetch используется `{ next: { tags: ['type'] } }`
2. Проверьте, что тег совпадает с `body._type` из webhook
3. Очистите кеш браузера и попробуйте снова

---

## Дополнительные ресурсы

- [Sanity Webhooks Documentation](https://www.sanity.io/docs/webhooks)
- [Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Next.js Tag-based Revalidation](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

---

**Статус:** ✅ Готово к настройке после деплоя Sprint 7
