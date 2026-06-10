import React from "react";
import { motion, AnimatePresence } from "motion/react";
import mockEduSync from "../../assets/work/edusync/hover-cover.webp";
import mockAllWork from "../../assets/feed/windsurf-laptop.webp";

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
    categories: "Product Design, Brand, Engineering",
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
    image: mockAllWork,
  },
};

interface Props {
  hoveredStudy: string | null;
}

export const CaseStudyHoverContent = React.memo(function CaseStudyHoverContent({ hoveredStudy }: Props) {
  const study = hoveredStudy ? caseStudyContent[hoveredStudy] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[15] hidden lg:block">
      <AnimatePresence>
        {study && (
          <div key={study.name} className="relative w-full h-full">
            {/* Tagline — top right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.03 } }}
              exit={{ opacity: 0, transition: { duration: 0.14, ease: "linear" } }}
              className="absolute top-[clamp(240px,28vh,340px)] right-[clamp(440px,32vw,680px)] max-w-[260px] xl:max-w-[300px] font-display font-light text-body xl:text-body-lg text-foreground tracking-[-0.01em] leading-[1.45]"
            >
              {study.tagline}
            </motion.div>

            {/* Big study name — left side, upper */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.14, ease: "linear" } }}
              className="absolute bottom-[calc(clamp(260px,32vh,420px)+24px)] left-[clamp(160px,14vw,260px)] font-serif font-light text-display-lg text-foreground whitespace-nowrap"
            >
              {study.name}
            </motion.div>

            {/* Image + Categories — bottom right */}
            <div className="absolute bottom-[clamp(40px,5vh,80px)] right-[clamp(40px,4vw,80px)] flex items-center gap-[clamp(8px,1vw,20px)]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 } }}
                exit={{ opacity: 0, transition: { duration: 0.14, ease: "linear" } }}
                className="font-display font-light text-body xl:text-body-lg text-foreground tracking-[-0.01em] leading-[1.45] max-w-[200px]"
              >
                {study.categories}
              </motion.div>
              {study.image && (
                <motion.img
                  src={study.image}
                  alt={study.name}
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  animate={{
                    clipPath: "inset(0% 0 0 0)",
                    opacity: 1,
                    transition: {
                      clipPath: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
                      opacity: { duration: 0.2, ease: "linear" },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.14, ease: "linear" },
                  }}
                  className="w-[clamp(250px,24vw,400px)] aspect-square object-cover rounded-[6px]"
                />
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});
