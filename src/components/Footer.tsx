import Link from "next/link";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-surface mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-neon-purple" />
              <span className="text-lg font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                AniStream
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Your ultimate destination for anime streaming. Watch the latest and greatest anime series and movies in HD quality.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Browse</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Home</Link>
              <Link href="/movies" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Movies</Link>
              <Link href="/tv-series" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">TV Series</Link>
              <Link href="/most-popular" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Most Popular</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Discover</h4>
            <div className="flex flex-col gap-2">
              <Link href="/top-airing" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Top Airing</Link>
              <Link href="/watchlist" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">My Watchlist</Link>
              <Link href="/continue-watching" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Continue Watching</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Info</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">Built with Next.js</span>
              <span className="text-sm text-gray-400">Styled with Tailwind CSS</span>
              <span className="text-sm text-gray-400">Icons by Lucide</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AniStream. All rights reserved. This is a demo application.
          </p>
        </div>
      </div>
    </footer>
  );
}
