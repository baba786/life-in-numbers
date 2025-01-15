import type { LifeMetrics } from '@/types';

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

    // Adjust for negative days
    if (days < 0) {
        months--;
        // Get days in the previous month
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
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
        seconds: now.getSeconds()
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
    const diffTime = Math.abs(now.getTime() - birthDate.getTime());
    const diffDays = diffTime / (24 * 60 * 60 * 1000);
    
    // Calculate precise orbits
    const preciseOrbits = diffDays / TROPICAL_YEAR;
    
    // Calculate Earth rotations
    const rotations = Math.floor(diffDays);

    return {
        orbits: Math.floor(preciseOrbits),
        rotations,
        accurateOrbits: preciseOrbits.toFixed(6)
    };
}

export function calculateLifeMetrics(birthDate: Date): LifeMetrics {
    const now = new Date();
    const exact = calculateExactAge(birthDate, now);

    // Calculate celebrations
    // You've experienced this year's celebration if your birthday has passed this year
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