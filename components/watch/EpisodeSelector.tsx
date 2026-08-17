"use client";

import { useMemo, useState } from "react";
import { Check, Play } from "lucide-react";
import { cx } from "@/lib/utils";
import { useContinueWatching } from "@/context/ContinueWatchingContext";
import type { EpisodeMeta } from "@/lib/types";

const BATCH_SIZE = 50;

export default function EpisodeSelector({
  animeId,
  episodes,
  activeEpisode,
  onSelect
}: {
  animeId: number;
  episodes: EpisodeMeta[];
  activeEpisode: number;
  onSelect: (episodeNumber: number) => void;
}) {
  const { isEpisodeWatched } = useContinueWatching();
  const batches = useMemo(() => {
    const result: { label: string; start: number; end: number }[] = [];
    for (let i = 0; i < episodes.length; i += BATCH_SIZE) {
      const start = i + 1;
      const end = Math.min(i + BATCH_SIZE, episodes.length);
      result.push({ label: `${start}–${end}`, start, end });
    }
    return result;
  }, [episodes.length]);

  const [batchIndex, setBatchIndex] = useState(() =>
    Math.max(0, batches.findIndex((b) => activeEpisode >= b.start && activeEpisode <= b.end))
  );

  const activeBatch = batches[batchIndex] || batches[0];
  const visibleEpisodes = episodes.slice(activeBatch.start - 1, activeBatch.end);

  return (
    <div className="glass-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-white">Episodes</h3>
        <span className="text-xs text-white/40">{episodes.length} total</span>
      </div>

      {batches.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {batches.map((b, i) => (
            <button
              key={b.label}
              onClick={() => setBatchIndex(i)}
              className={cx(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                i === batchIndex
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                  : "bg-white/5 text-white/50 hover:text-white"
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid max-h-[420px] grid-cols-4 gap-2 overflow-y-auto pr-1 sm:grid-cols-5">
        {visibleEpisodes.map((ep) => {
          const active = ep.number === activeEpisode;
          const watched = isEpisodeWatched(animeId, ep.number);
          return (
            <button
              key={ep.number}
              onClick={() => onSelect(ep.number)}
              className={cx(
                "relative flex items-center justify-center gap-1 rounded-lg border py-2.5 text-sm font-medium transition-all",
                active
                  ? "border-neon-cyan bg-neon-cyan/10 text-white shadow-neon-cyan"
                  : "border-white/10 bg-slate-panel text-white/60 hover:border-white/30 hover:text-white"
              )}
            >
              {active && <Play className="h-3 w-3 fill-neon-cyan text-neon-cyan" />}
              {ep.number}
              {watched && !active && (
                <Check className="absolute right-1 top-1 h-3 w-3 text-neon-purple" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
