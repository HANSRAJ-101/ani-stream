import { getMovies } from "@/lib/data";
import AnimeGridPage from "@/components/AnimeGridPage";

export const metadata = { title: "Movies - AniStream" };

export default function MoviesPage() {
  const movies = getMovies();
  return <AnimeGridPage title="🎬 Movies" animeList={movies} />;
}
