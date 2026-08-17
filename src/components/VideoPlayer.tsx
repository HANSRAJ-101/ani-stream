"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Globe } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const servers = [
  { name: "Server 1", label: "HD-1" },
  { name: "Server 2", label: "HD-2" },
];

export default function VideoPlayer({
  src,
  title,
}: VideoPlayerProps) {
  const [activeServer, setActiveServer] = useState(0);
  const [audioTrack, setAudioTrack] = useState<"sub" | "dub">("sub");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Player */}
      <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/5">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center gap-3 mt-3 p-3 rounded-xl glass">
        {/* Server Selector */}
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400 hidden sm:inline">Server:</span>
          {servers.map((server, i) => (
            <button
              key={server.name}
              onClick={() => setActiveServer(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeServer === i
                  ? "bg-neon-purple text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <Monitor className="h-3 w-3 inline mr-1" />
              {server.label}
            </button>
          ))}
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <Globe className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400 hidden sm:inline">Audio:</span>
          <button
            onClick={() => setAudioTrack("sub")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              audioTrack === "sub"
                ? "bg-neon-cyan text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            SUB
          </button>
          <button
            onClick={() => setAudioTrack("dub")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              audioTrack === "dub"
                ? "bg-neon-cyan text-white"
                : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            DUB
          </button>
        </div>
      </div>
    </motion.div>
  );
}
