import React from "react";
import type { Visitor } from "../visitorStore";

interface VisitorCardArtProps {
  visitor: Pick<Visitor, "name" | "color" | "no" | "issuedAt" | "role">;
  // Compact mode shrinks paddings/text for gallery thumbnails
  compact?: boolean;
}

// Swatches light enough that we need dark text instead of white.
const LIGHT_SWATCHES = new Set(["#b5b0ff", "#d6cfc2"]);

export function VisitorCardArt({ visitor, compact = false }: VisitorCardArtProps) {
  const { name, color, no, issuedAt, role } = visitor;
  const onDark = !LIGHT_SWATCHES.has(color.toLowerCase());
  const ink = onDark ? "#ffffff" : "#0b0820";
  const inkSoft = onDark ? "rgba(255,255,255,0.7)" : "rgba(11,8,32,0.65)";
  const inkLine = onDark ? "rgba(255,255,255,0.5)" : "rgba(11,8,32,0.4)";
  const dotColor = onDark ? "rgba(255,255,255,0.55)" : "rgba(11,8,32,0.35)";

  const displayName = (name.trim() || "Visitor").toUpperCase();
  const signature = name.trim();

  const pad = compact ? "p-4" : "p-6 sm:p-7";
  const title = compact ? "text-[20px]" : "text-[28px] sm:text-[32px]";
  const nameSize = compact
    ? "text-body-sm sm:text-body"
    : "text-body-lg sm:text-h3";
  const sigSize = compact ? "text-[14px]" : "text-[18px]";

  return (
    <div
      className="relative w-full aspect-[1.6/1] rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]"
      style={{ backgroundColor: color, transition: "background-color 0.6s ease" }}
    >
      {/* Dot texture, masked into a soft ellipse on the right */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1.2px)`,
          backgroundSize: "6px 6px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 78% 55%, #000 0%, #000 35%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 78% 55%, #000 0%, #000 35%, transparent 70%)",
        }}
      />

      <div
        className={`relative h-full w-full ${pad} flex flex-col`}
        style={{ color: ink }}
      >
        <h3 className={`font-serif font-light ${title} leading-none`}>
          Hein's World
        </h3>

        <div className={`${compact ? "mt-3" : "mt-6 sm:mt-7"} flex flex-col gap-0.5 min-w-0`}>
          <span className="font-display text-eyebrow" style={{ color: inkSoft }}>
            Visitor
          </span>
          <span className={`font-display ${nameSize} tracking-[0.04em] truncate`}>
            {displayName}
            {role && (
              <>
                <span style={{ color: inkSoft }}>{"  ·  "}</span>
                <span style={{ color: inkSoft }}>{role}</span>
              </>
            )}
          </span>
        </div>

        <div className={`${compact ? "mt-2" : "mt-4"} flex flex-col gap-0.5`}>
          <span className="font-display text-eyebrow" style={{ color: inkSoft }}>
            Issued on
          </span>
          <span className="font-display text-body-sm tracking-[0.04em]">
            {issuedAt}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <span
            className="font-display text-caption tracking-[0.18em] uppercase"
            style={{ color: inkSoft }}
          >
            No. {no}
          </span>
          <div className="flex items-end gap-2 min-w-0 flex-1 max-w-[180px]">
            <span className="font-display text-caption" style={{ color: inkSoft }}>
              x
            </span>
            <span
              className={`font-serif italic ${sigSize} leading-none truncate`}
              style={{
                borderBottom: `1px solid ${inkLine}`,
                paddingBottom: 2,
                width: "100%",
                opacity: 0.9,
              }}
            >
              {signature || " "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
