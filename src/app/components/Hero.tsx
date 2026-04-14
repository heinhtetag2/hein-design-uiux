import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Hero() {
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
        <h1 className="font-['Cormorant',serif] font-light text-[48px] sm:text-[64px] text-foreground leading-tight tracking-tight">
          Experience, intentionally
        </h1>
        <p className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[14px] sm:text-[16px] text-foreground/70 leading-relaxed max-w-[400px]">
          Since 2024, I've helped the most innovative startups and reputable
          brands design, build, and ship products worth talking about.
        </p>
      </motion.div>

      {/* Desktop Layout - Fluid flex-based positioning for responsiveness */}
      <div className="hidden lg:flex flex-col items-start lg:pl-[clamp(240px,18vw,360px)] lg:pr-[clamp(220px,16vw,340px)] pt-[120px] xl:pt-[160px] 2xl:pt-[180px] h-full w-full pointer-events-none select-none">
        
        {/* Description - Positioned to the right of the container */}
        <motion.div 
          className="self-end w-full max-w-[250px] xl:max-w-[280px] flex flex-col font-['Clash_Grotesk_Variable',sans-serif] font-light leading-relaxed text-[15px] xl:text-[16px] 2xl:text-[17px] text-foreground tracking-[-0.01em] pointer-events-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="m-0 whitespace-nowrap">Since 2024, I've helped the most</p>
          <p className="m-0 whitespace-nowrap">innovative startups and reputable</p>
          <p className="m-0 whitespace-nowrap">brands design, build, and ship</p>
          <p className="m-0 whitespace-nowrap">products worth talking about.</p>
        </motion.div>

        {/* Experience, intentionally - Positioned below and to the left */}
        <motion.div 
          className="mt-[clamp(60px,8vh,120px)] font-['Cormorant',serif] font-light leading-[1.05] text-[clamp(64px,6vw,112px)] text-foreground tracking-[-0.02em] whitespace-nowrap pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-fit h-fit flex items-center">
            Experience,
          </div>
          <div className="ml-[clamp(60px,12vw,280px)] mt-[-0.1em]">
            intentionally
          </div>
        </motion.div>
      </div>
    </div>
  );
}