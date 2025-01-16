'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { useState, useEffect } from 'react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
}

interface AccessibilityControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityControls({
  isOpen,
  onClose,
}: AccessibilityControlsProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSettingChange = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: !prev[key] };
      localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
      
      // Apply settings to the document
      document.documentElement.classList.toggle('high-contrast', newSettings.highContrast);
      document.documentElement.classList.toggle('large-text', newSettings.largeText);
      document.documentElement.classList.toggle('reduced-motion', newSettings.reducedMotion);
      
      return newSettings;
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md"
          role="dialog"
          aria-label="Accessibility Controls"
        >
          <Dialog.Title className="text-xl font-bold mb-4">
            Accessibility Settings
          </Dialog.Title>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="high-contrast">
                High Contrast Mode
              </label>
              <Switch.Root
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={() => handleSettingChange('highContrast')}
                className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="large-text">
                Large Text
              </label>
              <Switch.Root
                id="large-text"
                checked={settings.largeText}
                onCheckedChange={() => handleSettingChange('largeText')}
                className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="reduced-motion">
                Reduced Motion
              </label>
              <Switch.Root
                id="reduced-motion"
                checked={settings.reducedMotion}
                onCheckedChange={() => handleSettingChange('reducedMotion')}
                className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="screen-reader">
                Screen Reader Optimizations
              </label>
              <Switch.Root
                id="screen-reader"
                checked={settings.screenReader}
                onCheckedChange={() => handleSettingChange('screenReader')}
                className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}