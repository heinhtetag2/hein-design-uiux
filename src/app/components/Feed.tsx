import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import imgB649 from "figma:asset/35886ff6561815df7917d466940de002809a4a3d.png";
import imgP0B7 from "figma:asset/1b19b9b3e1077a0d4a4c4f74d6f89f35ef41eb23.png";
import imgP4Ac from "figma:asset/1ed4c32e51a429bb934fb537ab0471678bd6b69e.png";
import imgP2B9 from "figma:asset/1e1108f1f3f3d56bbd42fc890f551b1c0a981af9.png";
import imgA4A8 from "figma:asset/2aea51d5f4e2f60ebbde776dd7856e2979c72149.png";

interface CardProps {
  date?: string;
  title: string;
  image?: string;
  type: "large" | "small" | "text-only";
  height?: number;
}

function CloseButton() {
  return (
    <button className="absolute right-[13px] top-[13px] py-[2px] cursor-pointer hover:opacity-100 transition-opacity">
      <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
        <path d="M3.5 3.5L12.5 12.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.33333" />
        <path d="M3.5 12.5L12.5 3.5" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.33333" />
      </svg>
    </button>
  );
}

function FeedCard({ date, title, image, type, height }: CardProps) {
  return (
    <div 
      className="bg-foreground/10 p-[13px] relative w-full lg:w-[225px] border border-foreground/10 rounded-[8px] shrink-0 hover:bg-foreground/15 transition-all cursor-pointer group"
      style={height ? { height: `${height}px` } : undefined}
    >
      <div className="flex flex-col items-start w-full h-full">
        {date && (
          <div className="pb-[12px] font-['Clash_Grotesk_Variable',sans-serif] font-light text-[12px] text-foreground tracking-tight">
            {date}
          </div>
        )}
        <div className="flex gap-[12px] items-start w-full">
          {type === "small" && image && (
            <div className="size-[48px] overflow-hidden flex-shrink-0 rounded-[4px]">
              <img src={image} alt="" className="size-full object-cover" />
            </div>
          )}
          {title && (
            <h3 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[12px] leading-[14px] text-foreground tracking-tight flex-1">
              {title}
            </h3>
          )}
        </div>
        {type === "large" && image && (
          <div className="mt-auto h-[105px] w-full overflow-hidden rounded-[4px]">
            <img src={image} alt="" className="size-full object-cover" />
          </div>
        )}
      </div>
      <CloseButton />
    </div>
  );
}

export function Feed() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVideoLoaded = () => {
      setTimeout(() => setIsVisible(true), 500);
    };

    window.addEventListener('videoLoaded', handleVideoLoaded);
    
    // Fallback
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1800);

    return () => {
      window.removeEventListener('videoLoaded', handleVideoLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <motion.div 
      className="flex lg:absolute flex-col gap-[12px] items-start lg:right-[28.7px] lg:top-[clamp(80px,12vh,120px)] w-full lg:w-[clamp(200px,18vw,225px)] lg:max-h-[75vh] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      initial={{ opacity: 0, x: 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="lg:hidden py-[6px] font-['Clash_Grotesk_Variable',sans-serif] text-muted-foreground text-[12px] leading-none">
        Latest Activity
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-[clamp(8px,1vh,12px)] w-full">
        <FeedCard
          title="Our Windsurf case study"
          image={imgB649}
          type="large"
          height={158.6}
        />
        <FeedCard
          date="Jul 2025"
          title="PlayerZero raises $15M in a Series A funding round"
          image={imgP0B7}
          type="small"
          height={104.6}
        />
        <FeedCard
          date="Jun 2025"
          title="Designing a New Relationship with AI by Sara Vienna, CDO"
          image={imgP4Ac}
          type="small"
          height={104.6}
        />
        <FeedCard
          date="Jan 2025"
          title="Metalab named Design Company of the Year finalist"
          image={imgP2B9}
          type="small"
          height={104.6}
        />
        <FeedCard
          date="2025 Recap"
          title=""
          image={imgA4A8}
          type="large"
          height={173.6}
        />
      </div>
    </motion.div>
  );
}