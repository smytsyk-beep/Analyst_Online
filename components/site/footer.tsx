// components/site/footer.tsx
import Link from 'next/link';
import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { CONTACT_LINKS, siteCopy } from '@/content/site.copy';

type FooterProps = {
  lang?: Locale;
};

export default function Footer({ lang = 'ru' }: FooterProps) {
  const year = new Date().getFullYear();
  const t = siteCopy[lang];
  const navLinks = [
    { label: t.nav.services, href: '/services' },
    {
      label: t.nav.aiTraining,
      href: lang === 'ru' ? '/obuchenie-ai' : lang === 'ua' ? '/navchannia-ai' : '/curs-ai',
    },
    { label: t.nav.cases, href: '/cases' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.contacts, href: '/contact' },
    { label: t.nav.ecommerceDashboards, href: '/omnidash' },
    { label: t.nav.privacy, href: '/privacy' },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Top: nav + contacts */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Navigation */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
              {t.footer.navigationTitle}
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
              {t.footer.contactTitle}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={CONTACT_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-2 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
                aria-label={t.contact.telegram}
                title={t.contact.telegram}
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={CONTACT_LINKS.email}
                className="rounded-md border border-border p-2 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
                aria-label={t.contact.email}
                title={t.contact.email}
              >
                <Mail size={18} />
              </a>
              
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-foreground/50 sm:flex-row">
          <span>
            © {year} Analyst Online. {t.footer.rights}
          </span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
