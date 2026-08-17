"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { List, Grid3X3, CheckCircle } from "lucide-react";
import type { EpisodeData } from "@/lib/data";

interface EpisodeSelectorProps {
  episodes: EpisodeData[];
  animeId: string;
  currentEpisode?: number;
  watchedEpisodes?: number[];
}

const BATCH_SIZE = 50;

export default function EpisodeSelector({
  episodes,
  animeId,
  currentEpisode,
  watchedEpisodes = [],
}: EpisodeSelectorProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const batchCount = Math.ceil(episodes.length / BATCH_SIZE);
  const batches = useMemo(() => {
    return Array.from({ length: batchCount }, (_, i) => {
      const start = i * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, episodes.length);
      return { label: `${start + 1}–${end}`, start, end };
    });
  }, [batchCount, episodes.length]);

  const [activeBatch, setActiveBatch] = useState(0);
  const currentBatchEpisodes = episodes.slice(batches[activeBatch]?.start ?? 0, batches[activeBatch]?.end ?? BATCH_SIZE);

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Episodes</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded ${viewMode === "grid" ? "text-neon-purple" : "text-gray-400"}`}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded ${viewMode === "list" ? "text-neon-purple" : "text-gray-400"}`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Batch Selector */}
      {batches.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
          {batches.map((batch, i) => (
            <button
              key={batch.label}
              onClick={() => setActiveBatch(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeBatch === i
                  ? "bg-neon-purple text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {batch.label}
            </button>
          ))}
        </div>
      )}

      {/* Episodes */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {currentBatchEpisodes.map((ep) => {
            const isActive = ep.number === currentEpisode;
            const isWatched = watchedEpisodes.includes(ep.number);
            return (
              <Link
                key={ep.number}
                href={`/watch/${animeId}/?ep=${ep.number}`}
                className={`relative flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-neon-purple text-white glow-purple"
                    : isWatched
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {ep.number}
                {isWatched && !isActive && (
                  <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-neon-cyan" />
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-1 max-h-96 overflow-y-auto">
          {currentBatchEpisodes.map((ep) => {
            const isActive = ep.number === currentEpisode;
            const isWatched = watchedEpisodes.includes(ep.number);
            return (
              <motion.div key={ep.number} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Link
                  href={`/watch/${animeId}/?ep=${ep.number}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-neon-purple/20 border border-neon-purple/50 text-white"
                      : "hover:bg-white/5 text-gray-300"
                  }`}
                >
                  <span className={`text-sm font-medium w-8 ${isActive ? "text-neon-purple" : ""}`}>
                    {String(ep.number).padStart(2, "0")}
                  </span>
                  <span className="text-sm flex-1">{ep.title}</span>
                  {isWatched && <CheckCircle className="h-4 w-4 text-neon-cyan" />}
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
