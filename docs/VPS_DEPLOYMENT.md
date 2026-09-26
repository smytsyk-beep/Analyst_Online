# Вывод Analyst Online в production на собственном VPS

Итоговая схема:

`Cloudflare → Caddy → Docker → Next.js standalone`

Инструкция рассчитана на:

- чистый VPS с Ubuntu 24.04;
- ServerCheap, 2 vCPU / 4 GB RAM / 40 GB NVMe;
- домен `analyst-online.com` в Cloudflare;
- репозиторий GitHub `smytsyk-beep/Analyst_Online`;
- выполнение локальных команд из Windows PowerShell.

## Главные правила безопасности

1. Не закрывайте первоначальный сеанс `root`, пока не проверили вход по ключу в двух новых окнах.
2. `bootstrap-vps.sh` больше не отключает парольный вход и не включает firewall.
3. SSH усиливается отдельным `harden-vps.sh` только после явного подтверждения.
4. Личный admin-ключ и CI deploy-ключ должны быть разными.
5. Приватные ключи хранятся в `%USERPROFILE%\.ssh`, а не внутри репозитория.
6. После переустановки VPS меняется host key сервера. Старый `VPS_KNOWN_HOSTS` использовать нельзя.
7. При любой проблеме со входом сначала используйте VNC/HTML Console в ServerCheap, а не
   переустанавливайте сервер.

## Этап 1. Подготовить два SSH-ключа на Windows

Откройте PowerShell на своём компьютере:

```powershell
$VpsIp = 'ВСТАВЬТЕ_IP_СЕРВЕРА'
$Repo = 'D:\Msn\analyst-online'
$SshDir = Join-Path $env:USERPROFILE '.ssh'
New-Item -ItemType Directory -Force -Path $SshDir | Out-Null
```

Если старый deploy-ключ был создан в корне проекта, переместите его в `.ssh`. Не перезаписывайте
существующий файл с тем же именем:

```powershell
if (Test-Path "$Repo\analyst-online-deploy") {
  Move-Item -LiteralPath "$Repo\analyst-online-deploy" -Destination "$SshDir\analyst-online-deploy"
}
if (Test-Path "$Repo\analyst-online-deploy.pub") {
  Move-Item -LiteralPath "$Repo\analyst-online-deploy.pub" -Destination "$SshDir\analyst-online-deploy.pub"
}
```

Создайте личный аварийный admin-ключ. Для него обязательно задайте парольную фразу:

```powershell
ssh-keygen -t ed25519 -a 64 -f "$SshDir\analyst-online-admin" -C 'analyst-online-admin'
```

Если deploy-ключа ещё нет, создайте отдельный ключ для GitHub Actions. Для него оставьте парольную
фразу пустой, потому что текущий workflow выполняется неинтерактивно:

```powershell
ssh-keygen -t ed25519 -a 64 -f "$SshDir\analyst-online-deploy" -C 'analyst-online-github-actions'
```

Должны существовать четыре файла:

```powershell
Get-ChildItem "$SshDir\analyst-online-*"
```

- `analyst-online-admin` — личный приватный ключ, не передавать GitHub;
- `analyst-online-admin.pub` — публичная часть admin-ключа;
- `analyst-online-deploy` — приватный CI-ключ, позже станет GitHub Secret;
- `analyst-online-deploy.pub` — публичная часть CI-ключа.

Никогда не открывайте и не отправляйте приватные файлы в чат. В `.gitignore` проекта добавлена
защита от случайного коммита этих имён.

## Этап 2. Первый вход после переустановки VPS

После переустановки сервер получает новый SSH host key. Удалите только старую запись этого IP:

```powershell
ssh-keygen -R $VpsIp
```

Сначала откройте HTML/VNC Console в панели ServerCheap, войдите как `root` и получите fingerprint
нового host key непосредственно с сервера:

