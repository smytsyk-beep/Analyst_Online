// app/actions/contact.ts
'use server';

import { z } from 'zod';
import { sendTelegramNotification } from '@/lib/telegram';
import { appendLeadToSheet } from '@/lib/google-sheets';

/**
 * Contact form schema validation
 */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  locale: z.enum(['ru', 'ua', 'ro']),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Submit contact form
 * Sends notification to Telegram and stores data in Google Sheets
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResult> {
  try {
    // Validate input
    const validationResult = contactFormSchema.safeParse(data);

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    const validData = validationResult.data;
    const timestamp = new Date().toISOString();

    // Send to Telegram
    const telegramSent = await sendTelegramNotification({
      name: validData.name,
      email: validData.email,
      message: validData.message,
      locale: validData.locale,
      timestamp: new Date().toLocaleString('ru-RU', {
        timeZone: 'Europe/Kiev',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    // Store in Google Sheets
    const sheetSaved = await appendLeadToSheet({
      timestamp,
      name: validData.name,
      email: validData.email,
      message: validData.message,
      locale: validData.locale,
      source: 'website_contact_form',
    });

    // Consider it success if at least one channel worked
    if (!telegramSent && !sheetSaved) {
      return {
        success: false,
        error: 'Failed to process your request. Please try again or contact us directly.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
