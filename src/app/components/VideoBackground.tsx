import React, { useState, useEffect } from "react";

export function VideoBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Extract Vimeo video ID: 1167383354
  // Using Vimeo's background parameter for seamless looping background video
  const vimeoEmbedUrl = "https://player.vimeo.com/video/1167383354?background=1&autoplay=1&loop=1&muted=1&quality=1080p";

  useEffect(() => {
    // Set a minimum delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1200); // Video typically loads within 1-1.5s
    
    return () => clearTimeout(timer);
  }, []);

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
      
      {/* Vimeo Background Video - Full Screen with no gaps */}
      <iframe
        src={vimeoEmbedUrl}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-[fadeIn_0.8s_ease-in_0.3s_forwards]"
        style={{
          width: '100vw',
          height: '56.25vw', // 16:9 aspect ratio
          minHeight: '100vh',
          minWidth: '177.77vh', // 16:9 aspect ratio
        }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        title="Background Video"
        onLoad={() => setIsVideoLoaded(true)}
      />
      
      {/* Overlay to maintain readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/70 pointer-events-none" />
    </div>
  );
}