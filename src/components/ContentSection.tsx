"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimeCard from "./AnimeCard";
import type { AnimeData } from "@/lib/data";

interface ContentSectionProps {
  title: string;
  animeList: AnimeData[];
  showRank?: boolean;
}

export default function ContentSection({ title, animeList, showRank = false }: ContentSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (animeList.length === 0) return null;

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
        >
          {animeList.map((anime, i) => (
            <div key={anime.id} className="flex-shrink-0 w-40 sm:w-48">
              <AnimeCard anime={anime} index={i} showRank={showRank} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
