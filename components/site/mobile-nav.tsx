'use client';

// components/site/mobile-nav.tsx
import { useState } from 'react';
import Link from 'next/link';
import { Linkedin, Mail, Menu, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Locale } from '@/lib/i18n';
import { CONTACT_LINKS, siteCopy } from '@/content/site.copy';

type NavItem = {
  id: string;
  label: string;
  href: string;
};

type MobileNavProps = {
  lang: Locale;
  nav: NavItem[];
};

export default function MobileNav({ lang, nav }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const t = siteCopy[lang];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center justify-center rounded-md p-2 opacity-80 hover:opacity-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 border-l border-border bg-background p-6">
        <SheetHeader>
          <SheetTitle className="text-left text-sm font-semibold tracking-tight">
            Analyst Online
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-4">
          {nav.map((item) => {
            const href = item.id === 'home' ? `/${lang}` : `/${lang}${item.href}`;

            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/70 hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex items-center gap-2 border-t border-border pt-5">
          <a
            href={CONTACT_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border p-2 text-foreground/60 hover:border-primary hover:text-primary"
            aria-label={t.contact.telegram}
            title={t.contact.telegram}
          >
            <MessageCircle size={18} />
          </a>
          <a
            href={CONTACT_LINKS.email}
            className="rounded-md border border-border p-2 text-foreground/60 hover:border-primary hover:text-primary"
            aria-label={t.contact.email}
            title={t.contact.email}
          >
            <Mail size={18} />
          </a>
          <a
            href={CONTACT_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border p-2 text-foreground/60 hover:border-primary hover:text-primary"
            aria-label={t.contact.linkedin}
            title={t.contact.linkedin}
          >
            <Linkedin size={18} />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
