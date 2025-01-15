import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { calculateLifeMetrics } from '@/lib/utils';
import { Share2 } from 'lucide-react';

export function LifeCalculator() {
  const [date, setDate] = useState<Date>();
  const [metrics, setMetrics] = useState<ReturnType<typeof calculateLifeMetrics>>();
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    if (!metrics) return;
    
    const text = `My Life in Numbers:
🎂 Age: ${metrics.exact.years} years, ${metrics.exact.months} months, ${metrics.exact.days} days
🎄 Christmas celebrations: ${metrics.celebrations.christmas}
🎉 New Year celebrations: ${metrics.celebrations.newYear}
🌍 Earth orbits: ${metrics.earth.orbits}
🌎 Earth rotations: ${metrics.earth.rotations}
💓 Heartbeats: ${metrics.body.heartbeats.toLocaleString()}
🫁 Breaths: ${metrics.body.breaths.toLocaleString()}`;

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
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ after: new Date() }}
          className="rounded-md border"
        />
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