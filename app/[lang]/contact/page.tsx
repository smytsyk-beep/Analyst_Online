// app/[lang]/contact/page.tsx
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { contactCopy } from '@/content/contact.copy';
import JsonLd from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

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
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.pageTitle}</h1>
        <p className="mt-4 text-lg opacity-80">{t.pageSubtitle}</p>
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
                className="rounded-2xl border border-white/10 bg-neutral-950/30 transition-colors hover:border-white/20 hover:bg-neutral-950/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
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

      {/* Form placeholder */}
      <div>
        <h2 className="text-2xl font-semibold">{t.formTitle}</h2>
        <p className="mt-2 opacity-80">{t.formSubtitle}</p>

        <Card className="mt-6 rounded-2xl border border-white/10 bg-neutral-950/30">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium opacity-80">{t.formNameLabel}</label>
                <input
                  type="text"
                  placeholder={t.formNamePlaceholder}
                  disabled
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80">{t.formEmailLabel}</label>
                <input
                  type="email"
                  placeholder={t.formEmailPlaceholder}
                  disabled
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80">{t.formMessageLabel}</label>
                <textarea
                  placeholder={t.formMessagePlaceholder}
                  disabled
                  rows={5}
                  className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm opacity-50"
                />
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-200/80">{t.formNote}</p>
              </div>

              <Button disabled className="w-full opacity-50 sm:w-auto">
                {t.formSubmit}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
