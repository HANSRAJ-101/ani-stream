import type { AnimeDetail, AnimeSummary } from "./types";

/**
 * ---------------------------------------------------------------------------
 * VIDEO_SOURCE_MAP
 * ---------------------------------------------------------------------------
 * This app never fetches or proxies third-party/pirated streams. Instead you
 * plug in URLs to video you have the rights to serve: self-hosted MP4/HLS
 * files, a licensed partner CDN, or a signed URL from your own backend.
 *
 * Shape: { [anilistId]: { [episodeNumber]: "https://.../master.m3u8" } }
 * Anything not listed here falls back to the public HLS.js demo stream so
 * the player UI is fully testable out of the box.
 * ---------------------------------------------------------------------------
 */
export const VIDEO_SOURCE_MAP: Record<number, Record<number, string>> = {
  // Example:
  // 21: { 1: "https://cdn.yourdomain.com/one-piece/ep1/master.m3u8" },
};

const DEMO_HLS_STREAM =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

export function getMockVideoUrl(animeId: number, episodeNumber: number): string {
  return VIDEO_SOURCE_MAP[animeId]?.[episodeNumber] || DEMO_HLS_STREAM;
}

const genrePool = ["Action", "Adventure", "Fantasy", "Drama", "Sci-Fi", "Romance", "Comedy"];

function summary(id: number, title: string, score: number, episodes: number, year: number): AnimeSummary {
  return {
    id,
    title: { romaji: title, english: title, native: null },
    coverImage: `https://picsum.photos/seed/anime-cover-${id}/400/560`,
    bannerImage: `https://picsum.photos/seed/anime-banner-${id}/1600/500`,
    averageScore: score,
    episodes,
    format: "TV",
    status: "RELEASING",
    seasonYear: year,
    genres: genrePool.slice(id % 3, (id % 3) + 3),
    audio: ["SUB", "DUB"]
  };
}

export const MOCK_TRENDING: AnimeSummary[] = [
  summary(1, "Ember Requiem", 91, 24, 2025),
  summary(2, "Void Chronicles", 88, 12, 2025),
  summary(3, "Skybound Alchemist", 85, 24, 2024),
  summary(4, "Neon Ronin", 94, 12, 2026),
  summary(5, "Last Star Cartographer", 87, 13, 2025),
  summary(6, "Iron Lily", 82, 24, 2024),
  summary(7, "Fracture Point", 90, 12, 2026),
  summary(8, "Wraithbound", 79, 26, 2023),
  summary(9, "Glasswing", 93, 12, 2026),
  summary(10, "Hollow Meridian", 84, 24, 2025),
  summary(11, "Cindershade", 86, 12, 2025),
  summary(12, "Paper Moon Requiem", 89, 24, 2024)
];

export const MOCK_DETAIL: AnimeDetail = {
  ...summary(1, "Ember Requiem", 91, 24, 2025),
  description:
    "In a fractured empire where memory can be traded like currency, a disgraced cartographer stumbles onto a conspiracy that reaches the throne itself. As alliances shift and old debts come due, she must decide what pieces of herself she is willing to sell to see the truth.",
  studios: ["Northlight Studio"],
  season: "WINTER",
  trailerId: null,
  characters: [
    {
      characterName: "Rei Asakawa",
      characterImage: "https://picsum.photos/seed/char-1/200/280",
      role: "MAIN",
      vaName: "Miyu Tomita",
      vaImage: "https://picsum.photos/seed/va-1/200/280",
      vaLanguage: "Japanese"
    },
    {
      characterName: "Kestrel Vane",
      characterImage: "https://picsum.photos/seed/char-2/200/280",
      role: "MAIN",
      vaName: "Yuichi Nakamura",
      vaImage: "https://picsum.photos/seed/va-2/200/280",
      vaLanguage: "Japanese"
    }
  ],
<<<<<<< HEAD
  episodeList: Array.from({ length: 24 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/ep-${i + 1}/400/225`,
    durationSec: 1440,
    videoUrl: getMockVideoUrl(1, i + 1),
    introStartSec: 0,
    introEndSec: 85,
    outroStartSec: 1350
  })),
  recommendations: MOCK_TRENDING.slice(1, 7)
};
=======
  episodeList: [
    {
      number: 1,
      title: "Movie",
      thumbnail: "https://image.tmdb.org/t/p/w500/pHyxb2RV5wLlboAwm9ZJ9qTVEDw.jpg",
      durationSec: 6000,
      videoUrl: getMockVideoUrl(5, 1),
      introStartSec: 0,
      introEndSec: 90,
      outroStartSec: 5800
    }
  ],
  recommendations: MOCK_TRENDING.slice(9, 15) // Recommends titles like Demon Slayer and JJK
}; 
>>>>>>> 7662dc2f2aa365686fc8e3b9098a5b6036407f29
