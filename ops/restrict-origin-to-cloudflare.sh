#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 1
fi

readonly APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
readonly RANGE_DIR="/etc/analyst-online"
readonly IPV4_RANGE_FILE="${RANGE_DIR}/cloudflare-ips-v4"
readonly IPV6_RANGE_FILE="${RANGE_DIR}/cloudflare-ips-v6"
readonly DOCKER_CHAIN="AO-CLOUDFLARE"
readonly SYSTEMD_UNIT="/etc/systemd/system/analyst-online-docker-firewall.service"
readonly APP_SYSTEMD_UNIT="/etc/systemd/system/analyst-online.service"

public_interface="${PUBLIC_INTERFACE:-}"
if [[ -z "${public_interface}" ]]; then
  public_interface="$(
    ip -4 route show default |
      awk '$1 == "default" && !found { for (i = 1; i <= NF; i++) if ($i == "dev") { print $(i + 1); found = 1 } }'
  )"
fi

if [[ -z "${public_interface}" ]]; then
  echo "Could not determine the public network interface." >&2
  exit 2
fi

apply_docker_rules() {
  local command_name="$1"
  local range_file="$2"

  if [[ ! -s "${range_file}" ]]; then
    echo "Missing saved Cloudflare range file: ${range_file}" >&2
    return 1
  fi

  "${command_name}" -N "${DOCKER_CHAIN}" 2>/dev/null || true
  "${command_name}" -F "${DOCKER_CHAIN}"

  while IFS= read -r cidr; do
    [[ -n "${cidr}" ]] || continue
    "${command_name}" -A "${DOCKER_CHAIN}" -s "${cidr}" -j ACCEPT
  done <"${range_file}"

  "${command_name}" -A "${DOCKER_CHAIN}" -j DROP

  if ! "${command_name}" -C DOCKER-USER \
    -i "${public_interface}" -p tcp -m multiport --dports 80,443 \
    -j "${DOCKER_CHAIN}" 2>/dev/null; then
    "${command_name}" -I DOCKER-USER 1 \
      -i "${public_interface}" -p tcp -m multiport --dports 80,443 \
      -j "${DOCKER_CHAIN}"
  fi
}

if [[ "${1:-}" == "--docker-only" ]]; then
  apply_docker_rules iptables "${IPV4_RANGE_FILE}"
  apply_docker_rules ip6tables "${IPV6_RANGE_FILE}"
  exit 0
fi

mapfile -t cloudflare_ipv4_ranges < <(
  curl -fsSL https://www.cloudflare.com/ips-v4 | sed '/^[[:space:]]*$/d'
)
mapfile -t cloudflare_ipv6_ranges < <(
  curl -fsSL https://www.cloudflare.com/ips-v6 | sed '/^[[:space:]]*$/d'
)

if (( ${#cloudflare_ipv4_ranges[@]} < 10 || ${#cloudflare_ipv6_ranges[@]} < 5 )); then
  echo "Cloudflare IP lists look incomplete; firewall was not changed." >&2
  exit 1
fi

install -d -m 0755 "${RANGE_DIR}"
ipv4_temporary_file="$(mktemp)"
ipv6_temporary_file="$(mktemp)"
printf '%s\n' "${cloudflare_ipv4_ranges[@]}" >"${ipv4_temporary_file}"
printf '%s\n' "${cloudflare_ipv6_ranges[@]}" >"${ipv6_temporary_file}"
install -m 0644 "${ipv4_temporary_file}" "${IPV4_RANGE_FILE}"
install -m 0644 "${ipv6_temporary_file}" "${IPV6_RANGE_FILE}"
rm -f "${ipv4_temporary_file}" "${ipv6_temporary_file}"

for cidr in "${cloudflare_ipv4_ranges[@]}" "${cloudflare_ipv6_ranges[@]}"; do
  ufw allow proto tcp from "${cidr}" to any port 80 comment 'Cloudflare HTTP'
  ufw allow proto tcp from "${cidr}" to any port 443 comment 'Cloudflare HTTPS'
done

ufw --force delete allow 80/tcp || true
ufw --force delete allow 443/tcp || true
ufw reload

apply_docker_rules iptables "${IPV4_RANGE_FILE}"
apply_docker_rules ip6tables "${IPV6_RANGE_FILE}"

cat >"${SYSTEMD_UNIT}" <<EOF
[Unit]
Description=Restrict Analyst Online Docker web ports to Cloudflare
After=docker.service network-online.target ufw.service
Requires=docker.service
PartOf=docker.service

[Service]
Type=oneshot
Environment=PUBLIC_INTERFACE=${public_interface}
ExecStart=/usr/bin/bash ${APP_DIR}/ops/restrict-origin-to-cloudflare.sh --docker-only
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

cat >"${APP_SYSTEMD_UNIT}" <<EOF
[Unit]
Description=Start Analyst Online after its Docker firewall
After=analyst-online-docker-firewall.service
Requires=analyst-online-docker-firewall.service
PartOf=docker.service

[Service]
Type=oneshot
WorkingDirectory=${APP_DIR}
ExecStart=/usr/bin/docker compose --env-file ${APP_DIR}/.release.env -f ${APP_DIR}/compose.production.yml up -d --remove-orphans
ExecStop=/usr/bin/docker compose --env-file ${APP_DIR}/.release.env -f ${APP_DIR}/compose.production.yml stop
RemainAfterExit=yes
TimeoutStartSec=180
TimeoutStopSec=120

[Install]
WantedBy=multi-user.target
EOF

for container_name in analyst-online-app analyst-online-caddy; do
  if docker container inspect "${container_name}" >/dev/null 2>&1; then
    docker update --restart=on-failure:5 "${container_name}" >/dev/null
  fi
done

systemctl daemon-reload
systemctl enable analyst-online-docker-firewall.service
systemctl restart analyst-online-docker-firewall.service
systemctl enable analyst-online.service
systemctl start analyst-online.service

ufw status verbose

