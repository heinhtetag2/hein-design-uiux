import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useInViewVideo } from "./useInViewVideo";

/**
 * Looping, muted video that autoplays only while in view (deferring its download
 * until the user scrolls to it) with a cursor-following play/pause button and a
 * fade-in mute toggle. Click anywhere to play/pause; the mute button sits
 * bottom-center and appears on hover.
 */
export function CaseStudyVideo({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  useInViewVideo(videoRef);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
  const [overMute, setOverMute] = React.useState(false);
  const [cursor, setCursor] = React.useState({ x: 0, y: 0 });

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div
      ref={containerRef}
      data-cursor-hide="true"
      className={`group relative overflow-hidden cursor-none ${className}`}
      onClick={togglePlay}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="block w-full h-full object-cover"
      />

      {/* Play / pause button that IS the cursor — follows the pointer over the video (desktop only) */}
      <div
        className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 lg:block"
        style={{ left: cursor.x, top: cursor.y, opacity: hovering && !overMute ? 1 : 0 }}
      >
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white/15 text-white/90 backdrop-blur-md ring-1 ring-white/20">
          {isPlaying ? (
            <Pause className="h-7 w-7" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          )}
        </div>
      </div>

      {/* Touch devices have no hover — show an always-visible centered play/pause tap target */}
      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="absolute left-1/2 top-1/2 z-10 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white/90 ring-1 ring-white/20 backdrop-blur-md lg:hidden"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
        )}
      </button>

      {/* Mute / unmute — fixed bottom center, fades in on hover */}
      <button
        type="button"
        aria-label={isMuted ? "Unmute" : "Mute"}
        onMouseEnter={() => setOverMute(true)}
        onMouseLeave={() => setOverMute(false)}
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full bg-white/15 px-7 py-2 text-white/85 ring-1 ring-white/20 backdrop-blur-md opacity-0 transition-[opacity,background-color] duration-300 hover:bg-white/25 hover:text-white lg:flex lg:group-hover:opacity-100"
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </button>
    </div>
  );
}
