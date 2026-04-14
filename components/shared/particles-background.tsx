'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

// Lazy-load Particles to avoid SSR issues and reduce initial bundle
const Particles = dynamic(() => import('@tsparticles/react').then((m) => m.Particles), {
  ssr: false,
});

const particleOptions: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: '#ffffff' },
    links: {
      color: '#a0b4d6',
      distance: 160,
      enable: true,
      opacity: 0.07,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'bounce' },
    },
    number: {
      density: { enable: true, width: 900 },
      value: 44,
    },
    opacity: {
      value: { min: 0.06, max: 0.18 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    shape: { type: 'circle' },
    size: {
      value: { min: 1, max: 2.5 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      resize: { enable: true },
    },
    modes: {
      grab: {
        distance: 160,
        links: { opacity: 0.18 },
      },
    },
  },
  detectRetina: true,
};

const particleOptionsMobile: ISourceOptions = {
  ...particleOptions,
  particles: {
    ...particleOptions.particles,
    number: {
      density: { enable: true, width: 900 },
      value: 18,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      resize: { enable: true },
    },
  },
};

export default function ParticlesBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Initialize particles engine
    const initEngine = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
      setEngineReady(true);
    };

    void initEngine();
  }, []);

  if (!engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10 h-full w-full"
      options={isMobile ? particleOptionsMobile : particleOptions}
    />
  );
}
