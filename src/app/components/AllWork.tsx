import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FilterPills } from "./FilterPills";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgEduSync from "../../assets/work/edusync/hover-cover.webp";
import imgSuno from "../../assets/work/suno/app-mockup.webp";
import imgMidjourney from "../../assets/work/midjourney/chrome-abstract.webp";
import imgUber from "../../assets/work/uber/laptop.webp";
import imgUpwork from "../../assets/work/upwork/fearless-girl.webp";
import imgHeadspace from "../../assets/work/headspace/cover.webp";
import imgNike from "../../assets/work/nike/app-showcase.webp";
import imgModular from "../../assets/work/modular/cover.webp";

type WorkView = "home" | "edusync" | "what-i-do" | "blogs" | "contact" | "visitor-gallery";

interface Work {
  name: string;
  description: string;
  services: string[];
  categories: string[];
  image: string;
  /** If set, the row navigates to a live case study. */
  view?: WorkView;
}

const WORKS: Work[] = [
  {
    name: "EduSync",
    description: "Bringing classrooms together through a unified learning workspace.",
    services: ["Product Design", "Brand", "Engineering"],
    categories: ["Education", "SaaS", "AI"],
    image: imgEduSync,
    view: "edusync",
  },
  {
    name: "Midjourney",
    description: "Crafting the original interface for the world's leading prompt-to-image AI service.",
    services: ["Product Design", "Product Strategy"],
    categories: ["AI", "Media"],
    image: imgMidjourney,
  },
  {
    name: "Suno",
    description: "Democratizing the music creation process with a prompt-to-song platform.",
    services: ["Product Design", "Brand"],
    categories: ["AI", "Media"],
    image: imgSuno,
  },
  {
    name: "Nike",
    description: "An ongoing partnership focused on high-impact product strategy and creative design.",
    services: ["Product Design", "Product Strategy"],
    categories: ["Ecommerce", "Media"],
    image: imgNike,
  },
  {
    name: "Upwork",
    description: "Connecting clients and talent with intent-driven matchmaking flows.",
    services: ["Product Design", "UX Research"],
    categories: ["SaaS", "Productivity"],
    image: imgUpwork,
  },
  {
    name: "Headspace",
    description: "Designing calm — a meditation experience that meets you where you are.",
    services: ["Product Design", "Brand"],
    categories: ["Health & Wellness"],
    image: imgHeadspace,
  },
  {
    name: "Uber",
    description: "Reimagining everyday rides with a faster, calmer driver experience.",
    services: ["Product Design", "UX Research"],
    categories: ["Productivity"],
    image: imgUber,
  },
  {
    name: "Modular",
    description: "A developer platform interface for the next generation of AI infrastructure.",
    services: ["Product Design", "Engineering"],
    categories: ["AI", "SaaS"],
    image: imgModular,
  },
];

const CATEGORIES = [
  "All",
  "AI",
  "SaaS",
  "Ecommerce",
  "Health & Wellness",
  "Productivity",
  "Media",
  "Education",
];

interface AllWorkProps {
  onNavigate?: (view: WorkView) => void;
}