```bash
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

В локальном PowerShell сравните его с результатом:

```powershell
ssh-keyscan -t ed25519 $VpsIp 2>$null | ssh-keygen -lf -
```

Fingerprint должен совпасть. Только после этого доверяйте новому host key.

Теперь откройте первое окно PowerShell — далее это **Терминал A** — и войдите временным
root-паролем из панели ServerCheap:

```powershell
ssh root@$VpsIp
```

Fingerprint в вопросе SSH ещё раз должен совпасть. Не закрывайте Терминал A до завершения раздела
«Безопасно усилить SSH».

## Этап 3. Загрузить и выполнить безопасный bootstrap

Из второго локального PowerShell загрузите только публичные ключи и установочные скрипты:

```powershell
scp "$SshDir\analyst-online-admin.pub" root@${VpsIp}:/root/
scp "$SshDir\analyst-online-deploy.pub" root@${VpsIp}:/root/
scp "$Repo\ops\bootstrap-vps.sh" root@${VpsIp}:/root/
scp "$Repo\ops\harden-vps.sh" root@${VpsIp}:/root/
```

Всё ещё в Терминале A выполните:

```bash
bash /root/bootstrap-vps.sh \
  /root/analyst-online-admin.pub \
  /root/analyst-online-deploy.pub
```

Скрипт:

- проверит, что ему переданы именно публичные ключи;
- добавит личный admin-ключ для аварийного входа `root`;
- создаст пользователя `deploy` и установит ему отдельный CI-ключ;
- установит Docker Engine, Compose, Fail2ban и unattended-upgrades;
- создаст `/opt/analyst-online`;
- создаст swap 2 GB.

На этом этапе скрипт **не меняет SSH-конфигурацию, не отключает пароль и не включает UFW**.

## Этап 4. Обязательно проверить оба входа

Не закрывая Терминал A, откройте новый **Терминал B** и проверьте личный admin-ключ:

```powershell
ssh -i "$SshDir\analyst-online-admin" -o IdentitiesOnly=yes root@$VpsIp
```

На сервере выполните:

```bash
whoami
```

Ожидается `root`.

Откройте ещё один **Терминал C** и проверьте CI-ключ пользователя `deploy`:

```powershell
ssh -i "$SshDir\analyst-online-deploy" -o IdentitiesOnly=yes deploy@$VpsIp
```

Проверьте:

```bash
whoami
id
docker version
docker compose version
```

Ожидается:

- пользователь `deploy`;
- группа `docker` присутствует;
- Docker client и server отвечают;
- Docker Compose показывает версию.

Членство в группе `docker` фактически даёт административный доступ к серверу. Поэтому deploy-ключ
используйте только для GitHub Actions и не устанавливайте его на другие устройства.

Если хотя бы один вход не работает, **не запускайте hardening**. В Терминале A проверьте:

```bash
ls -ld /root/.ssh /home/deploy/.ssh
ls -l /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
sshd -t
journalctl -u ssh --since '10 minutes ago' --no-pager
```

## Этап 5. Безопасно усилить SSH

Только после успешной проверки Терминалов B и C вернитесь в всё ещё открытый Терминал A:

```bash
bash /root/harden-vps.sh --i-have-tested-both-key-logins
```

Скрипт:

- определит текущий SSH-порт;
- сначала разрешит SSH, HTTP и HTTPS в UFW;
- проверит конфигурацию через `sshd -t`;
- отключит парольную аутентификацию;
- оставит root-доступ по личному admin-ключу;
- создаст `/root/recover-analyst-online-ssh.sh` для отката;
- только затем перезагрузит SSH-конфигурацию.

Не закрывайте Терминал A. Откройте ещё два новых окна и повторите оба входа:

```powershell
ssh -i "$SshDir\analyst-online-admin" -o IdentitiesOnly=yes root@$VpsIp
ssh -i "$SshDir\analyst-online-deploy" -o IdentitiesOnly=yes deploy@$VpsIp
```

Если оба работают, старый Терминал A можно закрыть. Вход по root-паролю теперь намеренно отключён.

Если новый вход не работает, в старом Терминале A выполните:

```bash
/root/recover-analyst-online-ssh.sh
```

Если закрыты все SSH-сеансы, откройте VNC/HTML Console в ServerCheap и выполните там ту же команду.
Recovery-скрипт удалит наш SSH drop-in, оставит SSH-порт в UFW и перезапустит SSH.

## Этап 6. Создать production environment на VPS

Из локального PowerShell загрузите шаблон:

```powershell
scp -i "$SshDir\analyst-online-deploy" -o IdentitiesOnly=yes "$Repo\.env.production.example" deploy@${VpsIp}:/opt/analyst-online/.env.production
```

Войдите как `deploy` и откройте файл:

```powershell
ssh -i "$SshDir\analyst-online-deploy" -o IdentitiesOnly=yes deploy@$VpsIp
```

```bash
chmod 600 /opt/analyst-online/.env.production
nano /opt/analyst-online/.env.production
```

Заполните значения:

| Переменная                               | Источник                                |
| ---------------------------------------- | --------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                   | `https://analyst-online.com`            |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`          | текущий Sanity project ID               |
| `NEXT_PUBLIC_SANITY_DATASET`             | обычно `production`                     |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`         | Cloudflare Turnstile site key           |
| `SANITY_API_TOKEN`                       | текущий серверный Sanity token          |
| `SANITY_PREVIEW_SECRET`                  | отдельная случайная строка              |
| `SANITY_REVALIDATE_SECRET`               | отдельная случайная строка              |
| `SANITY_WEBHOOK_SECRET`                  | секрет подписи Sanity webhook           |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | текущая Telegram-интеграция             |
| `GOOGLE_*`                               | текущий service account и Sheet ID      |
| `CONTACT_FORM_SECRET`                    | отдельная случайная строка              |
| `TURNSTILE_SECRET_KEY`                   | Turnstile secret key                    |
| `CONTACT_TURNSTILE_REQUIRED`             | `true`                                  |
| `UPSTASH_*`                              | опционально, для постоянного rate limit |

Секреты можно сгенерировать локально командой, каждый раз отдельно:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`GOOGLE_PRIVATE_KEY` храните одной строкой с `\n`, как в текущем `.env.local`/Vercel.

Проверьте права и имена переменных, не выводя их значения:

```bash
stat -c '%a %U:%G %n' /opt/analyst-online/.env.production
grep -E '^[A-Z0-9_]+=' /opt/analyst-online/.env.production | cut -d= -f1
```

Ожидаемые права: `600 deploy:deploy`.

## Этап 7. Создать Cloudflare Origin Certificate

В Cloudflare:

1. Откройте домен `analyst-online.com`.
2. Перейдите **SSL/TLS → Origin Server → Create certificate**.
3. Выберите генерацию Cloudflare.
4. Добавьте имена:
   - `analyst-online.com`;
   - `*.analyst-online.com`.
5. Скопируйте Origin Certificate и Private Key. Private Key показывается один раз.

На VPS от пользователя `deploy`:

```bash
nano /opt/analyst-online/certs/cloudflare-origin.pem
nano /opt/analyst-online/certs/cloudflare-origin.key
chmod 640 /opt/analyst-online/certs/cloudflare-origin.pem
chmod 600 /opt/analyst-online/certs/cloudflare-origin.key
```

В первый файл вставьте сертификат, во второй — private key. Проверьте их:

```bash
openssl x509 -in /opt/analyst-online/certs/cloudflare-origin.pem -noout -subject -dates
openssl pkey -in /opt/analyst-online/certs/cloudflare-origin.key -check -noout
```

В Cloudflare установите **SSL/TLS encryption mode → Full (strict)**. Origin CA поддерживается этим
режимом. HSTS пока не включайте.

## Этап 8. Настроить GitHub Variables и Secrets

В GitHub откройте репозиторий → **Settings → Secrets and variables → Actions**.

Создайте именно repository variables, потому что job сборки образа не привязан к Environment:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`;
- `NEXT_PUBLIC_SANITY_DATASET` = `production`;
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`;
- `PRODUCTION_BASE_URL` = `https://preview.analyst-online.com`.

