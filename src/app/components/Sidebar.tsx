import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const navItems = ["About Me", "My Blogs", "Shop", "Get in Touch"];
const caseStudies = [
  "EduSync",
  "TuTuStay",
  "JoanX",
  "Goft",
  "ProBridge",
  // "Cardo", — hidden for now
  "All Work",
];

type CaseStudyView = "home" | "edusync" | "twostay" | "joanx" | "goft" | "probridge" | "cardo" | "what-i-do" | "blogs" | "contact" | "all-work" | "shop";

// Maps the sidebar label to the app view it routes to.
const STUDY_VIEWS: Record<string, CaseStudyView> = {
  EduSync: "edusync",
  TuTuStay: "twostay",
  JoanX: "joanx",
  Goft: "goft",
  ProBridge: "probridge",
  Cardo: "cardo",
  "All Work": "all-work",
};

interface SidebarProps {
  onCaseStudyClick?: (view: CaseStudyView) => void;
  onCaseStudyHover?: (study: string | null) => void;
  isMenuOpen?: boolean;
  activeView?: string;
}

export function Sidebar({ onCaseStudyClick, onCaseStudyHover, isMenuOpen, activeView }: SidebarProps) {
  const [isVisible, setIsVisible] = useState(false);
  // Sidebar slides in from x:-20, so its buttons pass under a stationary cursor
  // mid-animation — that triggers a "phantom" hover (and the background swap it
  // drives) before the user has actually moved. Block pointer events until the
  // entrance animation has actually settled.
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const handleVideoLoaded = () => {
      setTimeout(() => setIsVisible(true), 400);
    };

    window.addEventListener('videoLoaded', handleVideoLoaded);

    // Fallback
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1700);

    return () => {
      window.removeEventListener('videoLoaded', handleVideoLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <motion.div
      className={`lg:absolute flex flex-col gap-[clamp(16px,3vh,32px)] items-start lg:left-[24px] lg:top-[clamp(120px,20vh,182px)] w-full lg:w-[249px] ${interactive ? "" : "pointer-events-none"}`}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isVisible) setInteractive(true);
      }}
    >
      {/* Navigation Links */}
      <div className={`hidden lg:flex flex-col items-start gap-[6px] w-full transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
        {navItems.map((item) => {
          const view =
            item === "About Me" ? "what-i-do" :
            item === "My Blogs" ? "blogs" :
            item === "Shop" ? "shop" :
            item === "Get in Touch" ? "contact" : "";
          const isActive = activeView === view;

          return (
            <button
              key={item}
              onClick={() => {
                if (item === "About Me") onCaseStudyClick?.("what-i-do");
                if (item === "My Blogs") onCaseStudyClick?.("blogs");
                if (item === "Shop") onCaseStudyClick?.("shop");
                if (item === "Get in Touch") onCaseStudyClick?.("contact");
              }}
              className={`py-[2px] font-serif font-light text-[20px] leading-[1.3] transition-all duration-300 cursor-pointer text-left ${
                isActive ? "text-foreground opacity-100 translate-x-1" : "text-foreground/80 hover:text-foreground hover:opacity-100"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Case Studies */}
      <div className="flex flex-col gap-[8px] items-start w-full relative">
        <div className="hidden lg:block h-px w-[24px] bg-foreground/25 mb-[6px]" />
        <div className="hidden lg:block py-[6px] font-display text-body-sm text-muted-foreground">
          Case Studies
        </div>
        
        <div className="flex flex-col gap-2 lg:gap-[clamp(4px,1vh,8px)] w-full">
          {caseStudies.map((study) => (
            <motion.button
              key={study}
              onClick={() => {
                const view = STUDY_VIEWS[study];
                if (view) onCaseStudyClick?.(view);
              }}
              onMouseEnter={() => onCaseStudyHover?.(study)}
              onMouseLeave={() => onCaseStudyHover?.(null)}
              className="bg-foreground/10 h-[clamp(30px,3.8vh,34px)] w-fit inline-flex items-center justify-center px-[16px] pt-[2px] rounded-full font-display font-light text-body leading-none text-foreground tracking-tight border border-transparent hover:border-foreground/30 hover:bg-foreground/5 transition-all cursor-pointer relative z-10"
            >
              {study}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}