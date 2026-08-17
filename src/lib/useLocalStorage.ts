"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // ignore
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
        } catch {
          // ignore
        }
        return newValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

export interface WatchProgress {
  animeId: string;
  episodeNumber: number;
  timestamp: number;
  updatedAt: number;
}

export interface WatchlistItem {
  animeId: string;
  category: "watching" | "plan-to-watch" | "completed";
  addedAt: number;
}

export function useWatchProgress() {
  const [progress, setProgress] = useLocalStorage<WatchProgress[]>("watch-progress", []);

  const updateProgress = useCallback(
    (animeId: string, episodeNumber: number, timestamp: number) => {
      setProgress((prev) => {
        const filtered = prev.filter((p) => !(p.animeId === animeId && p.episodeNumber === episodeNumber));
        return [...filtered, { animeId, episodeNumber, timestamp, updatedAt: Date.now() }];
      });
    },
    [setProgress]
  );

  const getProgress = useCallback(
    (animeId: string, episodeNumber: number): WatchProgress | undefined => {
      return progress.find((p) => p.animeId === animeId && p.episodeNumber === episodeNumber);
    },
    [progress]
  );

  const getContinueWatching = useCallback((): WatchProgress[] => {
    const latest = new Map<string, WatchProgress>();
    for (const p of progress) {
      const existing = latest.get(p.animeId);
      if (!existing || p.updatedAt > existing.updatedAt) {
        latest.set(p.animeId, p);
      }
    }
    return Array.from(latest.values()).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [progress]);

  const isEpisodeWatched = useCallback(
    (animeId: string, episodeNumber: number): boolean => {
      return progress.some((p) => p.animeId === animeId && p.episodeNumber === episodeNumber);
    },
    [progress]
  );

  return { progress, updateProgress, getProgress, getContinueWatching, isEpisodeWatched };
}

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage<WatchlistItem[]>("watchlist", []);

  const addToWatchlist = useCallback(
    (animeId: string, category: WatchlistItem["category"] = "plan-to-watch") => {
      setWatchlist((prev) => {
        const filtered = prev.filter((w) => w.animeId !== animeId);
        return [...filtered, { animeId, category, addedAt: Date.now() }];
      });
    },
    [setWatchlist]
  );

  const removeFromWatchlist = useCallback(
    (animeId: string) => {
      setWatchlist((prev) => prev.filter((w) => w.animeId !== animeId));
    },
    [setWatchlist]
  );

  const isInWatchlist = useCallback(
    (animeId: string): WatchlistItem | undefined => {
      return watchlist.find((w) => w.animeId === animeId);
    },
    [watchlist]
  );

  const getByCategory = useCallback(
    (category: WatchlistItem["category"]): WatchlistItem[] => {
      return watchlist.filter((w) => w.category === category);
    },
    [watchlist]
  );

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, getByCategory };
}
