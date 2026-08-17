import HeroBanner from "@/components/home/HeroBanner";
import Top10Panel from "@/components/home/Top10Panel";
import AnimeGrid from "@/components/anime/AnimeGrid";
import { fetchByCategory, fetchTrending } from "@/lib/anilist";

export const revalidate = 1800;

export default async function HomePage() {
  const [trending, latest, topAiring, popular] = await Promise.all([
    fetchTrending(8),
    fetchByCategory("latest", 12),
    fetchByCategory("top-airing", 12),
    fetchByCategory("popular", 12)
  ]);

  return (
    <div>
      <HeroBanner items={trending} />
      <AnimeGrid title="Trending Now" animeList={trending} viewAllHref="/top-airing" />
      <AnimeGrid title="Latest Episodes" animeList={latest} viewAllHref="/tv-series" />
      <Top10Panel animeList={popular} />
      <AnimeGrid title="Top Airing" animeList={topAiring} viewAllHref="/top-airing" />
      <AnimeGrid title="Most Popular" animeList={popular} viewAllHref="/popular" />
    </div>
  );
}
