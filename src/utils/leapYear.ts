/**
 * Helper functions for handling leap years and date calculations
 */

export function isLeapYear(year: number): boolean {
  // Century rules and exceptions
  if (year % 400 === 0) return true;  // Exception to century rule
  if (year % 100 === 0) return false;  // Century rule
  return year % 4 === 0;  // Regular leap year
}

export function getDaysInMonth(year: number, month: number): number {
  const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 1 && isLeapYear(year)) { // February in leap year
    return 29;
  }
  return monthDays[month];
}

export function countLeapYears(start: Date, end: Date): number {
  let years = 0;
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  // Count all leap years between start and end years
  for (let year = startYear; year <= endYear; year++) {
    if (isLeapYear(year)) {
      // For start year, only count if before Feb 29
      if (year === startYear && 
          (start.getMonth() > 1 || 
           (start.getMonth() === 1 && start.getDate() === 29))) {
        continue;
      }
      // For end year, only count if after Feb 28
      if (year === endYear && 
          (end.getMonth() < 1 || 
           (end.getMonth() === 1 && end.getDate() < 29))) {
        continue;
      }
      years++;
    }
  }
  return years;
}

export function getNextBirthday(birthDate: Date, currentDate: Date): Date {
  const nextBirthday = new Date(currentDate.getFullYear(), 
                                birthDate.getMonth(), 
                                birthDate.getDate());
  
  // Handle February 29 birthdays
  if (birthDate.getMonth() === 1 && birthDate.getDate() === 29) {
    // If next birthday year is not a leap year, use March 1
    if (!isLeapYear(nextBirthday.getFullYear())) {
      nextBirthday.setMonth(2, 1); // March 1st
    }
  }

  // If the birthday has already passed this year, move to next year
  if (nextBirthday < currentDate) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    // Check again for Feb 29 in next year
    if (birthDate.getMonth() === 1 && birthDate.getDate() === 29 && 
        !isLeapYear(nextBirthday.getFullYear())) {
      nextBirthday.setMonth(2, 1); // March 1st
    }
  }

  return nextBirthday;
}

export function getExactDaysDifference(start: Date, end: Date): number {
  let days = 0;
  const tempDate = new Date(start);

  while (tempDate < end) {
    days++;
    tempDate.setDate(tempDate.getDate() + 1);
  }

  return days;
}