import React, { useState, useEffect } from "react";
import bgVideo from "../../assets/cinematic-abstract-motion-background-no-cgi-used-2025-12-17-04-34-33-utc_v1 (1080p).mp4";

export function VideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Notify parent when video is ready
  useEffect(() => {
    if (isVideoLoaded) {
      window.dispatchEvent(new CustomEvent('videoLoaded'));
    }
  }, [isVideoLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Black background placeholder - shows immediately while video loads */}
      <div className="absolute inset-0 bg-black" />

      {/* Local Background Video - Full Screen */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-[fadeIn_0.8s_ease-in_0.3s_forwards]"
        style={{
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.77vh',
          objectFit: 'cover',
        }}
      />

      {/* Overlay to maintain readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/70 pointer-events-none" />
    </div>
  );
}