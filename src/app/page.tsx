import HeroBanner from "@/components/HeroBanner";
import ContentSection from "@/components/ContentSection";
import Top10Panel from "@/components/Top10Panel";
import { getTrending, getTopAiring, getMostPopular, getLatestEpisodes } from "@/lib/data";

export default function HomePage() {
  const trending = getTrending();
  const topAiring = getTopAiring();
  const mostPopular = getMostPopular();
  const latestEpisodes = getLatestEpisodes();

  return (
    <div>
      <HeroBanner animeList={trending} />
      <ContentSection title="🔥 Trending Now" animeList={trending} />
      <ContentSection title="📺 Latest Episodes" animeList={latestEpisodes} />
      <ContentSection title="⚡ Top Airing" animeList={topAiring} />
      <Top10Panel animeList={mostPopular} />
      <ContentSection title="🏆 Most Popular" animeList={mostPopular} showRank />
    </div>
  );
}
