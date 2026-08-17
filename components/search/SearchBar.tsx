"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchAnime } from "@/lib/anilist";
import { displayTitle, scoreToStars } from "@/lib/utils";
import type { AnimeSummary } from "@/lib/types";

export default function SearchBar({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeSummary[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    searchAnime(debouncedQuery).then((data) => {
      if (!cancelled) {
        setResults(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search anime, movies..."
          className="w-full glass rounded-full py-2 pl-9 pr-9 text-sm text-white placeholder:text-white/40 focus-ring"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {open && (loading || results.length > 0) && (
        <div className="absolute mt-2 w-full glass-panel shadow-neon-purple overflow-hidden z-50">
          {loading && (
            <div className="p-4 text-sm text-white/50">Searching…</div>
          )}
          {!loading &&
            results.map((anime) => (
              <Link
                key={anime.id}
                href={`/anime/${anime.id}`}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
              >
                <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-slate-panel">
                  {anime.coverImage && (
                    <Image
                      src={anime.coverImage}
                      alt={displayTitle(anime)}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{displayTitle(anime)}</p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-white/50">
                    <span className="flex items-center gap-1 text-neon-cyan">
                      <Star className="h-3 w-3 fill-neon-cyan" />
                      {scoreToStars(anime.averageScore)}
                    </span>
                    {anime.seasonYear && <span>{anime.seasonYear}</span>}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
