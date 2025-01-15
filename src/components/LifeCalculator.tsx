"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Share2 } from 'lucide-react';
import type { LifeMetrics } from '@/types';

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
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-semibold">Select your birth date</h2>
        <div className="w-full max-w-sm space-y-2">
          <Label htmlFor="birthdate">Birth Date</Label>
          <Input
            type="date"
            id="birthdate"
            value={dateString}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </div>
      </div>

      {metrics && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Exact Age</h3>
              <p className="text-sm">
                {metrics.exact.years} years, {metrics.exact.months} months,{' '}
                {metrics.exact.days} days, {metrics.exact.hours} hours,{' '}
                {metrics.exact.minutes} minutes, {metrics.exact.seconds} seconds
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Celebrations</h3>
              <p className="text-sm">
                🎄 {metrics.celebrations.christmas} Christmas celebrations
                <br />
                🎉 {metrics.celebrations.newYear} New Year celebrations
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Earth Journey</h3>
              <p className="text-sm">
                🌍 {metrics.earth.orbits} orbits around the Sun
                <br />
                🌎 {metrics.earth.rotations} Earth rotations
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-2">Body Stats</h3>
              <p className="text-sm">
                💓 {metrics.body.heartbeats.toLocaleString()} heartbeats
                <br />
                🫁 {metrics.body.breaths.toLocaleString()} breaths
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}