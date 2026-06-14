import React, { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FilterPills } from "./FilterPills";
import { CaseStudyVideo } from "./CaseStudyVideo";
import svgPaths from "../../imports/svg-whatido";
import maxonVideo from "../../assets/what-i-do/maxon-video.mp4";
import imgALaptop from "../../assets/work/uber/laptop.webp";
import imgStadium from "../../assets/what-i-do/stadium.webp";
import imgWomanWatermelon from "../../assets/what-i-do/woman-watermelon.webp";
import imgFearlessGirl from "../../assets/work/upwork/fearless-girl.webp";
import imgModular from "../../assets/work/modular/cover.webp";
import imgHeadspace from "../../assets/work/headspace/full.webp";
import { imgVector, imgVector1 } from "../../imports/svg-whatido-vec";
import { useScroll, useTransform, useSpring, useInView, animate, motion } from "motion/react";

const formatDuration = (startYear: number, startMonth: number) => {
  const now = new Date();
  const totalMonths = Math.max(
    0,
    (now.getFullYear() - startYear) * 12 + (now.getMonth() - (startMonth - 1))
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearPart = years > 0 ? `${years}yr${years > 1 ? "s" : ""}` : "";
  const monthPart = months > 0 ? `${months}mo` : "";
  return [yearPart, monthPart].filter(Boolean).join(" ") || "0mo";
};

const EXPERIENCES = [
  {
    role: "UI/UX Designer",
    company: "Tagoplus (Korea)",
    type: `Full Time (${formatDuration(2024, 1)})`,
    description: "I work across every stage of the product here, from research and prototyping to design systems, visual graphics, and illustrations, right through to shipping the software itself. I partner closely with stakeholders and developers, learning from their perspective to ship work that ties design decisions to real business outcomes.",
    categories: ["UI/UX", "Visual", "Development"],
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    type: "Since 2024 – Present",
    description: "Working with startups and brands across the globe on product design, branding, and motion — shipping work end-to-end, from first sketch to launch.",
    categories: ["UI/UX", "Visual"],
  },
];

const STATS = [
  { label: ["Years", "designing"], val: 2, suffix: "+" },
  { label: ["Projects", "shipped"], val: 12, suffix: "+" },
  { label: ["Happy", "clients"], val: 10, suffix: "+" },
  { label: ["Industries", "covered"], val: 8, suffix: "" },
  { label: ["Countries", "reached"], val: 4, suffix: "" },
];

function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{display}</span>;
}

