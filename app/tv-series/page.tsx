import CategoryPage from "@/components/anime/CategoryPage";
import { fetchByCategory } from "@/lib/anilist";

export const revalidate = 1800;

export default async function TvSeriesPage() {
  const series = await fetchByCategory("tv", 24);
  return (
    <CategoryPage
      title="TV Series"
      subtitle="Ongoing and completed television anime, sorted by popularity."
      animeList={series}
    />
  );
}
