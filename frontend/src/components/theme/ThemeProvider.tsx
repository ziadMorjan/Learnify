'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (value: Theme) => void;
  syncWithSystem: () => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'learnify-theme';

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' || stored === 'light' ? stored : null;
};

const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);

  const applyThemeClass = useCallback((value: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', value === 'dark');
    root.style.colorScheme = value;
  }, []);

  useEffect(() => {
    const initial = getStoredTheme() ?? getSystemTheme();
    setThemeState(initial);
    applyThemeClass(initial);
    setIsReady(true);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const stored = getStoredTheme();
      if (stored) return;
      const next = event.matches ? 'dark' : 'light';
      setThemeState(next);
      applyThemeClass(next);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyThemeClass]);

  const setTheme = useCallback(
    (value: Theme) => {
      setThemeState(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, value);
      }
      applyThemeClass(value);
    },
    [applyThemeClass]
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      }
      applyThemeClass(next);
      return next;
    });
  }, [applyThemeClass]);

  const syncWithSystem = useCallback(() => {
    const systemTheme = getSystemTheme();
    setThemeState(systemTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    }
    applyThemeClass(systemTheme);
  }, [applyThemeClass]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      syncWithSystem,
      isReady,
    }),
    [isReady, setTheme, syncWithSystem, theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