Создайте Secrets — на уровне репозитория или Environment `production`:

- `VPS_HOST` = IP сервера;
- `VPS_PORT` = `22`, если вы его не меняли;
- `VPS_USER` = `deploy`;
- `VPS_SSH_PRIVATE_KEY` = полное содержимое `analyst-online-deploy`;
- `VPS_KNOWN_HOSTS` = проверенная строка host key нового сервера.

Чтобы скопировать deploy private key в буфер Windows:

```powershell
Get-Content -Raw "$SshDir\analyst-online-deploy" | Set-Clipboard
```

После создания секрета очистите буфер:

```powershell
Set-Clipboard -Value ''
```

Получите `VPS_KNOWN_HOSTS`:

```powershell
ssh-keyscan -H -t ed25519 $VpsIp 2>$null
```

Перед сохранением снова сравните fingerprint с
`ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` на сервере.

## Этап 9. Разрешить VPS скачивать приватный образ GHCR

В GitHub создайте токен для отдельной технической учётной записи или текущего пользователя с
минимальным разрешением `read:packages`. Если репозиторий принадлежит организации с SSO, токену
может понадобиться отдельная авторизация для организации.

На VPS войдите как `deploy` и выполните без записи токена в историю:

```bash
read -rsp 'GHCR token: ' GHCR_TOKEN
echo
printf '%s' "${GHCR_TOKEN}" | docker login ghcr.io -u ВАШ_GITHUB_USERNAME --password-stdin
unset GHCR_TOKEN
chmod 600 ~/.docker/config.json
```

