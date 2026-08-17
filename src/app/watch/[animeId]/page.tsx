import { notFound } from "next/navigation";
import { getAnimeById, getMostPopular, animeDatabase } from "@/lib/data";
import WatchClient from "./WatchClient";

interface PageProps {
  params: Promise<{ animeId: string }>;
}

export function generateStaticParams() {
  return animeDatabase.map((anime) => ({
    animeId: anime.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { animeId } = await params;
  const anime = getAnimeById(animeId);
  if (!anime) return { title: "Not Found" };
  return { title: `${anime.title} - AniStream` };
}

export default async function WatchPage({ params }: PageProps) {
  const { animeId } = await params;
  const anime = getAnimeById(animeId);
  if (!anime) notFound();

  const recommendations = getMostPopular().filter((a) => a.id !== anime.id).slice(0, 6);

  return <WatchClient anime={anime} recommendations={recommendations} />;
}
