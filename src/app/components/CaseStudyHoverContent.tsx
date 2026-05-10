import React from "react";
import { motion, AnimatePresence } from "motion/react";
import mockEduSync from "../../assets/mock-pj1.png";

interface StudyContent {
  name: string;
  tagline: string;
  categories: string;
  image?: string;
}

export const caseStudyContent: Record<string, StudyContent> = {
  EduSync: {
    name: "EduSync",
    tagline: "Bringing classrooms together through a unified learning workspace.",
    categories: "Product Design, UX, Branding",
    image: mockEduSync,
  },
  Suno: {
    name: "Suno",
    tagline: "Democratizing the music creation process with a prompt-to-song platform.",
    categories: "Product Design, Brand, Engineering",
  },
  Uber: {
    name: "Uber",
    tagline: "Reimagining everyday rides with a faster, calmer driver experience.",
    categories: "Product Design, Research",
  },
  Midjourney: {
    name: "Midjourney",
    tagline: "An interface for exploring imagination at the speed of thought.",
    categories: "Product Design, Brand",
  },
  Upwork: {
    name: "Upwork",
    tagline: "Connecting clients and talent with intent-driven matchmaking flows.",
    categories: "Product Design, UX",
  },
  Headspace: {
    name: "Headspace",
    tagline: "Designing calm — a meditation experience that meets you where you are.",
    categories: "Product Design, Brand",
  },
  "All Work": {
    name: "All Work",
    tagline: "A complete archive of recent product, brand, and design explorations.",
    categories: "Selected Works",
  },
};

interface Props {
  hoveredStudy: string | null;
}

export function CaseStudyHoverContent({ hoveredStudy }: Props) {
  const study = hoveredStudy ? caseStudyContent[hoveredStudy] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] hidden lg:block">
      <AnimatePresence mode="wait">
        {study && (
          <motion.div
            key={study.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            {/* Tagline — top right */}
            <div className="absolute top-[clamp(180px,22vh,260px)] right-[clamp(100px,9vw,200px)] max-w-[260px] xl:max-w-[300px] font-display font-light text-body xl:text-body-lg text-foreground tracking-[-0.01em] leading-[1.45]">
              {study.tagline}
            </div>

            {/* Big study name — left side, lower */}
            <div className="absolute bottom-[clamp(120px,18vh,220px)] left-[clamp(280px,22vw,420px)] font-serif font-light text-display-lg text-foreground whitespace-nowrap">
              {study.name}
            </div>

            {/* Image + Categories — bottom right */}
            <div className="absolute bottom-[clamp(40px,5vh,80px)] right-[clamp(40px,4vw,80px)] flex items-end gap-[clamp(24px,2.5vw,48px)]">
              <div className="font-display font-light text-body xl:text-body-lg text-foreground tracking-[-0.01em] leading-[1.45] max-w-[200px] pb-[clamp(20px,3vh,40px)]">
                {study.categories}
              </div>
              {study.image && (
                <img
                  src={study.image}
                  alt={study.name}
                  className="w-[clamp(220px,22vw,360px)] h-auto object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