Ожидается `Login Succeeded`.

## Этап 10. Настроить preview-домен до первого deploy

В Cloudflare → DNS создайте:

| Type | Name      | Target   | Proxy status           |
| ---- | --------- | -------- | ---------------------- |
| A    | `preview` | IPv4 VPS | Proxied / orange cloud |

Подождите несколько минут и проверьте:

```powershell
Resolve-DnsName preview.analyst-online.com
```

До первого deploy сайт может отдавать ошибку Cloudflare — это ожидаемо.

## Этап 11. Добавить CORS Sanity и Turnstile hostnames

В Sanity Manage:

1. Выберите проект.
2. Откройте **Settings → API settings → CORS Origins**.
3. Добавьте отдельно:
   - `https://preview.analyst-online.com`;
   - `https://analyst-online.com`.
4. Для обеих записей включите **Allow credentials**, потому что на этих origin работает Studio.

Не используйте общий wildcard с credentials.

В Cloudflare Turnstile добавьте разрешённые hostnames:

- `preview.analyst-online.com`;
- `analyst-online.com`.

В Cloudflare → **Caching → Cache Rules** создайте два взаимоисключающих правила для домена:

1. Для URI path, начинающегося с `/_next/static/`, включите cache eligibility и Edge TTL, например
   один месяц. Имена файлов Next.js содержат content hash, поэтому их безопасно кешировать долго.
2. Для остальных путей (`/api/*`, `/studio/*` и HTML) выберите bypass cache. Это важно для
   геолокации, cookies, preview и актуального контента.

Не включайте правило Cache Everything для всего сайта.

## Этап 12. Запустить первый deployment

Workflow запускается только после push в `main`. Сначала убедитесь, что приватные ключи не попадают
в `git status`, затем просмотрите изменения и отправьте их через обычный PR/merge в `main`.

В GitHub Actions workflow `build` должен последовательно выполнить:

