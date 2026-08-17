import CategoryPage from "@/components/anime/CategoryPage";
import { fetchByCategory } from "@/lib/anilist";

export const revalidate = 1800;

export default async function TopAiringPage() {
  const airing = await fetchByCategory("top-airing", 24);
  return (
    <CategoryPage
      title="Top Airing"
      subtitle="Currently releasing series trending highest this season."
      animeList={airing}
    />
  );
}
