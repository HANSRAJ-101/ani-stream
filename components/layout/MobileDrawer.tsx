"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Film, Tv, TrendingUp, Flame, Bookmark, Clock } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/tv-series", label: "TV Series", icon: Tv },
  { href: "/popular", label: "Most Popular", icon: TrendingUp },
  { href: "/top-airing", label: "Top Airing", icon: Flame }
];

const quickLinks = [
  { href: "/watchlist?tab=watching", label: "Continue Watching", icon: Clock },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark }
];

export default function MobileDrawer({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-void border-r border-white/10 p-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-gradient">Kagenova</span>
              <button onClick={onClose} aria-label="Close menu" className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5">
              <SearchBar onNavigate={onClose} />
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <link.icon className="h-4 w-4 text-neon-cyan" />
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <link.icon className="h-4 w-4 text-neon-purple" />
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
