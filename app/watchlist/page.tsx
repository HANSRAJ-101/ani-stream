import { Suspense } from "react";
import WatchlistView from "@/components/watch/WatchlistView";

export default function WatchlistPage() {
  return (
    <Suspense fallback={null}>
      <WatchlistView />
    </Suspense>
  );
}
