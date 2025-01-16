'use client';

import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Load settings from localStorage
    const accessibilitySettings = localStorage.getItem('accessibilitySettings');
    const personalSettings = localStorage.getItem('personalSettings');

    if (accessibilitySettings) {
      const settings = JSON.parse(accessibilitySettings);
      const root = document.documentElement;

      // Apply accessibility classes
      root.classList.toggle('high-contrast', settings.highContrast);
      root.classList.toggle('large-text', settings.largeText);
      root.classList.toggle('reduced-motion', settings.reducedMotion);
      root.classList.toggle('screen-reader', settings.screenReader);
    }

    if (personalSettings) {
      const settings = JSON.parse(personalSettings);
      const root = document.documentElement;

      // Apply theme
      root.classList.toggle('dark', settings.theme === 'dark');
    }
  }, []);

  return <div className="min-h-screen">{children}</div>;
}