export function WhatIDo() {
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  // Viewport width in state (not a ref) so the banner width recomputes on the
  // very first paint and on resize — a ref starts at 0 and the transform would
  // never re-run until scroll, leaving the banner at the wrong start width.
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? document.documentElement.clientWidth : 0
  );

  const [expFilters, setExpFilters] = useState<Set<string>>(new Set());
  const toggleExpFilter = (cat: string) => {
    if (cat === "All") {
      setExpFilters(new Set());
      return;
    }
    setExpFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  // Animate the banner width in pixels (Framer can't interpolate a motion
  // value across mixed units). Target the full visible viewport width so the
  // banner bleeds edge-to-edge past the page's side padding when expanded.
  useEffect(() => {
    const measure = () => setViewportWidth(document.documentElement.clientWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Banner grows to its container's full width over the first half of the hero
  // scroll, eased (easeInOutCubic) for a soft landing.
  const BANNER_START = 460;
  const bannerWidth = useTransform(heroScroll, (p) => {
    const full = viewportWidth || BANNER_START;
    // Desktop starts at a fixed 460px. On narrow (mobile) viewports start at ~52%
    // of the screen so it begins as a small card and expands to full on scroll.
    const start = full < 768 ? full * 0.52 : Math.min(BANNER_START, full);
    const t = Math.min(1, Math.max(0, p / 0.5));
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return start + (full - start) * eased;
  });
  const bannerRadius = useTransform(heroScroll, [0, 0.3, 0.5], ["12px", "12px", "0px"]);

  // Overdamped spring — smooth glide with no overshoot, so the strip eases
  // with the scroll but never springs/slides back after it stops.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 50,
    mass: 0.25,
    restDelta: 0.0005,
  });
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div style={{ position: 'relative' }} className="bg-background text-foreground flex flex-col items-start pt-page w-screen min-h-screen relative overflow-x-hidden ml-[calc(-50vw+50%)]">
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        style={{ position: 'relative' }} 
        className="flex flex-col items-center w-full relative px-6"
      >
        <h1 className="font-serif font-light text-[clamp(64px,10vw,88px)] leading-[1.1] tracking-[-0.025em] text-center mb-8">
          Designing experiences<br />powered by AI thinking
        </h1>
        <div className="mt-12 md:mt-[90px] mb-12 md:mb-[90px] w-full flex justify-center relative">
          <motion.div
            style={{
              width: bannerWidth,
              borderTopLeftRadius: bannerRadius,
              borderTopRightRadius: bannerRadius,
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
              position: 'relative',
              overflow: 'hidden'
            }}
            className="h-[clamp(440px,66vh,620px)] md:h-[794px] bg-foreground/20 relative"
          >
            <CaseStudyVideo src={maxonVideo} className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Breakthrough Products Section */}
      <div className="w-full py-[60px] md:py-[90px] relative px-6 md:pl-[144px]">
        <div className="max-w-[866px] relative">
          <h2 className="font-serif font-light text-foreground text-h1 relative">
            I combine UI/UX craft with AI-driven workflows to design products that feel intuitive and ship faster
          </h2>
        </div>
      </div>

      {/* Parallel Scrolling Image List */}
      <div 
        ref={targetRef} 
        style={{ position: 'relative' }} 
        className="w-full overflow-hidden pb-[60px] md:pb-[90px] relative"
      >
        <motion.div
          style={{
            x,
            position: 'relative',
            willChange: 'transform',
          }}
          className="flex gap-[16px] md:gap-[24px] 3xl:gap-[32px] lg:pl-[clamp(100px,20vw,260px)] min-w-max items-start relative"
        >
          <div className="w-[236px] h-[187px] 3xl:w-[320px] 3xl:h-[254px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgALaptop} className="w-full h-full object-cover" />
          </div>
          <div className="w-[449px] h-[295px] 3xl:w-[608px] 3xl:h-[400px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgStadium} className="w-full h-full object-cover" />
          </div>
          <div className="w-[213px] h-[213px] 3xl:w-[288px] 3xl:h-[288px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgWomanWatermelon} className="w-full h-full object-cover" />
          </div>
          <div className="w-[449px] h-[317px] 3xl:w-[608px] 3xl:h-[430px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgFearlessGirl} className="w-full h-full object-cover" />
          </div>
          <div className="w-[343px] h-[351px] 3xl:w-[464px] 3xl:h-[475px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgModular} className="w-full h-full object-cover" />
          </div>
          <div className="w-[213px] h-[351px] 3xl:w-[288px] 3xl:h-[475px] shrink-0 overflow-hidden rounded-none bg-foreground/10">
            <ImageWithFallback src={imgHeadspace} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* What I Do Headline */}
      <div className="w-full py-[32px] px-6">
                <h3 className="font-display font-normal text-h2 text-foreground">
          What I do
        </h3>
      </div>

      {/* Services Grid */}
      <div className="w-full border-t border-foreground/10 px-0">
        <ServiceRow
          title="AI-enhanced UX research & strategy"
          description="I use AI tools to accelerate user research, synthesize insights, and define product direction — turning weeks of discovery into days without losing depth."
          image={imgWomanWatermelon}
        />
        <ServiceRow
          title="Design systems & pixel-perfect interfaces"
          description="From design tokens to production-ready components, I craft scalable design systems and high-fidelity interfaces that maintain consistency across every touchpoint."
          image={imgFearlessGirl}
        />
        <ServiceRow
          title="Rapid prototyping with AI workflows"
          description="I leverage AI-powered design and development tools to go from concept to interactive prototype fast — validating ideas early and iterating with real user feedback."
          image={imgStadium}
        />
        <ServiceRow
          title="Usability testing & product validation"
          description="I validate designs with real users — running usability sessions, gathering honest feedback, and tracking the outcomes that matter — then iterate until the product is one people genuinely succeed with."
          image={imgHeadspace}
        />
      </div>

      {/* Categories List */}
      <div className="w-full py-[48px] md:py-[90px] grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-[24px] px-6">
        <CategorySection
          title="Design & UX"
          items={["UI/UX Design", "Design Systems", "Interaction Design", "UX Research & Testing", "Wireframing & Prototyping"]}
        />
        <CategorySection
          title="AI Workflow"
          items={["AI-Assisted Design", "Prompt Engineering for Design", "AI Prototyping Tools", "Generative UI Exploration"]}
        />
        <CategorySection
          title="Strategy & Delivery"
          items={["Product Thinking", "Design Sprint Facilitation", "Design-to-Dev Handoff", "Usability Audits"]}
        />
      </div>

      {/* Stats Grid */}
      <div className="w-full px-6 py-[48px] md:py-[90px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-[clamp(24px,3vw,64px)] gap-y-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[300px] md:h-[390px] flex flex-col justify-between pl-0 pb-6 lg:pl-6 lg:pb-0 group"
            >
              {/* Divider: horizontal at the bottom on mobile, vertical on the left on desktop */}
              <div className="absolute bottom-0 left-0 right-0 h-px lg:top-0 lg:right-auto lg:h-auto lg:w-px bg-brand" />
              <div className="flex flex-col gap-1 text-body md:text-h3 text-foreground/80 leading-tight pt-4">
                {stat.label.map((l, j) => <span key={j}>{l}</span>)}
              </div>
              <div className="flex items-baseline gap-1 pb-4">
                <span className="font-display text-[120px] lg:text-[110px]! 2xl:text-[140px]! font-light leading-none tabular-nums">
                  <CountUp to={stat.val} />
                </span>
                {stat.suffix && (
                  <span className="font-display text-h2 font-normal">{stat.suffix}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Career Experiences */}
      <div className="w-full px-6 py-[60px] md:py-[90px] lg:py-[120px]">
        <div className="mx-auto max-w-[1280px] 2xl:max-w-[1560px] flex flex-col lg:flex-row items-start justify-between border-t border-foreground/10 pt-10 md:pt-20">
          <div className="lg:w-[464px]">
            <h2 className="font-serif text-h1 font-light" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.1 }}>My Carrier —<br />Experiences</h2>
          </div>
          <div className="lg:w-[812px] 2xl:w-[1000px] pt-10 lg:pt-4">
            <FilterPills
              categories={["All", "UI/UX", "Visual", "Development"]}
              selected={expFilters}
              onToggle={toggleExpFilter}
              className="mb-4 lg:mb-16"
            />
            <div className="space-y-0">
              {EXPERIENCES.filter(e => expFilters.size === 0 || e.categories.some(c => expFilters.has(c))).map((exp, i) => (
                <div key={i} className="border-t border-foreground/10 py-6 lg:py-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-6 text-h3 text-foreground">
                    <h3 className="font-light">{exp.role}</h3>
                    <span className="text-foreground/60 text-body font-light">{exp.company}</span>
                    <span className="text-foreground text-body font-light">{exp.type}</span>
                  </div>
                  <p className="text-foreground/60 text-body font-light max-w-[700px]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="w-full py-[60px] md:py-[100px] lg:py-[178px] px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <h2 className="font-display font-light text-display-md text-foreground">
            How can<br />I help?
          </h2>
          <div className="w-full lg:w-[448px] flex flex-col">
            <HelpLink label="Work together" />
            <HelpLink label="Join our team" />
            <HelpLink label="Just say hello" />
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="w-full border-t border-foreground/10 mt-auto px-6">
        <div className="py-[32px] md:py-[50px] flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          <div className="flex gap-[24px] flex-wrap">
            <div className="flex flex-col gap-2 min-w-[120px]">
              <FooterLink label="Linkedin" />
              <FooterLink label="Instagram" />
              <FooterLink label="X" />
              <FooterLink label="Medium" />
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <FooterLink label="Careers" />
              <FooterLink label="Contact" />
            </div>
            <div className="flex flex-col gap-2 min-w-[120px]">
              <FooterLink label="Privacy" />
              <FooterLink label="Accessiblity" />
            </div>
          </div>
          
          <div className="size-[24px] flex items-center justify-center relative">
             <svg className="size-full" viewBox="0 0 24 24" fill="none">
               <path d={svgPaths.p38850280} fill="currentColor" className="fill-foreground" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceRow({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <motion.div 
      initial="initial"
      whileHover="hovered"
      className="w-full border-b border-foreground/10 relative group cursor-pointer overflow-hidden"
    >
      {/* Soft background that fades in on hover — kept clearly visible */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-t from-foreground/[0.10] via-foreground/[0.07] to-foreground/[0.04]" />

      {/* Hover expansion — opens the card upward by adding space above the content */}
      <div className="hidden lg:block w-full h-0 group-hover:h-[64px] transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

      <div className="relative z-[1] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 px-6 py-[32px] md:py-[50px] lg:min-h-[280px]">
        {/* Heading */}
        <div className="w-full lg:w-[460px] xl:w-[640px] 2xl:w-[760px]">
          <h4 className="font-serif font-light text-h1 text-foreground">
            {title}
          </h4>
        </div>

        {/* Mobile image — always visible, sits between title and description */}
        <div className="lg:hidden w-full aspect-video overflow-hidden rounded-none">
          <ImageWithFallback src={image} className="w-full h-full object-cover" />
        </div>

        {/* Center/Right Content Group */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[40px] relative">
          {/* Animated Image Container — clip-mask reveal from the bottom */}
          <motion.div
            variants={{
              initial: { clipPath: "inset(100% 0% 0% 0%)" },
              hovered: { clipPath: "inset(0% 0% 0% 0%)" }
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block w-[clamp(200px,20vw,308px)] h-[180px] shrink-0 overflow-hidden rounded-none relative"
          >
            {/* Inner layer drifts up slightly as the mask reveals — gentle parallax */}
            <motion.div
              variants={{
                initial: { y: "10%", scale: 1.06 },
                hovered: { y: "0%", scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={image}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Paragraph */}
          <div className="w-full lg:w-[418px]">
            <p className="font-display font-normal text-muted-foreground text-body">
              {description}
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

function CategorySection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-[15px]">
      <h5 className="font-display font-normal text-body-sm md:text-body text-foreground">
        {title}
      </h5>
      <div className="w-[24px] h-[1px] bg-foreground/10" />
      <div className="flex flex-col gap-[12px]">
        {items.map((item) => (
          <span key={item} className="font-display font-normal text-body-sm md:text-body text-foreground/80">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HelpLink({ label }: { label: string }) {
  return (
    <button className="w-full h-[80px] border-b border-foreground/10 flex items-center justify-between group cursor-pointer text-left">
      <span className="font-display font-light text-h3 text-foreground group-hover:opacity-60 transition-opacity">
        {label}
      </span>
      <svg className="size-[16px] text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 16 16" fill="none">
        <path d={svgPaths.p37f30840} fill="currentColor" />
      </svg>
    </button>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <button className="font-display font-normal text-body-sm md:text-body text-foreground hover:opacity-60 transition-opacity cursor-pointer text-left">
      {label}
    </button>
  );
}