import CategoryPage from "@/components/anime/CategoryPage";
import { fetchByCategory } from "@/lib/anilist";

export const revalidate = 1800;

export default async function MoviesPage() {
  const movies = await fetchByCategory("movies", 24);
  return (
    <CategoryPage
      title="Movies"
      subtitle="Feature-length anime films, from classics to the newest theatrical releases."
      animeList={movies}
    />
  );
}
