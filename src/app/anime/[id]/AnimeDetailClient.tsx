"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  Plus,
  Star,
  Calendar,
  Tv,
  Building2,
  Check,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import EpisodeSelector from "@/components/EpisodeSelector";
import AnimeCard from "@/components/AnimeCard";
import { useWatchlist, useWatchProgress } from "@/lib/useLocalStorage";
import type { AnimeData } from "@/lib/data";

interface AnimeDetailClientProps {
  anime: AnimeData;
  recommendations: AnimeData[];
}

export default function AnimeDetailClient({ anime, recommendations }: AnimeDetailClientProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { isEpisodeWatched } = useWatchProgress();
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const watchlistItem = isInWatchlist(anime.id);

  const watchedEpisodes = anime.episodes
    .filter((ep) => isEpisodeWatched(anime.id, ep.number))
    .map((ep) => ep.number);

  const handleWatchlistToggle = useCallback(() => {
    if (watchlistItem) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime.id, "plan-to-watch");
    }
  }, [watchlistItem, anime.id, addToWatchlist, removeFromWatchlist]);

  return (
    <div>
      {/* Hero backdrop */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={anime.bannerImage}
          alt={anime.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-transparent to-dark-bg" />
      </div>

      {/* Content */}
      <div className="relative -mt-40 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="shrink-0"
            >
              <img
                src={anime.coverImage}
                alt={anime.title}
                className="w-48 h-72 rounded-xl object-cover shadow-2xl border border-white/10 mx-auto md:mx-0"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                {anime.title}
              </h1>

              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-sm font-medium">
                  <Star className="h-4 w-4" />
                  {anime.rating}
                </span>
                <span className="px-2 py-1 rounded-lg bg-neon-cyan/10 text-neon-cyan text-sm font-medium">
                  {anime.quality}
                </span>
                <span className="px-2 py-1 rounded-lg bg-neon-purple/10 text-neon-purple text-sm font-medium">
                  {anime.audio}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-gray-300 text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  {anime.year}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-gray-300 text-sm">
                  <Tv className="h-3.5 w-3.5" />
                  {anime.episodeCount} Episodes
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-gray-300 text-sm">
                  <Building2 className="h-3.5 w-3.5" />
                  {anime.studio}
                </span>
                <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                  anime.status === "Airing" ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                }`}>
                  {anime.status}
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10"
                  >
                    {genre}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                  {anime.season}
                </span>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <p className={`text-sm text-gray-400 leading-relaxed ${!showFullSynopsis ? "line-clamp-3" : ""}`}>
                  {anime.synopsis}
                </p>
                {anime.synopsis.length > 200 && (
                  <button
                    onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                    className="text-neon-purple text-sm mt-1 hover:underline"
                  >
                    {showFullSynopsis ? "Show less" : "Show more"}
                  </button>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/watch/${anime.id}?ep=1`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold transition-all glow-purple"
                >
                  <Play className="h-5 w-5" />
                  Watch Now
                </Link>
                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    watchlistItem
                      ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {watchlistItem ? (
                    <>
                      <BookmarkCheck className="h-5 w-5" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Add to List
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Episodes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <EpisodeSelector
              episodes={anime.episodes}
              animeId={anime.id}
              watchedEpisodes={watchedEpisodes}
            />
          </motion.div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <h2 className="text-xl font-bold text-white mb-5">You Might Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recommendations.map((rec, i) => (
                  <AnimeCard key={rec.id} anime={rec} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
