import { getTopAiring } from "@/lib/data";
import AnimeGridPage from "@/components/AnimeGridPage";

export const metadata = { title: "Top Airing - AniStream" };

export default function TopAiringPage() {
  const airing = getTopAiring();
  return <AnimeGridPage title="⚡ Top Airing" animeList={airing} />;
}
