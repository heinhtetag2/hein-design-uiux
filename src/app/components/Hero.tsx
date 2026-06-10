import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface HeroProps {
  isStudyHovered?: boolean;
}

export const Hero = React.memo(function Hero({ isStudyHovered = false }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVideoLoaded = () => {
      // Delay appearance slightly after video loads
      setTimeout(() => setIsVisible(true), 200);
    };

    window.addEventListener('videoLoaded', handleVideoLoaded);
    
    // Fallback: show content after 1.5s even if event doesn't fire
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1500);

    return () => {
      window.removeEventListener('videoLoaded', handleVideoLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="lg:contents pointer-events-none">
      {/* Mobile/Tablet Title */}
      <motion.div 
        className="lg:hidden flex flex-col gap-2 pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1
          className="font-serif font-light text-display-sm text-foreground tracking-tight leading-[1.05]"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.05 }}
        >
          Experience,<br />intentionally
        </h1>
        <p className="font-display font-light text-body-sm sm:text-body text-foreground/70 max-w-[300px]">
          Since 2024, I've helped the most innovative startups and reputable
          brands design, build, and ship products worth talking about.
        </p>
      </motion.div>

      {/* Desktop Layout - Fluid flex-based positioning for responsiveness */}
      <motion.div
        className="hidden lg:flex flex-col items-start lg:pl-[clamp(240px,18vw,360px)] lg:pr-[clamp(100px,9vw,200px)] pt-[120px] xl:pt-[160px] 2xl:pt-[180px] h-full w-full pointer-events-none select-none"
        animate={{ opacity: isStudyHovered ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        
        {/* Description - Positioned to the right of the container */}
        <motion.div
          className="self-end mt-[clamp(40px,6vh,100px)] w-full max-w-[380px] xl:max-w-[440px] flex flex-col font-display font-light text-body xl:text-body-lg text-foreground tracking-[-0.01em] pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="m-0 whitespace-nowrap">Since 2024, I've helped the most</p>
          <p className="m-0 whitespace-nowrap">innovative startups and reputable</p>
          <p className="m-0 whitespace-nowrap">brands design, build, and ship</p>
          <p className="m-0 whitespace-nowrap">products worth talking about.</p>
        </motion.div>

        {/* Experience, intentionally - Positioned below and to the left */}
        <motion.div
          className="mt-[calc(clamp(156px,18vh,236px)-4px)] ml-[calc(clamp(180px,16vw,320px)-4px)] font-serif font-light text-display-lg text-foreground whitespace-nowrap pointer-events-auto"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 1, letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-fit h-fit flex items-center font-serif" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            Experience,
          </div>
          <div className="ml-[clamp(60px,12vw,280px)] mt-[-0.1em] font-serif" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            intentionally
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});