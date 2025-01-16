'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { useState, useEffect } from 'react';

interface PersonalSettings {
  theme: 'light' | 'dark';
  heartRate: number;
  breathingRate: number;
  measurementSystem: 'metric' | 'imperial';
}

interface PersonalSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: PersonalSettings) => void;
}

export function PersonalSettings({
  isOpen,
  onClose,
  onSettingsChange,
}: PersonalSettingsProps) {
  const [settings, setSettings] = useState<PersonalSettings>({
    theme: 'light',
    heartRate: 70,
    breathingRate: 12,
    measurementSystem: 'metric',
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('personalSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('personalSettings', JSON.stringify(settings));
    onSettingsChange(settings);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            Personal Settings
          </Dialog.Title>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Dark Mode</label>
              <Switch.Root
                checked={settings.theme === 'dark'}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, theme: checked ? 'dark' : 'light' }))
                }
                className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Average Heart Rate (BPM)</label>
              <input
                type="number"
                value={settings.heartRate}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    heartRate: parseInt(e.target.value) || 70,
                  }))
                }
                className="w-full p-2 border rounded"
                min="40"
                max="200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Average Breathing Rate (per minute)
              </label>
              <input
                type="number"
                value={settings.breathingRate}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    breathingRate: parseInt(e.target.value) || 12,
                  }))
                }
                className="w-full p-2 border rounded"
                min="8"
                max="30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Measurement System</label>
              <select
                value={settings.measurementSystem}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    measurementSystem: e.target.value as 'metric' | 'imperial',
                  }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="metric">Metric</option>
                <option value="imperial">Imperial</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}