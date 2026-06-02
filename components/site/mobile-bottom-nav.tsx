'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, LayoutGrid, Menu, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Locale } from '@/lib/i18n';
import { siteCopy } from '@/content/site.copy';
import { cn } from '@/lib/utils';

type NavItem = {
  id: string;
  label: string;
  href: string;
};

type MobileBottomNavProps = {
  lang: Locale;
  nav: NavItem[];
};

export default function MobileBottomNav({ lang, nav }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = siteCopy[lang];
  const moreLabel = lang === 'ru' ? 'Ещё' : lang === 'ua' ? 'Ще' : 'Mai mult';

  const primaryItems = [
    { id: 'home', label: t.nav.home, href: `/${lang}`, Icon: Home },
    { id: 'services', label: t.nav.services, href: `/${lang}/services`, Icon: LayoutGrid },
    {
      id: 'ai-training',
      label: t.nav.aiTraining,
      href: `/${lang}${lang === 'ru' ? '/obuchenie-ai' : lang === 'ua' ? '/navchannia-ai' : '/curs-ai'}`,
      Icon: Bot,
    },
    { id: 'contact', label: t.nav.contacts, href: `/${lang}/contact`, Icon: MessageCircle },
  ];

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 md:hidden">
      <div className="glass-panel mx-auto flex max-w-md items-center justify-between rounded-lg p-1.5 shadow-lg">
        {primaryItems.map(({ id, label, href, Icon }) => {
          const isActive = pathname === href || (id !== 'home' && pathname.startsWith(href));

          return (
            <Link
              key={id}
              href={href}
              className={cn(
                'flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-[10px] font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/65 hover:text-primary',
              )}
            >
              <Icon size={17} />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-[10px] font-semibold text-foreground/65 transition-colors hover:text-primary"
              aria-label="Open menu"
            >
              <Menu size={17} />
              <span>{moreLabel}</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-lg border-border/70 bg-card/95 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-base">Analyst Online</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 grid gap-2">
              {nav.map((item) => {
                const href = item.id === 'home' ? `/${lang}` : `/${lang}${item.href}`;

                return (
                  <Link
                    key={item.id}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-md border border-border/70 bg-background/35 px-4 py-3 text-sm font-semibold text-foreground/75"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
