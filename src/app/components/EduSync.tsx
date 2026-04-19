import React from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-hddcdrfc75";
import imgHero from "figma:asset/4fee91cd6da97cd074f5f2d3688da4b21b527368.png";
import imgVideo from "figma:asset/c0e27df19987b0111c135648261e2b7a0073d7b6.png";
import imgFrame78 from "figma:asset/c619eef3495a0460eeae6e92bd0102cc5ef1c00b.png";
import imgFrame79 from "figma:asset/cab647aa049a4e042e08a8d72bab02d6b13ab877.png";
import imgFrame80 from "figma:asset/20eb2b438a61a9cd9dabc51b1c5cbac35ce60576.png";
import imgApp1 from "figma:asset/d7e9594efbc1437a46cb4ab6ebd5249ccaa232df.png";
import imgApp2 from "figma:asset/70ea0115732653ee767011fc986beb0c346e312a.png";
import imgApp3 from "figma:asset/7d8e089fa8ab9cf6b7be979ec235d6faf97770ca.png";
import imgImage1 from "figma:asset/dc6b2be9a3fe15e13443037163a086f6c25ed151.png";
import imgFrame81 from "figma:asset/2adfbf209eadb16469e199fbca27f8b4691a513f.png";
import imgFrame82 from "figma:asset/b1ae1dc4e5ce02ea12b387406cc8b83e659cadc5.png";
import imgFrame83 from "figma:asset/b512a8e59c334e920f829e74c1ee398898fd445c.png";
import imgImage2 from "figma:asset/f0ec07ca565c1a95fda88e2cb24343fa120c072c.png";
import imgImage3 from "figma:asset/5eb982b5824319bd5a74858110b312dc486a0a1e.png";
import imgImage4 from "figma:asset/cc9e89b25eec8b0f3759c93bcb2c54aca1db9f8a.png";
import imgImage5 from "figma:asset/74ef61486338497c6e740f722ff2ffcc8fe76d50.png";
import imgImage6 from "figma:asset/01e851303400652197baccefb81a6cc03bc0711c.png";
import imgImage7 from "figma:asset/53fc9b7bd8060955d79a9cc6942052612d15a006.png";
import imgImage8 from "figma:asset/5955ed1fe9f3dffa5dbab928308ed300787adbab.png";
import imgImage9 from "figma:asset/b3d92bff26473a4a3c9dbf3ad55b6b18d6b7b379.png";
import imgMapImage from "figma:asset/a69c8495dcaf009e877f7edc68539b20116054e3.png";

