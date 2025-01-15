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

// Helper function to check if a year is a leap year
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Helper function to get days in month
function getDaysInMonth(year: number, month: number): number {
  const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysInMonth[month];
}

// Calculate exact age components
function calculateExactAge(birthDate: Date, now: Date) {
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  // Adjust for negative months or days
  if (days < 0) {
    months--;
    days += getDaysInMonth(now.getFullYear(), now.getMonth() - 1);
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
}

// Calculate vital statistics based on age
function calculateVitalStats(years: number, diffTime: number) {
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

  const secondsLived = diffTime / 1000;
  
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

// Main calculation function
export function calculateLifeMetrics(birthDate: Date): LifeMetrics {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birthDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate exact age
  const exact = calculateExactAge(birthDate, now);

  // Calculate celebrations with timezone consideration
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();
  const birthHour = birthDate.getHours();

  // Christmas celebrations (account for time of day)
  const christmasCelebrations = exact.years +
    (birthMonth < 11 || (birthMonth === 11 && birthDay < 25) ||
     (birthMonth === 11 && birthDay === 25 && birthHour < 12) ? 1 : 0);

  // New Year celebrations (account for time of day)
  const newYearCelebrations = exact.years +
    (birthMonth > 0 || birthDay > 1 ||
     (birthMonth === 0 && birthDay === 1 && birthHour < 12) ? 1 : 0);

  // Earth journey calculations
  const preciseOrbits = diffTime / (TROPICAL_YEAR * 24 * 60 * 60 * 1000);
  const orbits = Math.floor(preciseOrbits);
  const rotations = Math.floor(diffTime / (SIDEREAL_DAY * 60 * 60 * 1000));

  // Calculate vital statistics
  const bodyStats = calculateVitalStats(exact.years, diffTime);

  return {
    exact,
    celebrations: {
      christmas: christmasCelebrations,
      newYear: newYearCelebrations
    },
    earth: {
      orbits,
      rotations,
      accurateOrbits: preciseOrbits.toFixed(6)
    },
    body: bodyStats
  };
}