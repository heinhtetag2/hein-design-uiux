import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Footer } from "./Footer";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowUpRight, BookOpen } from "lucide-react";

// Shared, data-driven case-study detail layout. This is the EduSync showcase
// structure generalized so every project (TwoStay, JoanX, Goft, …) renders the
// exact same layout, animations and chrome — only the copy and imagery change.
// See ./caseStudies.ts for the per-project data and ./EduSync.tsx for the
// original hand-built page this mirrors.

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyData {
  /** App view id this study routes to (e.g. "twostay"). */
  view: string;
  title: string;
  /** EduSync uses a serif title; others can opt in. */
  titleFont?: "serif" | "display";
  /** Three header meta pairs (Project Type / Stage / Deliverables). */
  meta: { label: string; value: string }[];
  /**
   * Pool of the project's own images. Every image slot in the layout pulls from
   * this pool (cycled), so a project with a single asset simply repeats it.
   */
  images: string[];
  /** Optional override for the top hero/banner image (defaults to images[0]). */
  heroImage?: string;
  /**
   * Pin specific image slots to specific assets, by slot index. Any slot not
   * listed falls back to the cycled `images` pool. Slot indices map to the
   * layout in order: 3 = the tall full-width feature image below the drag
   * strip, 4 = the full-width below it, 5/6 = mosaic, 7 = wide grid, 8/9 =
   * discovery pair, 10 = think grid, 11 = full-width, 12 = scale.
   */
  slots?: Record<number, string>;
  /** Images — reused across projects until real assets exist. */
  posterImage: string;
  overviewImage: string;
  thinkImage: string;

  introHeading: string;
  introText: string;
  visionHeading: string;
  visionText: string;
  collabText: string;
  mindsetHeading: string;
  mindsetText: string;
  postersPara: string[];
  stripText: string;
  courseHeading: string;
  courseText: string;
  mosaicText: string;
  wideText: string;
  discoveryText: string;
  thinkHeading: string;
  thinkText: string;
  gridText: string;
  scaleHeading: string;
  scaleText: string;
  scalePara: string[];
  impactTitle: string;
  impactLabel: string;
  impactText: string;
  stats: CaseStudyStat[];

  prototypeUrl: string;
  caseStudyUrl: string;
  /** Name shown in the sticky prototype bar. */
  protoLabel: string;

  next: {
    label: string;
    tagline: string;
    image: string;
    index: string;
    view: string;
  };
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

function SectionHeading({ text }: { text: string }) {
  return <div className="font-display font-normal text-h3 text-foreground mb-8">{text}</div>;
}

function LargeText({ text, size = "large" }: { text: string; size?: "large" | "medium" }) {
  const classes = size === "large" ? "text-display-sm" : "text-h2";
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
        restDelta: 0.001,
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
              className="block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
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

const DRAG_REPS = 3;

export function CaseStudyTemplate({
  data,
  onNavigate,
}: {
  data: CaseStudyData;
  onNavigate?: (view: string) => void;
}) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const stripWidthRef = React.useRef(0);
  const dragCursorRef = React.useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [showProtoBar, setShowProtoBar] = React.useState(false);

  // Cycle the project's image pool into every slot, so a single-image project
  // simply repeats its asset across the layout.
  const pool = data.images.length ? data.images : [""];
  const img = (i: number) => data.slots?.[i] ?? pool[i % pool.length];

  // Drag-strip cards — eight alternating portrait/landscape frames drawn from
  // the same pool, centered on the middle card.
  const dragCards = React.useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        src: img(i),
        variant: (i % 3 === 1 ? "landscape" : "portrait") as "portrait" | "landscape",
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.images, data.slots],
  );

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
      if (cards.length < dragCards.length * 2) return;
      const stripWidth = cards[dragCards.length].offsetLeft - cards[0].offsetLeft;
      stripWidthRef.current = stripWidth;

      // Center the middle card of the middle copy so the strip opens balanced.
      const localIdx = Math.floor(dragCards.length / 2);
      const hero = cards[dragCards.length + localIdx];
      const target = hero.offsetLeft - (container.offsetWidth - hero.offsetWidth) / 2;
      container.scrollLeft = target;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [dragCards.length]);

  const handleStripScroll = () => {
    const container = scrollContainerRef.current;
    const w = stripWidthRef.current;
    if (!container || w === 0) return;
    if (container.scrollLeft >= 2 * w) container.scrollLeft -= w;
    else if (container.scrollLeft < w) container.scrollLeft += w;
  };

  const titleClass =
    data.titleFont === "display"
      ? "font-display font-normal"
      : "font-serif font-normal";

  return (
    <div style={{ position: "relative" }} className="bg-background min-h-screen w-full flex flex-col items-center pb-20 relative">
      {/* 1. Header Section */}
      <Container className="pt-24 lg:pt-32 mb-2 lg:mb-20">
        <div className="mb-10">
          <h1 className={`${titleClass} text-display-2xl text-foreground text-left`}>{data.title}</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:flex lg:flex-row lg:justify-between pb-[10px] lg:gap-8">
          {data.meta.map((m, i) => (
            <div key={m.label} className={`flex flex-col gap-1 ${i === 0 ? "lg:w-[448px]" : i === 1 ? "lg:w-[212px]" : "lg:w-[400px]"}`}>
              <span className="font-display font-light text-body-sm lg:text-body text-foreground">{m.label}</span>
              <span className="font-display font-normal text-muted-foreground text-body-sm lg:text-body">{m.value}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* 2. Hero Image */}
      <div className="relative w-screen mb-32">
        <div className="w-full h-[674px] lg:h-[840px] overflow-hidden">
          <ImageWithFallback src={data.heroImage ?? img(0)} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 3. Introduction Sections */}
      <Container className="mb-20">
        <div className="lg:pr-[260px]">
          <SectionHeading text={data.introHeading} />
          <LargeText text={data.introText} />
        </div>
      </Container>

      <Container className="mb-12 lg:mb-28">
        <div className="lg:pl-[260px] lg:pr-[496px]">
          <SectionHeading text={data.visionHeading} />
          <LargeText size="medium" text={data.visionText} />
        </div>
      </Container>

      {/* 4. Video Play Section */}
      <div className="w-full mb-16 md:mb-32 flex flex-col gap-8 md:gap-10 lg:items-end">
        <RevealImage src={data.overviewImage} className="w-full aspect-video lg:h-[782px]" />
        <div className="w-full lg:max-w-[206px] lg:pr-4">
          <p className="font-display text-body text-foreground leading-relaxed">{data.collabText}</p>
        </div>
      </div>

      {/* 5. Mindset Section */}
      <Container className="mb-16 md:mb-28 lg:mb-40">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text={data.mindsetHeading} />
          <LargeText size="medium" text={data.mindsetText} />
        </div>
      </Container>

      {/* 6. Image Grid (Posters) */}
      <div className="w-full mb-28 md:mb-40 lg:mb-56 flex flex-col gap-4 md:gap-6">
        <div className="w-full h-[250px] md:h-[400px] lg:h-[778px] overflow-hidden">
          <RevealImage src={data.posterImage} className="w-full h-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="h-[360px] md:h-[460px] lg:h-[782px] overflow-hidden">
            <RevealImage src={img(1)} className="w-full h-full" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-[200px] lg:h-[384px] overflow-hidden">
              <RevealImage src={img(2)} className="w-full h-full" />
            </div>
            <div className="font-display text-body text-foreground/80 space-y-4 max-w-[400px]">
              {data.postersPara.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
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
            if (dragCursorRef.current) {
              dragCursorRef.current.style.left = `${e.clientX}px`;
              dragCursorRef.current.style.top = `${e.clientY}px`;
            }
          }}
          onMouseLeave={() => {
            setShowCursor(false);
            setIsDragging(false);
          }}
        >
          {/* Custom Drag Cursor */}
          {showCursor && (
            <div
              ref={dragCursorRef}
              className="fixed pointer-events-none z-50 transition-transform duration-200 ease-out"
              style={{
                transform: `translate(-50%, -50%) scale(${isDragging ? 0.92 : 1})`,
              }}
            >
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 88, height: 88, border: "1.25px solid var(--brand)", background: "transparent" }}
              >
                <span className="font-display font-light text-[13px] text-white tracking-tight leading-none">Drag</span>
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
              dragCards.map((card, i) => (
                <div
                  key={`${copy}-${i}`}
                  data-drag-card
                  className={
                    card.variant === "portrait"
                      ? "w-[285px] h-[360px] lg:w-[460px] lg:h-[570px] shrink-0 overflow-hidden rounded-none"
                      : "w-[348px] h-[280px] lg:w-[580px] lg:h-[456px] shrink-0 overflow-hidden rounded-none"
                  }
                >
                  <ImageWithFallback src={card.src} className="w-full h-full object-cover" />
                </div>
              )),
            )}
          </div>
        </div>

        {/* Description below cards — narrow column, left-aligned to match the gallery rhythm */}
        <div className="w-full mt-16 lg:mt-24">
          <div className="pl-6 lg:pl-[14vw]">
            <p className="font-display font-light text-body text-foreground/85 max-w-[320px] lg:mx-0 lg:text-left text-left leading-relaxed">
              {data.stripText}
            </p>
          </div>
        </div>
      </div>

      {/* 9. Full Width Images */}
      <div className="w-full mb-32 flex flex-col gap-28 lg:gap-20">
        <div className="w-full h-[200px] lg:h-[784px] overflow-hidden">
          <RevealImage src={img(3)} className="w-full h-full" />
        </div>
        <div className="w-full h-[200px] lg:h-[590px] overflow-hidden">
          <RevealImage src={img(4)} className="w-full h-full" />
        </div>
      </div>

      {/* 10. Course Management Section */}
      <Container className="mb-16 md:mb-28 lg:mb-40">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text={data.courseHeading} />
          <LargeText size="medium" text={data.courseText} />
        </div>
      </Container>

      {/* 11. App Detail Mosaic Grid */}
      <div className="w-full mb-28 md:mb-32 flex flex-col lg:flex-row gap-6">
        <div className="contents lg:flex lg:flex-col lg:gap-6 lg:w-[424px] lg:h-[782px]">
          <div className="order-3 lg:order-none pr-6 lg:pr-0 lg:max-w-[262px]">
            <p className="font-display text-body text-foreground">{data.mosaicText}</p>
          </div>
          <div className="order-1 lg:order-none h-[444px] lg:flex-1 lg:min-h-0 overflow-hidden">
            <RevealImage src={img(5)} className="w-full h-full" />
          </div>
        </div>
        <div className="order-2 lg:order-none h-[284px] md:h-[400px] lg:flex-1 lg:h-[782px] overflow-hidden">
          <RevealImage src={img(6)} className="w-full h-full" />
        </div>
      </div>

      {/* 11.5 Wide Image Grid Section */}
      <div className="w-full mb-16 md:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-10 h-[236px] lg:h-[748px] overflow-hidden">
          <RevealImage src={img(7)} className="w-full h-full" />
        </div>
        <div className="lg:col-span-2 flex items-start pr-6 lg:pr-0">
          <p className="font-display text-body text-foreground w-full lg:w-auto lg:max-w-[197px]">{data.wideText}</p>
        </div>
      </div>

      {/* 11.9 — Discovery Image Grid (hidden for now) */}
      {false && (
      <div className="w-full py-12 md:py-16 lg:py-[90px]">
        <div className="flex flex-col lg:grid lg:grid-cols-[0.92fr_1.08fr] gap-[24px] items-start lg:items-stretch w-full">
          <div className="contents lg:flex lg:flex-col lg:gap-[24px] lg:min-w-0 lg:items-start lg:justify-center lg:self-stretch">
            <div className="order-3 lg:order-none w-full pr-6 lg:pr-0">
              <div className="flex flex-col gap-[8px] font-display font-light text-body text-foreground tracking-tight">
                <p className="leading-relaxed">{data.discoveryText}</p>
              </div>
            </div>
            <div className="order-1 lg:order-none w-full overflow-hidden h-[280px] md:h-[420px] lg:h-auto lg:flex-1 lg:min-h-px">
              <RevealImage src={img(8)} className="w-full h-full" />
            </div>
          </div>
          <div className="order-2 lg:order-none w-full lg:min-w-0 h-[400px] md:h-[600px] lg:h-[900px] overflow-hidden">
            <RevealImage src={img(9)} className="w-full h-full" />
          </div>
        </div>
      </div>
      )}

      {/* 12. Think Different Section (hidden for now) */}
      {false && (
      <Container className="mt-14 lg:mt-0 mb-[60px] md:mb-[100px] lg:mb-[140px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text={data.thinkHeading} />
          <LargeText size="medium" text={data.thinkText} />
        </div>
      </Container>
      )}

      {/* 12.5 Grid Layout with Text + Images (hidden for now) */}
      {false && (
      <div className="w-full mb-16 md:mb-32 flex flex-col lg:flex-row gap-6">
        <div className="contents lg:flex lg:flex-col lg:gap-4 lg:w-[424px] lg:h-[782px]">
          <div className="order-3 lg:order-none pr-6 lg:pr-0 lg:max-w-[262px]">
            <p className="font-display text-body text-foreground">{data.gridText}</p>
          </div>
          <div className="order-1 lg:order-none h-[444px] lg:flex-1 lg:min-h-0 overflow-hidden">
            <RevealImage src={data.thinkImage} className="w-full h-full" />
          </div>
        </div>
        <div className="order-2 lg:order-none h-[284px] lg:flex-1 lg:h-[782px] overflow-hidden">
          <RevealImage src={img(10)} className="w-full h-full" />
        </div>
      </div>
      )}

      {/* 11.9c — Full Width Image (hidden for now) */}
      {false && (
      <div className="w-full pt-24 pb-12 md:py-16 lg:py-[90px]">
        <div className="w-full h-[200px] lg:h-[840px] overflow-hidden">
          <RevealImage src={img(11)} className="w-full h-full" />
        </div>
      </div>
      )}

      {/* 11.9d — A System Designed to Scale (hidden for now) */}
      {false && (
      <Container className="py-12 md:py-16 lg:py-[90px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text={data.scaleHeading} />
          <LargeText size="medium" text={data.scaleText} />
        </div>
      </Container>
      )}

      {/* 11.9e — Scale Image Grid (hidden for now) */}
      {false && (
      <div className="w-full mb-32">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="min-w-0 h-[236px] lg:flex-1 lg:h-[748px] overflow-hidden">
            <RevealImage src={img(12)} className="w-full h-full" />
          </div>
          <div className="w-full lg:w-[212px] shrink-0 flex flex-col gap-[8px] pr-6 lg:pr-0">
            {data.scalePara.map((p, i) => (
              <p
                key={i}
                className={`font-display font-light text-body text-foreground tracking-tight leading-relaxed ${
                  i === 0 ? "lg:hidden" : "hidden lg:block"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* 15. Impact Stats Section */}
      <Container className="mb-10 md:mb-16 lg:mb-24 md:pl-[150px] md:pr-[90px]">
        <h2
          className="font-display font-light text-display-sm text-foreground mb-10 md:mb-20"
          style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.01em", fontWeight: 300 }}
        >
          {data.impactTitle}
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-20">
          <div className="font-display font-medium text-body text-foreground">{data.impactLabel}</div>
          <p className="max-w-[532px] font-display text-body text-foreground/80">{data.impactText}</p>
        </div>

        <div>
          {data.stats.map((stat) => (
            <div key={stat.label} className="border-t border-foreground/15 md:-ml-[150px] md:-mr-[90px]">
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-end md:gap-6 lg:gap-8 md:pl-[150px] pr-[6%] md:pr-[6%] lg:pr-[8%] py-8 md:py-10 lg:py-12">
                <span
                  className="font-serif font-light text-foreground block md:inline-block md:shrink-0 text-left md:text-right md:w-[clamp(140px,16vw,240px)]"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(56px, 15vw, 96px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-serif font-light text-foreground/70 block md:inline-block md:shrink-0 md:w-[280px] text-left"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(17px, 4.2vw, 24px)", lineHeight: 1.3 }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* 16. Next Case Study */}
      <NextCaseStudy
        label={data.next.label}
        tagline={data.next.tagline}
        image={data.next.image}
        index={data.next.index}
        onClick={() => onNavigate?.(data.next.view)}
      />

      {/* 17. Footer */}
      <Footer onNavigate={onNavigate} />

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
            <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 rounded-full border border-foreground/15 bg-background/95 py-2 pl-2 pr-2 sm:pl-5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
              <span className="hidden sm:flex items-center gap-2.5 pr-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                <span className="font-display font-normal text-body-sm text-foreground whitespace-nowrap">{data.protoLabel}</span>
              </span>
              <a
                href={data.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-foreground/25 py-2 pl-4 pr-3.5 font-display font-normal text-body-sm whitespace-nowrap text-foreground/80 transition-colors duration-500 hover:border-foreground"
              >
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />
                <span className="relative transition-colors duration-500 group-hover:text-background">Full Case Study</span>
                <BookOpen className="relative h-4 w-4 transition-colors duration-500 group-hover:text-background" strokeWidth={1.75} />
              </a>
              <a
                href={data.prototypeUrl}
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
