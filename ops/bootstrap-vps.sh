#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root." >&2
  exit 1
fi

readonly ADMIN_PUBLIC_KEY_FILE="${1:-}"
readonly DEPLOY_PUBLIC_KEY_FILE="${2:-}"
readonly DEPLOY_USER="deploy"
readonly APP_DIR="/opt/analyst-online"

validate_public_key_file() {
  local key_file="$1"
  local label="$2"

  if [[ -z "${key_file}" || ! -s "${key_file}" ]]; then
    echo "Missing ${label} public key file: ${key_file:-<not provided>}" >&2
    return 1
  fi

  if grep -q 'PRIVATE KEY' "${key_file}"; then
    echo "${label} key file looks like a PRIVATE key. Only a .pub file is allowed." >&2
    return 1
  fi

  if ! awk 'NF { count++ } END { exit count == 1 ? 0 : 1 }' "${key_file}"; then
    echo "${label} public key file must contain exactly one non-empty line." >&2
    return 1
  fi

  if ! tr -d '\r\n' <"${key_file}" | grep -Eq \
    '^(ssh-ed25519|ecdsa-sha2-nistp(256|384|521)|sk-ssh-ed25519@openssh.com|sk-ecdsa-sha2-nistp256@openssh.com|ssh-rsa) [A-Za-z0-9+/=]+( .*)?$'; then
    echo "${label} public key has an unsupported or invalid OpenSSH format." >&2
    return 1
  fi
}

install_authorized_key() {
  local key_file="$1"
  local target_file="$2"
  local owner="$3"
  local group="$4"
  local key

  key="$(tr -d '\r\n' <"${key_file}")"
  install -d -m 0700 -o "${owner}" -g "${group}" "$(dirname "${target_file}")"
  touch "${target_file}"
  chown "${owner}:${group}" "${target_file}"
  chmod 0600 "${target_file}"

  if ! grep -qxF -- "${key}" "${target_file}"; then
    printf '%s\n' "${key}" >>"${target_file}"
  fi
}

if [[ ! -r /etc/os-release ]] || ! grep -q '^ID=ubuntu$' /etc/os-release; then
  echo "This bootstrap script supports Ubuntu only." >&2
  exit 2
fi

validate_public_key_file "${ADMIN_PUBLIC_KEY_FILE}" "admin"
validate_public_key_file "${DEPLOY_PUBLIC_KEY_FILE}" "deploy"

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  ca-certificates curl fail2ban gnupg unattended-upgrades ufw

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
. /etc/os-release
printf '%s\n' \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" \
  >/etc/apt/sources.list.d/docker.list

apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

if ! id "${DEPLOY_USER}" >/dev/null 2>&1; then
  adduser --disabled-password --gecos '' "${DEPLOY_USER}"
fi
usermod -aG docker "${DEPLOY_USER}"

# Preserve any provider-installed root keys and append the personal emergency admin key.
install_authorized_key \
  "${ADMIN_PUBLIC_KEY_FILE}" "/root/.ssh/authorized_keys" root root
install_authorized_key \
  "${DEPLOY_PUBLIC_KEY_FILE}" "/home/${DEPLOY_USER}/.ssh/authorized_keys" \
  "${DEPLOY_USER}" "${DEPLOY_USER}"

install -d -m 0750 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${APP_DIR}"
install -d -m 0750 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${APP_DIR}/ops"
install -d -m 0750 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${APP_DIR}/certs"

systemctl enable --now docker fail2ban unattended-upgrades

if [[ ! -f /swapfile ]]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  printf '/swapfile none swap sw 0 0\n' >>/etc/fstab
fi

echo
echo "Safe bootstrap completed."
echo "SSH password settings, root login, and UFW were NOT changed."
echo "Keep this root session open and test BOTH key-based logins in separate terminals:"
echo "  ssh -i <admin-private-key> -o IdentitiesOnly=yes root@<VPS_IP>"
echo "  ssh -i <deploy-private-key> -o IdentitiesOnly=yes ${DEPLOY_USER}@<VPS_IP>"
echo "Only after both tests succeed may you run ops/harden-vps.sh."

