"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";

export default function TrailerModal({ trailerId }: { trailerId: string | null }) {
  const [open, setOpen] = useState(false);
  if (!trailerId) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-white hover:shadow-neon-cyan transition-shadow"
      >
        <Play className="h-4 w-4" />
        Watch Trailer
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 shadow-neon-purple"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                aria-label="Close trailer"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                  title="Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
