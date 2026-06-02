'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

function parseNumericValue(value: string) {
  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numeric, suffix] = match;
  return {
    prefix,
    target: Number(numeric.replace(',', '.')),
    suffix,
    decimals: numeric.includes(',') || numeric.includes('.') ? 1 : 0,
  };
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const parsed = parseNumericValue(value);
    const node = ref.current;
    if (!parsed || !node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const duration = 850;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed.target * eased;
          const formatted = current.toFixed(parsed.decimals).replace('.', ',');
          setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

          if (progress < 1) requestAnimationFrame(tick);
          else setDisplayValue(value);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
