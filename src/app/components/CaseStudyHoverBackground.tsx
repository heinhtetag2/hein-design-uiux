import React from "react";
import { motion } from "motion/react";
import bgEduSync from "../../assets/bgp1.png";

export const caseStudyBackgrounds: Record<string, string> = {
  EduSync: `url('${bgEduSync}') center/cover no-repeat`,
  Suno:
    "radial-gradient(ellipse 65% 70% at 30% 40%, #6b3a1e 0%, transparent 60%), radial-gradient(ellipse 70% 65% at 70% 60%, #3a1e5c 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 50% 50%, #8f5a2d 0%, transparent 55%), #0a050d",
  Uber:
    "radial-gradient(ellipse 60% 70% at 30% 30%, #2a2a2a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 70%, #1a3a1e 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 50% 50%, #404040 0%, transparent 55%), #050505",
  Midjourney:
    "radial-gradient(ellipse 65% 70% at 25% 40%, #3a1e6b 0%, transparent 60%), radial-gradient(ellipse 70% 65% at 75% 60%, #1e2d6b 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 50% 50%, #5c2d8f 0%, transparent 55%), #050518",
  Upwork:
    "radial-gradient(ellipse 60% 70% at 30% 35%, #1e6b3a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 65%, #0a3a1e 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 50% 50%, #2d8f4a 0%, transparent 55%), #050d08",
  Headspace:
    "radial-gradient(ellipse 65% 70% at 30% 40%, #b85c1e 0%, transparent 60%), radial-gradient(ellipse 70% 65% at 70% 60%, #6b3a1e 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 50% 50%, #d97a2d 0%, transparent 55%), #1a0a05",
  "All Work":
    "radial-gradient(ellipse 60% 70% at 30% 30%, #4a4a4a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 70%, #2a2a2a 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 50% 50%, #5c5c5c 0%, transparent 55%), #0a0a0a",
};

const grainSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

interface Props {
  hoveredStudy: string | null;
}

export function CaseStudyHoverBackground({ hoveredStudy }: Props) {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
      {Object.entries(caseStudyBackgrounds).map(([study, bg]) => (
        <motion.div
          key={study}
          initial={false}
          animate={{ opacity: hoveredStudy === study ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ background: bg, willChange: "opacity" }}
        >
          <div
            className="absolute inset-0 mix-blend-overlay opacity-70"
            style={{
              backgroundImage: `url("${grainSvg}")`,
              backgroundSize: "400px 400px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/60" />
        </motion.div>
      ))}
    </div>
  );
}
