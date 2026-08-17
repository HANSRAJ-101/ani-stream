export interface AnimeData {
  id: string;
  title: string;
  coverImage: string;
  bannerImage: string;
  genres: string[];
  synopsis: string;
  rating: string;
  year: number;
  status: string;
  type: string;
  studio: string;
  season: string;
  quality: string;
  audio: string;
  episodeCount: number;
  episodes: EpisodeData[];
  popularity: number;
  trending: boolean;
  topAiring: boolean;
}

export interface EpisodeData {
  number: number;
  title: string;
  src: string;
  type: "iframe";
  thumbnail?: string;
}

const withYouEpisodes: EpisodeData[] = [
  { number: 1, title: "Episode 01", src: "https://bysedikamoum.com/e/tpjw6o5pkw13", type: "iframe" },
  { number: 2, title: "Episode 02", src: "https://bysedikamoum.com/e/cb1lun3gc948", type: "iframe" },
  { number: 3, title: "Episode 03", src: "https://bysedikamoum.com/e/t4ixc5fk4v4d", type: "iframe" },
  { number: 4, title: "Episode 04", src: "https://bysedikamoum.com/e/0yigez5wad7a", type: "iframe" },
  { number: 5, title: "Episode 05", src: "https://bysedikamoum.com/e/jynuch9515bp", type: "iframe" },
  { number: 6, title: "Episode 06", src: "https://bysedikamoum.com/e/6tpfswrv22aw", type: "iframe" },
  { number: 7, title: "Episode 07", src: "https://bysedikamoum.com/e/78d0exhnct1x", type: "iframe" },
  { number: 8, title: "Episode 08", src: "https://bysedikamoum.com/e/qed2t7t5zdwl", type: "iframe" },
  { number: 9, title: "Episode 09", src: "https://bysedikamoum.com/e/8fpbykp8d3js", type: "iframe" },
  { number: 10, title: "Episode 10", src: "https://bysedikamoum.com/e/3uzepi5v0jyc", type: "iframe" },
  { number: 11, title: "Episode 11", src: "https://bysedikamoum.com/e/r3037sub2kof", type: "iframe" },
  { number: 12, title: "Episode 12", src: "https://bysedikamoum.com/e/geuixckic83r", type: "iframe" },
];

