'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Bot, FileSpreadsheet, Workflow } from 'lucide-react';

const panels = [
  {
    title: 'AI',
    Icon: Bot,
    className: 'left-[7%] top-[10%] w-[42%]',
    depth: 18,
  },
  {
    title: 'BI',
    Icon: BarChart3,
    className: 'right-[4%] top-[18%] w-[48%]',
    depth: -22,
  },
  {
    title: 'Sheets',
    Icon: FileSpreadsheet,
    className: 'bottom-[10%] left-[4%] w-[52%]',
    depth: -14,
  },
  {
    title: 'Flow',
    Icon: Workflow,
    className: 'bottom-[5%] right-[7%] w-[40%]',
    depth: 24,
  },
];

export default function HomeHeroDataScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotion = () => setReducedMotion(motionQuery.matches);
    motionQuery.addEventListener('change', updateMotion);

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      motionQuery.removeEventListener('change', updateMotion);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/70 bg-card/50 p-4 backdrop-blur-xl neon-ring">
      <div className="absolute inset-0 data-grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="absolute inset-y-10 left-1/2 w-px bg-gradient-to-b from-transparent via-secondary/35 to-transparent" />

      {panels.map(({ title, Icon, className, depth }, index) => (
        <div
          key={title}
          className={`glass-card absolute ${className} float-soft p-3`}
          style={{
            animationDelay: `${index * 0.45}s`,
            transform: reducedMotion
              ? undefined
              : `translate3d(${pointer.x * depth}px, ${pointer.y * depth}px, 0)`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-primary/15 text-primary">
                <Icon size={16} />
              </span>
              <span className="text-sm font-extrabold text-foreground">{title}</span>
            </div>
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_18px_hsl(var(--secondary)/0.7)]" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-2 rounded-full bg-foreground/12">
              <div className="h-full w-3/4 rounded-full bg-primary/70" />
            </div>
            <div className="h-2 rounded-full bg-foreground/12">
              <div className="h-full w-1/2 rounded-full bg-secondary/70" />
            </div>
          </div>

          <div className="mt-4 flex h-16 items-end gap-1.5">
            {[34, 58, 42, 76, 64, 88].map((height, barIndex) => (
              <span
                key={barIndex}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/70 to-secondary/70"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