1. форматирование, ESLint и Next.js build;
2. сборку Node.js 24 Docker image;
3. публикацию commit-SHA image в приватный GHCR;
4. загрузку Compose/Caddy файлов на VPS;
5. запуск контейнеров;
6. ожидание `/api/health`;
7. внешний smoke-тест preview-домена.

На VPS состояние можно смотреть командами:

```bash
cd /opt/analyst-online
docker compose --env-file .release.env -f compose.production.yml ps
docker logs --tail 100 analyst-online-app
docker logs --tail 100 analyst-online-caddy
```

Проверка с компьютера:

```powershell
curl.exe -fsS https://preview.analyst-online.com/api/health
curl.exe -I https://preview.analyst-online.com/ru
```

## Этап 13. Проверить preview

Проверьте вручную:

- `/ru`, `/ua`, `/ro`;
- `/ru/services`, `/ru/cases`, `/ru/blog`, `/ru/contact`;
- `/ru/omnidash`, `/ru/privacy`;
- `/studio` и вход редактора;
- отправку тестовой заявки;
- появление заявки в Telegram и Google Sheets;
- Turnstile;
- публикацию тестового изменения в Sanity.

Геолокацию проверьте из реальных IP или VPN:

- Украина: любой путь без локали и даже `/ru` перенаправляется на `/ua`;
- Румыния: `/` перенаправляется на `/ro`;
- США, Канада и остальные страны: `/` перенаправляется на `/ru`.

Проверьте в HTML и response headers, что canonical, Open Graph, JSON-LD, sitemap и robots содержат
только `https://analyst-online.com`, без `analyst-online.vercel.app`.

С локального репозитория можно запустить read-only smoke-тест:

```powershell
cd $Repo
npm run smoke:production -- https://preview.analyst-online.com
```

## Этап 14. Переключить основной домен

После успешного preview создайте в Cloudflare:

| Type  | Name  | Target               | Proxy status           |
| ----- | ----- | -------------------- | ---------------------- |
| A     | `@`   | IPv4 VPS             | Proxied / orange cloud |
| CNAME | `www` | `analyst-online.com` | Proxied / orange cloud |

Caddy перенаправляет `www` на apex-домен.

В GitHub измените repository variable:

```text
PRODUCTION_BASE_URL=https://analyst-online.com
```

Повторно запустите последний workflow или сделайте следующий production deploy.

В Sanity измените webhook на:

```text
https://analyst-online.com/api/revalidate?secret=ЗНАЧЕНИЕ_SANITY_REVALIDATE_SECRET
```

Webhook signing secret должен совпадать с `SANITY_WEBHOOK_SECRET`.

Проверьте:

```powershell
curl.exe -fsS https://analyst-online.com/api/health
curl.exe -I https://www.analyst-online.com/ru
curl.exe -fsS https://analyst-online.com/robots.txt
curl.exe -fsS https://analyst-online.com/sitemap.xml
```

## Этап 15. Закрыть прямой web-доступ к origin

Только после успешной работы proxied DNS войдите отдельным admin-ключом как `root` и выполните:

```powershell
ssh -i "$SshDir\analyst-online-admin" -o IdentitiesOnly=yes root@$VpsIp
```

```bash
bash /opt/analyst-online/ops/restrict-origin-to-cloudflare.sh
```

Скрипт сначала добавляет актуальные диапазоны Cloudflare и только затем удаляет общие правила для
80/443. SSH-правило он не изменяет.

После этого снова проверьте production-домен. Не включайте HSTS, пока сайт не проработал стабильно
несколько дней.

С внешнего компьютера прямые порты origin должны быть закрыты, а SSH — доступен:

```powershell
Test-NetConnection $VpsIp -Port 443
Test-NetConnection $VpsIp -Port 22
```

Для `443` ожидается `TcpTestSucceeded: False`, для фактического SSH-порта — `True`.

## Этап 16. Мониторинг и резервирование

