import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#0b0c10",
        slate: {
          panel: "#1f2833",
          border: "#2a323d"
        },
        neon: {
          purple: "#6366f1",
          cyan: "#06b6d4"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(99,102,241,0.15), transparent 60%)",
        "glow-purple":
          "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)"
      },
      boxShadow: {
        "neon-purple": "0 0 20px rgba(99,102,241,0.45)",
        "neon-cyan": "0 0 20px rgba(6,182,212,0.45)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        "fade-up": "fade-up 0.5s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
