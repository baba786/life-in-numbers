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

// Heart rates and breathing rates remain the same...

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

// Rest of the code remains the same...

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