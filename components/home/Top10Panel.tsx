"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { cx, displayTitle, scoreToStars } from "@/lib/utils";
import type { AnimeSummary } from "@/lib/types";

type Tab = "today" | "week" | "all";

const tabs: { key: Tab; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "week", label: "This Week" },
  { key: "all", label: "All Time" }
];

export default function Top10Panel({ animeList }: { animeList: AnimeSummary[] }) {
  const [tab, setTab] = useState<Tab>("today");

  // Deterministic re-shuffle per tab so switching tabs feels alive without new fetches.
  const seedOffset = tab === "today" ? 0 : tab === "week" ? 3 : 6;
  const ranked = [...animeList]
    .slice(0, 10)
    .map((a, i) => a)
    .sort((a, b) => ((a.id + seedOffset) % 10) - ((b.id + seedOffset) % 10));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass-panel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white">Top 10</h2>
          <div className="flex gap-1 rounded-full bg-black/30 p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cx(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  tab === t.key
                    ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                    : "text-white/50 hover:text-white"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ol className="divide-y divide-white/5">
          {ranked.map((anime, i) => (
            <li key={anime.id}>
              <Link
                href={`/anime/${anime.id}`}
                className="flex items-center gap-4 py-3 group"
              >
                <span
                  className={cx(
                    "font-display w-8 shrink-0 text-2xl font-bold",
                    i < 3 ? "text-transparent bg-clip-text bg-gradient-to-b from-neon-cyan to-neon-purple" : "text-white/25"
                  )}
                >
                  {i + 1}
                </span>
                <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-md bg-slate-panel">
                  {anime.coverImage && (
                    <Image src={anime.coverImage} alt={displayTitle(anime)} fill sizes="44px" className="object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white group-hover:text-neon-cyan transition-colors">
                    {displayTitle(anime)}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
                    <span className="flex items-center gap-1 text-neon-cyan">
                      <Star className="h-3 w-3 fill-neon-cyan" />
                      {scoreToStars(anime.averageScore)}
                    </span>
                    <span>{anime.format}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
