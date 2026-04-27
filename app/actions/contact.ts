// app/actions/contact.ts
'use server';

import { z } from 'zod';
import { sendTelegramNotification } from '@/lib/telegram';
import { appendLeadToSheet } from '@/lib/google-sheets';
import {
  enforceContactRateLimit,
  getRequestIdentity,
  isLikelySpam,
  verifyContactFormToken,
  verifyTurnstileToken,
} from '@/lib/contact-security';

/**
 * Contact form schema validation
 */
const contactFormSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: z
      .string()
      .trim()
      .max(254)
      .optional()
      .default('')
      .refine((value) => value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'Invalid email address',
      }),
    messenger: z.string().trim().max(120).optional().default(''),
    message: z.string().trim().min(15, 'Message must be at least 15 characters').max(1000),
    locale: z.enum(['ru', 'ua', 'ro']),
    website: z.string().trim().max(200).optional().default(''),
    formToken: z.string().min(1),
    turnstileToken: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.messenger) {
      const message = 'Provide email or Tel / Messenger';
      ctx.addIssue({ code: 'custom', message, path: ['email'] });
      ctx.addIssue({ code: 'custom', message, path: ['messenger'] });
    }
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
    const requestIdentity = await getRequestIdentity();

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

    if (validData.website) {
      return { success: true };
    }

    if (!verifyContactFormToken(validData.formToken)) {
      return {
        success: false,
        error: 'Form verification failed. Please refresh the page and try again.',
      };
    }

    const turnstileVerified = await verifyTurnstileToken(
      validData.turnstileToken,
      requestIdentity.ip,
    );

    if (!turnstileVerified) {
      return {
        success: false,
        error: 'Spam protection check failed. Please refresh the page and try again.',
      };
    }

    if (
      isLikelySpam({
        name: validData.name,
        email: validData.email,
        messenger: validData.messenger,
        message: validData.message,
      })
    ) {
      return { success: true };
    }

    const rateLimit = await enforceContactRateLimit({
      ip: requestIdentity.ip,
      email: validData.email,
      messenger: validData.messenger,
      message: validData.message,
    });

    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many requests. Please try again later.',
      };
    }

    const timestamp = new Date().toISOString();

    // Send to Telegram
    const telegramSent = await sendTelegramNotification({
      name: validData.name,
      email: validData.email,
      messenger: validData.messenger,
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
      messenger: validData.messenger,
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
