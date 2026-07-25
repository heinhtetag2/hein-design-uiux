import { useEffect, type RefObject } from "react";

/**
 * Plays a muted/looping video only while it is near the viewport and pauses it
 * once it scrolls away. Combined with `preload="none"` on the element, this
 * defers the video's bytes until the user actually reaches it — keeping initial
 * page load light — and stops offscreen videos from burning CPU/GPU on decode.
 */
export function useInViewVideo(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Upgrade preload so the browser fetches the media, then play.
          if (v.preload === "none") v.preload = "auto";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.1 }
    );

    io.observe(v);
    return () => io.disconnect();
  }, [ref]);
}
