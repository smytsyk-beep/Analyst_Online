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
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Top: nav + contacts */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
              Navigation
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={`/${lang}${item.href}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
              Contact
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href="https://t.me/omnidash_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                Telegram: @omnidash_ai
              </a>
              <a
                href="mailto:s.mytsyk@gmail.com"
                className="text-white/60 hover:text-white transition-colors"
              >
                s.mytsyk@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <span>© {year} Analyst Online. All rights reserved.</span>
          <span>Analytics, dashboards & automation for business.</span>
        </div>
      </div>
    </footer>
  );
}
