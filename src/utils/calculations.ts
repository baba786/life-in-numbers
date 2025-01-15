import type { LifeMetrics } from '@/types';
import { isLeapYear, getDaysInMonth, countLeapYears, getNextBirthday, getExactDaysDifference } from './leapYear';

// Accurate astronomical constants
const TROPICAL_YEAR = 365.242190; // Earth's orbital period (days)
const SIDEREAL_DAY = 86164.0905;  // Earth's rotation period (seconds)

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

function calculateExactAge(birthDate: Date, now: Date) {
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    // Handle February 29th birthdays
    const isBirthDateFeb29 = birthDate.getMonth() === 1 && birthDate.getDate() === 29;
    if (isBirthDateFeb29 && now.getMonth() === 1 && now.getDate() === 28 && !isLeapYear(now.getFullYear())) {
        days = 0; // Consider February 28 as their birthday in non-leap years
    }

    // Adjust for negative days
    if (days < 0) {
        months--;
        days += getDaysInMonth(now.getFullYear(), (now.getMonth() - 1 + 12) % 12);
    }

    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }

    // Special handling for leap year birthdays
    const nextBday = getNextBirthday(birthDate, now);
    const daysToNextBday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
        years,
        months,
        days,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        isLeapYearBirthday: isBirthDateFeb29,
        daysToNextBirthday: daysToNextBday
    };
}

function calculateVitalStats(birthDate: Date, now: Date) {
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const secondsLived = diffTime / 1000;
    const years = now.getFullYear() - birthDate.getFullYear();

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

function calculateEarthJourney(birthDate: Date, now: Date) {
    // Get exact days including leap years
    const exactDays = getExactDaysDifference(birthDate, now);
    
    // Calculate precise orbits considering leap years
    const preciseOrbits = exactDays / TROPICAL_YEAR;
    
    // Get the number of leap years for more accurate rotation count
    const leapYears = countLeapYears(birthDate, now);
    const rotations = exactDays + (leapYears * 24 / SIDEREAL_DAY);

    return {
        orbits: Math.floor(preciseOrbits),
        rotations: Math.floor(rotations),
        accurateOrbits: preciseOrbits.toFixed(6)
    };
}

export function calculateLifeMetrics(birthDate: Date): LifeMetrics {
    const now = new Date();
    const exact = calculateExactAge(birthDate, now);

    // Calculate celebrations
    // For leap year birthdays, count celebrations on Feb 28 in non-leap years
    const yearsPassed = exact.years + (exact.months > 0 || exact.days > 0 ? 1 : 0);

    return {
        exact,
        celebrations: {
            christmas: yearsPassed,
            newYear: yearsPassed
        },
        earth: calculateEarthJourney(birthDate, now),
        body: calculateVitalStats(birthDate, now)
    };
}