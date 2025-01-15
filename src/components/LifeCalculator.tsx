"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Gift, PartyPopper, Globe, Heart, Clock } from 'lucide-react';
import type { LifeMetrics, BirthInfo } from '@/types';
import { calculateLifeMetrics } from '@/utils/calculations';
import { BirthDateInput } from './BirthDateInput';

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
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    if (!metrics) return;
    
    const text = `My Life in Numbers:\n\n🎂 Age: ${metrics.exact.years} years, ${metrics.exact.months} months, ${metrics.exact.days} days\n\n🌍 Earth Journey:\n• ${metrics.earth.accurateOrbits} orbits around the Sun\n• ${metrics.earth.rotations.toLocaleString()} Earth rotations\n\n❤️ Vital Statistics:\n• Heartbeats: ${metrics.body.heartbeats.estimate.toLocaleString()} (range: ${metrics.body.heartbeats.range.min.toLocaleString()} - ${metrics.body.heartbeats.range.max.toLocaleString()})\n• Breaths: ${metrics.body.breaths.estimate.toLocaleString()} (range: ${metrics.body.breaths.range.min.toLocaleString()} - ${metrics.body.breaths.range.max.toLocaleString()})\n\n🎊 Celebrations:\n• ${metrics.celebrations.christmas} Christmas celebrations\n• ${metrics.celebrations.newYear} New Year celebrations`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
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

          <div className="flex justify-center px-4">
            <Button
              onClick={handleShare}
              className="glass text-white flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Share your journey'}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}