import type { BirthInfo } from '@/types';

export function adjustForTimeZone(birthInfo: BirthInfo): Date {
  const { date, timeZone, birthTime } = birthInfo;
  
  if (!timeZone) {
    // If no timezone provided, use the date as is
    return date;
  }

  // Create a date string with the timezone
  const dateString = date.toISOString().split('T')[0];
  const timeString = birthTime || '00:00';
  
  try {
    // Create a date in the specified timezone
    return new Date(dateString + 'T' + timeString + ':00' + getTimeZoneOffset(timeZone.zoneName));
  } catch (error) {
    console.error('Error adjusting for timezone:', error);
    return date;
  }
}

// Get timezone offset in the format '+HH:mm' or '-HH:mm'
function getTimeZoneOffset(zoneName: string): string {
  try {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: zoneName,
      timeZoneName: 'short'
    };
    
    // Get the timezone offset from the formatter
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find(part => part.type === 'timeZoneName');
    
    if (!timeZonePart) return '';

    // Convert GMT+X or GMT-X format to +HH:mm or -HH:mm
    const match = timeZonePart.value.match(/GMT([+-])?(\d+)?/);
    if (match) {
      const sign = match[1] || '+';
      const hours = match[2] || '0';
      return `${sign}${hours.padStart(2, '0')}:00`;
    }
    
    return '';
  } catch (error) {
    console.error('Error getting timezone offset:', error);
    return '';
  }
}

// Check if a date is near midnight (within 1 hour)
export function isNearMidnight(date: Date): boolean {
  const hour = date.getHours();
  return hour === 23 || hour === 0;
}

// Get the local time in a specific timezone
export function getLocalTime(date: Date, timeZone: string): string {
  return date.toLocaleTimeString('en-US', { timeZone, hour: '2-digit', minute: '2-digit' });
}