"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipForward,
  Settings
} from "lucide-react";
import { cx, formatDuration } from "@/lib/utils";
import type { EpisodeMeta } from "@/lib/types";

interface VideoPlayerProps {
  episode: EpisodeMeta;
  startAtSec?: number;
  autoplayNext: boolean;
  onAutoplayNextChange: (val: boolean) => void;
  onTimeUpdate: (currentSec: number, durationSec: number) => void;
  onEnded: () => void;
  onNextEpisode: () => void;
  hasNextEpisode: boolean;
}

export default function VideoPlayer({
  episode,
  startAtSec = 0,
  autoplayNext,
  onAutoplayNextChange,
  onTimeUpdate,
  onEnded,
  onNextEpisode,
  hasNextEpisode
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(startAtSec);
  const [duration, setDuration] = useState(episode.durationSec);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  // Attach HLS.js (or native HLS on Safari) whenever the source changes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !episode.videoUrl) return;

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    async function attach() {
      const src = episode.videoUrl!;
      const isM3u8 = src.includes(".m3u8");
      const canPlayNativeHls = video!.canPlayType("application/vnd.apple.mpegurl");

      if (isM3u8 && !canPlayNativeHls) {
        const HlsModule = await import("hls.js");
        const Hls = HlsModule.default;
        if (cancelled) return;
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video!);
        } else {
          video!.src = src;
        }
      } else {
        video!.src = src;
      }

      video!.currentTime = startAtSec;
    }

    attach();
    return () => {
      cancelled = true;
      hls?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode.videoUrl]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const seekBy = useCallback((deltaSec: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(0, video.currentTime + deltaSec), video.duration || Infinity);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  // Keyboard shortcuts: Space play/pause, arrows seek, F fullscreen, M mute.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "arrowleft":
          seekBy(-10);
          break;
        case "arrowright":
          seekBy(10);
          break;
        case "f":
          toggleFullscreen();
          break;
        case "m":
          toggleMute();
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [togglePlay, seekBy, toggleFullscreen, toggleMute]);

  function resetHideTimer() {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2800);
  }

  const inIntro =
    episode.introStartSec !== undefined &&
    episode.introEndSec !== undefined &&
    current >= episode.introStartSec &&
    current < episode.introEndSec;

  const inOutro = episode.outroStartSec !== undefined && current >= episode.outroStartSec;

  const progressPct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetHideTimer}
      onMouseLeave={() => setShowControls(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || episode.durationSec)}
        onTimeUpdate={(e) => {
          const t = e.currentTarget.currentTime;
          setCurrent(t);
          onTimeUpdate(t, e.currentTarget.duration || episode.durationSec);
        }}
        onEnded={() => {
          onEnded();
          if (autoplayNext && hasNextEpisode) onNextEpisode();
        }}
        playsInline
      />

      {/* Skip intro / outro */}
      {(inIntro || inOutro) && (
        <button
          onClick={() =>
            seekBy(inIntro ? (episode.introEndSec ?? 0) - current : (duration - current))
          }
          className="absolute bottom-20 right-4 flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs font-semibold text-white shadow-neon-cyan"
        >
          <SkipForward className="h-3.5 w-3.5" />
          {inIntro ? "Skip Intro" : "Skip Outro"}
        </button>
      )}

      {/* Center play/pause overlay */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30"
          aria-label="Play"
        >
          <div className="rounded-full bg-white/10 p-5 backdrop-blur-md border border-white/20 shadow-neon-purple">
            <Play className="h-8 w-8 fill-white text-white" />
          </div>
        </button>
      )}

      {/* Controls bar */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300",
          showControls || !playing ? "opacity-100" : "opacity-0"
        )}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={current}
          onChange={(e) => {
            const t = Number(e.target.value);
            if (videoRef.current) videoRef.current.currentTime = t;
            setCurrent(t);
          }}
          className="w-full accent-neon-cyan"
          style={{
            background: `linear-gradient(to right, #06b6d4 ${progressPct}%, #2a323d ${progressPct}%)`
          }}
          aria-label="Seek"
        />

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="text-white">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="text-white">
              {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const v = Number(e.target.value);
                setVolume(v);
                if (videoRef.current) {
                  videoRef.current.volume = v;
                  videoRef.current.muted = v === 0;
                }
                setMuted(v === 0);
              }}
              className="hidden w-20 accent-neon-cyan sm:block"
              aria-label="Volume"
            />
            <span className="text-xs text-white/60">
              {formatDuration(current)} / {formatDuration(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasNextEpisode && (
              <button
                onClick={onNextEpisode}
                className="hidden items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white sm:flex"
              >
                <SkipForward className="h-4 w-4" />
                Next Episode
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowSettings((v) => !v)}
                aria-label="Player settings"
                className="text-white"
              >
                <Settings className="h-5 w-5" />
              </button>
              {showSettings && (
                <div className="absolute bottom-8 right-0 w-52 rounded-lg border border-white/10 bg-void p-3 shadow-neon-purple">
                  <label className="flex items-center justify-between text-xs text-white/70">
                    Autoplay next episode
                    <input
                      type="checkbox"
                      checked={autoplayNext}
                      onChange={(e) => onAutoplayNextChange(e.target.checked)}
                      className="accent-neon-cyan"
                    />
                  </label>
                </div>
              )}
            </div>

            <button onClick={toggleFullscreen} aria-label="Fullscreen" className="text-white">
              {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
