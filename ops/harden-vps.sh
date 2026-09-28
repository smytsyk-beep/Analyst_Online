#!/usr/bin/env bash
set -Eeuo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script as root from the still-open initial SSH session." >&2
  exit 1
fi

if [[ "${1:-}" != "--i-have-tested-both-key-logins" ]]; then
  echo "Refusing to change SSH access." >&2
  echo "First test root/admin-key and deploy/deploy-key logins in two NEW terminals." >&2
  echo "Then run: sudo bash ops/harden-vps.sh --i-have-tested-both-key-logins" >&2
  exit 2
fi

readonly SSH_DROP_IN="/etc/ssh/sshd_config.d/00-analyst-online-hardening.conf"
readonly RECOVERY_SCRIPT="/root/recover-analyst-online-ssh.sh"
readonly FAIL2BAN_JAIL="/etc/fail2ban/jail.d/analyst-online.local"

if [[ ! -s /root/.ssh/authorized_keys ]]; then
  echo "Root/admin authorized_keys is missing or empty. Refusing to harden SSH." >&2
  exit 2
fi

if [[ ! -s /home/deploy/.ssh/authorized_keys ]]; then
  echo "Deploy authorized_keys is missing or empty. Refusing to harden SSH." >&2
  exit 2
fi

ssh_port="${SSH_PORT:-}"
if [[ -z "${ssh_port}" ]]; then
  # Consume the complete sshd output. Exiting awk after the first match sends
  # SIGPIPE to sshd and, with pipefail enabled, terminates this script here.
  ssh_port="$(sshd -T | awk '$1 == "port" && !found { print $2; found = 1 }')"
fi

if [[ ! "${ssh_port}" =~ ^[0-9]+$ ]] || (( ssh_port < 1 || ssh_port > 65535 )); then
  echo "Could not determine a valid SSH port. Set it explicitly, for example SSH_PORT=22." >&2
  exit 2
fi

cat >"${RECOVERY_SCRIPT}" <<EOF
#!/usr/bin/env bash
set -Eeuo pipefail
rm -f "${SSH_DROP_IN}"
ufw allow ${ssh_port}/tcp
sshd -t
systemctl restart ssh
ufw status verbose
echo "SSH hardening rollback completed. Password behavior is now controlled by the provider's base SSH configuration."
EOF
chmod 0700 "${RECOVERY_SCRIPT}"

temporary_config="$(mktemp)"
cat >"${temporary_config}" <<'EOF'
PermitRootLogin prohibit-password
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
EOF
install -m 0644 "${temporary_config}" "${SSH_DROP_IN}"
rm -f "${temporary_config}"

if ! sshd -t; then
  echo "New SSH configuration is invalid. Restoring the previous state." >&2
  "${RECOVERY_SCRIPT}"
  exit 1
fi

effective_config="$(sshd -T)"
for required_setting in \
  'passwordauthentication no' \
  'kbdinteractiveauthentication no' \
  'pubkeyauthentication yes'; do
  if ! grep -qxF -- "${required_setting}" <<<"${effective_config}"; then
    echo "SSH setting was not applied: ${required_setting}" >&2
    echo "Restoring the previous state instead of risking a lockout." >&2
    "${RECOVERY_SCRIPT}"
    exit 1
  fi
done

# Open required ports before enabling the firewall.
ufw allow "${ssh_port}/tcp" comment 'SSH'
ufw allow 80/tcp comment 'HTTP bootstrap'
ufw allow 443/tcp comment 'HTTPS bootstrap'
ufw default deny incoming
ufw default allow outgoing
ufw --force enable

systemctl reload ssh

cat >"${FAIL2BAN_JAIL}" <<EOF
[sshd]
enabled = true
backend = systemd
port = ${ssh_port}
maxretry = 5
findtime = 10m
bantime = 1h
EOF
systemctl restart fail2ban

echo
echo "SSH hardening is active. Password login is now disabled."
echo "Root remains available by the tested personal admin key only."
echo "DO NOT close the current session yet. Open two new sessions and retest root and deploy keys."
echo "If either test fails, use the current session or the provider console to run:"
echo "  ${RECOVERY_SCRIPT}"
