"use client";

import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        className="relative mb-8"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 blur-2xl bg-white/10 rounded-full scale-150" />
        <div className="relative w-24 h-24 rounded-3xl bg-white/[0.07] border border-white/15 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 96 96" fill="none">
            <motion.circle cx="48" cy="38" r="22" fill="#FCD34D"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line key={a} x1="48" y1="10" x2="48" y2="4"
                stroke="#FCD34D" strokeWidth="3" strokeLinecap="round"
                style={{ transformOrigin: "48px 48px", transform: `rotate(${a}deg)` }}
              />
            ))}
            <ellipse cx="48" cy="68" rx="26" ry="14" fill="#64748B" />
            <circle cx="36" cy="60" r="11" fill="#94A3B8" />
            <circle cx="52" cy="55" r="14" fill="#94A3B8" />
          </svg>
        </div>
      </motion.div>

      <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
        Check the weather anywhere
      </h2>
      <p className="text-white/40 text-sm max-w-xs leading-relaxed">
        Search for a city or use your current location to get real-time weather data and a 5-day forecast.
      </p>

      <div className="mt-8 flex items-center gap-6 text-white/25 text-xs font-medium">
        <div className="flex items-center gap-2">
          <Search size={13} />
          Search by city
        </div>
        <div className="w-px h-4 bg-white/20" />
        <div className="flex items-center gap-2">
          <MapPin size={13} />
          Use my location
        </div>
      </div>
    </motion.div>
  );
}
