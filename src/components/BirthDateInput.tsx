"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import type { BirthInfo } from '@/types';

interface BirthDateInputProps {
  onBirthInfoChange: (info: BirthInfo) => void;
}

export function BirthDateInput({ onBirthInfoChange }: BirthDateInputProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [timeZone, setTimeZone] = useState<string>('');
  
  const timeZones = Intl.supportedValuesOf('timeZone');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDateString(newDate);
    updateBirthInfo(newDate, timeString, timeZone);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTimeString(newTime);
    updateBirthInfo(dateString, newTime, timeZone);
  };

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeZone = e.target.value;
    setTimeZone(newTimeZone);
    updateBirthInfo(dateString, timeString, newTimeZone);
  };

  const updateBirthInfo = (date: string, time: string, tz: string) => {
    if (!date) return;

    let birthDate = new Date(date);
    
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      birthDate.setHours(hours, minutes);
    }

    const birthInfo: BirthInfo = {
      date: birthDate,
      hasTimeZone: Boolean(tz),
      birthTime: time || undefined,
      timeZone: tz ? {
        zoneName: tz,
        offset: new Date().getTimezoneOffset()
      } : undefined
    };

    onBirthInfoChange(birthInfo);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="birthdate" className="text-white text-base sm:text-lg block mb-2">
          Birth Date
        </Label>
        <div className="relative">
          <Input
            type="date"
            id="birthdate"
            value={dateString}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full bg-white/10 text-white border-white/20 h-[52px] rounded-xl px-4 
              [color-scheme:dark] 
              focus:ring-white/30 focus:border-white/30
              text-base sm:text-lg"
            aria-label="Birth Date"
            aria-describedby="birthdate-description"
            aria-required="true"
            inputMode="numeric"
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="Select your birth date"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white opacity-70"
            >
              <path 
                d="M6 9l4 4 4-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        className="w-full text-white hover:text-white/80 hover:bg-white/10 rounded-xl py-3 text-base"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? (
          <>
            <ChevronUp className="w-5 h-5 mr-2" />
            Hide Advanced Options
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5 mr-2" />
            Show Advanced Options (Time & Time Zone)
          </>
        )}
      </Button>

      {showAdvanced && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="birthtime" className="text-white text-base sm:text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Birth Time (optional)
            </Label>
            <Input
              type="time"
              id="birthtime"
              value={timeString}
              onChange={handleTimeChange}
              className="w-full bg-white/10 text-white border-white/20 h-[44px] rounded-xl px-4
                [color-scheme:dark]
                focus:ring-white/30 focus:border-white/30
                [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert
                [&::-webkit-datetime-edit-fields-wrapper]:p-0
                [&::-webkit-time-value]:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-white text-base sm:text-lg">
              Time Zone (optional)
            </Label>
            <select
              id="timezone"
              value={timeZone}
              onChange={handleTimeZoneChange}
              className="w-full h-12 sm:h-10 px-4 rounded-xl border bg-white/10 text-white border-white/20 text-lg sm:text-base"
            >
              <option value="" className="bg-gray-900">Select Time Zone</option>
              {timeZones.map((tz) => (
                <option key={tz} value={tz} className="bg-gray-900">
                  {tz.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {dateString && timeString && !timeZone && (
            <p className="text-sm sm:text-base text-yellow-500 bg-yellow-500/10 p-3 rounded-lg">
              ⚠️ Without a time zone, calculations will use your current local time zone
            </p>
          )}
        </div>
      )}
    </div>
  );
}
