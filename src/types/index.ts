export interface TimeZoneInfo {
  zoneName: string;
  offset: number;
}

export interface BirthInfo {
  date: Date;
  hasTimeZone: boolean;
  timeZone?: TimeZoneInfo;
  birthTime?: string; // In 24h format 'HH:mm'
}

export interface LifeMetrics {
  exact: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    timeZoneAdjusted: boolean;
  };
  celebrations: {
    christmas: number;
    newYear: number;
  };
  earth: {
    orbits: number;
    rotations: number;
    accurateOrbits: string;
  };
  body: {
    heartbeats: {
      estimate: number;
      range: {
        min: number;
        max: number;
      };
    };
    breaths: {
      estimate: number;
      range: {
        min: number;
        max: number;
      };
    };
  };
}