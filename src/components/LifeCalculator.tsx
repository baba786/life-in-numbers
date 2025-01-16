"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Gift, PartyPopper, Globe, Heart, Clock, Settings, Accessibility } from 'lucide-react';
import type { LifeMetrics, BirthInfo } from '@/types';
import { calculateLifeMetrics } from '@/utils/calculations';
import { BirthDateInput } from './BirthDateInput';
import { DataVisualization } from './visualizations/DataVisualization';
import { EarthVisualization } from './visualizations/EarthVisualization';
import { ShareDialog } from './features/ShareDialog';
import { AdditionalStats } from './features/AdditionalStats';
import { PersonalSettings } from './features/PersonalSettings';
import { AccessibilityControls } from './features/AccessibilityControls';
import { EducationalContent } from './features/EducationalContent';

type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient: string;
};

const StatCard = ({ title, icon, children, gradient }: StatCardProps) => (
  <div className={`rounded-xl p-4 sm:p-6 ${gradient} shadow-xl transform transition-all duration-300 hover:scale-105`}>
    <div className="flex items-center mb-3 sm:mb-4">
      <div className="p-2 bg-white/10 rounded-lg mr-2 sm:mr-3">
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold">{title}</h3>
    </div>
    <div className="text-white/90 text-sm sm:text-base">
      {children}
    </div>
  </div>
);

export function LifeCalculator() {
  const [birthInfo, setBirthInfo] = useState<BirthInfo>();
  const [metrics, setMetrics] = useState<LifeMetrics>();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [personalSettings, setPersonalSettings] = useState({
    theme: 'light',
    heartRate: 70,
    breathingRate: 12,
    measurementSystem: 'metric',
  });

  useEffect(() => {
    if (birthInfo) {
      const updateMetrics = () => {
        setMetrics(calculateLifeMetrics(birthInfo));
      };
      updateMetrics();
      const interval = setInterval(updateMetrics, 1000);
      return () => clearInterval(interval);
    }
  }, [birthInfo]);

  const handleBirthInfoChange = (info: BirthInfo) => {
    setBirthInfo(info);
  };

  const handleShare = () => {
    if (!metrics) return;
    setShareDialogOpen(true);
  };

  const handleSettingsChange = (newSettings: any) => {
    setPersonalSettings(newSettings);
    // Recalculate metrics with new settings
    if (birthInfo) {
      setMetrics(calculateLifeMetrics(birthInfo, newSettings));
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          onClick={() => setSettingsOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Button>
        <Button
          onClick={() => setAccessibilityOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Accessibility className="w-4 h-4" />
          <span>Accessibility</span>
        </Button>
      </div>

      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-4 sm:p-8 shadow-xl">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-4 sm:mb-6">
            When did your journey begin?
          </h2>
          <BirthDateInput onBirthInfoChange={handleBirthInfoChange} />
        </div>
      </div>

      {metrics && (
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            <StatCard
              title="Exact Age"
              icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            >
              <p className="text-base sm:text-lg font-medium">
                {metrics.exact.years} years, {metrics.exact.months} months,
                {' '}{metrics.exact.days} days
              </p>
              <p className="text-xs sm:text-sm opacity-75 mt-1">
                {metrics.exact.hours}h {metrics.exact.minutes}m {metrics.exact.seconds}s
                {metrics.exact.timeZoneAdjusted && ' (timezone adjusted)'}
              </p>
            </StatCard>

            <StatCard
              title="Earth Journey"
              icon={<Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              gradient="bg-gradient-to-br from-green-600 to-emerald-800"
            >
              <p className="space-y-1">
                <span className="block">{metrics.earth.accurateOrbits} orbits around the Sun</span>
                <span className="block">{metrics.earth.rotations.toLocaleString()} Earth rotations</span>
              </p>
            </StatCard>

            <StatCard
              title="Vital Statistics"
              icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              gradient="bg-gradient-to-br from-red-600 to-rose-800"
            >
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Heartbeats:</p>
                  <p className="text-sm">
                    {metrics.body.heartbeats.estimate.toLocaleString()}
                    <span className="text-xs block opacity-75">
                      Range: {metrics.body.heartbeats.range.min.toLocaleString()} - {metrics.body.heartbeats.range.max.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-medium">Breaths:</p>
                  <p className="text-sm">
                    {metrics.body.breaths.estimate.toLocaleString()}
                    <span className="text-xs block opacity-75">
                      Range: {metrics.body.breaths.range.min.toLocaleString()} - {metrics.body.breaths.range.max.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </StatCard>

            <StatCard
              title="Celebrations"
              icon={<Gift className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              gradient="bg-gradient-to-br from-pink-600 to-purple-800"
            >
              <p className="space-y-1">
                <span className="block">🎄 {metrics.celebrations.christmas} Christmas celebrations</span>
                <span className="block">🎉 {metrics.celebrations.newYear} New Year celebrations</span>
              </p>
            </StatCard>
          </div>

          <div className="space-y-8">
            <DataVisualization
              heartbeats={metrics.body.heartbeats.estimate}
              breaths={metrics.body.breaths.estimate}
              earthRotations={metrics.earth.rotations}
              solarOrbits={parseFloat(metrics.earth.accurateOrbits)}
            />

            <EarthVisualization rotations={metrics.earth.rotations} />

            <AdditionalStats birthDate={birthInfo?.date || new Date()} />

            <EducationalContent />
          </div>

          <div className="flex justify-center px-4">
            <Button
              onClick={handleShare}
              className="glass text-white flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4" />
              <span>Share your journey</span>
            </Button>
          </div>
        </div>
      )}

      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        stats={{
          age: `${metrics?.exact.years} years, ${metrics?.exact.months} months, ${metrics?.exact.days} days`,
          heartbeats: metrics?.body.heartbeats.estimate || 0,
          breaths: metrics?.body.breaths.estimate || 0,
          earthRotations: metrics?.earth.rotations || 0,
          solarOrbits: metrics ? parseFloat(metrics.earth.accurateOrbits) : 0,
        }}
      />

      <PersonalSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
      />

      <AccessibilityControls
        isOpen={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
      />
    </div>
  );
}