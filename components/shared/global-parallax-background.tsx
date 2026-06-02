'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

const Particles = dynamic(() => import('@tsparticles/react').then((m) => m.Particles), {
  ssr: false,
});

type ThemeMode = 'dark' | 'white';

function getParticleOptions(theme: ThemeMode, isMobile: boolean): ISourceOptions {
  const isDark = theme === 'dark';
  const values = {
    count: isMobile ? 20 : 56,
    speed: isMobile ? 0.32 : 0.78,
    linkOpacity: isDark ? 0.52 : 0.4,
    particleOpacity: isDark ? 0.72 : 0.56,
  };

  return {
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 45,
    particles: {
      color: {
        value: isDark ? ['#5EF4FF', '#B8FF3D', '#22D3EE'] : ['#1D4ED8', '#0891B2', '#65A30D'],
      },
      links: {
        color: isDark ? '#5EF4FF' : '#2563EB',
        distance: 150,
        enable: true,
        opacity: values.linkOpacity,
        width: isDark ? 1.08 : 1,
      },
      move: {
        enable: true,
        speed: values.speed,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
      },
      number: {
        density: { enable: true, width: 900 },
        value: values.count,
      },
      opacity: {
        value: { min: values.particleOpacity * 0.42, max: values.particleOpacity },
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 1.1, max: isDark ? 3 : 2.8 },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: ['grab', 'bubble'] },
        resize: { enable: true },
      },
      modes: {
        bubble: {
          distance: 130,
          duration: 0.8,
          opacity: Math.min(values.particleOpacity + 0.12, 0.88),
          size: isDark ? 3.8 : 3.5,
        },
        grab: {
          distance: 185,
          links: { opacity: Math.min(values.linkOpacity + 0.22, 0.78) },
        },
      },
    },
    detectRetina: true,
  };
}

function readTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'white';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'white';
}

export default function GlobalParallaxBackground() {
  const depth = 9;
  const [engineReady, setEngineReady] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === 'undefined' ? false : window.innerWidth < 768,
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [theme, setTheme] = useState<ThemeMode>(readTheme);
  const gridRef = useRef<HTMLDivElement>(null);
  const primaryGlowRef = useRef<HTMLDivElement>(null);
  const secondaryGlowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(motionQuery.matches);

    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('resize', updateViewport);
    motionQuery.addEventListener('change', updateMotion);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateViewport);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  useEffect(() => {
    const setTransforms = (x: number, y: number) => {
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      }

      if (primaryGlowRef.current) {
        primaryGlowRef.current.style.transform = `translate3d(${x * -depth * 0.7}px, ${y * -depth * 0.7}px, 0)`;
      }

      if (secondaryGlowRef.current) {
        secondaryGlowRef.current.style.transform = `translate3d(${x * depth * 0.9}px, ${y * depth * 0.9}px, 0)`;
      }
    };

    if (isMobile || reducedMotion) {
      setTransforms(0, 0);
      return;
    }

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const nextX = current.x + (target.x - current.x) * 0.08;
      const nextY = current.y + (target.y - current.y) * 0.08;

      currentRef.current = { x: nextX, y: nextY };
      setTransforms(nextX, nextY);

      if (Math.abs(target.x - nextX) > 0.001 || Math.abs(target.y - nextY) > 0.001) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    const scheduleTick = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x, y };
      scheduleTick();
    };

    const resetPointer = () => {
      targetRef.current = { x: 0, y: 0 };
      scheduleTick();
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', resetPointer, { passive: true });
    window.addEventListener('blur', resetPointer);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('blur', resetPointer);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [depth, isMobile, reducedMotion]);

  const options = useMemo(
    () => getParticleOptions(theme, isMobile || reducedMotion),
    [theme, isMobile, reducedMotion],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 theme-surface" />
      <div
        ref={gridRef}
        className="data-grid-bg absolute -inset-10 opacity-[0.68] will-change-transform dark:opacity-[0.34]"
      />
      <div
        ref={primaryGlowRef}
        className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full bg-primary/15 blur-3xl will-change-transform dark:bg-primary/20"
      />
      <div
        ref={secondaryGlowRef}
        className="absolute bottom-[12%] right-[6%] h-80 w-80 rounded-full bg-secondary/10 blur-3xl will-change-transform dark:bg-secondary/16"
      />
      {engineReady && !reducedMotion ? (
        <Particles id="global-parallax-particles" className="absolute inset-0" options={options} />
      ) : null}
    </div>
  );
}
