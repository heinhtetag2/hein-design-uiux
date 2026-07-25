import React from "react";
import { useInViewVideo } from "./useInViewVideo";

/**
 * Muted, looping, autoplay-when-in-view video. Defers its download until the
 * user scrolls it near the viewport (`preload="none"`) and pauses it when it
 * leaves — a drop-in replacement for a plain `<video autoPlay muted loop>`.
 */
export function AutoVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  useInViewVideo(ref);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
