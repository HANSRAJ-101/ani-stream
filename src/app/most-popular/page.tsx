import { getMostPopular } from "@/lib/data";
import AnimeGridPage from "@/components/AnimeGridPage";

export const metadata = { title: "Most Popular - AniStream" };

export default function MostPopularPage() {
  const popular = getMostPopular();
  return <AnimeGridPage title="🏆 Most Popular" animeList={popular} />;
}
