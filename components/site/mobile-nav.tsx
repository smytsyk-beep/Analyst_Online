'use client';

// components/site/mobile-nav.tsx
import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Locale } from '@/lib/i18n';

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
            const isOmniDash = item.id === 'omnidash';

            return (
              <Link
                key={item.id}
                href={href}
                onClick={() => setOpen(false)}
                className={
                  isOmniDash
                    ? 'text-base font-semibold text-primary'
                    : 'text-base text-foreground/70 hover:text-foreground'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