import { ImageWithFallback } from "./figma/ImageWithFallback";

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-full max-w-[1800px] ${className}`}>{children}</div>;
}

function SectionHeading({ text }: { text: string }) {
  return <div className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[20px] text-foreground tracking-tight mb-8">{text}</div>;
}

function LargeText({ text, size = "large" }: { text: string, size?: "large" | "medium" }) {
  const classes = size === "large" 
    ? "text-[32px] lg:text-[56px] tracking-[-1px] leading-tight" 
    : "text-[24px] lg:text-[40px] tracking-[-1.2px] leading-tight";
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
      className={`font-['Clash_Grotesk_Variable',sans-serif] font-light text-foreground ${classes}`}
    >
      {text}
    </motion.p>
  );
}

function RevealImage({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-background z-10"
      />
      <ImageWithFallback src={src} className="block w-full h-full object-cover" />
    </div>
  );
}

export function EduSync({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    // Center the second card on mount
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;
      const firstCardWidth = 460;
      const gap = 184;
      // Scroll to position where second card is centered
      const scrollPosition = firstCardWidth + gap - (containerWidth / 2) + (576 / 2);
      container.scrollLeft = scrollPosition;
    }
  }, []);

  return (
    <div style={{ position: 'relative' }} className="bg-background min-h-screen w-full flex flex-col items-center pb-20 selection:bg-[#584dff] selection:text-white relative">
      
      {/* 1. Header Section */}
      <Container className="pt-24 lg:pt-32 mb-20">
        <h1 className="font-['Cormorant',serif] font-normal text-[80px] lg:text-[160px] text-foreground tracking-[-2px] leading-none mb-10 text-left">
          EduSync
        </h1>
        <div className="flex flex-col lg:flex-row justify-between pb-[10px] gap-8">
          <div className="flex flex-col gap-1 lg:w-[448px]">
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground">Project Type</span>
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-muted-foreground text-[16px]">Full Product System</span>
          </div>
          <div className="flex flex-col gap-1 lg:w-[212px]">
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground">Stage</span>
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-muted-foreground text-[16px]">Concept · MVP-ready</span>
          </div>
          <div className="flex flex-col gap-1 lg:w-[400px]">
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground">Deliverables</span>
            <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-muted-foreground text-[16px]">UX Strategy · Dashboard Design · Workflow System</span>
          </div>
        </div>
      </Container>

      {/* 2. Hero Image */}
      <div className="w-full mb-32 max-w-[1800px]">
        <div className="w-full h-[500px] lg:h-[840px] overflow-hidden">
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

      <Container className="mb-28">
        <div className="lg:pl-[260px] lg:pr-[496px]">
          <SectionHeading text="The vision" />
          <LargeText size="medium" text="Build a system where learning flows naturally without operational noise." />
        </div>
      </Container>

      {/* 4. Video Play Section */}
      <div className="w-full mb-32 max-w-[1800px] flex flex-col items-end gap-10">
        <div className="w-full aspect-video lg:h-[782px] relative overflow-hidden group cursor-pointer">
          <RevealImage src={imgVideo} className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.span 
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
              className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[60px] lg:text-[164px] text-white tracking-[-6px]"
            >
              Play
            </motion.span>
          </div>
        </div>
        <div className="max-w-[206px] pr-4">
           <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground leading-relaxed">
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
      <div className="w-full mb-16 md:mb-32 max-w-[1800px] flex flex-col gap-4 md:gap-6">
        <div className="w-full h-[250px] md:h-[400px] lg:h-[778px] overflow-hidden">
          <RevealImage src={imgFrame78} className="w-full h-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
           <div className="h-[250px] md:h-[400px] lg:h-[782px] overflow-hidden">
             <RevealImage src={imgFrame79} className="w-full h-full" />
           </div>
           <div className="flex flex-col gap-6">
              <div className="h-[200px] lg:h-[384px] overflow-hidden">
                 <RevealImage src={imgFrame80} className="w-full h-full" />
              </div>
              <div className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground/80 space-y-4 max-w-[400px]">
                 <p>Education systems are becoming more complex, with more tools, more data, and more stakeholders involved. EduSync was designed to bring structure to that complexity turning scattered processes into clear, connected workflows.</p>
                 <p>To support this, I designed a flexible system that adapts across roles and scenarios, balancing control with simplicity while remaining ready for what comes next.</p>
              </div>
           </div>
        </div>
      </div>

      {/* 7. Image Grid 1 (Horizontal Strip) */}
      <div className="w-full mb-32">
        <div 
          className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] snap-x snap-mandatory relative" 
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          ref={scrollContainerRef}
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
              className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
              style={{ 
                left: `${cursorPos.x}px`, 
                top: `${cursorPos.y}px`,
                transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`
              }}
            >
              <div className="flex items-center gap-3 border border-white/80 rounded-full px-5 py-2.5">
                <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                  <path d="M4 1L1 4M1 4L4 7M1 4H9" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-white tracking-tight">Drag</span>
                <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                  <path d="M6 1L9 4M9 4L6 7M9 4H1" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}

          <div 
            className="flex gap-4 lg:gap-[120px] items-center min-w-max cursor-none select-none" 
            onMouseDown={(e) => {
              if (e.button !== 0) return; // Only left click
              e.preventDefault();
              setIsDragging(true);
              const slider = e.currentTarget.parentElement;
              if (!slider) return;
              
              const startX = e.clientX;
              const scrollLeft = slider.scrollLeft;
              
              const handleMouseMove = (e: MouseEvent) => {
                const x = e.clientX;
                const distance = x - startX;
                slider.scrollLeft = scrollLeft - distance;
              };
              
              const handleMouseUp = () => {
                setIsDragging(false);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
             <div 
               className="w-[260px] h-[325px] lg:w-[420px] lg:h-[520px] shrink-0 snap-center overflow-hidden rounded-none"
               onClick={(e) => {
                 e.stopPropagation();
                 const card = e.currentTarget;
                 const container = scrollContainerRef.current;
                 if (!container) return;
                 const cardLeft = card.offsetLeft;
                 const containerWidth = container.offsetWidth;
                 const cardWidth = card.offsetWidth;
                 const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                 container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
               }}
             >
               <ImageWithFallback src={imgApp1} className="w-full h-full object-cover" />
             </div>
             <div 
               className="w-[260px] h-[260px] lg:w-[520px] lg:h-[415px] shrink-0 snap-center overflow-hidden rounded-none"
               onClick={(e) => {
                 e.stopPropagation();
                 const card = e.currentTarget;
                 const container = scrollContainerRef.current;
                 if (!container) return;
                 const cardLeft = card.offsetLeft;
                 const containerWidth = container.offsetWidth;
                 const cardWidth = card.offsetWidth;
                 const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                 container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
               }}
             >
               <ImageWithFallback src={imgApp2} className="w-full h-full object-cover" />
             </div>
             <div 
               className="w-[260px] h-[325px] lg:w-[420px] lg:h-[520px] shrink-0 snap-center overflow-hidden rounded-none"
               onClick={(e) => {
                 e.stopPropagation();
                 const card = e.currentTarget;
                 const container = scrollContainerRef.current;
                 if (!container) return;
                 const cardLeft = card.offsetLeft;
                 const containerWidth = container.offsetWidth;
                 const cardWidth = card.offsetWidth;
                 const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                 container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
               }}
             >
               <ImageWithFallback src={imgApp3} className="w-full h-full object-cover" />
             </div>
             <div 
               className="w-[260px] h-[260px] lg:w-[520px] lg:h-[415px] shrink-0 snap-center overflow-hidden rounded-none"
               onClick={(e) => {
                 e.stopPropagation();
                 const card = e.currentTarget;
                 const container = scrollContainerRef.current;
                 if (!container) return;
                 const cardLeft = card.offsetLeft;
                 const containerWidth = container.offsetWidth;
                 const cardWidth = card.offsetWidth;
                 const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                 container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
               }}
             >
               <ImageWithFallback src={imgApp2} className="w-full h-full object-cover" />
             </div>
             <div 
               className="w-[260px] h-[325px] lg:w-[420px] lg:h-[520px] shrink-0 snap-center overflow-hidden rounded-none"
               onClick={(e) => {
                 e.stopPropagation();
                 const card = e.currentTarget;
                 const container = scrollContainerRef.current;
                 if (!container) return;
                 const cardLeft = card.offsetLeft;
                 const containerWidth = container.offsetWidth;
                 const cardWidth = card.offsetWidth;
                 const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
                 container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
               }}
             >
               <ImageWithFallback src={imgApp1} className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
        
        {/* Description below cards - mobile centered, desktop left aligned */}
        <div className="w-full mt-10 lg:mt-12">
          <div className="max-w-[1800px] mx-auto lg:pl-[260px]">
            <p className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground max-w-[212px] mx-auto lg:mx-0 lg:text-left text-left">
              By balancing structure and flexibility, EduSync creates a system that feels both controlled and human. Administrators gain oversight, teachers gain freedom, and learning becomes accessible without unnecessary complexity.
            </p>
          </div>
        </div>
      </div>

      {/* 9. Full Width Images */}
      <div className="w-full mb-32 max-w-[1800px] flex flex-col gap-20">
        <div className="w-full h-[600px] lg:h-[840px] overflow-hidden">
          <RevealImage src={imgImage1} className="w-full h-full" />
        </div>
        <div className="w-full h-[600px] lg:h-[590px] overflow-hidden">
          <RevealImage src={imgVideo} className="w-full h-full" />
        </div>
      </div>

      {/* 10. Course Management Section */}
      <Container className="mb-40">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="Course Management" />
          <LargeText size="medium" text="Structuring learning through clear roles, reviews, and workflows." />
        </div>
      </Container>

      {/* 11. App Detail Mosaic Grid */}
      <div className="w-full mb-16 md:mb-32 max-w-[1800px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 justify-between lg:w-[617px] h-[400px] md:h-[600px] lg:h-[782px]">
           <div className="max-w-[400px]">
              <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
           </div>
           <div className="flex-1 overflow-hidden">
              <RevealImage src={imgFrame81} className="w-full h-full" />
           </div>
        </div>
        <div className="flex-1 h-[300px] md:h-[500px] lg:h-[782px] overflow-hidden">
           <RevealImage src={imgApp1} className="w-full h-full" />
        </div>
      </div>

      {/* 11.5 Wide Image Grid Section */}
      <div className="w-full mb-16 md:mb-32 max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-10 h-[400px] lg:h-[748px] overflow-hidden">
           <RevealImage src={imgImage3} className="w-full h-full" />
        </div>
        <div className="lg:col-span-2 flex items-start">
           <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground max-w-[197px]">Structuring learning through clear roles, reviews, and workflows.</p>
        </div>
      </div>

      {/* 11.6 Grid Layout with Text + Images */}
      <div className="w-full mb-16 md:mb-32 max-w-[1800px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 lg:w-[600px] h-[400px] md:h-[600px] lg:h-[782px]">
           <div className="max-w-[400px]">
              <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground leading-[24px]">Record a beat or hum a tune using the audio prompt and watch it turn into your new favourite song.</p>
           </div>
           <div className="flex-1 overflow-hidden">
              <RevealImage src={imgImage4} className="w-full h-full" />
           </div>
        </div>
        <div className="flex-1 h-[300px] md:h-[500px] lg:h-[782px] overflow-hidden">
           <RevealImage src={imgImage5} className="w-full h-full" />
        </div>
      </div>

      {/* 11.9 — Discovery Image Grid */}
      <div className="w-full max-w-[1800px] py-[90px]">
        <div className="flex flex-col lg:flex-row gap-[24px] items-start w-full">
          <div className="flex flex-col gap-[24px] flex-1 min-w-0 items-start justify-center self-stretch">
            <div className="w-full">
              <div className="flex flex-col gap-[8px] font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground tracking-tight">
                <p className="leading-relaxed">
                  Getting users into a system is one thing.<br />
                  {` Keeping them engaged is another.`}
                </p>
                <p className="leading-relaxed">
                  EduSync approaches discovery through clarity—highlighting relevant courses, upcoming lessons, and progress cues that help students stay oriented and motivated over time.
                </p>
                <p className="leading-relaxed">
                  By surfacing what matters most, the platform supports continuity, confidence, and long-term learning habits.
                </p>
              </div>
            </div>
            <div className="flex-1 min-h-px w-full overflow-hidden">
              <RevealImage src={imgFrame82} className="w-full h-full" />
            </div>
          </div>
          <div className="shrink-0 w-full lg:w-[944px] h-[400px] md:h-[600px] lg:h-[900px] overflow-hidden">
            <RevealImage src={imgFrame83} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* 11.9c — Full Width Image */}
      <div className="w-full py-[90px] max-w-[1800px]">
        <div className="w-full h-[600px] lg:h-[840px] overflow-hidden">
          <RevealImage src={imgImage2} className="w-full h-full" />
        </div>
      </div>

      {/* 11.9d — A System Designed to Scale */}
      <Container className="py-[90px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="A System Designed to Scale" />
          <LargeText size="medium" text="Building a stable foundation that supports growth without breaking existing workflows." />
        </div>
      </Container>

      {/* 11.9e — Scale Image Grid */}
      <div className="w-full mb-32 max-w-[1800px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 h-[500px] lg:h-[748px] overflow-hidden">
            <RevealImage src={imgImage6} className="w-full h-full" />
          </div>
          <div className="w-full lg:w-[212px] shrink-0 flex flex-col gap-[8px]">
            <p className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground tracking-tight leading-relaxed">
              As learning platforms grow, design systems become more important than individual screens. EduSync was built around reusable components, clear content structures, and predictable states—so new features can be added without rethinking the core experience.
            </p>
            <p className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground tracking-tight leading-relaxed">
              By prioritizing consistency and adaptability, the system remains reliable for schools today while staying flexible for future needs.
            </p>
          </div>
        </div>
      </div>

      {/* 12. Think Different Section */}
      <Container className="mb-[60px] md:mb-[100px] lg:mb-[140px]">
        <div className="lg:pl-[260px] lg:pr-[460px]">
          <SectionHeading text="Think Different" />
          <LargeText size="medium" text="The ability to surface the right learning at the right time turns an LMS into a place students return to—not just log into." />
        </div>
      </Container>

      {/* 12.5 Grid Layout with Text + Images */}
      <div className="w-full mb-16 md:mb-32 max-w-[1800px] flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 lg:w-[600px] h-[400px] md:h-[600px] lg:h-[782px]">
           <div className="max-w-[400px]">
              <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground leading-[24px]">Create a course, assign teachers, and manage lessons in one place. Content moves from draft to review to published ensuring quality without slowing down teaching.</p>
           </div>
           <div className="flex-1 overflow-hidden">
              <RevealImage src={imgImage8} className="w-full h-full" />
           </div>
        </div>
        <div className="flex-1 h-[300px] md:h-[500px] lg:h-[782px] overflow-hidden">
           <RevealImage src={imgImage9} className="w-full h-full" />
        </div>
      </div>

      {/* 15. Impact Stats Section */}
      <Container className="mb-16 md:mb-28 lg:mb-40">
        <h2 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[32px] md:text-[44px] lg:text-[56px] text-foreground tracking-[-1px] leading-tight mb-10 md:mb-20">
          Immediate disruption
        </h2>
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-foreground/10 pb-20">
          <div className="font-['Clash_Grotesk_Variable',sans-serif] font-medium text-[16px] text-foreground">Impact</div>
          <p className="max-w-[532px] font-['Clash_Grotesk_Variable',sans-serif] text-[16px] text-foreground/80 leading-relaxed">
            EduSync was designed to address real operational pain points in school environments. From early concept validation to workflow testing, the system demonstrated immediate improvements in clarity, efficiency, and confidence across roles.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-foreground/10">
          {[
            { value: "4.9", label: "Star rating on App Store" },
            { value: "43K", label: "Ratings on App Store" },
            { value: "T10", label: "Top performing apps in Education" }
          ].map((stat) => (
            <div key={stat.label} className="py-10 md:py-16 lg:py-20 flex flex-col lg:flex-row items-baseline lg:justify-end gap-4 md:gap-10">
              <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[48px] md:text-[80px] lg:text-[120px] text-foreground leading-none tracking-tight">{stat.value}</span>
              <span className="font-['Clash_Grotesk_Variable',sans-serif] text-[20px] text-foreground/60 w-[300px]">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* 16. Next Case Study */}
      <Container className="pt-0 pb-20 lg:pb-32">
        <div className="border-t border-foreground/10 pt-12 lg:pt-16">
          <span className="font-['Clash_Grotesk_Variable',sans-serif] text-[12px] sm:text-[14px] text-foreground/40 uppercase tracking-widest block mb-6">
            Next project
          </span>
          <button
            onClick={() => onNavigate?.("home")}
            className="group w-full text-left cursor-pointer"
          >
            <div className="flex items-center justify-between gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[48px] sm:text-[64px] lg:text-[96px] text-foreground tracking-tight leading-[1.05] group-hover:translate-x-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  Suno AI
                </h3>
                <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[14px] sm:text-[16px] text-foreground/60 font-light max-w-[400px] group-hover:translate-x-3 transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  AI-powered music creation platform
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="size-12 sm:size-16 lg:size-20 rounded-full border border-foreground/15 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-background group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </Container>

      {/* 17. Footer Help Section */}
      <Container className="py-16 md:py-24 lg:py-40 border-t border-foreground/10 flex flex-col lg:flex-row justify-between gap-10 md:gap-20">
        <h2 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[36px] md:text-[60px] lg:text-[88px] text-foreground leading-tight tracking-tight">
          How can<br />we help?
        </h2>
        <div className="flex flex-col w-full lg:w-[448px] divide-y divide-foreground/10">
          {["Work together", "Join our team", "Just say hello"].map((item) => (
            <div key={item} className="group py-8 flex items-center justify-between cursor-pointer hover:opacity-60 transition-all">
              <span className="font-['Clash_Grotesk_Variable',sans-serif] text-[24px] text-foreground font-light">{item}</span>
              <svg className="size-6 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="currentColor">
                <path d={svgPaths.p37f30840} className="text-foreground" />
              </svg>
            </div>
          ))}
        </div>
      </Container>

      {/* 18. Final Footer Links */}
      <Container className="border-t border-foreground/10 py-10 flex flex-wrap gap-x-24 gap-y-12">
        <div className="flex flex-col gap-3">
          {["Linkedin", "Instagram", "X", "Medium"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-['Clash_Grotesk_Variable',sans-serif] text-[16px]">{l}</span>)}
        </div>
        <div className="flex flex-col gap-3">
          {["Careers", "Contact"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-['Clash_Grotesk_Variable',sans-serif] text-[16px]">{l}</span>)}
        </div>
        <div className="flex flex-col gap-3">
          {["Privacy", "Accessibility"].map(l => <span key={l} className="text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-['Clash_Grotesk_Variable',sans-serif] text-[16px]">{l}</span>)}
        </div>
        <div className="ml-auto text-foreground/20 font-light font-['Clash_Grotesk_Variable',sans-serif] text-[16px]">© 2026 Hein Htet</div>
      </Container>

    </div>
  );
}