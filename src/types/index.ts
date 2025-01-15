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
  };
  body: {
    heartbeats: number;
    breaths: number;
  };
}