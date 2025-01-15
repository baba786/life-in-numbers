import type { LifeMetrics, BirthInfo } from '@/types';
import { isLeapYear, getDaysInMonth, countLeapYears, getNextBirthday, getExactDaysDifference } from './leapYear';
import { adjustForTimeZone } from './timezone';

// Accurate astronomical constants
const TROPICAL_YEAR = 365.242190; // Earth's orbital period (days)
const SIDEREAL_DAY = 86164.0905;  // Earth's rotation period (seconds)

// Constants for celebrations
const CHRISTMAS_MONTH = 11;  // December (0-based)
const CHRISTMAS_DAY = 25;
const NEW_YEAR_MONTH = 0;   // January (0-based)
const NEW_YEAR_DAY = 1;

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

function calculateExactAge(birthDate: Date, now: Date, hasTimeZone: boolean) {
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
        const lastMonth = now.getMonth() - 1;
        const daysInLastMonth = getDaysInMonth(now.getFullYear(), lastMonth);
        days += daysInLastMonth;
    }

    // Adjust for negative months
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
        seconds: now.getSeconds(),
        timeZoneAdjusted: hasTimeZone
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

function calculateCelebrations(birthDate: Date, now: Date) {
    const birthYear = birthDate.getFullYear();
    const currentYear = now.getFullYear();
    
    // Calculate Christmas celebrations
    let christmasCelebrations = currentYear - birthYear;
    
    // If born after Christmas in birth year, subtract one
    if (birthDate.getMonth() > CHRISTMAS_MONTH || 
        (birthDate.getMonth() === CHRISTMAS_MONTH && birthDate.getDate() > CHRISTMAS_DAY)) {
        christmasCelebrations--;
    }
    
    // If haven't reached Christmas this year, subtract one
    if (now.getMonth() < CHRISTMAS_MONTH || 
        (now.getMonth() === CHRISTMAS_MONTH && now.getDate() < CHRISTMAS_DAY)) {
        christmasCelebrations--;
    }
    
    // Calculate New Year celebrations similarly
    let newYearCelebrations = currentYear - birthYear;
    
    // If born after New Year in birth year (which is impossible since it's January 1), subtract one
    if (birthDate.getMonth() > NEW_YEAR_MONTH || 
        (birthDate.getMonth() === NEW_YEAR_MONTH && birthDate.getDate() > NEW_YEAR_DAY)) {
        newYearCelebrations--;
    }
    
    // If haven't reached New Year this year (which we have since it's January 1), subtract one
    if (now.getMonth() < NEW_YEAR_MONTH || 
        (now.getMonth() === NEW_YEAR_MONTH && now.getDate() < NEW_YEAR_DAY)) {
        newYearCelebrations--;
    }

    return {
        christmas: christmasCelebrations,
        newYear: newYearCelebrations
    };
}

export function calculateLifeMetrics(birthInfo: BirthInfo): LifeMetrics {
    const now = new Date();
    const adjustedBirthDate = adjustForTimeZone(birthInfo);
    const exact = calculateExactAge(adjustedBirthDate, now, birthInfo.hasTimeZone);
    
    return {
        exact,
        celebrations: calculateCelebrations(adjustedBirthDate, now),
        earth: calculateEarthJourney(adjustedBirthDate, now),
        body: calculateVitalStats(adjustedBirthDate, now)
    };
}