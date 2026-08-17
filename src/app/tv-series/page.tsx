import { getTVSeries } from "@/lib/data";
import AnimeGridPage from "@/components/AnimeGridPage";

export const metadata = { title: "TV Series - AniStream" };

export default function TVSeriesPage() {
  const series = getTVSeries();
  return <AnimeGridPage title="📺 TV Series" animeList={series} />;
}
