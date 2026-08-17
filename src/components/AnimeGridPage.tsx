"use client";

import { motion } from "framer-motion";
import AnimeCard from "./AnimeCard";
import type { AnimeData } from "@/lib/data";

interface AnimeGridPageProps {
  title: string;
  animeList: AnimeData[];
  emptyMessage?: string;
}

export default function AnimeGridPage({ title, animeList, emptyMessage = "No anime found." }: AnimeGridPageProps) {
  return (
    <div className="pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8"
        >
          {title}
        </motion.h1>

        {animeList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{emptyMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime, i) => (
              <AnimeCard key={anime.id} anime={anime} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
