import CategoryPage from "@/components/anime/CategoryPage";
import { fetchByCategory } from "@/lib/anilist";

export const revalidate = 1800;

export default async function PopularPage() {
  const popular = await fetchByCategory("popular", 24);
  return (
    <CategoryPage
      title="Most Popular"
      subtitle="The most-watched anime across the community right now."
      animeList={popular}
    />
  );
}
