"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Bookmark, Eye, Clock, CheckCircle2 } from "lucide-react";
import AnimeCard from "@/components/AnimeCard";
import { useWatchlist, type WatchlistItem } from "@/lib/useLocalStorage";
import { getAnimeById } from "@/lib/data";

const categories = [
  { key: "all" as const, label: "All", icon: Bookmark },
  { key: "watching" as const, label: "Watching", icon: Eye },
  { key: "plan-to-watch" as const, label: "Plan to Watch", icon: Clock },
  { key: "completed" as const, label: "Completed", icon: CheckCircle2 },
];

type CategoryKey = "all" | WatchlistItem["category"];

export default function WatchlistClient() {
  const { watchlist } = useWatchlist();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filteredList = useMemo(() => {
    const items = activeCategory === "all" ? watchlist : watchlist.filter((w) => w.category === activeCategory);
    return items
      .map((w) => ({ item: w, anime: getAnimeById(w.animeId) }))
      .filter((x) => x.anime !== undefined);
  }, [watchlist, activeCategory]);

  return (
    <div className="pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-6"
        >
          <Bookmark className="inline h-7 w-7 mr-2 text-neon-purple" />
          My Watchlist
        </motion.h1>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
          {categories.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === key
                  ? "bg-neon-purple text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {filteredList.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Your watchlist is empty</p>
            <p className="text-gray-500 text-sm mt-1">Add anime to your watchlist from the detail pages</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredList.map(({ anime }, i) => (
              <AnimeCard key={anime!.id} anime={anime!} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
