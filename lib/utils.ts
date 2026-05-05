import type { Units } from "@/types/weather";

export function formatTemp(temp: number, units: Units): string {
  return `${Math.round(temp)}°${units === "metric" ? "C" : "F"}`;
}

export function formatTime(unix: number, timezone: number): string {
  const d = new Date((unix + timezone) * 1000);
  return d.toUTCString().slice(17, 22);
}

export function formatDay(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", { weekday: "short" });
}

export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function windDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export function getWeatherTheme(conditionId: number, isNight: boolean): {
  bg: string;
  accent: string;
  particle: string;
} {
  if (isNight) {
    return { bg: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #1a0a2e 100%)", accent: "#7c3aed", particle: "star" };
  }
  if (conditionId >= 200 && conditionId < 300) {
    return { bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", accent: "#f59e0b", particle: "lightning" };
  }
  if (conditionId >= 300 && conditionId < 600) {
    return { bg: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", accent: "#38bdf8", particle: "rain" };
  }
  if (conditionId >= 600 && conditionId < 700) {
    return { bg: "linear-gradient(135deg, #1e3a5f 0%, #2d5986 50%, #c8d6e5 100%)", accent: "#e0f2fe", particle: "snow" };
  }
  if (conditionId >= 700 && conditionId < 800) {
    return { bg: "linear-gradient(135deg, #2d3748 0%, #4a5568 50%, #718096 100%)", accent: "#a0aec0", particle: "none" };
  }
  if (conditionId === 800) {
    return { bg: "linear-gradient(135deg, #0c1445 0%, #1a237e 50%, #e65100 100%)", accent: "#fbbf24", particle: "sun" };
  }
  return { bg: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #37474f 100%)", accent: "#93c5fd", particle: "cloud" };
}

export function isNightTime(unix: number, sunrise: number, sunset: number): boolean {
  return unix < sunrise || unix > sunset;
}

const HISTORY_KEY = "wx_history";
const MAX_HISTORY = 6;

export function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addToHistory(city: string): void {
  const history = getSearchHistory().filter((c) => c.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}
