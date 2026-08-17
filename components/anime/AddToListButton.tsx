"use client";

import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { useWatchlist } from "@/context/WatchlistContext";
import { cx } from "@/lib/utils";
import type { AnimeSummary, WatchlistEntry } from "@/lib/types";

const categories: { key: WatchlistEntry["category"]; label: string }[] = [
  { key: "watching", label: "Watching" },
  { key: "planned", label: "Plan to Watch" },
  { key: "completed", label: "Completed" }
];

export default function AddToListButton({ anime, title }: { anime: AnimeSummary; title: string }) {
  const { isSaved, add, remove, setCategory, entries } = useWatchlist();
  const [open, setOpen] = useState(false);
  const saved = isSaved(anime.id);
  const current = entries.find((e) => e.id === anime.id);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-shadow",
          saved
            ? "glass text-neon-cyan shadow-neon-cyan"
            : "glass text-white hover:shadow-neon-purple"
        )}
      >
        {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {saved ? current?.category.replace(/^\w/, (c) => c.toUpperCase()) : "Add to List"}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-lg border border-white/10 bg-void shadow-neon-purple">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                if (saved) setCategory(anime.id, c.key);
                else
                  add({
                    id: anime.id,
                    title,
                    coverImage: anime.coverImage,
                    category: c.key
                  });
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-white/80 hover:bg-white/5"
            >
              {c.label}
              {current?.category === c.key && <Check className="h-3.5 w-3.5 text-neon-cyan" />}
            </button>
          ))}
          {saved && (
            <button
              onClick={() => {
                remove(anime.id);
                setOpen(false);
              }}
              className="w-full border-t border-white/10 px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5"
            >
              Remove from list
            </button>
          )}
        </div>
      )}
    </div>
  );
}