export function AllWork({ onNavigate }: AllWorkProps) {
  const [filters, setFilters] = React.useState<Set<string>>(new Set());

  // Measure the title block so we know how far the content must travel to fully
  // cover ("eat") it on scroll.
  const titleRef = React.useRef<HTMLDivElement>(null);
  const [titleH, setTitleH] = React.useState(320);

  React.useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const measure = () => setTitleH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pin the title in place while the page scrolls: translate it down by the
  // scroll amount (capped at its own height) so it appears fixed until the
  // opaque content has scrolled up over it. Reverses on scroll-up.
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, titleH], [0, titleH]);

  const toggleFilter = (cat: string) => {
    if (cat === "All") {
      setFilters(new Set());
      return;
    }
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filtered =
    filters.size === 0
      ? WORKS
      : WORKS.filter((w) => w.categories.some((c) => filters.has(c)));

  return (
    <div className="relative min-h-screen bg-background text-foreground font-display pb-20 w-full">
      {/* Title — stays pinned and gets covered ("eaten") by the content on scroll */}
      <motion.div
        ref={titleRef}
        style={{ y: titleY }}
        className="relative z-0 pt-page pb-[140px] will-change-transform min-[1700px]:pl-[180px]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif font-light text-[clamp(56px,8vw,88px)] leading-[1.05] tracking-[-0.02em]"
        >
          A sample of my work&nbsp;&mdash;<br />from startup to F500
        </motion.h1>
      </motion.div>

      {/* Opaque scroll layer — covers ("eats") the pinned title on scroll. */}
      <div className="relative z-10 bg-background">
        {/* Filter tabs + work cards */}
        <div>
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-[24px]"
          >
            <span className="font-display font-normal text-body-sm text-foreground/50 shrink-0">
              Filter By:
            </span>
            <FilterPills categories={CATEGORIES} selected={filters} onToggle={toggleFilter} />
          </motion.div>

          {/* Work list — full-bleed to the viewport width, breaking out of the
              page gutter so the cards span 100% of the screen. */}
          <div className="flex flex-col border-t border-foreground/10 w-screen ml-[calc(-50vw+50%)]">
            {filtered.map((work, idx) => (
              <WorkRow
                key={work.name}
                work={work}
                index={idx}
                onClick={() => work.view && onNavigate?.(work.view)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-[80px] text-center font-display text-body text-foreground/40">
              No work in that category yet.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="w-full border-t border-foreground/10 mt-[40px] md:mt-[80px]">
          <div className="py-[48px] md:py-[64px] flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="flex gap-[48px] md:gap-[80px] flex-wrap">
              <div className="flex flex-col gap-[8px]">
                <FooterLink label="Linkedin" />
                <FooterLink label="Instagram" />
                <FooterLink label="X" />
                <FooterLink label="Medium" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <FooterLink label="Careers" />
                <FooterLink label="Contact" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <FooterLink label="Privacy" />
                <FooterLink label="Accessibility" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkRow({
  work,
  index,
  onClick,
}: {
  work: Work;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      whileHover="hovered"
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group relative border-b border-foreground/10 cursor-pointer overflow-hidden"
    >
      {/* Soft background that fades in on hover */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-foreground/[0.10] via-foreground/[0.07] to-foreground/[0.04]" />

      {/* Hover expansion — opens the card upward with eased padding (same as the What I Do rows) */}
      <div className="hidden lg:block w-full h-0 group-hover:h-[56px] transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

      {/* Row content */}
      <div className="relative z-[2] flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 px-4 md:px-6 py-[32px] md:py-[44px] lg:py-[48px]">
        {/* Name */}
        <h2 className="font-display font-medium text-h2 lg:text-h3 text-foreground w-full lg:w-[clamp(140px,14vw,220px)] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:translate-x-1">
          {work.name}
        </h2>

        {/* Description */}
        <p className="font-display font-normal text-body lg:text-body-lg text-foreground/70 lg:w-[clamp(220px,18vw,320px)] shrink-0 leading-[1.45]">
          {work.description}
        </p>

        {/* Center reveal image — clip-mask wipe up from the bottom on hover */}
        <div className="hidden lg:flex flex-1 min-w-0 justify-center items-center">
          <motion.div
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0%)" },
              visible: { clipPath: "inset(100% 0% 0% 0%)" },
              hovered: { clipPath: "inset(0% 0% 0% 0%)" },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-[clamp(240px,24vw,360px)] h-[clamp(150px,15vw,220px)] overflow-hidden rounded-[6px] pointer-events-none"
          >
            <motion.div
              variants={{
                hidden: { y: "10%", scale: 1.06 },
                visible: { y: "10%", scale: 1.06 },
                hovered: { y: "0%", scale: 1 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ImageWithFallback src={work.image} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>

        {/* Services */}
        <div className="flex flex-row flex-wrap lg:flex-col gap-x-4 gap-y-1 lg:w-[clamp(120px,10vw,150px)] shrink-0">
          {work.services.map((s) => (
            <span key={s} className="font-display font-normal text-body-sm text-foreground/45">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <button className="font-display font-normal text-body text-foreground hover:text-foreground/60 transition-colors cursor-pointer text-left leading-normal">
      {label}
    </button>
  );
}
