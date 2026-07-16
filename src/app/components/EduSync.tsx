import React from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-edusync";
import imgHero from "../../assets/work/edusync/hero.webp";
import imgVideo from "../../assets/work/edusync/gallery-04.webp";
import frame78Video from "../../assets/work/edusync/system-video.mp4";
import imgFrame79 from "../../assets/work/edusync/gallery-01.webp";
import imgFrame80 from "../../assets/work/edusync/gallery-02.webp";
import imgApp1 from "../../assets/work/edusync/music-card-1.webp";
import imgApp2 from "../../assets/work/edusync/music-card-2.webp";
import imgApp3 from "../../assets/work/edusync/music-card-3.webp";
import imgImage1 from "../../assets/work/edusync/gallery-00.png";
import imgFrame81 from "../../assets/work/edusync/gallery-05.webp";
import imgFrame82 from "../../assets/work/edusync/gallery-07.webp";
import imgFrame83 from "../../assets/work/edusync/gallery-08.webp";
import imgImage2 from "../../assets/work/edusync/gallery-10.webp";
import imgImage3 from "../../assets/work/edusync/gallery-06.webp";
import imgImage6 from "../../assets/work/edusync/gallery-11.webp";
import image8Video from "../../assets/work/edusync/think-different-video.mp4";
import imgImage9 from "../../assets/work/edusync/gallery-09.webp";
import eduSyncVideo from "../../assets/work/edusync/overview-video.mp4";
import mockNextStudy from "../../assets/work/twostay/app-mockup.webp";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CaseStudyVideo } from "./CaseStudyVideo";
import { ArrowUpRight, BookOpen } from "lucide-react";

// EduSync interactive prototype — replace with your real Figma / live prototype URL.
const PROTOTYPE_URL = "https://www.apple.com/os/macos/?version=no-hero";
// TODO: replace with the real Notion case-study link once the deep-dive is written
const CASE_STUDY_URL = "https://www.nike.com/";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

function SectionHeading({ text }: { text: string }) {
  return <div className="font-display font-normal text-h3 text-foreground mb-8">{text}</div>;
}

function LargeText({ text, size = "large" }: { text: string, size?: "large" | "medium" }) {
  const classes = size === "large"
    ? "text-display-sm"
    : "text-h2";
  return (
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        damping: 30,
        stiffness: 80,
        restDelta: 0.001
      }}
      className={`font-display font-light text-foreground ${classes}`}
    >
      {text}
    </motion.p>
  );
}

function RevealImage({ src, className = "" }: { src: string; className?: string }) {
  // Clip-mask reveal from the top downward + a gentle parallax drift on the
  // image — same easing as the All Work cards. Triggered as it scrolls into view.
  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ y: "-8%", scale: 1.06 }}
        whileInView={{ y: "0%", scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        <ImageWithFallback src={src} className="block w-full h-full object-cover" />
      </motion.div>
    </motion.div>
  );
}

