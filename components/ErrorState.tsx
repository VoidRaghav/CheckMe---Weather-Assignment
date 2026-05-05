"use client";

import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface Props {
  message: string;
  onDismiss: () => void;
}

export default function ErrorState({ message, onDismiss }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-400/20 backdrop-blur-md"
    >
      <AlertTriangle size={18} className="text-red-400 shrink-0" />
      <p className="text-red-200 text-sm flex-1">{message}</p>
      <button onClick={onDismiss} className="text-red-400/60 hover:text-red-400 transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
}
