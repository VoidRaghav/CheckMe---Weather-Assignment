"use client";

import { useState, useCallback } from "react";
import type { WeatherData, Units } from "@/types/weather";
import { fetchWeatherByCity, fetchWeatherByCoords } from "@/lib/api";
import { addToHistory } from "@/lib/utils";

type State = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  geoLoading: boolean;
};

export function useWeather(units: Units) {
  const [state, setState] = useState<State>({
    data: null,
    loading: false,
    error: null,
    geoLoading: false,
  });

  const searchCity = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      setState((s) => ({ ...s, loading: true, error: null }));
      try {
        const data = await fetchWeatherByCity(city.trim(), units);
        addToHistory(data.current.city);
        setState({ data, loading: false, error: null, geoLoading: false });
      } catch (e: any) {
        setState((s) => ({ ...s, loading: false, error: e.message }));
      }
    },
    [units]
  );

  const searchByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation is not supported by your browser." }));
      return;
    }
    setState((s) => ({ ...s, geoLoading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await fetchWeatherByCoords(coords.latitude, coords.longitude, units);
          addToHistory(data.current.city);
          setState({ data, loading: false, error: null, geoLoading: false });
        } catch (e: any) {
          setState((s) => ({ ...s, geoLoading: false, error: e.message }));
        }
      },
      () => {
        setState((s) => ({
          ...s,
          geoLoading: false,
          error: "Location access denied. Please enable it or search manually.",
        }));
      }
    );
  }, [units]);

  return { ...state, searchCity, searchByLocation };
}
