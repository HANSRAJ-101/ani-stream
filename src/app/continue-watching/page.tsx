import type { Metadata } from "next";
import ContinueWatchingClient from "./ContinueWatchingClient";

export const metadata: Metadata = { title: "Continue Watching - AniStream" };

export default function ContinueWatchingPage() {
  return <ContinueWatchingClient />;
}
