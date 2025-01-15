import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLifeMetrics(birthDate: Date) {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const christmasCelebrations = years + (birthDate.getMonth() === 11 && birthDate.getDate() > 25 ? -1 : 0);
  const newYearCelebrations = years + (birthDate.getMonth() === 11 ? 0 : 1);
  
  const earthOrbits = years;
  const earthRotations = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const avgHeartbeats = Math.floor(diff / 1000 * 1.2); // Average 72 BPM
  const avgBreaths = Math.floor(diff / 1000 * 0.25); // Average 15 breaths per minute

  return {
    exact: { years, months, days, hours, minutes, seconds },
    celebrations: { christmas: christmasCelebrations, newYear: newYearCelebrations },
    earth: { orbits: earthOrbits, rotations: earthRotations },
    body: { heartbeats: avgHeartbeats, breaths: avgBreaths }
  };
}