- Настройте внешний мониторинг `https://analyst-online.com/api/health` минимум из США и Европы.
- Включите уведомления GitHub Actions.
- Храните зашифрованную резервную копию `.env.production` вне VPS.
- Храните Cloudflare Origin private key вместе с резервной конфигурацией, не в Git.
- Сделайте snapshot VPS после полностью успешной настройки и перед крупными системными изменениями.
- Проверяйте место: `df -h` и `docker system df`.
- После нескольких дней стабильной работы удалите custom domain из Vercel и не используйте Hobby
  как постоянный production-резерв.
- Измерьте TTFB из США и Европы. Если европейский TTFB стабильно выше 1,5 секунды, перенесите тот же
  Compose stack на европейский VPS.

Локальной базы данных у приложения нет: контент находится в Sanity, заявки — в Google Sheets и
Telegram. Код и infrastructure-файлы находятся в GitHub.

## Откат приложения

Автоматический deploy откатывает контейнер, если новый image не проходит health-check.

Для ручного отката возьмите SHA последнего рабочего коммита:

```bash
cd /opt/analyst-online
IMAGE_REPOSITORY=ghcr.io/smytsyk-beep/analyst_online \
  ./ops/deploy.sh ПОЛНЫЙ_40_СИМВОЛЬНЫЙ_SHA
```

До переключения apex-домена проведите безопасный тест: после двух успешных preview-релизов
разверните предыдущий SHA, проверьте `/api/health` и основные страницы, затем той же командой верните
текущий SHA. Не используйте заведомо сломанный image для проверки автоматического rollback.

## Частые ошибки

### `Permission denied (publickey)`

Не запускайте hardening повторно. Используйте ещё открытый root-сеанс или VNC Console и проверьте:

```bash
chmod 700 /root/.ssh /home/deploy/.ssh
chmod 600 /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
chown -R root:root /root/.ssh
chown -R deploy:deploy /home/deploy/.ssh
sshd -t
journalctl -u ssh --since '15 minutes ago' --no-pager
```

### После переустановки появляется `REMOTE HOST IDENTIFICATION HAS CHANGED`

Сначала подтвердите в ServerCheap, что сервер действительно переустановлен. Затем:

```powershell
ssh-keygen -R $VpsIp
```

Снова сравните новый fingerprint через ServerCheap console. Не удаляйте предупреждение для
неожиданно изменившегося сервера.

### Cloudflare `525` или `526`

Проверьте:

```bash
docker logs --tail 100 analyst-online-caddy
openssl x509 -in /opt/analyst-online/certs/cloudflare-origin.pem -noout -dates -subject
```

Убедитесь, что сертификат покрывает apex и wildcard, Caddy видит оба файла, а Cloudflare использует
`Full (strict)`.

### Cloudflare `502` или `504`

```bash
docker compose --env-file /opt/analyst-online/.release.env \
  -f /opt/analyst-online/compose.production.yml ps
docker logs --tail 200 analyst-online-app
curl -fsS https://analyst-online.com/api/health
```

### Workflow сообщает `Missing ... variable/secret`

Проверьте точное имя в GitHub. `NEXT_PUBLIC_*` должны быть repository variables, а `VPS_*` —
Secrets, доступные job с Environment `production`.

### VPS не скачивает image из GHCR

Повторите `docker login ghcr.io` от пользователя `deploy`. Токену нужен `read:packages`, а владелец
токена должен иметь доступ к приватному package/repository.

### Экстренное восстановление SSH через VNC

В ServerCheap откройте HTML/VNC Console, войдите как root и выполните:

```bash
/root/recover-analyst-online-ssh.sh
```

Если recovery-файла нет:

```bash
rm -f /etc/ssh/sshd_config.d/00-analyst-online-hardening.conf
ufw allow 22/tcp
sshd -t
systemctl restart ssh
ufw status verbose
```

Если SSH работает не на порту `22`, подставьте фактический порт в команду `ufw allow`.

После восстановления сначала снова проверьте вход по ключам и только потом решайте, отключать ли
парольную аутентификацию.
