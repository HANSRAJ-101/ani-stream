"use client";

import { useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Tv,
  Building2,
  SkipForward,
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeSelector from "@/components/EpisodeSelector";
import AnimeCard from "@/components/AnimeCard";
import { useWatchProgress } from "@/lib/useLocalStorage";
import type { AnimeData } from "@/lib/data";

interface WatchClientProps {
  anime: AnimeData;
  recommendations: AnimeData[];
}

function WatchContent({ anime, recommendations }: WatchClientProps) {
  const searchParams = useSearchParams();
  const { updateProgress, isEpisodeWatched } = useWatchProgress();

  // Get episode from URL
  const episodeNum = useMemo(() => {
    const ep = searchParams.get("ep");
    return ep ? parseInt(ep, 10) : 1;
  }, [searchParams]);

  const currentEp = useMemo(() => {
    return anime.episodes.find((ep) => ep.number === episodeNum) || anime.episodes[0];
  }, [anime.episodes, episodeNum]);

  const hasNext = episodeNum < anime.episodes.length;
  const hasPrev = episodeNum > 1;

  const watchedEpisodes = useMemo(() => {
    return anime.episodes.filter((ep) => isEpisodeWatched(anime.id, ep.number)).map((ep) => ep.number);
  }, [anime, isEpisodeWatched]);

  // Mark episode as watched
  useEffect(() => {
    updateProgress(anime.id, episodeNum, 0);
  }, [anime.id, episodeNum, updateProgress]);

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/anime/${anime.id}/`} className="hover:text-white transition-colors truncate max-w-[200px]">
            {anime.title}
          </Link>
          <span>/</span>
          <span className="text-neon-purple">Episode {episodeNum}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player Area */}
          <div className="lg:col-span-2">
            <VideoPlayer
              src={currentEp.src}
              title={`${anime.title} - Episode ${episodeNum}`}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />

            {/* Episode Navigation */}
            <div className="flex items-center justify-between mt-4 p-3 rounded-xl glass">
              {hasPrev ? (
                <Link
                  href={`/watch/${anime.id}/?ep=${episodeNum - 1}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 hover:text-white transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </Link>
              ) : (
                <div />
              )}

              <span className="text-sm font-medium text-white">
                Episode {episodeNum} / {anime.episodeCount}
              </span>

              {hasNext ? (
                <Link
                  href={`/watch/${anime.id}/?ep=${episodeNum + 1}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-purple/20 hover:bg-neon-purple/30 text-sm text-neon-purple hover:text-white transition-all"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Auto next / skip controls */}
            <div className="flex gap-3 mt-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-xs text-gray-400">
                <SkipForward className="h-3.5 w-3.5" />
                Auto Next: On
              </div>
            </div>

            {/* Anime Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-4 rounded-xl glass"
            >
              <div className="flex gap-4">
                <img
                  src={anime.coverImage}
                  alt={anime.title}
                  className="w-20 h-28 rounded-lg object-cover shrink-0 hidden sm:block"
                />
                <div className="flex-1">
                  <Link href={`/anime/${anime.id}/`}>
                    <h2 className="text-lg font-bold text-white hover:text-neon-purple transition-colors">
                      {anime.title}
                    </h2>
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="flex items-center gap-1 text-xs text-yellow-500">
                      <Star className="h-3 w-3" />{anime.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />{anime.year}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Tv className="h-3 w-3" />{anime.episodeCount} EP
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Building2 className="h-3 w-3" />{anime.studio}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                    {anime.synopsis}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {anime.genres.map((g) => (
                      <span key={g} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400 border border-white/10">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar: Episode List */}
          <div className="lg:col-span-1">
            <EpisodeSelector
              episodes={anime.episodes}
              animeId={anime.id}
              currentEpisode={episodeNum}
              watchedEpisodes={watchedEpisodes}
            />
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <h2 className="text-xl font-bold text-white mb-5">Recommended</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((rec, i) => (
                <AnimeCard key={rec.id} anime={rec} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="shimmer h-8 w-48 rounded mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="shimmer aspect-video rounded-xl" />
          </div>
          <div className="lg:col-span-1">
            <div className="shimmer h-96 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WatchClient(props: WatchClientProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WatchContent {...props} />
    </Suspense>
  );
}
