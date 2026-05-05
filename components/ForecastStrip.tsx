"use client";

import { motion } from "framer-motion";
import { Droplets, Wind } from "lucide-react";
import type { ForecastDay, Units } from "@/types/weather";
import { formatDay, formatDate, formatTemp } from "@/lib/utils";
import WeatherIcon from "./WeatherIcon";

interface Props {
  forecast: ForecastDay[];
  units: Units;
}

function ForecastCard({ day, units, index }: { day: ForecastDay; units: Units; index: number }) {
  const speedUnit = units === "metric" ? "m/s" : "mph";
  const isToday = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)" }}
      className={`relative flex-1 min-w-[140px] flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all cursor-default ${
        isToday
          ? "bg-white/[0.12] border-white/25"
          : "bg-white/[0.05] border-white/10 hover:border-white/20"
      }`}
    >
      {isToday && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-white/40 bg-white/10 px-2 py-0.5 rounded-full">
          Today
        </span>
      )}

      <div className="text-center">
        <div className="text-white font-bold text-sm">{formatDay(day.date)}</div>
        <div className="text-white/40 text-xs mt-0.5">{formatDate(day.date)}</div>
      </div>

      <WeatherIcon conditionId={day.condition.id} isNight={false} size="sm" />

      <div className="text-center">
        <div className="text-white font-black text-lg">{formatTemp(day.tempMax, units)}</div>
        <div className="text-white/40 text-sm">{formatTemp(day.tempMin, units)}</div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center justify-between text-white/40 text-xs">
          <div className="flex items-center gap-1">
            <Droplets size={10} />
            <span>{day.pop}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={10} />
            <span>{Math.round(day.windSpeed)}{speedUnit}</span>
          </div>
        </div>

        <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"
            initial={{ width: 0 }}
            animate={{ width: `${day.pop}%` }}
            transition={{ delay: index * 0.08 + 0.5, duration: 0.6 }}
          />
        </div>
      </div>

      <div className="text-white/50 text-[11px] capitalize text-center leading-tight">
        {day.condition.description}
      </div>
    </motion.div>
  );
}

export default function ForecastStrip({ forecast, units }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-white/50 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
        5-Day Forecast
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {forecast.map((day, i) => (
          <ForecastCard key={day.date} day={day} units={units} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
