import React from "react";
import { motion } from "motion/react";
import bgEduSync from "../../assets/work/edusync/hover-background.webp";
import bgTuTuStay from "../../assets/work/twostay/adf.webp";
import allWorkVideo from "../../assets/home/hero-background.mp4";
import allWorkPoster from "../../assets/home/hero-background-poster.jpg";

export const caseStudyBackgrounds: Record<string, string> = {
  ProBridge: `url('${bgEduSync}') center/cover no-repeat`,
  TuTuStay: `url('${bgTuTuStay}') center/cover no-repeat`,
  JoanX:
    "radial-gradient(ellipse 60% 70% at 30% 30%, #2a2a2a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 70% 70%, #1a3a1e 0%, transparent 65%), radial-gradient(ellipse 50% 55% at 50% 50%, #404040 0%, transparent 55%), #050505",
  Goft:
    "radial-gradient(ellipse 65% 70% at 25% 40%, #3a1e6b 0%, transparent 60%), radial-gradient(ellipse 70% 65% at 75% 60%, #1e2d6b 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 50% 50%, #5c2d8f 0%, transparent 55%), #050518",
  Cardo:
    "radial-gradient(ellipse 65% 70% at 30% 40%, #b85c1e 0%, transparent 60%), radial-gradient(ellipse 70% 65% at 70% 60%, #6b3a1e 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 50% 50%, #d97a2d 0%, transparent 55%), #1a0a05",
};

const grainSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

interface Props {
  hoveredStudy: string | null;
}

export const CaseStudyHoverBackground = React.memo(function CaseStudyHoverBackground({ hoveredStudy }: Props) {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
      <motion.div
        key="All Work"
        initial={false}
        animate={{ opacity: hoveredStudy === "All Work" ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ willChange: "opacity" }}
      >
        <video
          src={allWorkVideo}
          poster={allWorkPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-70"
          style={{
            backgroundImage: `url("${grainSvg}")`,
            backgroundSize: "400px 400px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/60" />
      </motion.div>

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
});
