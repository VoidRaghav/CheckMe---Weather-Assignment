"use client";

import { motion } from "framer-motion";
import type { Units } from "@/types/weather";

interface Props {
  units: Units;
  onChange: (u: Units) => void;
}

export default function UnitToggle({ units, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-white/[0.07] backdrop-blur-md border border-white/15 rounded-xl p-1">
      {(["metric", "imperial"] as Units[]).map((u) => (
        <motion.button
          key={u}
          onClick={() => onChange(u)}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
            units === u ? "text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {units === u && (
            <motion.div
              layoutId="unit-pill"
              className="absolute inset-0 bg-white/15 rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{u === "metric" ? "°C" : "°F"}</span>
        </motion.button>
      ))}
    </div>
  );
}
