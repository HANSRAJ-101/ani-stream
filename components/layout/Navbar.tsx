"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Clock, Menu, Sparkles } from "lucide-react";
import { cx } from "@/lib/utils";
import SearchBar from "@/components/search/SearchBar";
import MobileDrawer from "@/components/layout/MobileDrawer";

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/tv-series", label: "TV Series" },
  { href: "/popular", label: "Most Popular" },
  { href: "/top-airing", label: "Top Airing" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cx(
          "sticky top-0 z-40 transition-colors duration-300",
          scrolled ? "bg-void/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-white/80 hover:text-white focus-ring rounded-md p-1"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-neon-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-transform group-hover:scale-110" />
            </div>
            <span className="font-display text-xl font-bold text-gradient hidden sm:block">
              Kagenova
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cx(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/10 text-white shadow-neon-purple"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden sm:block flex-1 max-w-xs">
            <SearchBar />
          </div>

          <div className="ml-auto sm:ml-3 flex items-center gap-1.5">
            <Link
              href="/watchlist?tab=watching"
              className="hidden sm:flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:shadow-neon-cyan transition-shadow"
            >
              <Clock className="h-3.5 w-3.5 text-neon-cyan" />
              Continue Watching
            </Link>
            <Link
              href="/watchlist"
              aria-label="Watchlist"
              className="flex items-center gap-1.5 rounded-full glass p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-white/80 hover:text-white hover:shadow-neon-purple transition-shadow"
            >
              <Bookmark className="h-3.5 w-3.5 text-neon-purple" />
              <span className="hidden sm:inline">Watchlist</span>
            </Link>
          </div>
        </div>

        <div className="sm:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
