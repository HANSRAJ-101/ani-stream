"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { ContinueWatchingEntry } from "@/lib/types";

const STORAGE_KEY = "anime-stream:continue-watching";

interface ContinueWatchingContextValue {
  entries: ContinueWatchingEntry[];
  updateProgress: (entry: Omit<ContinueWatchingEntry, "updatedAt">) => void;
  getProgress: (id: number, episodeNumber: number) => number;
  isEpisodeWatched: (id: number, episodeNumber: number) => boolean;
  remove: (id: number) => void;
}

const ContinueWatchingContext = createContext<ContinueWatchingContextValue | null>(null);

export function ContinueWatchingProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ContinueWatchingEntry[]>([]);
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

  const value = useMemo<ContinueWatchingContextValue>(
    () => ({
      entries: entries.sort((a, b) => b.updatedAt - a.updatedAt),
      updateProgress: (entry) =>
        setEntries((prev) => {
          const withoutExisting = prev.filter((e) => e.id !== entry.id);
          return [{ ...entry, updatedAt: Date.now() }, ...withoutExisting].slice(0, 40);
        }),
      getProgress: (id, episodeNumber) => {
        const found = entries.find((e) => e.id === id && e.episodeNumber === episodeNumber);
        return found?.timestampSec ?? 0;
      },
      isEpisodeWatched: (id, episodeNumber) => {
        const found = entries.find((e) => e.id === id && e.episodeNumber === episodeNumber);
        if (!found) return false;
        return found.timestampSec / found.durationSec > 0.9;
      },
      remove: (id) => setEntries((prev) => prev.filter((e) => e.id !== id))
    }),
    [entries]
  );

  return (
    <ContinueWatchingContext.Provider value={value}>{children}</ContinueWatchingContext.Provider>
  );
}

export function useContinueWatching() {
  const ctx = useContext(ContinueWatchingContext);
  if (!ctx) throw new Error("useContinueWatching must be used within ContinueWatchingProvider");
  return ctx;
}
