# Kagenova — Anime Discovery & Streaming UI

A responsive, high-performance anime discovery front-end built with Next.js 14
(App Router), TypeScript, Tailwind CSS, and Framer Motion. Metadata (titles,
synopses, ratings, genres, studios, characters, trailers) comes from the free
[AniList GraphQL API](https://anilist.co/graphiql). Mock data is used as an
automatic fallback if a request fails, so the UI always renders something.

## ⚠️ About video playback

This project **does not** include any integration with unlicensed/scraped
streaming sources. The video player is fully built (HLS.js, custom controls,
keyboard shortcuts, skip intro/outro, autoplay-next) but it expects **you** to
supply video URLs you have the rights to serve — self-hosted files, a signed
URL from your own backend, or a licensed partner CDN.

Wire your sources in `lib/mock-data.ts`:

```ts
export const VIDEO_SOURCE_MAP: Record<number, Record<number, string>> = {
  // AniList anime ID -> { episodeNumber -> your video URL }
  21: { 1: "https://cdn.yourdomain.com/one-piece/ep1/master.m3u8" },
};
```

Anything not listed falls back to a public HLS.js demo stream so you can test
the player UI immediately.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/                     Route segments (App Router)
  page.tsx               Home: hero carousel, trending/latest/top-airing grids, Top 10
  movies/, tv-series/,
  popular/, top-airing/  Category listing pages
  search/                Live search results
  anime/[id]/            Anime details page
  watch/[animeId]/       Watch page (player + episode directory)
  watchlist/             Watchlist + Continue Watching

components/
  layout/                Navbar, Footer, MobileDrawer
  home/                  HeroBanner, Top10Panel
  anime/                 AnimeCard, AnimeGrid, CharacterGrid, AddToListButton, ...
  watch/                 VideoPlayer, ServerSelector, EpisodeSelector, WatchExperience
  search/                SearchBar (debounced, with dropdown results)
  ui/                    Badge, GenrePill

context/                 WatchlistContext, ContinueWatchingContext (localStorage)
lib/                     anilist.ts (data layer), types.ts, mock-data.ts, utils.ts
hooks/                   useDebounce
```

## Key features implemented

- **Navbar**: glow-accented logo, route links, debounced live search with
  thumbnail/rating/year dropdown, Continue Watching & Watchlist quick links,
  mobile drawer.
- **Home**: auto-scrolling hero spotlight carousel, Trending/Latest/Top
  Airing/Most Popular grids, tabbed Top 10 rankings panel.
- **Anime cards**: hover zoom, glassmorphic badges (HD, episode count,
  rating), rank overlay for Top 10.
- **Watch page**: custom HLS video player (space/←/→/F/M shortcuts), server
  selector (HD-1/HD-2), Sub/Dub toggle, skip intro/outro, autoplay-next,
  batch-ranged episode directory with watched indicators, synopsis +
  recommendations below the player.
- **Anime details page**: immersive backdrop, genre pills, VA/character
  directory, trailer modal (YouTube embed), full episode grid.
- **Persistence**: continue-watching timestamps and watchlist
  (Watching / Plan to Watch / Completed) are stored in `localStorage` via
  React Context — no backend required.
- **Loading states**: shimmer skeleton cards while metadata streams in.

## Things to double-check after `npm install`

This project was authored in a sandboxed environment without network access,
so dependencies were never installed or type-checked against real package
versions. Before you ship it:

1. Run `npm install` and fix any version mismatches `npm` reports.
2. Run `npx tsc --noEmit` to catch any type errors.
3. Run `npm run dev` and click through each route.
4. Confirm `hls.js` playback works with a real `.m3u8` source you control.
5. Adjust `next.config.mjs`'s `images.remotePatterns` to match your actual
   image/CDN hosts (the current config is permissive for development).
