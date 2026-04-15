// components/site/footer.tsx
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

type FooterProps = {
  lang?: Locale;
};

const NAV_LINKS = [
  { label: 'OmniDash', href: '/omnidash' },
  { label: 'Services', href: '/services' },
  { label: 'Cases', href: '/cases' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];

export default function Footer({ lang = 'ru' }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Top: nav + contacts */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Navigation */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/50">
              Navigation
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {NAV_LINKS.map((item) => (
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
              Contact
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="https://t.me/omnidash_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/60 transition-colors hover:text-primary"
              >
                Telegram: @omnidash_ai
              </a>
              <a
                href="mailto:s.mytsyk@gmail.com"
                className="font-medium text-foreground/60 transition-colors hover:text-primary"
              >
                s.mytsyk@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-foreground/50 sm:flex-row">
          <span>© {year} Analyst Online. All rights reserved.</span>
          <span>Analytics, dashboards & automation for business.</span>
        </div>
      </div>
    </footer>
  );
}
