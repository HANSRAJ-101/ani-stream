import Image from "next/image";
import type { CharacterVA } from "@/lib/types";

export default function CharacterGrid({ characters }: { characters: CharacterVA[] }) {
  if (characters.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {characters.map((c) => (
        <div key={c.characterName} className="glass-panel overflow-hidden">
          <div className="flex">
            <div className="relative h-24 w-1/2 shrink-0 overflow-hidden">
              <Image src={c.characterImage} alt={c.characterName} fill sizes="80px" className="object-cover" />
            </div>
            {c.vaImage && (
              <div className="relative h-24 w-1/2 shrink-0 overflow-hidden">
                <Image src={c.vaImage} alt={c.vaName} fill sizes="80px" className="object-cover" />
              </div>
            )}
          </div>
          <div className="p-2">
            <p className="truncate text-xs font-semibold text-white">{c.characterName}</p>
            <p className="truncate text-[11px] text-white/40">{c.role}</p>
            <p className="mt-1 truncate text-[11px] text-neon-cyan">{c.vaName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
