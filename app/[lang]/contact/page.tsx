// app/[lang]/contact/page.tsx
import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { contactCopy } from '@/content/contact.copy';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import ContactForm from '@/components/contact/contact-form';

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
  const t = contactCopy[lang];

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
        <p className="mt-4 text-lg text-white/60">{t.pageSubtitle}</p>
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
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.05)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04]">
                      <Icon size={18} className="text-white/70" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{channel.label}</div>
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline"
                      >
                        {channel.value}
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed opacity-60">{channel.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm
        lang={lang}
        labels={{
          title: t.formTitle,
          subtitle: t.formSubtitle,
          nameLabel: t.formNameLabel,
          namePlaceholder: t.formNamePlaceholder,
          emailLabel: t.formEmailLabel,
          emailPlaceholder: t.formEmailPlaceholder,
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
