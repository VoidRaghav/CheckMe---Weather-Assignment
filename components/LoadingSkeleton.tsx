"use client";

import { motion } from "framer-motion";

function Shimmer({ className }: { className: string }) {
  return (
    <motion.div
      className={`rounded-2xl bg-white/[0.06] overflow-hidden relative ${className}`}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="rounded-3xl bg-white/[0.07] border border-white/10 p-8 space-y-6">
        <Shimmer className="h-5 w-24" />
        <Shimmer className="h-14 w-64" />
        <div className="flex items-center gap-6">
          <Shimmer className="h-24 w-24 !rounded-full" />
          <div className="space-y-3">
            <Shimmer className="h-16 w-44" />
            <Shimmer className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className="h-20" />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Shimmer className="h-4 w-28" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-52 flex-1 min-w-[140px]" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
