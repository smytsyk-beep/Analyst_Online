'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'analyst-theme';
type Theme = 'dark' | 'white';

function resolveSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'white';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'white';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'white';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'white';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = stored === 'dark' || stored === 'white' ? stored : resolveSystemTheme();
    applyTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'white' : 'dark';
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isDark
          ? 'bg-cyan-50/85 text-slate-900 hover:bg-cyan-100/85'
          : 'bg-slate-800/85 text-cyan-50 hover:bg-slate-700/85',
      )}
      aria-label={isDark ? 'Switch to white theme' : 'Switch to dark theme'}
      title={isDark ? 'White theme' : 'Dark theme'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
