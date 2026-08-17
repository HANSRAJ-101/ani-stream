import Link from "next/link";
import { Sparkles } from "lucide-react";

const columns = [
  {
    title: "Browse",
    links: [
      { href: "/movies", label: "Movies" },
      { href: "/tv-series", label: "TV Series" },
      { href: "/popular", label: "Most Popular" },
      { href: "/top-airing", label: "Top Airing" }
    ]
  },
  {
    title: "Account",
    links: [
      { href: "/watchlist", label: "Watchlist" },
      { href: "/watchlist?tab=watching", label: "Continue Watching" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-neon-cyan" />
              <span className="font-display text-lg font-bold text-gradient">Kagenova</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              A concept anime discovery and streaming interface. Metadata via AniList; video
              playback is powered by sources you provide the rights to.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/50 hover:text-neon-cyan">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/30">
          Built with Next.js, Tailwind CSS &amp; Framer Motion. Anime metadata courtesy of AniList.
        </div>
      </div>
    </footer>
  );
}
