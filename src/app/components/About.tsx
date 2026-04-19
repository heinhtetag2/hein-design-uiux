import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, animate } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, ArrowRight } from "lucide-react";

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

// Assets from figma_imported_react_code
import imgHero1 from "figma:asset/5634ab81a75f54c59c95b79fd656dd8042373dae.png";
import imgHero2 from "figma:asset/a23e9151fca78149a9c0ea3508fe35ccfce654aa.png";
import imgHero3 from "figma:asset/fe273495bb0a0c45262b4a94d82dd1c5b48be4a1.png";
import imgGlobalTeam from "figma:asset/be27d917e9042eedf0ec14a7987e9c0bc7905581.png";
import imgTaz from "figma:asset/5a58c9330aae02a8e6641c56485816a66a4bf737.png";
import imgSamuel from "figma:asset/acbd9089bc57e044ac2cfe30d9c8c779888d4202.png";
import imgDiverse1 from "figma:asset/5634ab81a75f54c59c95b79fd656dd8042373dae.png";
import imgDiversePortrait from "figma:asset/f9289bf3a0c1bf0281a07f290695eff779346f4d.png";
import imgDiverse3 from "figma:asset/fe273495bb0a0c45262b4a94d82dd1c5b48be4a1.png";

const CITIES = [
  "New York", "Spain", "Colombia", "Vancouver", "Los Angeles", "Italy",
  "Victoria", "London", "Australia", "Toronto", "New Zealand", "Mexico",
  "Paris", "Brazil", "Amsterdam", "Portland", "Austin", "South Africa"
];

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
    categories: ["UI/UX", "Visual", "Development"]
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    type: "Since 2024 – Present",
    description: "Working with startups and brands across the globe on product design, branding, and motion — shipping work end-to-end, from first sketch to launch.",
    categories: ["UI/UX", "Visual"]
  }
];

const OPEN_ROLES = [
  { title: "Senior Product Designer", location: "Remote", department: "Design" },
  { title: "Principal Product Designer", location: "Remote", department: "Design" },
  { title: "Principal Brand Designer", location: "Remote", department: "Design" },
  { title: "Brand Director", location: "Remote", department: "Design" },
  { title: "Brand Designer", location: "Remote", department: "Design" },
  { title: "Director, Business Operations", location: "Remote", department: "Operations" },
  { title: "Talent Acquisition Coordinator (6-month Contract)", location: "Remote", department: "Operations" }
];

