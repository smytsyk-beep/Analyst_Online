// app/[lang]/contact/page.tsx
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { contactCopy } from '@/content/contact.copy';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import ContactForm from '@/components/contact/contact-form';
import { sanityClient } from '@/sanity/client';
import { contactInfoQuery } from '@/sanity/queries';
import { isSanityConfigured } from '@/sanity/config';
import { createContactFormToken } from '@/lib/contact-security';

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = contactCopy[lang];

  const titles: Record<Locale, string> = {
    ru: 'Контакты — Analyst Online',
    ua: 'Контакти — Analyst Online',
    ro: 'Contact — Analyst Online',
  };

  return {
    title: titles[lang],
    description: t.pageSubtitle,
    alternates: {
      canonical: `https://analyst-online.com/${lang}/contact`,
      languages: {
        uk: '/ua/contact',
        ru: '/ru/contact',
        ro: '/ro/contact',
      },
    },
  };
}

const iconMap = {
  telegram: MessageCircle,
  email: Mail,
  linkedin: Linkedin,
};

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;

  // Fetch from CMS with fallback
  let t = contactCopy[lang];

  if (isSanityConfigured()) {
    try {
      const cmsData = await sanityClient.fetch(
        contactInfoQuery,
        { locale: lang },
        { next: { tags: ['contactInfo'] } },
      );

      if (cmsData) {
        t = {
          pageTitle: cmsData.pageTitle,
          pageSubtitle: cmsData.pageSubtitle,
          channelsTitle: cmsData.channelsTitle,
          channels: cmsData.channels,
          formTitle: cmsData.formTitle,
          formSubtitle: cmsData.formSubtitle,
          formNameLabel: cmsData.formNameLabel,
          formNamePlaceholder: cmsData.formNamePlaceholder,
          formEmailLabel: cmsData.formEmailLabel,
          formEmailPlaceholder: cmsData.formEmailPlaceholder,
          formMessengerLabel: cmsData.formMessengerLabel ?? contactCopy[lang].formMessengerLabel,
          formMessengerPlaceholder:
            cmsData.formMessengerPlaceholder ?? contactCopy[lang].formMessengerPlaceholder,
          formContactHint: cmsData.formContactHint ?? contactCopy[lang].formContactHint,
          formMessageLabel: cmsData.formMessageLabel,
          formMessagePlaceholder: cmsData.formMessagePlaceholder,
          formSubmit: cmsData.formSubmit,
          formSending: cmsData.formSending,
          formSuccessTitle: cmsData.formSuccessTitle,
          formSuccessMessage: cmsData.formSuccessMessage,
          formErrorTitle: cmsData.formErrorTitle,
          formErrorMessage: cmsData.formErrorMessage,
        };
      }
    } catch (error) {
      console.error('Failed to fetch contact info from CMS, using fallback:', error);
    }
  }

  return (
    <div className="page space-y-16 py-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Analyst Online', href: `/${lang}` },
          { name: t.pageTitle, href: `/${lang}/contact` },
        ])}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg text-foreground/70">{t.pageSubtitle}</p>
      </div>

      {/* Channels */}
      <div>
        <h2 className="text-2xl font-semibold">{t.channelsTitle}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.channels.map((channel) => {
            const Icon = iconMap[channel.id as keyof typeof iconMap];
            return (
              <Card
                key={channel.id}
                className="rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{channel.label}</div>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:text-primary"
                      >
                        {channel.value}
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/60">
                    {channel.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm
        lang={lang}
        formToken={createContactFormToken()}
        labels={{
          title: t.formTitle,
          subtitle: t.formSubtitle,
          nameLabel: t.formNameLabel,
          namePlaceholder: t.formNamePlaceholder,
          emailLabel: t.formEmailLabel,
          emailPlaceholder: t.formEmailPlaceholder,
          messengerLabel: t.formMessengerLabel,
          messengerPlaceholder: t.formMessengerPlaceholder,
          contactHint: t.formContactHint,
          messageLabel: t.formMessageLabel,
          messagePlaceholder: t.formMessagePlaceholder,
          submit: t.formSubmit,
          sending: t.formSending,
          successTitle: t.formSuccessTitle,
          successMessage: t.formSuccessMessage,
          errorTitle: t.formErrorTitle,
          errorMessage: t.formErrorMessage,
        }}
      />
    </div>
  );
}