function RevealVideo({ src, className = "" }: { src: string; className?: string }) {
  // Same clip-mask reveal + parallax as RevealImage, but for an autoplaying,
  // looping, muted video — so a video slot reveals in step with its image siblings.
  return (
    <motion.div
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ y: "-8%", scale: 1.06 }}
        whileInView={{ y: "0%", scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="block w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function NextCaseStudy({
  label,
  tagline,
  image,
  index = "01 / 04",
  onClick,
}: {
  label: string;
  tagline: string;
  image: string;
  index?: string;
  onClick?: () => void;
}) {
  const [imageHovered, setImageHovered] = React.useState(false);
  const [sectionHovered, setSectionHovered] = React.useState(false);
  // Background text slides to white when hovering the section, but fades back
  // while the image card itself is hovered (so the card stays the focus).
  const bright = sectionHovered && !imageHovered;

  return (
    <section
      className="relative w-full overflow-hidden pt-20 pb-12 lg:py-16"
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
    >
      <div className="mb-6 hidden items-center justify-between px-1 lg:mb-8">
        <span className="font-display text-eyebrow uppercase tracking-[0.18em] text-foreground/40">Next project</span>
        <span className="font-display text-eyebrow uppercase tracking-[0.18em] text-foreground/40">{index}</span>
      </div>

      <div className="relative flex items-center justify-center lg:min-h-[76vh]">
        {/* Horizontal marquee background text */}
        <div className="pointer-events-none absolute -top-[21vw] bottom-0 lg:top-0 left-1/2 w-screen -translate-x-1/2 flex items-start pt-0 lg:left-0 lg:w-full lg:translate-x-0 lg:items-center overflow-hidden">
          <motion.div
            className="flex shrink-0 flex-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {Array.from({ length: 2 }).map((_, copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className={`whitespace-nowrap font-display font-normal leading-none text-[27vw] md:text-[16vw] lg:text-[13vw] tracking-tight transition-colors duration-700 ${
                      bright ? "text-white" : "text-white lg:text-foreground/10"
                    }`}
                  >
                    Next case study
                    <span className="px-[0.35em] opacity-60">•</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Foreground image card */}
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
          className="group relative z-10 mx-auto block w-fit cursor-pointer"
        >
          <div className="aspect-[450/678] w-[450px] max-w-[68vw] lg:max-w-[86vw] overflow-hidden rounded-[4px]">
            <ImageWithFallback
              src={image}
              className="block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </div>
          <div className="w-[450px] max-w-[68vw] lg:max-w-[86vw] text-left">
            <div className="mt-5 font-display text-[20px] lg:text-body text-foreground">{label}</div>
            <div className="mt-1 hidden max-w-[320px] font-display text-eyebrow font-light text-foreground/50">{tagline}</div>
          </div>
        </button>
      </div>

    </section>
  );
}

const DRAG_CARDS = [
  { src: "imgApp1", variant: "portrait" as const },
  { src: "imgApp2", variant: "landscape" as const },
  { src: "imgApp3", variant: "portrait" as const },
  { src: "imgApp1", variant: "landscape" as const },
  { src: "imgApp2", variant: "portrait" as const },
  { src: "imgApp3", variant: "landscape" as const },
  { src: "imgApp1", variant: "portrait" as const },
  { src: "imgApp2", variant: "landscape" as const },
];
const DRAG_REPS = 3;

export function EduSync({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const stripWidthRef = React.useRef(0);
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [showProtoBar, setShowProtoBar] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowProtoBar(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const measure = () => {
      const cards = container.querySelectorAll<HTMLElement>("[data-drag-card]");
      if (cards.length < DRAG_CARDS.length * 2) return;
      const stripWidth = cards[DRAG_CARDS.length].offsetLeft - cards[0].offsetLeft;
      stripWidthRef.current = stripWidth;

      // Center the vinyl ("Luna's New Trick", imgApp1 portrait) card from the
      // middle copy so it's the default focused card.
      const midpoint = Math.floor(DRAG_CARDS.length / 2);
      let localIdx = DRAG_CARDS.findIndex((c, i) => c.src === "imgApp1" && c.variant === "portrait" && i >= midpoint);
      if (localIdx === -1) localIdx = DRAG_CARDS.findIndex((c) => c.src === "imgApp1" && c.variant === "portrait");
      if (localIdx === -1) localIdx = DRAG_CARDS.findIndex((c) => c.src === "imgApp1");
      if (localIdx === -1) localIdx = midpoint;
      const hero = cards[DRAG_CARDS.length + localIdx];
      const target = hero.offsetLeft - (container.offsetWidth - hero.offsetWidth) / 2;
      container.scrollLeft = target;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleStripScroll = () => {
    const container = scrollContainerRef.current;
    const w = stripWidthRef.current;
    if (!container || w === 0) return;
    if (container.scrollLeft >= 2 * w) container.scrollLeft -= w;
    else if (container.scrollLeft < w) container.scrollLeft += w;
  };

  const cardSrcMap: Record<string, string> = {
    imgApp1,
    imgApp2,
    imgApp3,
  };

  return (
    <div style={{ position: 'relative' }} className="bg-background min-h-screen w-full flex flex-col items-center pb-20 relative">
      
      {/* 1. Header Section */}
      <Container className="pt-24 lg:pt-32 mb-2 lg:mb-20">
        <div className="mb-10">
          <h1 className="font-serif font-normal text-display-2xl text-foreground text-left">
            EduSync
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:flex lg:flex-row lg:justify-between pb-[10px] lg:gap-8">
          <div className="flex flex-col gap-1 lg:w-[448px]">
            <span className="font-display font-light text-body-sm lg:text-body text-foreground">Project Type</span>
            <span className="font-display font-normal text-muted-foreground text-body-sm lg:text-body">Full Build</span>
          </div>
          <div className="flex flex-col gap-1 lg:w-[212px]">
            <span className="font-display font-light text-body-sm lg:text-body text-foreground">Stage</span>
            <span className="font-display font-normal text-muted-foreground text-body-sm lg:text-body">MVP-ready</span>
          </div>
          <div className="flex flex-col gap-1 lg:w-[400px]">
            <span className="font-display font-light text-body-sm lg:text-body text-foreground">Deliverables</span>
            <span className="font-display font-normal text-muted-foreground text-body-sm lg:text-body">UX, Dashboard, Systems</span>
          </div>
        </div>
      </Container>

      {/* 2. Hero Image */}
      <div className="relative w-screen mb-32">
        <div className="w-full h-[674px] lg:h-[840px] overflow-hidden">
          <ImageWithFallback src={imgHero} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 3. Introduction Sections */}
      <Container className="mb-20">
        <div className="lg:pr-[260px]">
          <SectionHeading text="Introduction" />
          <LargeText text="EduSync brings clarity to how schools manage learning. It connects administrators, teachers, and students through structured workflows that reduce friction and keep learning focused." />
        </div>
      </Container>

      <Container className="mb-12 lg:mb-28">
        <div className="lg:pl-[260px] lg:pr-[496px]">
          <SectionHeading text="The vision" />
          <LargeText size="medium" text="Build a system where learning flows naturally without operational noise." />
        </div>
      </Container>

      {/* 4. Video Play Section */}
      <div className="w-full mb-16 md:mb-32 flex flex-col gap-8 md:gap-10 lg:items-end">
        <CaseStudyVideo src={eduSyncVideo} className="w-full aspect-video lg:h-[782px]" />
        <div className="w-full lg:max-w-[206px] lg:pr-4">
           <p className="font-display text-body text-foreground leading-relaxed">
             EduSync was shaped through close collaboration between design, product, and engineering. In a system with many stakeholders, clarity and speed were essential—enabled by shared ownership, clear roles, and continuous feedback.
           </p>
        </div>
      </div>

      {/* 5. Mindset Section */}
      <Container className="mb-16 md:mb-28 lg:mb-40">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="The system mindset" />
          <LargeText size="medium" text="A structured learning platform that balances administrative control with flexibility while keeping the experience simple for those who learn and teach every day." />
        </div>
      </Container>

      {/* 6. Image Grid (Posters) */}
      <div className="w-full mb-28 md:mb-40 lg:mb-56 flex flex-col gap-4 md:gap-6">
        <div className="w-full h-[250px] md:h-[400px] lg:h-[778px] overflow-hidden">
          <video
            src={frame78Video}
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
           <div className="h-[360px] md:h-[460px] lg:h-[782px] overflow-hidden">
             <RevealImage src={imgFrame79} className="w-full h-full" />
           </div>
           <div className="flex flex-col gap-6">
              <div className="h-[200px] lg:h-[384px] overflow-hidden">
                 <RevealImage src={imgFrame80} className="w-full h-full" />
              </div>
              <div className="font-display text-body text-foreground/80 space-y-4 max-w-[400px]">
                 <p>Education systems are becoming more complex, with more tools, more data, and more stakeholders involved. EduSync was designed to bring structure to that complexity turning scattered processes into clear, connected workflows.</p>
                 <p>To support this, I designed a flexible system that adapts across roles and scenarios, balancing control with simplicity while remaining ready for what comes next.</p>
              </div>
           </div>
        </div>
      </div>

      {/* 7. Image Grid 1 (Horizontal Strip) */}
      <div className="w-full mb-32">
        <div
          data-cursor-hide="true"
          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] relative"
          style={{ scrollBehavior: "auto" }}
          ref={scrollContainerRef}
          onScroll={handleStripScroll}
          onMouseEnter={() => setShowCursor(true)}
          onMouseMove={(e) => {
            setCursorPos({
              x: e.clientX,
              y: e.clientY
            });
          }}
          onMouseLeave={() => {
            setShowCursor(false);
            setIsDragging(false);
          }}
        >
          {/* Custom Drag Cursor */}
          {showCursor && (
            <div
              className="fixed pointer-events-none z-50 transition-transform duration-200 ease-out"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: `translate(-50%, -50%) scale(${isDragging ? 0.92 : 1})`,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 88,
                  height: 88,
                  border: "1.25px solid var(--brand)",
                  background: "transparent",
                }}
              >
                <span className="font-display font-light text-[13px] text-white tracking-tight leading-none">
                  Drag
                </span>
              </div>
            </div>
          )}

          <div
            className="flex gap-6 lg:gap-[184px] items-center min-w-max cursor-none select-none"
            onMouseDown={(e) => {
              if (e.button !== 0) return;
              e.preventDefault();
              setIsDragging(true);
              const slider = e.currentTarget.parentElement;
              if (!slider) return;

              const startX = e.clientX;
              const scrollLeft = slider.scrollLeft;

              const handleMouseMove = (ev: MouseEvent) => {
                slider.scrollLeft = scrollLeft - (ev.clientX - startX);
              };

              const handleMouseUp = () => {
                setIsDragging(false);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          >
            {Array.from({ length: DRAG_REPS }).flatMap((_, copy) =>
              DRAG_CARDS.map((card, i) => (
                <div
                  key={`${copy}-${i}`}
                  data-drag-card
                  className={
                    card.variant === "portrait"
                      ? "w-[285px] h-[360px] lg:w-[460px] lg:h-[570px] shrink-0 overflow-hidden rounded-none"
                      : "w-[348px] h-[280px] lg:w-[580px] lg:h-[456px] shrink-0 overflow-hidden rounded-none"
                  }
                >
                  <ImageWithFallback src={cardSrcMap[card.src]} className="w-full h-full object-cover" />
                </div>
              )),
            )}
          </div>
        </div>
        
        {/* Description below cards — narrow column, left-aligned to match the gallery rhythm */}
        <div className="w-full mt-16 lg:mt-24">
          <div className="pl-6 lg:pl-[14vw]">
            <p className="font-display font-light text-body text-foreground/85 max-w-[320px] lg:mx-0 lg:text-left text-left leading-relaxed">
              By balancing structure and flexibility, EduSync creates a system that feels both controlled and human. Administrators gain oversight, teachers gain freedom, and learning becomes accessible without unnecessary complexity.
            </p>
          </div>
        </div>
      </div>

      {/* 9. Full Width Images */}
      <div className="w-full mb-32 flex flex-col gap-28 lg:gap-20">
        <div className="w-full h-[200px] lg:h-[784px] overflow-hidden">
          <RevealImage src={imgImage1} className="w-full h-full" />
        </div>
        <div className="w-full h-[200px] lg:h-[590px] overflow-hidden">
          <RevealImage src={imgVideo} className="w-full h-full" />
        </div>
      </div>

      {/* 10. Course Management Section */}
      <Container className="mb-16 md:mb-28 lg:mb-40">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="Course Management" />
          <LargeText size="medium" text="Structuring learning through clear roles, reviews, and workflows." />
        </div>
      </Container>

      {/* 11. App Detail Mosaic Grid */}
      <div className="w-full mb-28 md:mb-32 flex flex-col lg:flex-row gap-6">
        <div className="contents lg:flex lg:flex-col lg:gap-6 lg:w-[424px] lg:h-[782px]">
           <div className="order-3 lg:order-none pr-6 lg:pr-0 lg:max-w-[262px]">
              <p className="font-display text-body text-foreground">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
           </div>
           <div className="order-1 lg:order-none h-[444px] lg:flex-1 lg:min-h-0 overflow-hidden">
              <RevealImage src={imgFrame81} className="w-full h-full" />
           </div>
        </div>
        <div className="order-2 lg:order-none h-[284px] md:h-[400px] lg:flex-1 lg:h-[782px] overflow-hidden">
           <RevealImage src={imgApp1} className="w-full h-full" />
        </div>
      </div>

      {/* 11.5 Wide Image Grid Section */}
      <div className="w-full mb-16 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-10 h-[236px] lg:h-[748px] overflow-hidden">
           <RevealImage src={imgImage3} className="w-full h-full" />
        </div>
        <div className="lg:col-span-2 flex items-start pr-6 lg:pr-0">
           <p className="font-display text-body text-foreground w-full lg:w-auto lg:max-w-[197px]">Structuring learning through clear roles, reviews, and workflows.</p>
        </div>
      </div>

      {/* 11.9 — Discovery Image Grid */}
      <div className="w-full py-12 md:py-16 lg:py-[90px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[0.92fr_1.08fr] gap-[24px] items-start lg:items-stretch w-full">
          <div className="contents lg:flex lg:flex-col lg:gap-[24px] lg:min-w-0 lg:items-start lg:justify-center lg:self-stretch">
            <div className="order-3 lg:order-none w-full pr-6 lg:pr-0">
              <div className="flex flex-col gap-[8px] font-display font-light text-body text-foreground tracking-tight">
                <p className="leading-relaxed">
                  EduSync approaches discovery through clarity—surfacing relevant courses, lessons, and progress cues that keep students engaged over time.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-none w-full overflow-hidden h-[280px] md:h-[420px] lg:h-auto lg:flex-1 lg:min-h-px">
              <RevealImage src={imgFrame82} className="w-full h-full" />
            </div>
          </div>
          <div className="order-2 lg:order-none w-full lg:min-w-0 h-[400px] md:h-[600px] lg:h-[900px] overflow-hidden">
            <RevealImage src={imgFrame83} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 12. Think Different Section */}
      <Container className="mt-14 lg:mt-0 mb-[60px] md:mb-[100px] lg:mb-[140px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="Think Different" />
          <LargeText size="medium" text="The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into." />
        </div>
      </Container>

      {/* 12.5 Grid Layout with Text + Images */}
      <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row gap-6">
        <div className="contents lg:flex lg:flex-col lg:gap-4 lg:w-[424px] lg:h-[782px]">
           <div className="order-3 lg:order-none pr-6 lg:pr-0 lg:max-w-[262px]">
              <p className="font-display text-body text-foreground">Create a course, assign teachers, and manage lessons in one place.</p>
           </div>
           <div className="order-1 lg:order-none h-[444px] lg:flex-1 lg:min-h-0 overflow-hidden">
              <RevealVideo src={image8Video} className="w-full h-full" />
           </div>
        </div>
        <div className="order-2 lg:order-none h-[284px] lg:flex-1 lg:h-[782px] overflow-hidden">
           <RevealImage src={imgImage9} className="w-full h-full" />
        </div>
      </div>

      {/* 11.9c — Full Width Image */}
      <div className="w-full pt-24 pb-12 md:py-16 lg:py-[90px]">
        <div className="w-full h-[200px] lg:h-[840px] overflow-hidden">
          <RevealImage src={imgImage2} className="w-full h-full" />
        </div>
      </div>

      {/* 11.9d — A System Designed to Scale */}
      <Container className="py-12 md:py-16 lg:py-[90px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="A System Designed to Scale" />
          <LargeText size="medium" text="Building a stable foundation that supports growth without breaking existing workflows." />
        </div>
      </Container>

      {/* 11.9e — Scale Image Grid */}
      <div className="w-full mb-32">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="min-w-0 h-[236px] lg:flex-1 lg:h-[748px] overflow-hidden">
            <RevealImage src={imgImage6} className="w-full h-full" />
          </div>
          <div className="w-full lg:w-[212px] shrink-0 flex flex-col gap-[8px] pr-6 lg:pr-0">
            <p className="font-display font-light text-body text-foreground tracking-tight leading-relaxed lg:hidden">
              As platforms grow, design systems matter more than screens. EduSync is built on reusable components and predictable states—reliable today, flexible for what's next.
            </p>
            <p className="hidden font-display font-light text-body text-foreground tracking-tight leading-relaxed lg:block">
              As learning platforms grow, design systems become more important than individual screens. EduSync was built around reusable components, clear content structures, and predictable states—so new features can be added without rethinking the core experience.
            </p>
            <p className="hidden font-display font-light text-body text-foreground tracking-tight leading-relaxed lg:block">
              By prioritizing consistency and adaptability, the system remains reliable for schools today while staying flexible for future needs.
            </p>
          </div>
        </div>
      </div>

      {/* 15. Impact Stats Section */}
      <Container className="mb-6 md:mb-10 lg:mb-16">
        <h2
          className="font-display font-light text-display-sm text-foreground mb-10 md:mb-20"
          style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.01em", fontWeight: 300 }}
        >
          Immediate disruption
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-20">
          <div className="font-display font-medium text-body text-foreground">Impact</div>
          <p className="max-w-[532px] font-display text-body text-foreground/80">
            EduSync was designed to address real operational pain points in school environments. From early concept validation to workflow testing, the system demonstrated immediate improvements in clarity, efficiency, and confidence across roles.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {[
            { value: "4.9", label: "Star rating on App Store" },
            { value: "43K", label: "Ratings on App Store" },
            { value: "T10", label: "Top performing apps in Education" }
          ].map((stat) => (
            <div key={stat.label} className="flex-1 py-8 md:py-10 lg:py-12 lg:px-10 flex flex-col gap-4 md:gap-6">
              <span
                className="font-display font-light text-display-lg text-foreground"
                style={{ fontSize: "clamp(56px, 8vw, 112px)", lineHeight: 1, letterSpacing: "-0.02em", fontWeight: 300 }}
              >{stat.value}</span>
              <span
                className="font-display text-h3 text-foreground/60"
                style={{ fontSize: "clamp(20px, 2vw, 24px)", lineHeight: 1.3 }}
              >{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* 16. Next Case Study */}
      <NextCaseStudy
        label="TwoStay"
        tagline="AI-powered music creation platform"
        image={mockNextStudy}
        index="02 / 06"
        onClick={() => onNavigate?.("twostay")}
      />

      {/* 17. Footer Help Section */}
      <Container className="pt-10 pb-16 md:py-24 lg:py-40 border-t border-foreground/10 flex flex-col lg:flex-row justify-between gap-10 md:gap-20">
        <h2 className="font-display font-light text-display-md text-foreground">
          How can<br />we help?
        </h2>
        <div className="flex flex-col w-full lg:w-[448px] divide-y divide-foreground/10">
          {["Work together", "Join our team", "Just say hello"].map((item) => (
            <div key={item} className="group py-8 flex items-center justify-between cursor-pointer hover:opacity-60 transition-all">
              <span className="font-display text-h3 text-foreground font-light">{item}</span>
              <svg className="size-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="currentColor">
                <path d={svgPaths.p37f30840} className="text-foreground" />
              </svg>
            </div>
          ))}
        </div>
      </Container>

      {/* 18. Final Footer Links */}
      <Container className="border-t border-foreground/10 py-10 flex flex-wrap gap-x-24 gap-y-12">
        <div className="flex flex-col gap-3">
          {["Linkedin", "Instagram", "X", "Medium"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-display text-body">{l}</span>)}
        </div>
        <div className="flex flex-col gap-3">
          {["Careers", "Contact"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-display text-body">{l}</span>)}
        </div>
        <div className="flex flex-col gap-3">
          {["Privacy", "Accessibility"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-display text-body">{l}</span>)}
        </div>
        <div className="ml-auto text-foreground/20 font-light font-display text-body">© 2026 Hein Htet</div>
      </Container>

      {/* Sticky Prototype Bar */}
      <AnimatePresence>
        {showProtoBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-x-0 bottom-5 lg:bottom-7 z-40 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 rounded-full border border-foreground/15 bg-background/70 py-2 pl-2 pr-2 sm:pl-5 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
              <span className="hidden sm:flex items-center gap-2.5 pr-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="font-display font-normal text-body-sm text-foreground whitespace-nowrap">
                  EduSync
                </span>
              </span>
              <a
                href={CASE_STUDY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-foreground/25 py-2 pl-4 pr-3.5 font-display font-normal text-body-sm whitespace-nowrap text-foreground/80 transition-colors duration-500 hover:border-foreground"
              >
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
                <span className="relative transition-colors duration-500 group-hover:text-background">Full Case Study</span>
                <BookOpen
                  className="relative h-4 w-4 transition-colors duration-500 group-hover:text-background"
                  strokeWidth={1.75}
                />
              </a>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground py-2 pl-4 pr-3.5 text-background"
              >
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
                <span className="relative font-display font-normal text-body-sm whitespace-nowrap transition-colors duration-500 group-hover:text-brand-foreground">View Prototype</span>
                <ArrowUpRight
                  className="relative h-4 w-4 text-background transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-foreground"
                  strokeWidth={1.75}
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}