import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WatchlistProvider } from "@/context/WatchlistContext";
import { ContinueWatchingProvider } from "@/context/ContinueWatchingContext";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Kagenova — Stream Anime",
  description: "A modern, high-performance anime discovery and streaming experience."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-void min-h-screen antialiased">
        <WatchlistProvider>
          <ContinueWatchingProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ContinueWatchingProvider>
        </WatchlistProvider>
      </body>
    </html>
  );
}
