"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star, Tv } from "lucide-react";
import type { AnimeData } from "@/lib/data";

interface AnimeCardProps {
  anime: AnimeData;
  index?: number;
  showRank?: boolean;
}

export default function AnimeCard({ anime, index = 0, showRank = false }: AnimeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative"
    >
      <Link href={`/anime/${anime.id}`}>
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden glass">
          {showRank && (
            <div className="absolute top-2 left-2 z-10 w-8 h-8 rounded-lg bg-neon-purple flex items-center justify-center text-sm font-bold text-white shadow-lg">
              {index + 1}
            </div>
          )}
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-neon-purple/90 flex items-center justify-center glow-purple">
              <Play className="h-6 w-6 text-white ml-1" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neon-cyan/90 text-white">
              {anime.quality}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neon-purple/90 text-white">
              {anime.audio}
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1">
              {anime.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                {anime.rating}
              </span>
              <span className="flex items-center gap-1">
                <Tv className="h-3 w-3" />
                EP {anime.episodeCount}
              </span>
              <span>{anime.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AnimeCardSkeleton() {
  return (
    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shimmer" />
  );
}
