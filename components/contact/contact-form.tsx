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

    try {
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
          <h3 className="text-xl font-bold text-omni-navy">{labels.successTitle}</h3>
          <p className="mt-2 text-omni-navy/70">{labels.successMessage}</p>
          <Button onClick={() => setState('idle')} variant="outline" className="mt-6" size="sm">
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-omni-navy">{labels.title}</h2>
      <p className="mt-2 text-omni-navy/70">{labels.subtitle}</p>

      <Card className="mt-6 rounded-lg border border-grid-divider bg-white shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-omni-navy">
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
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-omni-navy transition-colors placeholder:text-omni-navy/40 ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : 'border-grid-divider bg-white focus:border-omni-blue focus:outline-none focus:ring-2 focus:ring-omni-blue/20'
                } disabled:opacity-50`}
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-omni-navy">
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
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-omni-navy transition-colors placeholder:text-omni-navy/40 ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-grid-divider bg-white focus:border-omni-blue focus:outline-none focus:ring-2 focus:ring-omni-blue/20'
                } disabled:opacity-50`}
                required
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-omni-navy">
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
                className={`mt-1.5 w-full rounded-md border px-4 py-2.5 text-sm text-omni-navy transition-colors placeholder:text-omni-navy/40 ${
                  errors.message
                    ? 'border-red-500 bg-red-50'
                    : 'border-grid-divider bg-white focus:border-omni-blue focus:outline-none focus:ring-2 focus:ring-omni-blue/20'
                } disabled:opacity-50`}
                required
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

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
              className="w-full rounded-lg bg-omni-blue font-bold text-white hover:bg-royal-blue sm:w-auto"
            >
              {state === 'loading' ? labels.sending : labels.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
