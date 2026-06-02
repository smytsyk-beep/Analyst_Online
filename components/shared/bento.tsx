import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  featured?: boolean;
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {children}
    </div>
  );
}

export function BentoCard({ children, className, featured = false }: BentoCardProps) {
  return (
    <div
      className={cn(
        'bento-card group',
        featured ? 'neon-ring border-primary/45 bg-primary/10 dark:bg-primary/10' : null,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoVisual({ children, className }: BentoCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md border border-border/70 bg-background/55 backdrop-blur-md',
        className,
      )}
    >
      {children}
    </div>
  );
}
