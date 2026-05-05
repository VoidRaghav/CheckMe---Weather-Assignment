"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Units } from "@/types/weather";
import { getWeatherTheme, isNightTime } from "@/lib/utils";
import { useWeather } from "@/hooks/useWeather";
import AnimatedBackground from "@/components/AnimatedBackground";
import SearchBar from "@/components/SearchBar";
import UnitToggle from "@/components/UnitToggle";
import CurrentWeatherCard from "@/components/CurrentWeatherCard";
import ForecastStrip from "@/components/ForecastStrip";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function Page() {
  const [units, setUnits] = useState<Units>("metric");
  const [errorDismissed, setErrorDismissed] = useState(false);
  const { data, loading, error, geoLoading, searchCity, searchByLocation } = useWeather(units);

  useEffect(() => {
    setErrorDismissed(false);
  }, [error]);

  const handleUnitChange = useCallback(
    (u: Units) => {
      setUnits(u);
      if (data?.current.city) searchCity(data.current.city);
    },
    [data, searchCity]
  );

  const now = Math.floor(Date.now() / 1000);
  const theme = data
    ? getWeatherTheme(
        data.current.condition.id,
        isNightTime(now, data.current.sunrise, data.current.sunset)
      )
    : { bg: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #1a0a2e 100%)", accent: "#7c3aed", particle: "star" };

  const isNight = data ? isNightTime(now, data.current.sunrise, data.current.sunset) : true;

  const bgStyle = {
    background: theme.bg,
    transition: "background 1.2s ease",
  };

  return (
    <main className="relative min-h-screen w-full" style={bgStyle}>
      <AnimatedBackground particle={theme.particle} accent={theme.accent} />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" fill="#FCD34D" />
                    <line x1="12" y1="2" x2="12" y2="5" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="2" y1="12" x2="5" y2="12" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="19" y1="12" x2="22" y2="12" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-white font-black text-lg tracking-tight">Skycast</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <UnitToggle units={units} onChange={handleUnitChange} />
              </motion.div>
            </div>

            <SearchBar
              onSearch={searchCity}
              onGeoSearch={searchByLocation}
              geoLoading={geoLoading}
              loading={loading}
            />

            <AnimatePresence mode="wait">
              {error && !errorDismissed && (
                <motion.div
                  key="error"
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ErrorState message={error} onDismiss={() => setErrorDismissed(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {loading || geoLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingSkeleton />
                </motion.div>
              ) : data ? (
                <motion.div
                  key={`${data.current.city}-${units}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <CurrentWeatherCard weather={data.current} units={units} />
                  <ForecastStrip forecast={data.forecast} units={units} />
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <footer className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-white/20 text-xs text-center">
              Powered by OpenWeatherMap · Data updates every 10 minutes
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
