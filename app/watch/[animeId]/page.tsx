import { fetchAnimeDetail } from "@/lib/anilist";
import WatchExperience from "@/components/watch/WatchExperience";

export const revalidate = 1800;

export default async function WatchPage({
  params,
  searchParams
}: {
  params: { animeId: string };
  searchParams: { ep?: string };
}) {
  const anime = await fetchAnimeDetail(Number(params.animeId));
  const initialEpisode = Math.min(
    Math.max(1, Number(searchParams.ep) || 1),
    anime.episodeList.length || 1
  );

  return <WatchExperience anime={anime} initialEpisode={initialEpisode} />;
}
