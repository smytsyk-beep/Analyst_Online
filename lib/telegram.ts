// lib/telegram.ts
/**
 * Telegram Bot API utilities for sending lead notifications
 */

const TELEGRAM_API_URL = 'https://api.telegram.org';

export type TelegramMessage = {
  name: string;
  email: string;
  message: string;
  timestamp: string;
  locale: string;
};

/**
 * Send a formatted lead notification to Telegram
 */
export async function sendTelegramNotification(data: TelegramMessage): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials not configured');
    return false;
  }

  const text = formatLeadMessage(data);

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Telegram API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}

/**
 * Format lead data into a readable Telegram message
 */
function formatLeadMessage(data: TelegramMessage): string {
  return `
🔔 <b>Новый лид с сайта</b>

👤 <b>Имя:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
🌐 <b>Язык:</b> ${data.locale.toUpperCase()}
🕐 <b>Время:</b> ${data.timestamp}

💬 <b>Сообщение:</b>
${escapeHtml(data.message)}
  `.trim();
}

/**
 * Escape HTML special characters for Telegram
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
