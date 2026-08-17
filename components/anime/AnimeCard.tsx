"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { displayTitle, scoreToStars } from "@/lib/utils";
import type { AnimeSummary } from "@/lib/types";

export default function AnimeCard({
  anime,
  rank
}: {
  anime: AnimeSummary;
  rank?: number;
}) {
  const title = displayTitle(anime);

  return (
    <Link href={`/anime/${anime.id}`} className="group block w-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-panel"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {anime.coverImage && (
            <Image
              src={anime.coverImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 16vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute left-2 top-2 flex flex-col gap-1">
            <Badge variant="cyan">HD</Badge>
            {anime.episodes && <Badge>{anime.episodes} EP</Badge>}
          </div>

          {rank && (
            <div className="absolute -left-1 -top-1 flex h-10 w-10 items-center justify-center">
              <span className="font-display text-3xl font-bold text-white/90 [text-shadow:_-1px_-1px_0_#6366f1,1px_-1px_0_#6366f1,-1px_1px_0_#6366f1,1px_1px_0_#6366f1]">
                {rank}
              </span>
            </div>
          )}

          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-semibold text-neon-cyan">
            <Star className="h-3 w-3 fill-neon-cyan" />
            {scoreToStars(anime.averageScore)}
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-white/10 p-3 backdrop-blur-md border border-white/20 shadow-neon-purple">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </div>
        </div>

        <div className="p-2.5">
          <p className="truncate text-sm font-semibold text-white group-hover:text-neon-cyan transition-colors">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
            <span>{anime.format}</span>
            {anime.seasonYear && (
              <>
                <span>·</span>
                <span>{anime.seasonYear}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
