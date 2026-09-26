#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 1
fi

mapfile -t cloudflare_ranges < <(
  {
    curl -fsSL https://www.cloudflare.com/ips-v4
    curl -fsSL https://www.cloudflare.com/ips-v6
  } | sed '/^[[:space:]]*$/d'
)

if (( ${#cloudflare_ranges[@]} < 10 )); then
  echo "Cloudflare IP list looks incomplete; firewall was not changed." >&2
  exit 1
fi

for cidr in "${cloudflare_ranges[@]}"; do
  ufw allow proto tcp from "${cidr}" to any port 80 comment 'Cloudflare HTTP'
  ufw allow proto tcp from "${cidr}" to any port 443 comment 'Cloudflare HTTPS'
done

ufw --force delete allow 80/tcp || true
ufw --force delete allow 443/tcp || true
ufw reload
ufw status verbose

