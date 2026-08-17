"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import type { AnimeData } from "@/lib/data";

interface Top10PanelProps {
  animeList: AnimeData[];
}

const tabs = ["Today", "This Week", "All Time"] as const;

export default function Top10Panel({ animeList }: Top10PanelProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Today");

  // Simulate different orderings per tab
  const getList = () => {
    const sorted = [...animeList];
    if (activeTab === "This Week") sorted.reverse();
    if (activeTab === "All Time") sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return sorted.slice(0, 10);
  };

  const list = getList();

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Top 10</h2>
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-neon-purple text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {list.map((anime, i) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/anime/${anime.id}`}
                className="flex items-center gap-4 p-3 rounded-xl glass hover:bg-white/10 transition-all group"
              >
                {/* Rank */}
                <span
                  className={`text-3xl font-black w-10 text-center shrink-0 ${
                    i < 3 ? "text-neon-purple" : "text-gray-600"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Thumbnail */}
                <img
                  src={anime.coverImage}
                  alt={anime.title}
                  className="w-12 h-16 rounded-lg object-cover shrink-0"
                  loading="lazy"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-neon-purple transition-colors">
                    {anime.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {anime.rating}
                    </span>
                    <span>{anime.type}</span>
                    <span>EP {anime.episodeCount}</span>
                  </div>
                </div>

                {/* Play */}
                <div className="p-2 rounded-full bg-neon-purple/10 text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Play className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
