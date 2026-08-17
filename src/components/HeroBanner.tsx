"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ChevronLeft, ChevronRight, Star, Tv } from "lucide-react";
import type { AnimeData } from "@/lib/data";

interface HeroBannerProps {
  animeList: AnimeData[];
}

export default function HeroBanner({ animeList }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const items = animeList.slice(0, 5);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (items.length === 0) return null;
  const anime = items[current];

  return (
    <div className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={anime.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={anime.bannerImage}
            alt={anime.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="gradient-overlay absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 via-transparent to-dark-bg" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-end h-full pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={anime.id + "-content"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl"
            >
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-2 py-1 rounded text-xs font-bold bg-neon-purple text-white">
                  #{current + 1} Spotlight
                </span>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-neon-cyan/80 text-white">
                  {anime.quality}
                </span>
                <span className="px-2 py-1 rounded text-xs font-semibold bg-white/10 text-white">
                  {anime.audio}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-white/10 text-white">
                  <Star className="h-3 w-3 text-yellow-500" />
                  {anime.rating}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-white/10 text-white">
                  <Tv className="h-3 w-3" />
                  {anime.episodeCount} EP
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3 leading-tight">
                {anime.title}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 mb-6 line-clamp-3">
                {anime.synopsis}
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href={`/watch/${anime.id}?ep=1`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold transition-all glow-purple"
                >
                  <Play className="h-5 w-5" />
                  Watch Now
                </Link>
                <Link
                  href={`/anime/${anime.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all backdrop-blur-sm"
                >
                  <Plus className="h-5 w-5" />
                  Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-8 bg-neon-purple" : "w-4 bg-white/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
