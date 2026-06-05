import React, { useState, useEffect, useRef } from "react";
import bgVideo from "../../assets/home/home-bg-video.mp4";

const FADE_MS = 900;
const FADE_WINDOW_S = FADE_MS / 1000;

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVideoLoaded) {
      window.dispatchEvent(new CustomEvent("videoLoaded"));
      const t = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration === 0) return;
      const remaining = duration - video.currentTime;
      if (remaining <= FADE_WINDOW_S) {
        setIsVisible(false);
      }
    };

    const handleEnded = () => {
      try {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      } catch {
        // ignore — browser may reject during teardown
      }
      requestAnimationFrame(() => setIsVisible(true));
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isVideoLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-background" />

      <video
        ref={videoRef}
        src={bgVideo}
        autoPlay
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "100vw",
          height: "56.25vw",
          minHeight: "100vh",
          minWidth: "177.77vh",
          objectFit: "cover",
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/70 pointer-events-none" />
    </div>
  );
}