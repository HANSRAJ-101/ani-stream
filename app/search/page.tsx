import CategoryPage from "@/components/anime/CategoryPage";
import { searchAnime, fetchTrending } from "@/lib/anilist";

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string; genre?: string };
}) {
  const term = searchParams.q || searchParams.genre || "";
  const results = term ? await searchAnime(term, 24) : await fetchTrending(12);

  return (
    <CategoryPage
      title={term ? `Results for “${term}”` : "Browse"}
      subtitle={`${results.length} title${results.length === 1 ? "" : "s"} found`}
      animeList={results}
    />
  );
}
