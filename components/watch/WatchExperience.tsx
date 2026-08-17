"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import ServerSelector from "./ServerSelector";
import EpisodeSelector from "./EpisodeSelector";
import GenrePill from "@/components/ui/GenrePill";
import AnimeGrid from "@/components/anime/AnimeGrid";
import { useContinueWatching } from "@/context/ContinueWatchingContext";
import { displayTitle, scoreToStars } from "@/lib/utils";
import type { AnimeDetail } from "@/lib/types";

export default function WatchExperience({
  anime,
  initialEpisode
}: {
  anime: AnimeDetail;
  initialEpisode: number;
}) {
  const router = useRouter();
  const title = displayTitle(anime);
  const { updateProgress, getProgress } = useContinueWatching();

  const [episodeNumber, setEpisodeNumber] = useState(initialEpisode);
  const [server, setServer] = useState("HD-1");
  const [audio, setAudio] = useState<"SUB" | "DUB">("SUB");
  const [autoplayNext, setAutoplayNext] = useState(true);

  const episode = useMemo(
    () => anime.episodeList.find((e) => e.number === episodeNumber) || anime.episodeList[0],
    [anime.episodeList, episodeNumber]
  );

  const hasNextEpisode = episodeNumber < anime.episodeList.length;

  function goToEpisode(num: number) {
    setEpisodeNumber(num);
    router.replace(`/watch/${anime.id}?ep=${num}`, { scroll: false });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 text-sm text-white/40">
        <Link href={`/anime/${anime.id}`} className="hover:text-neon-cyan">
          {title}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-white/70">Episode {episodeNumber}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          <VideoPlayer
            key={`${anime.id}-${episodeNumber}-${server}-${audio}`}
            episode={episode}
            startAtSec={getProgress(anime.id, episodeNumber)}
            autoplayNext={autoplayNext}
            onAutoplayNextChange={setAutoplayNext}
            onTimeUpdate={(cur, dur) =>
              updateProgress({
                id: anime.id,
                title,
                coverImage: anime.coverImage,
                episodeNumber,
                timestampSec: cur,
                durationSec: dur
              })
            }
            onEnded={() => {}}
            onNextEpisode={() => goToEpisode(episodeNumber + 1)}
            hasNextEpisode={hasNextEpisode}
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-xl font-bold text-white sm:text-2xl">
              {title} <span className="text-white/40">— Episode {episodeNumber}</span>
            </h1>
            <span className="flex items-center gap-1 text-sm font-semibold text-neon-cyan">
              <Star className="h-3.5 w-3.5 fill-neon-cyan" />
              {scoreToStars(anime.averageScore)}
            </span>
          </div>

          <div className="mt-4">
            <ServerSelector server={server} onServerChange={setServer} audio={audio} onAudioChange={setAudio} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {anime.genres.map((g) => (
              <GenrePill key={g} genre={g} />
            ))}
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60">{anime.description}</p>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/40">
            {anime.studios.length > 0 && <span>Studio: {anime.studios.join(", ")}</span>}
            {anime.season && anime.seasonYear && (
              <span>
                Season: {anime.season} {anime.seasonYear}
              </span>
            )}
          </div>
        </div>

        <EpisodeSelector
          animeId={anime.id}
          episodes={anime.episodeList}
          activeEpisode={episodeNumber}
          onSelect={goToEpisode}
        />
      </div>

      {anime.recommendations.length > 0 && (
        <div className="mt-4">
          <AnimeGrid title="Recommended For You" animeList={anime.recommendations} />
        </div>
      )}
    </div>
  );
}
