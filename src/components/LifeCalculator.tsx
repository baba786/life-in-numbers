"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Share2, Gift, PartyPopper, Globe, Heart, Clock } from 'lucide-react';
import type { LifeMetrics } from '@/types';

type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  gradient: string;
};

const StatCard = ({ title, icon, children, gradient }: StatCardProps) => (
  <div className={`rounded-xl p-6 ${gradient} shadow-xl transform transition-all duration-300 hover:scale-105`}>
    <div className="flex items-center mb-4">
      <div className="p-2 bg-white/10 rounded-lg mr-3">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <div className="text-white/90">
      {children}
    </div>
  </div>
);

export function LifeCalculator() {
  const [date, setDate] = useState<Date>();
  const [dateString, setDateString] = useState('');
  const [metrics, setMetrics] = useState<LifeMetrics>();
  const [copied, setCopied] = useState(false);

  const calculateLifeMetrics = (birthDate: Date): LifeMetrics => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate exact values
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor((diffDays % 365.25) / 30.44);
    const days = Math.floor((diffDays % 365.25) % 30.44);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate celebrations
    const christmasCelebrations = years + (birthDate.getMonth() < 11 || 
      (birthDate.getMonth() === 11 && birthDate.getDate() <= 25) ? 1 : 0);
    const newYearCelebrations = years + 1;

    // Earth journey
    const orbits = years;
    const rotations = diffDays;

    // Body stats (approximate)
    const heartbeats = Math.floor(diffTime / 1000 * 1.2); // ~72 bpm
    const breaths = Math.floor(diffTime / 1000 * 0.2); // ~12 breaths per minute

    return {
      exact: { years, months, days, hours, minutes, seconds },
      celebrations: { christmas: christmasCelebrations, newYear: newYearCelebrations },
      earth: { orbits, rotations },
      body: { heartbeats, breaths }
    };
  };

  useEffect(() => {
    if (date) {
      const updateMetrics = () => {
        setMetrics(calculateLifeMetrics(date));
      };
      updateMetrics();
      const interval = setInterval(updateMetrics, 1000);
      return () => clearInterval(interval);
    }
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  };

  const handleShare = async () => {
    if (!metrics) return;
    
    const text = `My Life in Numbers:\n🎂 Age: ${metrics.exact.years} years, ${metrics.exact.months} months, ${metrics.exact.days} days\n🎄 Christmas celebrations: ${metrics.celebrations.christmas}\n🎉 New Year celebrations: ${metrics.celebrations.newYear}\n🌍 Earth orbits: ${metrics.earth.orbits}\n🌎 Earth rotations: ${metrics.earth.rotations}\n💓 Heartbeats: ${metrics.body.heartbeats.toLocaleString()}\n🫁 Breaths: ${metrics.body.breaths.toLocaleString()}`;

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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 shadow-xl">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            When did your journey begin?
          </h2>
          <div className="space-y-2">
            <Label htmlFor="birthdate" className="text-white/90">
              Select your birth date
            </Label>
            <Input
              type="date"
              id="birthdate"
              value={dateString}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>
      </div>

      {metrics && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="Exact Age"
              icon={<Clock className="w-6 h-6 text-white" />}
              gradient="bg-gradient-to-br from-blue-600 to-blue-800"
            >
              <p className="text-lg">
                {metrics.exact.years} years, {metrics.exact.months} months,
                {' '}{metrics.exact.days} days
              </p>
              <p className="text-sm opacity-75">
                {metrics.exact.hours}h {metrics.exact.minutes}m {metrics.exact.seconds}s
              </p>
            </StatCard>

            <StatCard
              title="Celebrations"
              icon={<Gift className="w-6 h-6 text-white" />}
              gradient="bg-gradient-to-br from-pink-600 to-purple-800"
            >
              <p>
                🎄 {metrics.celebrations.christmas} Christmas celebrations
                <br />
                🎉 {metrics.celebrations.newYear} New Year celebrations
              </p>
            </StatCard>

            <StatCard
              title="Earth Journey"
              icon={<Globe className="w-6 h-6 text-white" />}
              gradient="bg-gradient-to-br from-green-600 to-emerald-800"
            >
              <p>
                🌍 {metrics.earth.orbits} orbits around the Sun
                <br />
                🌎 {metrics.earth.rotations.toLocaleString()} Earth rotations
              </p>
            </StatCard>

            <StatCard
              title="Body Stats"
              icon={<Heart className="w-6 h-6 text-white" />}
              gradient="bg-gradient-to-br from-red-600 to-rose-800"
            >
              <p>
                💓 {metrics.body.heartbeats.toLocaleString()} heartbeats
                <br />
                🫁 {metrics.body.breaths.toLocaleString()} breaths
              </p>
            </StatCard>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleShare}
              className="glass text-white flex items-center space-x-2 transform transition-all duration-300 hover:scale-105"
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