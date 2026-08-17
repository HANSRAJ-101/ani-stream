"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, Play, Clock } from "lucide-react";
import { useWatchProgress } from "@/lib/useLocalStorage";
import { getAnimeById } from "@/lib/data";

export default function ContinueWatchingClient() {
  const { getContinueWatching } = useWatchProgress();
  const continueList = getContinueWatching();

  const items = continueList
    .map((progress) => {
      const anime = getAnimeById(progress.animeId);
      return anime ? { progress, anime } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8"
        >
          <PlayCircle className="inline h-7 w-7 mr-2 text-neon-purple" />
          Continue Watching
        </motion.h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <PlayCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Nothing here yet</p>
            <p className="text-gray-500 text-sm mt-1">Start watching an anime and it will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(({ progress, anime }, i) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/watch/${anime.id}?ep=${progress.episodeNumber}`}
                  className="flex gap-4 p-4 rounded-xl glass hover:bg-white/10 transition-all group"
                >
                  <div className="relative shrink-0">
                    <img
                      src={anime.coverImage}
                      alt={anime.title}
                      className="w-20 h-28 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-purple transition-colors">
                      {anime.title}
                    </h3>
                    <p className="text-xs text-neon-cyan mt-1">
                      Episode {progress.episodeNumber} / {anime.episodeCount}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <Clock className="h-3 w-3" />
                      {new Date(progress.updatedAt).toLocaleDateString()}
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neon-purple rounded-full"
                        style={{ width: `${(progress.episodeNumber / anime.episodeCount) * 100}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
