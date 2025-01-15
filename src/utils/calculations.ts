import type { LifeMetrics } from '@/types';

// Accurate constants
const TROPICAL_YEAR = 365.242190; // Earth's orbital period
const SIDEREAL_DAY = 23.9344696; // Earth's rotation period in hours

// Heart rates by age (beats per minute)
const HEART_RATES = {
  infant: { min: 100, max: 160, avg: 130 },
  child: { min: 70, max: 120, avg: 95 },
  teen: { min: 60, max: 100, avg: 80 },
  adult: { min: 60, max: 100, avg: 72 }
};

// Breathing rates by age (breaths per minute)
const BREATHING_RATES = {
  infant: { min: 30, max: 60, avg: 45 },
  child: { min: 20, max: 30, avg: 25 },
  teen: { min: 12, max: 20, avg: 16 },
  adult: { min: 12, max: 20, avg: 14 }
};

// Helper function to get days in month
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Calculate exact age components
function calculateExactAge(birthDate: Date, now: Date) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();
  
  // Get hours, minutes, seconds
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Adjust days
  if (days < 0) {
    months--;
    const lastMonth = now.getMonth() - 1;
    const daysInLastMonth = getDaysInMonth(now.getFullYear(), lastMonth);
    days += daysInLastMonth;
  }

  // Adjust months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

// Calculate vital statistics based on age
function calculateVitalStats(birthDate: Date, now: Date) {
  const diffTime = Math.abs(now.getTime() - birthDate.getTime());
  const years = now.getFullYear() - birthDate.getFullYear();
  const secondsLived = diffTime / 1000;

  // Determine age-appropriate rates
  let heartRates = HEART_RATES.adult;
  let breathingRates = BREATHING_RATES.adult;

  if (years < 1) {
    heartRates = HEART_RATES.infant;
    breathingRates = BREATHING_RATES.infant;
  } else if (years < 12) {
    heartRates = HEART_RATES.child;
    breathingRates = BREATHING_RATES.child;
  } else if (years < 18) {
    heartRates = HEART_RATES.teen;
    breathingRates = BREATHING_RATES.teen;
  }

  return {
    heartbeats: {
      estimate: Math.floor(secondsLived * (heartRates.avg / 60)),
      range: {
        min: Math.floor(secondsLived * (heartRates.min / 60)),
        max: Math.floor(secondsLived * (heartRates.max / 60))
      }
    },
    breaths: {
      estimate: Math.floor(secondsLived * (breathingRates.avg / 60)),
      range: {
        min: Math.floor(secondsLived * (breathingRates.min / 60)),
        max: Math.floor(secondsLived * (breathingRates.max / 60))
      }
    }
  };
}

// Calculate celestial metrics
function calculateCelestialMetrics(birthDate: Date, now: Date) {
  const diffTime = Math.abs(now.getTime() - birthDate.getTime());
  const diffDays = diffTime / (24 * 60 * 60 * 1000);
  
  // Calculate precise orbits
  const preciseOrbits = diffDays / TROPICAL_YEAR;
  
  // Calculate Earth rotations (accounting for precise day length)
  const rotations = Math.floor(diffDays);

  return {
    orbits: Math.floor(preciseOrbits),
    rotations,
    accurateOrbits: preciseOrbits.toFixed(6)
  };
}

// Main calculation function
export function calculateLifeMetrics(birthDate: Date): LifeMetrics {
  const now = new Date();
  
  // Exact age calculation
  const exact = calculateExactAge(birthDate, now);

  // Calculate celebrations
  const yearsPassed = exact.years + (exact.months > 0 || exact.days > 0 ? 1 : 0);
  const christmasCelebrations = yearsPassed;
  const newYearCelebrations = yearsPassed;

  // Calculate vital stats
  const bodyStats = calculateVitalStats(birthDate, now);

  // Calculate Earth journey
  const earthMetrics = calculateCelestialMetrics(birthDate, now);

  return {
    exact,
    celebrations: {
      christmas: christmasCelebrations,
      newYear: newYearCelebrations
    },
    earth: earthMetrics,
    body: bodyStats
  };
}