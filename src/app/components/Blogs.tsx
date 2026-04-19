import React from "react";
import { motion } from "motion/react";

interface BlogPost {
  id: string;
  excerpt: string;
  title: string;
  category: string;
  date: string;
  thumbnail: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    excerpt: "Scaling tokens across platforms",
    title: "Why Design Systems Fail Without Engineering Buy-In",
    category: "Systems",
    date: "Mar 2026",
    thumbnail: "systems-1",
  },
  {
    id: "2",
    excerpt: "Better designer–developer handoff",
    title: "From Figma to Production: Bridging the Designer–Developer Gap",
    category: "Engineering",
    date: "Feb 2026",
    thumbnail: "engineering-1",
  },
  {
    id: "3",
    excerpt: "Designing for outcomes, not features",
    title: "The Case for Outcome-Driven Product Design",
    category: "Product",
    date: "Jan 2026",
    thumbnail: "product-1",
  },
  {
    id: "4",
    excerpt: "Accessibility that ships",
    title: "Building Accessible UI Components That Actually Ship",
    category: "Design",
    date: "Dec 2025",
    thumbnail: "design-1",
  },
  {
    id: "5",
    excerpt: "Token architecture at scale",
    title: "How I Structure Design Tokens for Multi-Platform Products",
    category: "Systems",
    date: "Nov 2025",
    thumbnail: "systems-2",
  },
  {
    id: "6",
    excerpt: "Composable UI for designers",
    title: "React Component Architecture: A Designer's Perspective",
    category: "Engineering",
    date: "Oct 2025",
    thumbnail: "engineering-2",
  },
  {
    id: "7",
    excerpt: "Smarter onboarding flows",
    title: "Rethinking User Onboarding Flows for SaaS Products",
    category: "Product",
    date: "Sep 2025",
    thumbnail: "product-2",
  },
  {
    id: "8",
    excerpt: "The power of micro-interactions",
    title: "Micro-Interactions That Make or Break the Experience",
    category: "Design",
    date: "Aug 2025",
    thumbnail: "design-2",
  },
  {
    id: "9",
    excerpt: "AI in your design workflow",
    title: "When to Use AI in Your Design Workflow (And When Not To)",
    category: "Process",
    date: "Jul 2025",
    thumbnail: "process-1",
  },
  {
    id: "10",
    excerpt: "Faster design–dev cycles",
    title: "Shipping Faster with Design-Engineering Collaboration",
    category: "Process",
    date: "Jun 2025",
    thumbnail: "process-2",
  },
];

const CATEGORIES = ["All", "Design", "Product", "Engineering", "Systems", "Process"];

