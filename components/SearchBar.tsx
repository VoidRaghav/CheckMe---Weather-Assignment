"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X, Clock } from "lucide-react";
import { getSearchHistory } from "@/lib/utils";
import { searchCitySuggestions } from "@/lib/api";
import type { CitySuggestion } from "@/types/weather";

interface Props {
  onSearch: (city: string) => void;
  onGeoSearch: () => void;
  geoLoading: boolean;
  loading: boolean;
}

export default function SearchBar({ onSearch, onGeoSearch, geoLoading, loading }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [suggesting, setSuggesting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [focused]);

  const fetchSuggestions = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setSuggestions([]);
      setSuggesting(false);
      return;
    }
    setSuggesting(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchCitySuggestions(q);
      setSuggestions(results);
      setSuggesting(false);
      setActiveIdx(-1);
    }, 280);
  }, []);

  const handleChange = (val: string) => {
    setQuery(val);
    fetchSuggestions(val);
  };

  const handleSubmit = (overrideCity?: string) => {
    const city = overrideCity ?? (activeIdx >= 0 ? suggestions[activeIdx]?.name : query.trim());
    if (!city) return;
    setQuery(city);
    setSuggestions([]);
    setFocused(false);
    setActiveIdx(-1);
    inputRef.current?.blur();
    onSearch(city);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const items = suggestions.length > 0 ? suggestions : [];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const pickSuggestion = (s: CitySuggestion) => {
    handleSubmit(s.name);
  };

  const pickHistory = (city: string) => {
    handleSubmit(city);
  };

  const showSuggestions = focused && query.length >= 2 && (suggestions.length > 0 || suggesting);
  const showHistory = focused && query.length === 0 && history.length > 0;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        className="relative flex items-center"
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute left-4 text-white/50">
          {suggesting ? (
            <motion.div
              className="w-[18px] h-[18px] border-2 border-white/30 border-t-white/70 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Search size={18} />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          autoComplete="off"
          className="w-full pl-11 pr-28 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 text-[15px] font-medium"
        />

        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <motion.button
              type="button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => { setQuery(""); setSuggestions([]); }}
              className="p-2 text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={15} />
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={onGeoSearch}
            disabled={geoLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white transition-all text-xs font-medium"
          >
            {geoLoading ? (
              <motion.div
                className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <MapPin size={13} />
            )}
            {geoLoading ? "Locating" : "Locate"}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => handleSubmit()}
            disabled={loading || !query.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 text-white font-semibold text-sm transition-all disabled:opacity-40"
          >
            {loading ? (
              <motion.div
                className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              "Search"
            )}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 overflow-hidden"
          >
            {suggestions.map((s, i) => {
              const label = [s.name, s.state, s.country].filter(Boolean).join(", ");
              return (
                <motion.button
                  key={`${s.lat}-${s.lon}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => pickSuggestion(s)}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all text-sm ${
                    activeIdx === i ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <MapPin size={13} className="text-white/35 shrink-0" />
                  <span className="font-medium">{s.name}</span>
                  <span className="text-white/35 text-xs ml-auto shrink-0">
                    {[s.state, s.country].filter(Boolean).join(" · ")}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {showHistory && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-1 flex items-center gap-2 text-white/35 text-xs font-medium uppercase tracking-wider">
              <Clock size={11} />
              Recent
            </div>
            {history.map((city, i) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => pickHistory(city)}
                className="w-full px-4 py-3 text-left text-white/75 hover:text-white hover:bg-white/10 transition-all text-sm flex items-center gap-3"
              >
                <Clock size={13} className="text-white/30 shrink-0" />
                {city}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
