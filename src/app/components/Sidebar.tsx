import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const navItems = ["What I Do", "About Me", "My Blogs", "Get in Touch"];
const caseStudies = [
  "EduSync",
  "Suno",
  "Uber",
  "Midjourney",
  "Upwork",
  "Headspace",
  "All Work",
];

interface SidebarProps {
  onCaseStudyClick?: (view: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact") => void;
  isMenuOpen?: boolean;
  activeView?: string;
}

export function Sidebar({ onCaseStudyClick, isMenuOpen, activeView }: SidebarProps) {
  const [isVisible, setIsVisible] = useState(false);

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
      className="lg:absolute flex flex-col gap-[clamp(16px,3vh,32px)] items-start lg:left-[24px] lg:top-[clamp(120px,20vh,182px)] w-full lg:w-[249px]"
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Navigation Links */}
      <div className={`hidden lg:flex flex-col items-start w-full transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
        {navItems.map((item) => {
          const view = 
            item === "What I Do" ? "what-i-do" : 
            item === "About Me" ? "about" : 
            item === "My Blogs" ? "blogs" : 
            item === "Get in Touch" ? "contact" : "";
          const isActive = activeView === view;

          return (
            <button
              key={item}
              onClick={() => {
                if (item === "What I Do") onCaseStudyClick?.("what-i-do");
                if (item === "About Me") onCaseStudyClick?.("about");
                if (item === "My Blogs") onCaseStudyClick?.("blogs");
                if (item === "Get in Touch") onCaseStudyClick?.("contact");
              }}
              className={`py-[6px] font-['Cormorant',serif] font-light text-[clamp(20px,2vh,24px)] transition-all duration-300 cursor-pointer text-left leading-tight ${
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
        <div className="py-[6px] font-['Clash_Grotesk_Variable',sans-serif] text-muted-foreground text-[12px] leading-none uppercase tracking-wider">
          Case Studies
        </div>
        
        <div className="flex flex-col gap-2 lg:gap-[clamp(4px,1vh,8px)] w-full">
          {caseStudies.map((study) => (
            <motion.button
              key={study}
              whileTap={{ scale: 0.95 }}
              onClick={() => study === "EduSync" && onCaseStudyClick?.("edusync")}
              className="bg-foreground/10 h-[clamp(30px,4vh,34px)] w-fit flex items-center justify-center px-[16px] rounded-full font-['Clash_Grotesk_Variable',sans-serif] font-light text-[clamp(13px,2vh,14px)] text-foreground tracking-tight border border-transparent hover:border-foreground/30 hover:bg-foreground/5 transition-all cursor-pointer relative z-10"
            >
              {study}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}