function BlogThumbnail({ type }: { type: string }) {
  const thumbnails: Record<string, React.ReactNode> = {
    "systems-1": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="30" y="30" width="60" height="60" rx="12" stroke="rgba(88,77,255,0.4)" strokeWidth="1.5" />
        <rect x="110" y="30" width="60" height="60" rx="12" stroke="rgba(88,77,255,0.4)" strokeWidth="1.5" />
        <rect x="190" y="30" width="60" height="60" rx="12" stroke="rgba(88,77,255,0.4)" strokeWidth="1.5" />
        <rect x="70" y="90" width="60" height="60" rx="12" stroke="rgba(88,77,255,0.6)" strokeWidth="1.5" />
        <rect x="150" y="90" width="60" height="60" rx="12" stroke="rgba(88,77,255,0.6)" strokeWidth="1.5" />
        <line x1="90" y1="60" x2="110" y2="60" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="170" y1="60" x2="190" y2="60" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <circle cx="60" cy="60" r="8" fill="rgba(88,77,255,0.15)" />
        <circle cx="140" cy="60" r="8" fill="rgba(88,77,255,0.15)" />
        <circle cx="220" cy="60" r="8" fill="rgba(88,77,255,0.15)" />
      </svg>
    ),
    "systems-2": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <circle cx="140" cy="90" r="50" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <circle cx="140" cy="90" r="35" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <circle cx="140" cy="90" r="20" stroke="rgba(88,77,255,0.6)" strokeWidth="1.5" />
        <circle cx="140" cy="90" r="5" fill="rgba(88,77,255,0.8)" />
        <line x1="140" y1="40" x2="140" y2="55" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="140" y1="125" x2="140" y2="140" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="90" y1="90" x2="105" y2="90" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="175" y1="90" x2="190" y2="90" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
      </svg>
    ),
    "engineering-1": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <text x="60" y="70" fontFamily="monospace" fontSize="14" fill="rgba(88,77,255,0.5)">&lt;Component</text>
        <text x="80" y="90" fontFamily="monospace" fontSize="14" fill="rgba(88,77,255,0.35)">props=&#123;...&#125;</text>
        <text x="60" y="110" fontFamily="monospace" fontSize="14" fill="rgba(88,77,255,0.5)">/&gt;</text>
        <rect x="170" y="50" width="70" height="70" rx="8" stroke="rgba(88,77,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M195 75 L215 85 L195 95" stroke="rgba(88,77,255,0.6)" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    "engineering-2": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="40" y="40" width="80" height="40" rx="6" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <rect x="160" y="40" width="80" height="40" rx="6" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <rect x="40" y="100" width="80" height="40" rx="6" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <rect x="160" y="100" width="80" height="40" rx="6" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <line x1="120" y1="60" x2="160" y2="60" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="80" y1="80" x2="80" y2="100" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="200" y1="80" x2="200" y2="100" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <circle cx="80" cy="60" r="4" fill="rgba(88,77,255,0.3)" />
        <circle cx="200" cy="60" r="4" fill="rgba(88,77,255,0.3)" />
      </svg>
    ),
    "product-1": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="60" y="30" width="160" height="120" rx="10" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="60" y1="60" x2="220" y2="60" stroke="rgba(88,77,255,0.2)" strokeWidth="1" />
        <circle cx="80" cy="45" r="4" fill="rgba(88,77,255,0.3)" />
        <circle cx="95" cy="45" r="4" fill="rgba(88,77,255,0.2)" />
        <circle cx="110" cy="45" r="4" fill="rgba(88,77,255,0.15)" />
        <rect x="80" y="75" width="120" height="8" rx="4" fill="rgba(88,77,255,0.12)" />
        <rect x="80" y="95" width="80" height="8" rx="4" fill="rgba(88,77,255,0.08)" />
        <rect x="80" y="115" width="100" height="8" rx="4" fill="rgba(88,77,255,0.06)" />
      </svg>
    ),
    "product-2": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <path d="M60 140 L100 80 L140 100 L180 50 L220 70" stroke="rgba(88,77,255,0.5)" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="80" r="4" fill="rgba(88,77,255,0.4)" />
        <circle cx="140" cy="100" r="4" fill="rgba(88,77,255,0.4)" />
        <circle cx="180" cy="50" r="4" fill="rgba(88,77,255,0.4)" />
        <circle cx="220" cy="70" r="4" fill="rgba(88,77,255,0.4)" />
        <path d="M60 140 L100 80 L140 100 L180 50 L220 70 L220 140 Z" fill="rgba(88,77,255,0.05)" />
      </svg>
    ),
    "design-1": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="70" y="40" width="140" height="100" rx="12" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <circle cx="140" cy="90" r="25" stroke="rgba(88,77,255,0.5)" strokeWidth="1.5" />
        <path d="M128 90 L136 98 L152 82" stroke="rgba(88,77,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="90" y="50" width="20" height="3" rx="1.5" fill="rgba(88,77,255,0.2)" />
      </svg>
    ),
    "design-2": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="90" y="55" width="40" height="40" rx="8" fill="rgba(88,77,255,0.1)" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <rect x="145" y="55" width="40" height="40" rx="8" fill="rgba(88,77,255,0.1)" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <rect x="90" y="105" width="40" height="40" rx="8" fill="rgba(88,77,255,0.1)" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <rect x="145" y="105" width="40" height="40" rx="8" fill="rgba(88,77,255,0.1)" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <circle cx="110" cy="75" r="6" fill="rgba(88,77,255,0.25)" />
        <path d="M158 68 L172 82" stroke="rgba(88,77,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M172 68 L158 82" stroke="rgba(88,77,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "process-1": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <circle cx="80" cy="90" r="20" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <circle cx="140" cy="90" r="20" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <circle cx="200" cy="90" r="20" stroke="rgba(88,77,255,0.4)" strokeWidth="1" />
        <line x1="100" y1="90" x2="120" y2="90" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <line x1="160" y1="90" x2="180" y2="90" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <path d="M75 85 L80 90 L85 85" stroke="rgba(88,77,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="140" cy="90" r="5" fill="rgba(88,77,255,0.3)" />
        <path d="M195 85 L205 85 L200 95 Z" fill="rgba(88,77,255,0.4)" />
      </svg>
    ),
    "process-2": (
      <svg viewBox="0 0 280 180" fill="none" className="w-full h-full">
        <rect x="50" y="50" width="80" height="80" rx="40" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <rect x="150" y="50" width="80" height="80" rx="40" stroke="rgba(88,77,255,0.3)" strokeWidth="1" />
        <ellipse cx="140" cy="90" rx="30" ry="40" fill="rgba(88,77,255,0.08)" stroke="rgba(88,77,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    ),
  };

  return (
    <div className="w-[280px] h-[180px] rounded-xl bg-foreground/[0.04] border border-foreground/[0.08] flex items-center justify-center overflow-hidden">
      {thumbnails[type] || thumbnails["systems-1"]}
    </div>
  );
}

