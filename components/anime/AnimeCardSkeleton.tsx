export default function AnimeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-panel">
      <div className="shimmer aspect-[2/3] w-full" />
      <div className="p-2.5 space-y-2">
        <div className="shimmer h-3.5 w-4/5 rounded" />
        <div className="shimmer h-2.5 w-2/5 rounded" />
      </div>
    </div>
  );
}
