"use client";

import { motion } from "framer-motion";

interface Props {
  conditionId: number;
  isNight: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = { sm: 32, md: 56, lg: 96 };

function SunIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <motion.circle
        cx="48" cy="48" r="22"
        fill="#FCD34D"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <motion.line
          key={angle}
          x1="48" y1="16" x2="48" y2="8"
          stroke="#FCD34D" strokeWidth="3" strokeLinecap="round"
          style={{ transformOrigin: "48px 48px", transform: `rotate(${angle}deg)` }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <motion.path
        d="M60 20C46 20 34 32 34 48s12 28 26 28c8 0 15-3.5 20-9-14 0-26-11-26-24s10-22 22-22c-4-1-8-1-12-1z"
        fill="#E2E8F0"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function CloudIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <motion.ellipse cx="48" cy="56" rx="30" ry="18" fill="#94A3B8"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle cx="36" cy="46" r="14" fill="#CBD5E1"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle cx="54" cy="40" r="18" fill="#CBD5E1"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function RainIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <ellipse cx="48" cy="42" rx="28" ry="16" fill="#64748B" />
      <circle cx="36" cy="34" r="12" fill="#94A3B8" />
      <circle cx="52" cy="28" r="15" fill="#94A3B8" />
      {[30, 44, 58].map((x, i) => (
        <motion.line key={x} x1={x} y1="62" x2={x - 4} y2="76"
          stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round"
          animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}

function ThunderstormIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <ellipse cx="48" cy="38" rx="28" ry="16" fill="#475569" />
      <circle cx="36" cy="30" r="12" fill="#64748B" />
      <circle cx="52" cy="24" r="15" fill="#64748B" />
      <motion.path
        d="M52 54L44 68h10L46 84"
        stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        animate={{ opacity: [1, 0.2, 1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SnowIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <ellipse cx="48" cy="38" rx="28" ry="16" fill="#94A3B8" />
      <circle cx="36" cy="30" r="12" fill="#CBD5E1" />
      <circle cx="52" cy="24" r="15" fill="#CBD5E1" />
      {[30, 48, 66].map((x, i) => (
        <motion.circle key={x} cx={x} cy="66" r="3" fill="#E2E8F0"
          animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </svg>
  );
}

function MistIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      {[28, 40, 52, 64].map((y, i) => (
        <motion.line key={y} x1="16" y1={y} x2="80" y2={y}
          stroke="#94A3B8" strokeWidth="3" strokeLinecap="round"
          animate={{ x: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function PartlyCloudyIcon({ size, isNight }: { size: number; isNight: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      {isNight ? (
        <motion.path
          d="M38 22C28 22 20 30 20 40c0 2 0.4 4 1 6 14 0 25-11 25-24-.5-1.3-1-3-1-3a18 18 0 00-7-1z"
          fill="#E2E8F0"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      ) : (
        <motion.circle cx="32" cy="34" r="16" fill="#FCD34D"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <motion.ellipse cx="58" cy="60" rx="26" ry="15" fill="#64748B"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.circle cx="46" cy="52" r="12" fill="#94A3B8"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.circle cx="60" cy="46" r="16" fill="#94A3B8"
        animate={{ x: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </svg>
  );
}

export default function WeatherIcon({ conditionId, isNight, size = "md" }: Props) {
  const px = sizes[size];

  if (conditionId >= 200 && conditionId < 300) return <ThunderstormIcon size={px} />;
  if (conditionId >= 300 && conditionId < 600) return <RainIcon size={px} />;
  if (conditionId >= 600 && conditionId < 700) return <SnowIcon size={px} />;
  if (conditionId >= 700 && conditionId < 800) return <MistIcon size={px} />;
  if (conditionId === 800) return isNight ? <MoonIcon size={px} /> : <SunIcon size={px} />;
  if (conditionId === 801 || conditionId === 802) return <PartlyCloudyIcon size={px} isNight={isNight} />;
  return <CloudIcon size={px} />;
}
