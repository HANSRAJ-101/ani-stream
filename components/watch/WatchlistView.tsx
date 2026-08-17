"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, Trash2 } from "lucide-react";
import { cx, formatDuration } from "@/lib/utils";
import { useWatchlist } from "@/context/WatchlistContext";
import { useContinueWatching } from "@/context/ContinueWatchingContext";
import type { WatchlistEntry } from "@/lib/types";

const tabs: { key: "continue" | WatchlistEntry["category"]; label: string }[] = [
  { key: "continue", label: "Continue Watching" },
  { key: "watching", label: "Watching" },
  { key: "planned", label: "Plan to Watch" },
  { key: "completed", label: "Completed" }
];

const VALID_TAB_KEYS = tabs.map((t) => t.key);

function resolveInitialTab(param: string | null): (typeof tabs)[number]["key"] {
  if (param && (VALID_TAB_KEYS as string[]).includes(param)) {
    return param as (typeof tabs)[number]["key"];
  }
  return "continue";
}

export default function WatchlistView() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>(() =>
    resolveInitialTab(searchParams.get("tab"))
  );

  const { byCategory, remove: removeFromList } = useWatchlist();
  const { entries: continueEntries, remove: removeProgress } = useContinueWatching();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-white">My List</h1>

      <div className="mt-5 flex flex-wrap gap-1 rounded-full bg-black/30 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cx(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.key
                ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                : "text-white/50 hover:text-white"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "continue" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {continueEntries.length === 0 && <EmptyState label="Nothing in progress yet." />}
            {continueEntries.map((e) => (
              <div key={e.id} className="glass-panel overflow-hidden group relative">
                <Link href={`/watch/${e.id}?ep=${e.episodeNumber}`}>
                  <div className="relative aspect-[2/3] w-full">
                    {e.coverImage && (
                      <Image src={e.coverImage} alt={e.title} fill sizes="200px" className="object-cover" />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                      <div
                        className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                        style={{ width: `${Math.min(100, (e.timestampSec / e.durationSec) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="truncate text-sm font-semibold text-white">{e.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                      <Clock className="h-3 w-3" />
                      EP {e.episodeNumber} · {formatDuration(e.timestampSec)} / {formatDuration(e.durationSec)}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeProgress(e.id)}
                  aria-label="Remove from continue watching"
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white/70 opacity-0 hover:text-red-400 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {tab !== "continue" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {byCategory(tab).length === 0 && <EmptyState label="No titles saved to this list yet." />}
            {byCategory(tab).map((e) => (
              <div key={e.id} className="glass-panel overflow-hidden group relative">
                <Link href={`/anime/${e.id}`}>
                  <div className="relative aspect-[2/3] w-full">
                    {e.coverImage && (
                      <Image src={e.coverImage} alt={e.title} fill sizes="200px" className="object-cover" />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="truncate text-sm font-semibold text-white">{e.title}</p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromList(e.id)}
                  aria-label="Remove from list"
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white/70 opacity-0 hover:text-red-400 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-16 text-center">
      <p className="text-sm text-white/40">{label}</p>
    </div>
  );
}
