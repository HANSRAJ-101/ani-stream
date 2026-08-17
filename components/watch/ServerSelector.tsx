"use client";

import { cx } from "@/lib/utils";

const servers = ["HD-1", "HD-2"];

export default function ServerSelector({
  server,
  onServerChange,
  audio,
  onAudioChange
}: {
  server: string;
  onServerChange: (s: string) => void;
  audio: "SUB" | "DUB";
  onAudioChange: (a: "SUB" | "DUB") => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">Audio</p>
        <div className="flex gap-1.5">
          {(["SUB", "DUB"] as const).map((a) => (
            <button
              key={a}
              onClick={() => onAudioChange(a)}
              className={cx(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                audio === a
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                  : "glass text-white/60 hover:text-white"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">Server</p>
        <div className="flex gap-1.5">
          {servers.map((s) => (
            <button
              key={s}
              onClick={() => onServerChange(s)}
              className={cx(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                server === s
                  ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                  : "glass text-white/60 hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
