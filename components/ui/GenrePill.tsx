import Link from "next/link";

export default function GenrePill({ genre }: { genre: string }) {
  return (
    <Link
      href={`/search?genre=${encodeURIComponent(genre)}`}
      className="rounded-full glass px-3 py-1 text-xs font-medium text-white/70 hover:text-white hover:border-neon-cyan/50 transition-colors"
    >
      {genre}
    </Link>
  );
}
