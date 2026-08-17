"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Plus, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useWatchlist } from "@/context/WatchlistContext";
import { displayTitle, scoreToStars } from "@/lib/utils";
import type { AnimeSummary } from "@/lib/types";

const AUTO_ADVANCE_MS = 7000;

export default function HeroBanner({ items }: { items: AnimeSummary[] }) {
  const [index, setIndex] = useState(0);
  const { isSaved, add, remove } = useWatchlist();

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(advance, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [advance, items.length]);

  if (items.length === 0) return null;
  const anime = items[index];
  const title = displayTitle(anime);
  const saved = isSaved(anime.id);

  return (
    <section className="relative h-[68vh] min-h-[440px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={anime.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {anime.bannerImage && (
            <Image
              src={anime.bannerImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div
          key={`content-${anime.id}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-xl"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="cyan">HD</Badge>
            <Badge variant="purple">SUB · DUB</Badge>
            {anime.episodes && <Badge>{anime.episodes} Episodes</Badge>}
            <span className="flex items-center gap-1 text-sm font-semibold text-neon-cyan">
              <Star className="h-3.5 w-3.5 fill-neon-cyan" />
              {scoreToStars(anime.averageScore)}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>

          {anime.genres.length > 0 && (
            <p className="mt-3 text-sm text-white/50">{anime.genres.slice(0, 4).join(" · ")}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/watch/${anime.id}?ep=1`}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-2.5 text-sm font-semibold text-white shadow-neon-purple transition-transform hover:scale-105"
            >
              <Play className="h-4 w-4 fill-white" />
              Watch Now
            </Link>
            <button
              onClick={() =>
                saved
                  ? remove(anime.id)
                  : add({
                      id: anime.id,
                      title,
                      coverImage: anime.coverImage,
                      category: "planned"
                    })
              }
              className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-white hover:shadow-neon-cyan transition-shadow"
            >
              <Plus className="h-4 w-4" />
              {saved ? "In My List" : "Add to List"}
            </button>
          </div>
        </motion.div>

        {items.length > 1 && (
          <div className="mt-8 flex gap-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-neon-cyan shadow-neon-cyan" : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
