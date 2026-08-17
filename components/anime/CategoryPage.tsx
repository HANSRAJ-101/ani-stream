import AnimeGrid from "./AnimeGrid";
import type { AnimeSummary } from "@/lib/types";

export default function CategoryPage({
  title,
  subtitle,
  animeList
}: {
  title: string;
  subtitle: string;
  animeList: AnimeSummary[];
}) {
  return (
    <div>
      <div className="border-b border-white/10 bg-grid-fade">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-white/50">{subtitle}</p>
        </div>
      </div>
      <AnimeGrid title="" animeList={animeList} />
    </div>
  );
}
