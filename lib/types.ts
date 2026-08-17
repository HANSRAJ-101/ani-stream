export type MediaFormat = "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC";
export type MediaStatus = "RELEASING" | "FINISHED" | "NOT_YET_RELEASED" | "CANCELLED";

export interface AnimeTitle {
  romaji: string;
  english: string | null;
  native: string | null;
}

export interface AnimeSummary {
  id: number;
  title: AnimeTitle;
  coverImage: string;
  bannerImage: string | null;
  averageScore: number | null;
  episodes: number | null;
  format: MediaFormat;
  status: MediaStatus;
  seasonYear: number | null;
  genres: string[];
  audio?: ("SUB" | "DUB")[];
}

export interface CharacterVA {
  characterName: string;
  characterImage: string;
  role: string;
  vaName: string;
  vaImage: string | null;
  vaLanguage: string;
}

export interface EpisodeMeta {
  number: number;
  title: string;
  thumbnail: string | null;
  durationSec: number;
  /** URL to an HLS (.m3u8) or MP4 source you have the rights to stream. */
  videoUrl: string | null;
  introStartSec?: number;
  introEndSec?: number;
  outroStartSec?: number;
}

export interface AnimeDetail extends AnimeSummary {
  description: string;
  studios: string[];
  season: string | null;
  trailerId: string | null;
  characters: CharacterVA[];
  episodeList: EpisodeMeta[];
  recommendations: AnimeSummary[];
}

export interface WatchlistEntry {
  id: number;
  title: string;
  coverImage: string;
  category: "watching" | "planned" | "completed";
  addedAt: number;
}

export interface ContinueWatchingEntry {
  id: number;
  title: string;
  coverImage: string;
  episodeNumber: number;
  timestampSec: number;
  durationSec: number;
  updatedAt: number;
}
