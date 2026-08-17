import type { Metadata } from "next";
import WatchlistClient from "./WatchlistClient";

export const metadata: Metadata = { title: "My Watchlist - AniStream" };

export default function WatchlistPage() {
  return <WatchlistClient />;
}
