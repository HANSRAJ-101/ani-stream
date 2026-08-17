import { GraphQLClient, gql } from "graphql-request";
import type { AnimeDetail, AnimeSummary, CharacterVA, MediaFormat, MediaStatus } from "./types";
import { MOCK_TRENDING, MOCK_DETAIL, getMockVideoUrl } from "./mock-data";

const ANILIST_ENDPOINT = "https://graphql.anilist.co";
const client = new GraphQLClient(ANILIST_ENDPOINT);

/**
 * AniList is a legitimate, free metadata API (titles, synopsis, ratings,
 * genres, staff, characters, trailers). It does NOT provide video streams.
 * Episode `videoUrl`s must be supplied by you (self-hosted / licensed).
 * See lib/mock-data.ts -> VIDEO_SOURCE_MAP to wire your own URLs in.
 */

const MEDIA_FIELDS = gql`
  fragment MediaFields on Media {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
      extraLarge
    }
    bannerImage
    averageScore
    episodes
    format
    status
    seasonYear
    genres
  }
`;

function toSummary(m: any): AnimeSummary {
  return {
    id: m.id,
    title: m.title,
    coverImage: m.coverImage?.extraLarge || m.coverImage?.large || "",
    bannerImage: m.bannerImage,
    averageScore: m.averageScore,
    episodes: m.episodes,
    format: (m.format as MediaFormat) || "TV",
    status: (m.status as MediaStatus) || "RELEASING",
    seasonYear: m.seasonYear,
    genres: m.genres || []
  };
}

async function safeRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
  try {
    return await client.request<T>(query, variables);
  } catch (err) {
    console.warn("[anilist] request failed, falling back to mock data:", (err as Error).message);
    return null;
  }
}

export async function fetchTrending(perPage = 12): Promise<AnimeSummary[]> {
  const query = gql`
    ${MEDIA_FIELDS}
    query ($perPage: Int) {
      Page(perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME) {
          ...MediaFields
        }
      }
    }
  `;
  const data = await safeRequest<{ Page: { media: any[] } }>(query, { perPage });
  if (!data) return MOCK_TRENDING;
  return data.Page.media.map(toSummary);
}

export async function fetchByCategory(
  category: "popular" | "top-airing" | "latest" | "movies" | "tv",
  perPage = 18
): Promise<AnimeSummary[]> {
  const sortMap: Record<string, string> = {
    popular: "POPULARITY_DESC",
    "top-airing": "TRENDING_DESC",
    latest: "START_DATE_DESC",
    movies: "POPULARITY_DESC",
    tv: "POPULARITY_DESC"
  };
  const statusFilter = category === "top-airing" ? ", status: RELEASING" : "";
  const formatFilter =
    category === "movies" ? ", format: MOVIE" : category === "tv" ? ", format: TV" : "";

  const query = gql`
    ${MEDIA_FIELDS}
    query ($perPage: Int) {
      Page(perPage: $perPage) {
        media(sort: ${sortMap[category]}, type: ANIME${statusFilter}${formatFilter}) {
          ...MediaFields
        }
      }
    }
  `;
  const data = await safeRequest<{ Page: { media: any[] } }>(query, { perPage });
  if (!data) return MOCK_TRENDING;
  return data.Page.media.map(toSummary);
}

export async function searchAnime(term: string, perPage = 8): Promise<AnimeSummary[]> {
  if (!term.trim()) return [];
  const query = gql`
    ${MEDIA_FIELDS}
    query ($search: String, $perPage: Int) {
      Page(perPage: $perPage) {
        media(search: $search, type: ANIME) {
          ...MediaFields
        }
      }
    }
  `;
  const data = await safeRequest<{ Page: { media: any[] } }>(query, { search: term, perPage });
  if (!data) {
    return MOCK_TRENDING.filter((a) =>
      (a.title.english || a.title.romaji).toLowerCase().includes(term.toLowerCase())
    );
  }
  return data.Page.media.map(toSummary);
}

export async function fetchAnimeDetail(id: number): Promise<AnimeDetail> {
  const query = gql`
    ${MEDIA_FIELDS}
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        ...MediaFields
        description(asHtml: false)
        season
        studios(isMain: true) {
          nodes {
            name
          }
        }
        trailer {
          id
          site
        }
        characters(sort: ROLE, perPage: 10) {
          edges {
            role
            node {
              name {
                full
              }
              image {
                large
              }
            }
            voiceActors(language: JAPANESE) {
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
        recommendations(perPage: 8, sort: RATING_DESC) {
          nodes {
            mediaRecommendation {
              ...MediaFields
            }
          }
        }
      }
    }
  `;
  const data = await safeRequest<{ Media: any }>(query, { id });
  if (!data) return { ...MOCK_DETAIL, id };

  const m = data.Media;
  const characters: CharacterVA[] = (m.characters?.edges || []).map((e: any) => ({
    characterName: e.node.name.full,
    characterImage: e.node.image.large,
    role: e.role,
    vaName: e.voiceActors[0]?.name?.full || "Unknown",
    vaImage: e.voiceActors[0]?.image?.large || null,
    vaLanguage: "Japanese"
  }));

  const episodeCount = m.episodes || 12;
  const episodeList = Array.from({ length: episodeCount }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    thumbnail: m.bannerImage,
    durationSec: 1440,
    videoUrl: getMockVideoUrl(m.id, i + 1),
    introStartSec: 0,
    introEndSec: 85,
    outroStartSec: 1350
  }));

  return {
    ...toSummary(m),
    description: (m.description || "No synopsis available.").replace(/<[^>]+>/g, ""),
    studios: (m.studios?.nodes || []).map((s: any) => s.name),
    season: m.season,
    trailerId: m.trailer?.site === "youtube" ? m.trailer.id : null,
    characters,
    episodeList,
    recommendations: (m.recommendations?.nodes || [])
      .map((n: any) => n.mediaRecommendation)
      .filter(Boolean)
      .map(toSummary)
  };
}
