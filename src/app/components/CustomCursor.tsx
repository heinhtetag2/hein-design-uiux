import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"], .cursor-pointer';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  // Track the active theme by reading the rendered page background luminance.
  // This handles both the dark/light toggle and the always-dark home page
  // (which overrides the theme via [data-page="home"]).
  useEffect(() => {
    const computeTheme = () => {
      const el = (document.querySelector("[data-page]") as HTMLElement | null) ?? document.body;
      const m = getComputedStyle(el).backgroundColor.match(/\d+(\.\d+)?/g);
      if (!m) return;
      const [r, g, b] = m.map(Number);
      setIsLight(0.299 * r + 0.587 * g + 0.114 * b > 140);
    };
    computeTheme();
    const obs = new MutationObserver(computeTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const page = document.querySelector("[data-page]");
    if (page) obs.observe(page, { attributes: true, attributeFilter: ["data-page", "class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const el = e.target as HTMLElement | null;
      const isHidden = !!(el && el.closest('[data-cursor-hide="true"]'));
      setHidden(isHidden);
      const isInteractive = !isHidden && !!(el && el.closest(INTERACTIVE_SELECTOR));
      setHovering(isInteractive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let raf: number;
    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      style.remove();
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const ringSize = hovering ? 30 : clicking ? 10 : 14;
  const dotSize = clicking ? 5 : 6;
  // In dark mode, a white dot with `difference` blend adapts over the home
  // video/images. In light mode that blend reads as near-invisible, so use a
  // solid dark cursor instead.
  const base = isLight ? "#262626" : "#ffffff";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        opacity: visible && !hidden ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      <div className="relative" style={{ width: 0, height: 0 }}>
        {/* Outer ring (purple outline on hover, white dot otherwise) */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${ringSize}px`,
            height: `${ringSize}px`,
            top: `${-ringSize / 2}px`,
            left: `${-ringSize / 2}px`,
            background: hovering ? "transparent" : base,
            border: hovering ? "1.5px solid var(--brand)" : "none",
            boxShadow: hovering
              ? "none"
              : isLight
              ? "0 0 0 1px rgba(255,255,255,0.45)"
              : "0 0 0 1px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.55)",
            transition:
              "width 280ms cubic-bezier(0.22, 1, 0.36, 1), height 280ms cubic-bezier(0.22, 1, 0.36, 1), top 280ms cubic-bezier(0.22, 1, 0.36, 1), left 280ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease, border 200ms ease",
          }}
        />
        {/* Inner dot (only visible when hovering interactive elements) */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            top: `${-dotSize / 2}px`,
            left: `${-dotSize / 2}px`,
            background: base,
            boxShadow: isLight ? "0 0 0 1px rgba(255,255,255,0.4)" : "0 0 4px rgba(0,0,0,0.5)",
            opacity: hovering ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        />
      </div>
    </div>
  );
}
