import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-24 pb-10 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-6xl font-black text-neon-purple mb-4">404</h1>
        <p className="text-xl text-white mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple hover:bg-neon-purple/80 text-white font-semibold transition-all"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
