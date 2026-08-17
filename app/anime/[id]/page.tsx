import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";
import { fetchAnimeDetail } from "@/lib/anilist";
import { displayTitle, scoreToStars } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import GenrePill from "@/components/ui/GenrePill";
import AddToListButton from "@/components/anime/AddToListButton";
import TrailerModal from "@/components/anime/TrailerModal";
import CharacterGrid from "@/components/anime/CharacterGrid";
import EpisodePreviewGrid from "@/components/anime/EpisodePreviewGrid";
import AnimeGrid from "@/components/anime/AnimeGrid";

export const revalidate = 1800;

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  const anime = await fetchAnimeDetail(Number(params.id));
  const title = displayTitle(anime);

  return (
    <div>
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        {anime.bannerImage && (
          <Image src={anime.bannerImage} alt={title} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/20" />
      </section>

      <div className="mx-auto max-w-7xl px-4 -mt-28 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="relative mx-auto h-64 w-44 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-neon-purple sm:mx-0">
            {anime.coverImage && (
              <Image src={anime.coverImage} alt={title} fill sizes="176px" className="object-cover" />
            )}
          </div>

          <div className="flex-1 pt-2">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="cyan">HD</Badge>
              <Badge variant="purple">SUB · DUB</Badge>
              {anime.episodes && <Badge>{anime.episodes} EP</Badge>}
              <span className="flex items-center gap-1 text-sm font-semibold text-neon-cyan">
                <Star className="h-3.5 w-3.5 fill-neon-cyan" />
                {scoreToStars(anime.averageScore)}
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <GenrePill key={g} genre={g} />
              ))}
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{anime.description}</p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/40">
              {anime.studios.length > 0 && <span>Studio: {anime.studios.join(", ")}</span>}
              {anime.season && anime.seasonYear && (
                <span>
                  Season: {anime.season} {anime.seasonYear}
                </span>
              )}
              <span>Status: {anime.status.replace("_", " ")}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/watch/${anime.id}?ep=1`}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-2.5 text-sm font-semibold text-white shadow-neon-purple transition-transform hover:scale-105"
              >
                <Play className="h-4 w-4 fill-white" />
                Watch Now
              </Link>
              <AddToListButton anime={anime} title={title} />
              <TrailerModal trailerId={anime.trailerId} />
            </div>
          </div>
        </div>

        {anime.characters.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-xl font-bold text-white">Characters &amp; Voice Actors</h2>
            <CharacterGrid characters={anime.characters} />
          </section>
        )}

        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-white">Episodes</h2>
          <EpisodePreviewGrid animeId={anime.id} episodes={anime.episodeList} />
        </section>
      </div>

      {anime.recommendations.length > 0 && (
        <AnimeGrid title="You Might Also Like" animeList={anime.recommendations} />
      )}
    </div>
  );
}