export const animeDatabase: AnimeData[] = [
  {
    id: "with-you-our-love",
    title: "With You Our Love Will Make It Through",
    coverImage: "https://image.tmdb.org/t/p/w500/uQb3NkDWEXQ9m1w49PzEy04uFn1.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/uQb3NkDWEXQ9m1w49PzEy04uFn1.jpg",
    genres: ["Animation", "Sci-Fi & Fantasy", "Drama"],
    synopsis: "When high schooler Mari runs late for school, she never expects to fall for Tsunagu—a gentle, sensitive, beastfolk! In a world where beastfolk are segregated behind walls, Mari and Tsunagu show their differences are truly bridges. Can their love overcome the divide between beastfolk and humanity?",
    rating: "8.2",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "MAPPA",
    season: "Season 1",
    quality: "HD",
    audio: "Sub",
    episodeCount: 12,
    episodes: withYouEpisodes,
    popularity: 95,
    trending: true,
    topAiring: true,
  },
  {
    id: "solo-leveling-s2",
    title: "Solo Leveling: Arise from the Shadow",
    coverImage: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    genres: ["Action", "Adventure", "Fantasy"],
    synopsis: "In a world where hunters — human warriors who possess supernatural abilities — must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.",
    rating: "9.1",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "A-1 Pictures",
    season: "Season 2",
    quality: "HD",
    audio: "Sub/Dub",
    episodeCount: 13,
    episodes: Array.from({ length: 13 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/tpjw6o5pkw13",
      type: "iframe" as const,
    })),
    popularity: 99,
    trending: true,
    topAiring: true,
  },
  {
    id: "demon-slayer-infinity",
    title: "Demon Slayer: Infinity Castle Arc",
    coverImage: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    genres: ["Action", "Supernatural", "Historical"],
    synopsis: "Tanjiro and his comrades launch a final assault on Muzan Kibutsuji's Infinity Castle. With all Hashira united, the battle to end all demons begins in this breathtaking climax of the series.",
    rating: "9.3",
    year: 2025,
    status: "Completed",
    type: "Movie",
    studio: "ufotable",
    season: "Movie",
    quality: "4K",
    audio: "Sub/Dub",
    episodeCount: 1,
    episodes: [{
      number: 1,
      title: "Full Movie",
      src: "https://bysedikamoum.com/e/cb1lun3gc948",
      type: "iframe" as const,
    }],
    popularity: 98,
    trending: true,
    topAiring: false,
  },
  {
    id: "jujutsu-kaisen-s3",
    title: "Jujutsu Kaisen: Shinjuku Showdown",
    coverImage: "https://image.tmdb.org/t/p/w500/hFnIBnMfu5a4kB4JyzFDB4bxOcN.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/hFnIBnMfu5a4kB4JyzFDB4bxOcN.jpg",
    genres: ["Action", "Supernatural", "School"],
    synopsis: "The Shinjuku Showdown arc pits the strongest sorcerers against the King of Curses, Ryomen Sukuna. With the fate of the jujutsu world hanging by a thread, Yuji Itadori and his allies must push beyond their limits.",
    rating: "8.9",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "MAPPA",
    season: "Season 3",
    quality: "HD",
    audio: "Sub",
    episodeCount: 24,
    episodes: Array.from({ length: 24 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/t4ixc5fk4v4d",
      type: "iframe" as const,
    })),
    popularity: 97,
    trending: true,
    topAiring: true,
  },
  {
    id: "one-piece-egghead",
    title: "One Piece: Egghead Island",
    coverImage: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAELHeY8WFoEEBr.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAELHeY8WFoEEBr.jpg",
    genres: ["Action", "Adventure", "Comedy"],
    synopsis: "The Straw Hat Pirates arrive at Egghead, the island of the future, where they encounter the genius scientist Dr. Vegapunk. But the World Government has other plans, sending a massive fleet to destroy the island and everyone on it.",
    rating: "8.7",
    year: 2024,
    status: "Airing",
    type: "TV",
    studio: "Toei Animation",
    season: "Egghead Arc",
    quality: "HD",
    audio: "Sub/Dub",
    episodeCount: 50,
    episodes: Array.from({ length: 50 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/0yigez5wad7a",
      type: "iframe" as const,
    })),
    popularity: 96,
    trending: true,
    topAiring: true,
  },
  {
    id: "attack-on-titan-final",
    title: "Attack on Titan: The Final Season",
    coverImage: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    genres: ["Action", "Drama", "Military"],
    synopsis: "As the war between Paradis and Marley reaches its climax, Eren Yeager's ultimate plan threatens to reshape the entire world. The Survey Corps must make impossible choices in this epic conclusion.",
    rating: "9.5",
    year: 2024,
    status: "Completed",
    type: "TV",
    studio: "MAPPA",
    season: "Final Season",
    quality: "4K",
    audio: "Sub/Dub",
    episodeCount: 16,
    episodes: Array.from({ length: 16 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/jynuch9515bp",
      type: "iframe" as const,
    })),
    popularity: 94,
    trending: false,
    topAiring: false,
  },
  {
    id: "spy-x-family-s3",
    title: "SPY×FAMILY Season 3",
    coverImage: "https://image.tmdb.org/t/p/w500/3r4LYFnRKBnVIJEMEMKLMOnyxqp.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/3r4LYFnRKBnVIJEMEMKLMOnyxqp.jpg",
    genres: ["Action", "Comedy", "Slice of Life"],
    synopsis: "The Forger family continues their mission: Loid as a spy, Yor as an assassin, and Anya reading minds — all while maintaining their fake family facade. New challenges arise as Operation Strix enters a critical phase.",
    rating: "8.6",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "WIT Studio",
    season: "Season 3",
    quality: "HD",
    audio: "Sub/Dub",
    episodeCount: 25,
    episodes: Array.from({ length: 25 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/6tpfswrv22aw",
      type: "iframe" as const,
    })),
    popularity: 90,
    trending: true,
    topAiring: true,
  },
  {
    id: "chainsaw-man-s2",
    title: "Chainsaw Man Season 2",
    coverImage: "https://image.tmdb.org/t/p/w500/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/yVtx7Xn9UxNJqvG2BkvhCcmed9S.jpg",
    genres: ["Action", "Horror", "Supernatural"],
    synopsis: "Denji continues his life as a devil hunter while new threats emerge. The Academy Saga begins as War Devil Yoru and her host Asa Mitaka become entangled in Denji's chaotic world.",
    rating: "8.8",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "MAPPA",
    season: "Season 2",
    quality: "HD",
    audio: "Sub",
    episodeCount: 12,
    episodes: Array.from({ length: 12 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/78d0exhnct1x",
      type: "iframe" as const,
    })),
    popularity: 92,
    trending: true,
    topAiring: true,
  },
  {
    id: "blue-lock-s2",
    title: "Blue Lock Season 2",
    coverImage: "https://image.tmdb.org/t/p/w500/aHSEHhWmGmyL6pizfIEMbSzxYlN.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/aHSEHhWmGmyL6pizfIEMbSzxYlN.jpg",
    genres: ["Sports", "Drama", "Shounen"],
    synopsis: "The Blue Lock project intensifies as the remaining strikers face off against the world's best in the Neo Egoist League. Isagi must evolve his spatial awareness to survive.",
    rating: "8.4",
    year: 2025,
    status: "Airing",
    type: "TV",
    studio: "8bit",
    season: "Season 2",
    quality: "HD",
    audio: "Sub/Dub",
    episodeCount: 14,
    episodes: Array.from({ length: 14 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/qed2t7t5zdwl",
      type: "iframe" as const,
    })),
    popularity: 88,
    trending: false,
    topAiring: true,
  },
  {
    id: "my-hero-academia-final",
    title: "My Hero Academia: Final War",
    coverImage: "https://image.tmdb.org/t/p/w500/ivOLM47yJt90P19RH1NvJrAJz9F.jpg",
    bannerImage: "https://image.tmdb.org/t/p/w500/ivOLM47yJt90P19RH1NvJrAJz9F.jpg",
    genres: ["Action", "Superhero", "Shounen"],
    synopsis: "The heroes launch their final assault against All For One and Shigaraki. Deku must prove that the power of One For All can save everyone, even those who have fallen into darkness.",
    rating: "8.5",
    year: 2025,
    status: "Completed",
    type: "TV",
    studio: "Bones",
    season: "Season 7",
    quality: "HD",
    audio: "Sub/Dub",
    episodeCount: 21,
    episodes: Array.from({ length: 21 }, (_, i) => ({
      number: i + 1,
      title: `Episode ${String(i + 1).padStart(2, "0")}`,
      src: "https://bysedikamoum.com/e/8fpbykp8d3js",
      type: "iframe" as const,
    })),
    popularity: 85,
    trending: false,
    topAiring: false,
  },
];

export function getAnimeById(id: string): AnimeData | undefined {
  return animeDatabase.find((a) => a.id === id);
}

export function getTrending(): AnimeData[] {
  return animeDatabase.filter((a) => a.trending).sort((a, b) => b.popularity - a.popularity);
}

export function getTopAiring(): AnimeData[] {
  return animeDatabase.filter((a) => a.topAiring).sort((a, b) => b.popularity - a.popularity);
}

export function getMostPopular(): AnimeData[] {
  return [...animeDatabase].sort((a, b) => b.popularity - a.popularity);
}

export function getLatestEpisodes(): AnimeData[] {
  return animeDatabase.filter((a) => a.status === "Airing").sort((a, b) => b.popularity - a.popularity);
}

export function getMovies(): AnimeData[] {
  return animeDatabase.filter((a) => a.type === "Movie");
}

export function getTVSeries(): AnimeData[] {
  return animeDatabase.filter((a) => a.type === "TV");
}

export function searchAnime(query: string): AnimeData[] {
  const q = query.toLowerCase();
  return animeDatabase.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.genres.some((g) => g.toLowerCase().includes(q)) ||
      a.synopsis.toLowerCase().includes(q)
  );
}
