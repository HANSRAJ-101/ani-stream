import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AnimeCard from "./AnimeCard";
import AnimeCardSkeleton from "./AnimeCardSkeleton";
import type { AnimeSummary } from "@/lib/types";

export default function AnimeGrid({
  title,
  animeList,
  viewAllHref,
  loading = false,
  ranked = false
}: {
  title: string;
  animeList: AnimeSummary[];
  viewAllHref?: string;
  loading?: boolean;
  ranked?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            {title}
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan align-middle shadow-neon-cyan" />
          </h2>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1 text-sm text-white/50 hover:text-neon-cyan transition-colors"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <AnimeCardSkeleton key={i} />)
          : animeList.map((anime, i) => (
              <AnimeCard key={anime.id} anime={anime} rank={ranked ? i + 1 : undefined} />
            ))}
      </div>
    </section>
  );
}
