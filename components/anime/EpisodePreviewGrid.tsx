import Link from "next/link";
import { Play } from "lucide-react";
import type { EpisodeMeta } from "@/lib/types";

export default function EpisodePreviewGrid({
  animeId,
  episodes
}: {
  animeId: number;
  episodes: EpisodeMeta[];
}) {
  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
      {episodes.map((ep) => (
        <Link
          key={ep.number}
          href={`/watch/${animeId}?ep=${ep.number}`}
          className="group flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-slate-panel py-2.5 text-sm font-medium text-white/70 hover:border-neon-cyan hover:text-white hover:shadow-neon-cyan transition-all"
        >
          <Play className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          {ep.number}
        </Link>
      ))}
    </div>
  );
}
