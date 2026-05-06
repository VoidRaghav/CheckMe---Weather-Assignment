import type { CurrentWeather, ForecastDay, WeatherData, Units, CitySuggestion } from "@/types/weather";

const BASE = "https://api.openweathermap.org/data/2.5";
const GEO = "https://api.openweathermap.org/geo/1.0";

function key() {
  const k = process.env.NEXT_PUBLIC_OWM_API_KEY;
  if (!k) throw new Error("Missing NEXT_PUBLIC_OWM_API_KEY");
  return k;
}

function buildCurrentWeather(d: any): CurrentWeather {
  return {
    city: d.name,
    country: d.sys.country,
    temp: d.main.temp,
    feelsLike: d.main.feels_like,
    humidity: d.main.humidity,
    windSpeed: d.wind.speed,
    windDeg: d.wind.deg ?? 0,
    pressure: d.main.pressure,
    visibility: d.visibility ?? 10000,
    uvIndex: 0,
    condition: d.weather[0],
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
    timezone: d.timezone,
    coords: { lat: d.coord.lat, lon: d.coord.lon },
  };
}

function buildForecast(d: any): ForecastDay[] {
  const byDay: Record<string, any[]> = {};
  for (const item of d.list) {
    const day = new Date(item.dt * 1000).toDateString();
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(item);
  }

  return Object.entries(byDay)
    .slice(0, 5)
    .map(([, items]) => {
      const temps = items.map((i: any) => i.main.temp);
      const noon = items.find((i: any) => {
        const h = new Date(i.dt * 1000).getHours();
        return h >= 11 && h <= 14;
      }) ?? items[Math.floor(items.length / 2)];
      return {
        date: noon.dt,
        tempMax: Math.max(...temps),
        tempMin: Math.min(...temps),
        condition: noon.weather[0],
        humidity: noon.main.humidity,
        windSpeed: noon.wind.speed,
        pop: Math.round((noon.pop ?? 0) * 100),
      };
    });
}

export async function fetchWeatherByCity(city: string, units: Units): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${key()}&units=${units}`, { cache: "no-store" }),
    fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${key()}&units=${units}`, { cache: "no-store" }),
  ]);

  if (currentRes.status === 404) throw new Error("City not found. Check the spelling and try again.");
  if (currentRes.status === 429) throw new Error("Too many requests — please wait a moment and try again.");
  if (currentRes.status === 401) throw new Error("Invalid API key. Check your NEXT_PUBLIC_OWM_API_KEY.");
  if (!currentRes.ok) throw new Error(`Weather API error (${currentRes.status}). Please try again.`);

  const [currentData, forecastData] = await Promise.all([currentRes.json(), forecastRes.json()]);

  return {
    current: buildCurrentWeather(currentData),
    forecast: buildForecast(forecastData),
  };
}

export async function searchCitySuggestions(query: string): Promise<CitySuggestion[]> {
  if (!query.trim()) return [];
  const res = await fetch(
    `${GEO}/direct?q=${encodeURIComponent(query)}&limit=6&appid=${key()}`
  );
  if (!res.ok) return [];
  const data: any[] = await res.json();
  const seen = new Set<string>();
  return data.reduce<CitySuggestion[]>((acc, d) => {
    const id = `${d.name}-${d.country}-${d.state ?? ""}`;
    if (!seen.has(id)) {
      seen.add(id);
      acc.push({ name: d.name, country: d.country, state: d.state, lat: d.lat, lon: d.lon });
    }
    return acc;
  }, []);
}

export async function fetchWeatherByCoords(lat: number, lon: number, units: Units): Promise<WeatherData> {
  const [currentRes, forecastRes] = await Promise.all([
    fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&appid=${key()}&units=${units}`),
    fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${key()}&units=${units}`),
  ]);

  if (!currentRes.ok) throw new Error("Failed to fetch weather for your location.");

  const [currentData, forecastData] = await Promise.all([currentRes.json(), forecastRes.json()]);

  return {
    current: buildCurrentWeather(currentData),
    forecast: buildForecast(forecastData),
  };
}