export function About() {
  const [expFilter, setExpFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  return (
    <div className="bg-background text-foreground selection:bg-[#584dff] selection:text-white font-['Clash_Grotesk_Variable',sans-serif]">
      {/* Hero Section */}
      <section className="pt-[120px] md:pt-[180px] pb-[60px] md:pb-[140px]">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 font-['Cormorant',serif] font-light text-[clamp(40px,11vw,180px)] leading-[1.05] tracking-[-0.03em]">
            <span>Global</span>
            <div className="w-[50px] h-[65px] md:w-[120px] md:h-[150px] bg-foreground/5 overflow-hidden shrink-0">
              <ImageWithFallback src={imgHero1} alt="" className="w-full h-full object-cover" />
            </div>
            <span>talent,</span>
          </div>
          <div className="flex items-center justify-center gap-2 md:gap-3 font-['Cormorant',serif] font-light text-[clamp(40px,11vw,180px)] leading-[1.05] tracking-[-0.03em]">
            <div className="w-[50px] h-[65px] md:w-[120px] md:h-[150px] bg-foreground/5 overflow-hidden shrink-0">
              <ImageWithFallback src={imgHero2} alt="" className="w-full h-full object-cover" />
            </div>
            <span>Canadian</span>
            <div className="w-[50px] h-[65px] md:w-[120px] md:h-[150px] bg-foreground/5 overflow-hidden shrink-0">
              <ImageWithFallback src={imgHero3} alt="" className="w-full h-full object-cover" />
            </div>
            <span>home</span>
          </div>

          <button className="mt-8 md:mt-12 border-b border-foreground pb-px text-[16px] hover:opacity-60 transition-opacity cursor-pointer font-light">
            View open roles
          </button>

          {/* Centered image below */}
          <div className="w-full max-w-[700px] h-[350px] md:h-[600px] lg:h-[900px] overflow-hidden mt-8 md:mt-12">
            <ImageWithFallback src={imgGlobalTeam} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>


      {/* Founded Statement & Mini Stats */}
      <section className="py-[80px] md:py-[140px] lg:py-[220px]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-['Cormorant',serif] text-[clamp(32px,5vw,80px)] font-light leading-[1.15] tracking-[-0.02em] max-w-[1000px] mb-16 md:mb-32">
            Design lives where empathy meets craft. I build for the people who use it, down to the details that feel effortless.
          </h2>

          <div className="flex flex-col border-t border-foreground/10">
            {[
              { label: "Countries represented", value: "17" },
              { label: "Global employees", value: "160" },
              { label: "Time zones", value: "14" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between py-[16px] border-b border-foreground/10 group relative">
                <p className="text-[20px] text-foreground/80 font-normal">{stat.label}</p>
                <p className="text-[20px] text-foreground font-normal">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[60px] md:py-[120px] lg:py-[180px] overflow-hidden">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {[
            {
              img: imgTaz,
              quote: "Working at Metalab means working with incredibly talented folks who are truly committed to delivering quality.\"",
              name: "Taz Mota",
              role: "Principal Designer - he/him"
            },
            {
              img: imgSamuel,
              quote: "Eight years later, and I'm still inspired and challenged to elevate my design game.\"",
              name: "Samuel Medvedowsky",
              role: "Creative Director - he/him"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 shrink-0 w-full md:w-[580px]">
              <div className="w-full md:w-[355px] h-[200px] md:h-[250px] rounded-[40px] md:rounded-[120px] overflow-hidden shrink-0">
                <ImageWithFallback src={item.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-6 pb-4">
                <p className="text-[16px] leading-relaxed text-foreground relative">
                  <span className="absolute -left-4 top-0">"</span>
                  {item.quote}
                </p>
                <div>
                  <p className="text-[16px] font-medium text-foreground">{item.name}</p>
                  <p className="text-[16px] text-foreground/60">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diverse Perspectives Overlay Section */}
      <section className="py-[60px] md:py-[100px] lg:py-[140px] relative">
        <div className="max-w-[1200px] mx-auto text-center h-[300px] md:h-[500px] lg:h-[665px] flex flex-col items-center justify-center overflow-hidden rounded-[20px] md:rounded-[40px] relative">
          <div className="absolute inset-0 flex items-center justify-center gap-48 opacity-30 pointer-events-none">
            <div className="w-[580px] h-[375px] rounded-[40px] overflow-hidden bg-foreground/10">
              <ImageWithFallback src={imgDiverse1} alt="" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="w-[447px] h-[665px] rounded-[40px] overflow-hidden bg-foreground/10">
              <ImageWithFallback src={imgDiversePortrait} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-[580px] h-[375px] rounded-[40px] overflow-hidden bg-foreground/10">
              <ImageWithFallback src={imgDiverse3} alt="" className="w-full h-full object-cover grayscale" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[56px] lg:text-[88px] font-light leading-[1.1] tracking-tight mb-6 md:mb-12">
              Diverse perspectives,<br />world-class work
            </h2>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 md:gap-20 justify-end mt-10 md:mt-20 pr-0 md:pr-40">
          <p className="max-w-[212px] text-[16px] text-foreground/80 leading-relaxed">
            It takes the best talent to build the best products. That means working with smart and skilled people regardless of who they are, who they love, or where they came from.
          </p>
          <div className="max-w-[212px]">
            <p className="text-[16px] text-foreground/80 mb-2">Our commitment to</p>
            <button className="flex items-center gap-2 border-b border-foreground pb-px text-[16px] hover:gap-4 transition-all cursor-pointer font-normal">
              Diversity, Equity, & Inclusion <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 md:mt-24 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-0">
          {[
            { label: ["Years", "designing"], val: 2, suffix: "+" },
            { label: ["Projects", "shipped"], val: 12, suffix: "+" },
            { label: ["Happy", "clients"], val: 10, suffix: "+" },
            { label: ["Industries", "covered"], val: 8, suffix: "" },
            { label: ["Countries", "reached"], val: 4, suffix: "" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[200px] md:h-[390px] flex flex-col justify-between pl-3 md:pl-6 group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#584dff]" />
              <div className="flex flex-col gap-1 text-[16px] md:text-[20px] text-foreground/80 leading-tight pt-4">
                {stat.label.map((l, j) => <span key={j}>{l}</span>)}
              </div>
              <div className="flex items-baseline gap-1 pb-4">
                <span className="text-[40px] md:text-[84px] font-light leading-none tabular-nums">
                  <CountUp to={stat.val} />
                </span>
                {stat.suffix && (
                  <span className="text-[24px] md:text-[40px] font-normal">{stat.suffix}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Career Experiences */}
      <section className="py-[60px] md:py-[90px] lg:py-[120px]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start justify-between border-t border-foreground/10 pt-10 md:pt-20">
          <div className="lg:w-[464px]">
            <h2 className="text-[36px] md:text-[48px] lg:text-[64px] font-light leading-tight tracking-tight">My Carrier —<br />Experiences</h2>
          </div>
          <div className="lg:w-[812px] pt-4">
            <div className="flex gap-2 mb-16">
              {["All", "UI/UX", "Visual", "Development"].map(c => (
                <button 
                  key={c}
                  onClick={() => setExpFilter(c)}
                  className={`px-5 py-1 rounded-full text-[15px] font-normal tracking-tight transition-all cursor-pointer ${expFilter === c ? "bg-[#584dff] text-white" : "bg-foreground/10 text-foreground/60 hover:bg-foreground/20"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="space-y-0">
              {EXPERIENCES.filter(e => expFilter === "All" || e.categories.includes(expFilter)).map((exp, i) => (
                <div key={i} className="border-t border-foreground/10 py-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-6 text-[20px] text-foreground tracking-tight">
                    <h3 className="font-normal">{exp.role}</h3>
                    <span className="text-foreground/60 text-[16px] font-normal">{exp.company}</span>
                    <span className="text-foreground text-[16px] font-normal">{exp.type}</span>
                  </div>
                  <p className="text-foreground/60 text-[16px] leading-relaxed max-w-[700px]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-[60px] md:py-[90px] lg:py-[120px] border-t border-foreground/10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start justify-between">
          <h2 className="text-[42px] md:text-[64px] lg:text-[88px] font-light leading-[1.1] tracking-tight">How can<br />we help?</h2>
          <div className="w-full lg:w-[600px] flex flex-col pt-12 lg:pt-0">
            {["Work together", "Join our team", "Ask anything"].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between py-10 border-b border-foreground/10 group cursor-pointer first:border-t first:border-foreground/10">
                <span className="text-[24px] font-light text-foreground">{item}</span>
                <Plus className="size-6 text-foreground group-hover:rotate-45 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 md:py-20 border-t border-foreground/10">
        <div className="max-w-[1200px] mx-auto flex flex-wrap gap-x-16 md:gap-x-32 gap-y-8 md:gap-y-12 items-start">
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60">Social</span>
            <div className="flex gap-6">
              {["IG", "TW", "LI"].map(s => <a key={s} href="#" className="text-[16px] text-foreground hover:opacity-60 transition-opacity">{s}</a>)}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60">Office</span>
            <p className="text-[16px] text-foreground">Victoria, BC Canada</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60">Contact</span>
            <p className="text-[16px] text-foreground">hello@metalab.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}