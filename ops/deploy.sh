#!/usr/bin/env bash
set -Eeuo pipefail

readonly RELEASE_TAG="${1:-}"
readonly IMAGE_REPOSITORY="${IMAGE_REPOSITORY:-}"
readonly APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly RELEASE_ENV="${APP_DIR}/.release.env"
readonly COMPOSE_FILE="${APP_DIR}/compose.production.yml"
readonly CONTAINER_NAME="analyst-online-app"

if [[ ! "${RELEASE_TAG}" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Release tag must be a 40-character Git commit SHA." >&2
  exit 2
fi

if [[ ! "${IMAGE_REPOSITORY}" =~ ^ghcr\.io/[a-z0-9._/-]+$ ]]; then
  echo "IMAGE_REPOSITORY must be a lowercase ghcr.io repository path." >&2
  exit 2
fi

if [[ ! -f "${APP_DIR}/.env.production" ]]; then
  echo "Missing ${APP_DIR}/.env.production" >&2
  exit 2
fi

required_runtime_variables=(
  NEXT_PUBLIC_SITE_URL
  NEXT_PUBLIC_SANITY_PROJECT_ID
  NEXT_PUBLIC_SANITY_DATASET
  NEXT_PUBLIC_TURNSTILE_SITE_KEY
  SANITY_API_TOKEN
  SANITY_PREVIEW_SECRET
  SANITY_REVALIDATE_SECRET
  SANITY_WEBHOOK_SECRET
  TELEGRAM_BOT_TOKEN
  TELEGRAM_CHAT_ID
  GOOGLE_SHEET_ID
  GOOGLE_SERVICE_ACCOUNT_EMAIL
  GOOGLE_PRIVATE_KEY
  CONTACT_FORM_SECRET
  TURNSTILE_SECRET_KEY
  CONTACT_TURNSTILE_REQUIRED
)

for variable_name in "${required_runtime_variables[@]}"; do
  if ! grep -Eq "^${variable_name}=.+" "${APP_DIR}/.env.production"; then
    echo "Missing or empty ${variable_name} in ${APP_DIR}/.env.production" >&2
    exit 2
  fi
done

if [[ ! -s "${APP_DIR}/certs/cloudflare-origin.pem" || ! -s "${APP_DIR}/certs/cloudflare-origin.key" ]]; then
  echo "Cloudflare Origin Certificate files are missing in ${APP_DIR}/certs." >&2
  exit 2
fi

previous_tag=""
if [[ -f "${RELEASE_ENV}" ]]; then
  previous_tag="$(sed -n 's/^IMAGE_TAG=//p' "${RELEASE_ENV}" | head -n 1)"
fi

write_release_env() {
  local tag="$1"
  local temporary_file
  temporary_file="$(mktemp "${APP_DIR}/.release.env.XXXXXX")"
  chmod 600 "${temporary_file}"
  {
    printf 'IMAGE_REPOSITORY=%s\n' "${IMAGE_REPOSITORY}"
    printf 'IMAGE_TAG=%s\n' "${tag}"
  } >"${temporary_file}"
  mv "${temporary_file}" "${RELEASE_ENV}"
}

wait_for_health() {
  local attempts=0
  local status=""

  while (( attempts < 30 )); do
    status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "${CONTAINER_NAME}" 2>/dev/null || true)"
    if [[ "${status}" == "healthy" ]]; then
      return 0
    fi
    if [[ "${status}" == "unhealthy" ]]; then
      return 1
    fi
    attempts=$((attempts + 1))
    sleep 3
  done

  return 1
}

cd "${APP_DIR}"
write_release_env "${RELEASE_TAG}"

docker compose --env-file "${RELEASE_ENV}" -f "${COMPOSE_FILE}" pull app
docker compose --env-file "${RELEASE_ENV}" -f "${COMPOSE_FILE}" up -d --remove-orphans

if wait_for_health; then
  docker image prune --all --force --filter 'until=168h' >/dev/null
  echo "Deployment ${RELEASE_TAG} is healthy."
  exit 0
fi

echo "Deployment ${RELEASE_TAG} failed its health check." >&2
docker logs --tail 100 "${CONTAINER_NAME}" >&2 || true

if [[ "${previous_tag}" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Rolling back to ${previous_tag}." >&2
  write_release_env "${previous_tag}"
  docker compose --env-file "${RELEASE_ENV}" -f "${COMPOSE_FILE}" pull app
  docker compose --env-file "${RELEASE_ENV}" -f "${COMPOSE_FILE}" up -d --remove-orphans
  if wait_for_health; then
    echo "Rollback to ${previous_tag} completed." >&2
  else
    echo "Rollback container is not healthy; manual intervention is required." >&2
  fi
else
  echo "No previous release is available for automatic rollback." >&2
fi

exit 1
