import { notFound } from "next/navigation";
import { getAnimeById, getMostPopular, animeDatabase } from "@/lib/data";
import AnimeDetailClient from "./AnimeDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return animeDatabase.map((anime) => ({
    id: anime.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const anime = getAnimeById(id);
  if (!anime) return { title: "Not Found" };
  return { title: `${anime.title} - AniStream` };
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const anime = getAnimeById(id);
  if (!anime) notFound();
  const recommendations = getMostPopular().filter((a) => a.id !== anime.id).slice(0, 6);

  return <AnimeDetailClient anime={anime} recommendations={recommendations} />;
}
