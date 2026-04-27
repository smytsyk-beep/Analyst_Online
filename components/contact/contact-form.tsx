// components/contact/contact-form.tsx
'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { submitContactForm, type ContactFormData } from '@/app/actions/contact';
import type { Locale } from '@/lib/i18n';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type ContactFormProps = {
  lang: Locale;
  formToken: string;
  labels: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messengerLabel: string;
    messengerPlaceholder: string;
    contactHint: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
  };
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm({ lang, formToken, labels }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messenger: '',
    message: '',
    website: '',
  });

  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileReady, setTurnstileReady] = useState(
    () => typeof window !== 'undefined' && Boolean(window.turnstile),
  );
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (
      !turnstileSiteKey ||
      !turnstileReady ||
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetIdRef.current
    ) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: setTurnstileToken,
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  }, [turnstileReady, state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrors({});

    const data: ContactFormData = {
      ...formData,
      locale: lang,
      formToken,
      turnstileToken,
    };

    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setState('success');
        setFormData({ name: '', email: '', messenger: '', message: '', website: '' });
        setTurnstileToken('');
        window.turnstile?.reset(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = undefined;
      } else {
        setState('error');
        if (result.fieldErrors) {
          const fieldErrors: Record<string, string> = {};
          Object.entries(result.fieldErrors).forEach(([key, messages]) => {
            if (messages && messages.length > 0) {
              fieldErrors[key] = messages[0];
            }
          });
          setErrors(fieldErrors);
        }
      }
    } catch {
      setState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        if (name === 'email' || name === 'messenger') {
          delete newErrors.email;
          delete newErrors.messenger;
        }
        return newErrors;
      });
    }
  };

  if (state === 'success') {
    return (
      <Card className="rounded-lg border border-growth-green/30 bg-growth-green/5">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-growth-green/20">
            <span className="text-3xl text-growth-green">✓</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">{labels.successTitle}</h3>
          <p className="mt-2 text-foreground/70">{labels.successMessage}</p>
          <Button
            onClick={() => {
              turnstileWidgetIdRef.current = undefined;
              setTurnstileToken('');
              setState('idle');
            }}
            variant="outline"
            className="mt-6"
            size="sm"
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground">{labels.title}</h2>
      <p className="mt-2 text-foreground/70">{labels.subtitle}</p>

      <Card className="mt-6 rounded-lg border border-border bg-card shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                {labels.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={labels.namePlaceholder}
                disabled={state === 'loading'}
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground/40 ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : 'border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
                } disabled:opacity-50`}
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                {labels.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={labels.emailPlaceholder}
                disabled={state === 'loading'}
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground/40 ${
                  errors.email || errors.messenger
                    ? 'border-red-500 bg-red-50'
                    : 'border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
                } disabled:opacity-50`}
                autoComplete="email"
              />
            </div>

            {/* Tel / Messenger */}
            <div>
              <label htmlFor="messenger" className="block text-sm font-semibold text-foreground">
                {labels.messengerLabel}
              </label>
              <input
                type="text"
                id="messenger"
                name="messenger"
                value={formData.messenger}
                onChange={handleChange}
                placeholder={labels.messengerPlaceholder}
                disabled={state === 'loading'}
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground/40 ${
                  errors.email || errors.messenger
                    ? 'border-red-500 bg-red-50'
                    : 'border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
                } disabled:opacity-50`}
                autoComplete="tel"
              />
              <p className="mt-1 text-xs text-foreground/60">{labels.contactHint}</p>
              {(errors.email || errors.messenger) && (
                <p className="mt-1 text-xs text-red-600">{errors.email || errors.messenger}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground">
                {labels.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={labels.messagePlaceholder}
                disabled={state === 'loading'}
                rows={5}
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-foreground transition-colors placeholder:text-foreground/40 ${
                  errors.message
                    ? 'border-red-500 bg-red-50'
                    : 'border-border bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'
                } disabled:opacity-50`}
                required
                minLength={15}
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {turnstileSiteKey && (
              <>
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onLoad={() => setTurnstileReady(true)}
                />
                <div ref={turnstileContainerRef} />
              </>
            )}

            {/* Error message */}
            {state === 'error' && !Object.keys(errors).length && (
              <div className="rounded-lg border border-red-500/30 bg-red-50 p-4">
                <p className="text-sm text-red-700">{labels.errorMessage}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={state === 'loading'}
              className="w-full font-bold sm:w-auto"
            >
              {state === 'loading' ? labels.sending : labels.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
