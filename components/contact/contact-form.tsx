// components/contact/contact-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { submitContactForm, type ContactFormData } from '@/app/actions/contact';
import type { Locale } from '@/lib/i18n';

type ContactFormProps = {
  lang: Locale;
  labels: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
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

export default function ContactForm({ lang, labels }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrors({});

    const data: ContactFormData = {
      ...formData,
      locale: lang,
    };

    const result = await submitContactForm(data);

    if (result.success) {
      setState('success');
      setFormData({ name: '', email: '', message: '' });
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (state === 'success') {
    return (
      <Card className="rounded-2xl border border-green-500/30 bg-green-950/20">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <span className="text-3xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-green-400">{labels.successTitle}</h3>
          <p className="mt-2 opacity-80">{labels.successMessage}</p>
          <Button onClick={() => setState('idle')} variant="outline" className="mt-6" size="sm">
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">{labels.title}</h2>
      <p className="mt-2 opacity-80">{labels.subtitle}</p>

      <Card className="mt-6 rounded-2xl border border-white/10 bg-neutral-950/30">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium opacity-80">
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
                className={`mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  errors.name
                    ? 'border-red-500/50 bg-red-950/20'
                    : 'border-white/10 bg-white/5 focus:border-white/30 focus:outline-none'
                } disabled:opacity-50`}
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium opacity-80">
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
                className={`mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  errors.email
                    ? 'border-red-500/50 bg-red-950/20'
                    : 'border-white/10 bg-white/5 focus:border-white/30 focus:outline-none'
                } disabled:opacity-50`}
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium opacity-80">
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
                className={`mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  errors.message
                    ? 'border-red-500/50 bg-red-950/20'
                    : 'border-white/10 bg-white/5 focus:border-white/30 focus:outline-none'
                } disabled:opacity-50`}
                required
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            {/* Error message */}
            {state === 'error' && !Object.keys(errors).length && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-200">{labels.errorMessage}</p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" disabled={state === 'loading'} className="w-full sm:w-auto">
              {state === 'loading' ? labels.sending : labels.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
