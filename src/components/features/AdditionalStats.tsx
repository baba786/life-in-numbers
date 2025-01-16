'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';

interface AdditionalStatsProps {
  birthDate: Date;
}

interface HistoricalEvent {
  date: string;
  event: string;
}

export function AdditionalStats({ birthDate }: AdditionalStatsProps) {
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>([]);
  const [sleepStats, setSleepStats] = useState({
    totalHours: 0,
    averagePerDay: 8,
  });

  useEffect(() => {
    // Calculate sleep statistics
    const now = new Date();
    const days = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
    const totalSleepHours = days * 8; // Assuming 8 hours per day
    setSleepStats({
      totalHours: Math.floor(totalSleepHours),
      averagePerDay: 8,
    });

    // Fetch historical events (mock data for now)
    const mockEvents = [
      {
        date: birthDate.toISOString().split('T')[0],
        event: 'You were born!',
      },
      // Add more events based on the birth date
    ];
    setHistoricalEvents(mockEvents);
  }, [birthDate]);

  const getGeneration = (date: Date) => {
    const year = date.getFullYear();
    if (year >= 1997 && year <= 2012) return 'Generation Z';
    if (year >= 1981 && year <= 1996) return 'Millennial';
    if (year >= 1965 && year <= 1980) return 'Generation X';
    if (year >= 1946 && year <= 1964) return 'Baby Boomer';
    return 'Other';
  };

  return (
    <div className="mt-8">
      <Tabs.Root defaultValue="sleep" className="w-full">
        <Tabs.List className="flex border-b mb-4">
          <Tabs.Trigger
            value="sleep"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Sleep Stats
          </Tabs.Trigger>
          <Tabs.Trigger
            value="generation"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Generation
          </Tabs.Trigger>
          <Tabs.Trigger
            value="history"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Historical Events
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="sleep" className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sleep Statistics</h3>
            <p>Total hours slept: {sleepStats.totalHours.toLocaleString()}</p>
            <p>Average sleep per day: {sleepStats.averagePerDay} hours</p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="generation" className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Generation</h3>
            <p>You belong to: {getGeneration(birthDate)}</p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="history" className="p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Historical Events</h3>
            <ul className="space-y-2">
              {historicalEvents.map((event, index) => (
                <li key={index}>
                  <span className="font-medium">{event.date}:</span> {event.event}
                </li>
              ))}
            </ul>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}