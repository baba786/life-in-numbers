export interface LifeMetrics {
  exact: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  celebrations: {
    christmas: number;
    newYear: number;
  };
  earth: {
    orbits: number;
    rotations: number;
    accurateOrbits: string; // With precision
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