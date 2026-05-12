import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"], .cursor-pointer';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const target = useRef({ x: 0, y: 0 });

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
            background: hovering ? "transparent" : "#fff",
            border: hovering ? "1.5px solid var(--brand)" : "none",
            mixBlendMode: hovering ? "normal" : "difference",
            transition:
              "width 280ms cubic-bezier(0.22, 1, 0.36, 1), height 280ms cubic-bezier(0.22, 1, 0.36, 1), top 280ms cubic-bezier(0.22, 1, 0.36, 1), left 280ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease, border 200ms ease",
          }}
        />
        {/* Inner dot (only visible when hovering interactive elements) */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            top: `${-dotSize / 2}px`,
            left: `${-dotSize / 2}px`,
            opacity: hovering ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        />
      </div>
    </div>
  );
}