export function Blogs({ onPostClick }: { onPostClick?: (postId: string) => void }) {
  const [filter, setFilter] = React.useState<string>("All");

  const filteredPosts = filter === "All" 
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#584dff] selection:text-white font-['Clash_Grotesk_Variable',sans-serif] pt-[120px] md:pt-[160px] pb-20 max-w-[1100px] mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="mb-[48px] md:mb-[100px]"
      >
        <h1 className="font-['Cormorant',serif] font-light text-[clamp(60px,6vw,86px)] leading-[1.05] tracking-[-0.04em]">
          Thoughts &<br />insights
        </h1>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-[50px]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-1 rounded-full border transition-all duration-300 text-[15px] font-normal tracking-tight cursor-pointer ${
              filter === cat && cat !== "All"
                ? "bg-[#584dff] text-white border-[#584dff]"
                : "bg-foreground/10 text-foreground/60 border-transparent hover:border-foreground/20 hover:text-foreground backdrop-blur-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <div className="flex flex-col border-t border-foreground/10">
        {filteredPosts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="group border-b border-foreground/10 py-[40px] md:py-[60px] lg:py-[80px] flex items-center justify-between gap-8 relative overflow-hidden cursor-pointer"
            onClick={() => onPostClick?.(post.id)}
          >
            <div className="relative z-10 flex flex-col gap-3 flex-1 min-w-0 max-w-[700px]">
              <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[15px] tracking-tight text-foreground/50">
                {post.excerpt}
              </span>

              <h2 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.01em]">
                {post.title}
              </h2>

              <div className="flex gap-8 items-center pt-2">
                <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[14px] text-foreground/40 tracking-tight">
                  {post.category}
                </span>
                <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[14px] text-foreground/40">
                  {post.date}
                </span>
              </div>
            </div>

            {/* Thumbnail - appears on hover */}
            <div className="hidden lg:flex shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <BlogThumbnail type={post.thumbnail} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Section */}
      <div className="w-full flex flex-col items-center py-[48px] md:py-[80px] lg:py-[100px] gap-6">
        <button className="backdrop-blur-[7px] bg-foreground/10 px-[17px] py-[4px] rounded-[50px] font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
          Show more
        </button>
        
        <div className="w-[248px] h-px bg-foreground/20 relative">
          <div className="absolute top-0 left-0 h-full w-[83.33%] bg-[#584dff]" />
        </div>
        
        <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-foreground/60 text-[15px]">
          You've seen {filteredPosts.length} of {BLOG_POSTS.length}
        </span>
      </div>

      {/* Newsletter Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-[40px] md:mt-[60px] border-t border-foreground/10 pt-[60px] md:pt-[80px] flex flex-col items-center text-center max-w-[600px] mx-auto pb-[80px] md:pb-[100px] w-full"
      >
        <span className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[12px] text-foreground/40 uppercase tracking-widest mb-4">Connect</span>
        <h3 className="font-['Cormorant',serif] font-normal text-[32px] md:text-[48px] mb-4">Stay in the loop</h3>
        <p className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-foreground/60 text-[14px] md:text-[16px] tracking-tight mb-8 md:mb-12">
          Sign up to our newsletter and keep up with the cool kids.
        </p>
        
        <div className="w-full flex flex-col items-start">
          <div className="w-full border-b border-foreground focus-within:border-foreground transition-all duration-500 pb-2 mb-8">
            <input 
              type="email" 
              placeholder="yourbest@email.com" 
              className="bg-transparent border-none outline-none w-full font-['Cormorant',serif] text-[24px] md:text-[38px] text-foreground placeholder:text-foreground/60"
            />
          </div>
          <button className="backdrop-blur-[7px] bg-foreground/10 rounded-[50px] font-['Clash_Grotesk_Variable',sans-serif] font-light text-[16px] text-foreground tracking-tight hover:opacity-80 transition-opacity cursor-pointer px-[24px] py-[4px]">
            Send
          </button>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="w-full border-t border-foreground/10 mt-auto">
        <div className="py-[60px] flex flex-col md:flex-row justify-between items-start gap-12 relative">
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
          
          <div className="md:absolute md:right-0 md:top-[60px] size-[24px] flex items-center justify-center relative opacity-40">
             <svg className="size-full" viewBox="0 0 24 24" fill="none">
               <path d="M12 2L14.45 9.15H22L15.9 13.57L18.35 20.72L12 16.3L5.65 20.72L8.1 13.57L2 9.15H9.55L12 2Z" fill="currentColor" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <button className="font-['Clash_Grotesk_Variable',sans-serif] font-normal text-[16px] text-foreground hover:text-foreground/60 transition-colors cursor-pointer text-left leading-normal">
      {label}
    </button>
  );
}