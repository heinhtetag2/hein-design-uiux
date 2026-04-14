import React, { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../../imports/svg-mzksdxu5cb";
import imgALaptop from "figma:asset/7dcf1eb305e49fd56df2eeff8def30d58bbb6d5d.png";
import imgStadium from "figma:asset/8e1bd3beb4e3e6b53e47961132127b1fde8b63f7.png";
import imgWomanWatermelon from "figma:asset/f8cadad5c36cf0a9e65fee88dc37fc6b99d1c9df.png";
import imgFearlessGirl from "figma:asset/1a441e52b3c110b807b42a4823f056f49e15ab21.png";
import imgModular from "figma:asset/239563a03addff58e7bdafc4ddfb926c074203fe.png";
import imgHeadspace from "figma:asset/db1b2d96183e3601eeb45fce0ed3ede80cc1760c.png";
import imgHeadspaceHero from "figma:asset/1dd5b8f086d220da8f1399bc087471b7ebacb733.png";
import { imgVector, imgVector1 } from "../../imports/svg-qglw9";
import { useScroll, useTransform, motion } from "motion/react";

export function WhatIDo() {
  const targetRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bannerWidth = useTransform(heroScroll, [0, 0.5], ["min(454px, calc(100vw - 48px))", "100%"]);
  const bannerRadius = useTransform(heroScroll, [0, 0.5], ["10px", "0px"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div style={{ position: 'relative' }} className="bg-background text-foreground flex flex-col items-start pt-[100px] md:pt-[140px] w-screen min-h-screen relative overflow-x-hidden ml-[calc(-50vw+50%)]">
      {/* Hero Section */}
      <div 
        ref={heroRef} 
        style={{ position: 'relative' }} 
        className="flex flex-col items-center w-full relative px-6"
      >
        <h1 className="font-['Cormorant',serif] font-light text-[clamp(48px,10vw,140px)] text-center leading-none tracking-tight mb-8">
          Odds are you've used a product we've built
        </h1>
        <div className="mt-12 md:mt-[90px] mb-12 md:mb-[90px] w-full max-w-[1800px] flex justify-center relative">
          <motion.div 
            style={{ width: bannerWidth, borderRadius: bannerRadius, position: 'relative' }}
            className="aspect-video bg-foreground/20 overflow-hidden relative"
          >
            <ImageWithFallback src={imgHeadspaceHero} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

      {/* Breakthrough Products Section */}
      <div className="w-full py-[60px] md:py-[90px] relative px-6">
        <div className="max-w-[866px] relative">
          <h2 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-foreground leading-tight tracking-tight text-[clamp(32px,5vw,64px)] relative">
            Since 2024, we've helped shape the technology landscape by building breakthrough products
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
            transform: 'translateZ(0)'
          }} 
          className="flex gap-[16px] md:gap-[24px] lg:pl-[clamp(100px,20vw,260px)] min-w-max items-start relative"
          transition={{ type: "spring", stiffness: 100, damping: 30, mass: 0.5 }}
        >
          <div className="w-[236px] h-[187px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgALaptop} className="w-full h-full object-cover" />
          </div>
          <div className="w-[449px] h-[295px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgStadium} className="w-full h-full object-cover" />
          </div>
          <div className="w-[213px] h-[213px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgWomanWatermelon} className="w-full h-full object-cover" />
          </div>
          <div className="w-[449px] h-[317px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgFearlessGirl} className="w-full h-full object-cover" />
          </div>
          <div className="w-[343px] h-[351px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgModular} className="w-full h-full object-cover" />
          </div>
          <div className="w-[213px] h-[351px] shrink-0 overflow-hidden rounded-lg bg-foreground/10">
            <ImageWithFallback src={imgHeadspace} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* What I Do Headline */}
      <div className="w-full py-[32px] px-6">
                <h3 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[32px] md:text-[40px] text-foreground tracking-[-1px]">
          What I do
        </h3>
      </div>

      {/* Services Grid */}
      <div className="w-full border-t border-foreground/10 px-6">
        <ServiceRow 
          title="Define a clear vision for the future"
          description="Whether you’re an R&D team at a Fortune 500 or a founder with a paper napkin sketch, we shape, ideate, prototype, and conceive beloved products for your users."
          image={imgWomanWatermelon}
        />
        <ServiceRow 
          title="Set the bar for category defining design"
          description="If you’ve proven product market fit and want to ensure your user experience is best-in-class, performant, and scalable by design, we can help you make it pixel-perfect."
          image={imgFearlessGirl}
        />
        <ServiceRow 
          title="Ship new products from zero-to-one"
          description="When you need to design and build software from the ground up with a high-powered product team, we’re ready to help you ship a lovable MVP built for today and tomorrow."
          image={imgStadium}
        />
      </div>

      {/* Categories List */}
      <div className="w-full py-[90px] grid grid-cols-1 md:grid-cols-3 gap-[24px] px-6">
        <CategorySection 
          title="Design & UX Research"
          items={["UX/UI Design", "Design Systems", "Brand", "UX Research & Testing", "Ideation & Prototyping"]}
        />
        <CategorySection 
          title="Engineering"
          items={["Full Stack Engineering", "Frontend Development", "Backend Development", "Mobile Developement"]}
        />
        <CategorySection 
          title="Product & Strategy"
          items={["Product Management", "Product Strategy & Vision", "User Engagement & Retention"]}
        />
      </div>

      {/* Help Section */}
      <div className="w-full py-[100px] lg:py-[178px] px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          <h2 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[64px] lg:text-[88px] text-foreground leading-tight tracking-[-1.76px]">
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
        <div className="py-[50px] flex flex-col md:flex-row justify-between items-end gap-12">
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-0 py-[50px] lg:min-h-[280px] hover:bg-white/5 transition-colors duration-300 rounded-lg lg:px-6">
        {/* Heading */}
        <div className="w-full lg:w-[405px]">
          <h4 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[28px] md:text-[40px] text-foreground leading-tight tracking-[-1px]">
            {title}
          </h4>
        </div>

        {/* Center/Right Content Group */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-[40px] relative">
          {/* Animated Image Container */}
          <motion.div
            variants={{
              initial: { opacity: 1 },
              hovered: { opacity: 1 }
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block w-[clamp(200px,20vw,308px)] h-[180px] shrink-0 overflow-hidden rounded-sm relative"
          >
            <motion.div
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 }
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            <p className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-muted-foreground text-[18px] md:text-[20px] leading-snug tracking-tight">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Image Reveal (Below content on mobile) */}
      <motion.div
        variants={{
          initial: { height: 0, opacity: 0, marginTop: 0 },
          hovered: { height: "auto", opacity: 1, marginTop: 24 }
        }}
        transition={{ duration: 0.4 }}
        className="lg:hidden w-full overflow-hidden"
      >
        <div className="w-full aspect-video rounded-lg overflow-hidden mb-6">
          <ImageWithFallback src={image} className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategorySection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-[15px]">
      <h5 className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[16px] text-foreground tracking-tight">
        {title}
      </h5>
      <div className="w-[24px] h-[1px] bg-foreground/10" />
      <div className="flex flex-col gap-[12px]">
        {items.map((item) => (
          <span key={item} className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[16px] text-foreground/80 tracking-tight">
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
      <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[18px] md:text-[20px] text-foreground group-hover:opacity-60 transition-opacity">
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
    <button className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[14px] md:text-[16px] text-foreground hover:opacity-60 transition-opacity cursor-pointer text-left">
      {label}
    </button>
  );
}