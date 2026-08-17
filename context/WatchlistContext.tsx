"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { WatchlistEntry } from "@/lib/types";

const STORAGE_KEY = "anime-stream:watchlist";

interface WatchlistContextValue {
  entries: WatchlistEntry[];
  add: (entry: Omit<WatchlistEntry, "addedAt">) => void;
  remove: (id: number) => void;
  setCategory: (id: number, category: WatchlistEntry["category"]) => void;
  isSaved: (id: number) => boolean;
  byCategory: (category: WatchlistEntry["category"]) => WatchlistEntry[];
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<WatchlistEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, hydrated]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      entries,
      add: (entry) =>
        setEntries((prev) => {
          const withoutExisting = prev.filter((e) => e.id !== entry.id);
          return [{ ...entry, addedAt: Date.now() }, ...withoutExisting];
        }),
      remove: (id) => setEntries((prev) => prev.filter((e) => e.id !== id)),
      setCategory: (id, category) =>
        setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, category } : e))),
      isSaved: (id) => entries.some((e) => e.id === id),
      byCategory: (category) => entries.filter((e) => e.category === category)
    }),
    [entries]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}
