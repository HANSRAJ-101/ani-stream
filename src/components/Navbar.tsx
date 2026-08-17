"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  Bookmark,
  PlayCircle,
  Home,
  Film,
  Tv,
  TrendingUp,
  Flame,
  Star,
} from "lucide-react";
import { searchAnime, type AnimeData } from "@/lib/data";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/tv-series", label: "TV Series", icon: Tv },
  { href: "/most-popular", label: "Most Popular", icon: TrendingUp },
  { href: "/top-airing", label: "Top Airing", icon: Flame },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeData[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setResults(searchAnime(value).slice(0, 6));
    }, 300);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass bg-dark-bg/90" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Flame className="h-8 w-8 text-neon-purple" />
                <div className="absolute inset-0 blur-lg bg-neon-purple/30 rounded-full" />
              </div>
              <span className="text-xl font-bold glow-text bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                AniStream
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === href
                      ? "text-neon-purple bg-neon-purple/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-12 w-80 sm:w-96 glass rounded-xl overflow-hidden"
                    >
                      <div className="p-3">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                          <Search className="h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search anime..."
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="bg-transparent text-sm text-white placeholder-gray-400 outline-none flex-1"
                            autoFocus
                          />
                        </div>
                      </div>
                      {results.length > 0 && (
                        <div className="max-h-80 overflow-y-auto">
                          {results.map((anime) => (
                            <Link
                              key={anime.id}
                              href={`/anime/${anime.id}`}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                                setResults([]);
                              }}
                            >
                              <img
                                src={anime.coverImage}
                                alt={anime.title}
                                className="w-10 h-14 rounded object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {anime.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    {anime.rating}
                                  </span>
                                  <span>{anime.year}</span>
                                  <span className="text-neon-cyan">{anime.type}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                      {query.length >= 2 && results.length === 0 && (
                        <p className="px-3 py-4 text-sm text-gray-400 text-center">
                          No results found
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Watchlist */}
              <Link
                href="/watchlist"
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
                aria-label="Watchlist"
              >
                <Bookmark className="h-5 w-5" />
              </Link>

              {/* Continue Watching */}
              <Link
                href="/continue-watching"
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
                aria-label="Continue Watching"
              >
                <PlayCircle className="h-5 w-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors lg:hidden"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark-bg/95 backdrop-blur-xl pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    pathname === href
                      ? "text-neon-purple bg-neon-purple/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              <Link
                href="/watchlist"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                <Bookmark className="h-5 w-5" />
                Watchlist
              </Link>
              <Link
                href="/continue-watching"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                <PlayCircle className="h-5 w-5" />
                Continue Watching
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
