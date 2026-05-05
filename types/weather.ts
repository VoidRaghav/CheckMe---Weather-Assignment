export type Units = "metric" | "imperial";

export interface Coords {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: WeatherCondition;
  sunrise: number;
  sunset: number;
  timezone: number;
  coords: Coords;
}

export interface ForecastDay {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pop: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
