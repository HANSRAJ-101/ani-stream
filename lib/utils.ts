import type { AnimeSummary } from "./types";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function displayTitle(anime: Pick<AnimeSummary, "title">): string {
  return anime.title.english || anime.title.romaji || anime.title.native || "Untitled";
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const mm = m.toString().padStart(h > 0 ? 2 : 1, "0");
  const ss = s.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function scoreToStars(score: number | null): string {
  if (score === null) return "N/A";
  return (score / 10).toFixed(1);
}
