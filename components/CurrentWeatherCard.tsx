"use client";

import { motion } from "framer-motion";
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Navigation } from "lucide-react";
import type { CurrentWeather, Units } from "@/types/weather";
import { formatTemp, formatTime, windDirection, isNightTime } from "@/lib/utils";
import WeatherIcon from "./WeatherIcon";

interface Props {
  weather: CurrentWeather;
  units: Units;
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
      className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-white/[0.07] border border-white/10 transition-colors cursor-default"
    >
      <span className="text-white/50">{icon}</span>
      <span className="text-white font-bold text-lg leading-none">{value}</span>
      <span className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</span>
    </motion.div>
  );
}

export default function CurrentWeatherCard({ weather, units }: Props) {
  const now = Math.floor(Date.now() / 1000);
  const night = isNightTime(now, weather.sunrise, weather.sunset);
  const windDir = windDirection(weather.windDeg);
  const speedUnit = units === "metric" ? "m/s" : "mph";
  const visKm = (weather.visibility / 1000).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none rounded-3xl" />

      <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-2"
          >
            <span className="text-white/50 text-sm font-medium uppercase tracking-widest">
              {weather.country}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/40 text-sm capitalize">
              {weather.condition.description}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6"
          >
            {weather.city}
          </motion.h1>

          <div className="flex items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <WeatherIcon conditionId={weather.condition.id} isNight={night} size="lg" />
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter"
              >
                {Math.round(weather.temp)}
                <span className="text-4xl lg:text-5xl text-white/60 font-light">
                  °{units === "metric" ? "C" : "F"}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/50 text-sm mt-1"
              >
                Feels like {formatTemp(weather.feelsLike, units)}
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:min-w-[280px]">
            <StatPill icon={<Droplets size={18} />} label="Humidity" value={`${weather.humidity}%`} />
            <StatPill
              icon={<Wind size={18} />}
              label="Wind"
              value={`${Math.round(weather.windSpeed)} ${speedUnit}`}
            />
            <StatPill
              icon={<Navigation size={18} style={{ transform: `rotate(${weather.windDeg}deg)` }} />}
              label="Direction"
              value={windDir}
            />
            <StatPill icon={<Eye size={18} />} label="Visibility" value={`${visKm} km`} />
            <StatPill icon={<Gauge size={18} />} label="Pressure" value={`${weather.pressure} hPa`} />
            <StatPill
              icon={<Sunrise size={18} />}
              label="Sunrise"
              value={formatTime(weather.sunrise, weather.timezone)}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-white/35 text-xs font-medium"
      >
        <span className="flex items-center gap-2">
          <Sunrise size={12} />
          {formatTime(weather.sunrise, weather.timezone)}
          <span className="mx-1">→</span>
          <Sunset size={12} />
          {formatTime(weather.sunset, weather.timezone)}
        </span>
        <span>{night ? "Nighttime" : "Daytime"}</span>
      </motion.div>
    </motion.div>
  );
}
