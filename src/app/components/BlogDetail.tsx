import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Plus } from "lucide-react";

interface BlogDetailProps {
  postId: string;
  onBack: () => void;
  onPostClick?: (postId: string) => void;
}


interface BlogArticle {
  title: string;
  subtitle: string;
  category: string;
  date: string;
  heroColor: string;
  sections: Section[];
}

type Section =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "bigword"; text: string }
  | { type: "image"; alt: string; color: string }
  | { type: "image-full"; alt: string; color: string }
  | { type: "caption"; text: string }
  | { type: "quote"; text: string };

const ARTICLES: Record<string, BlogArticle> = {
  "1": {
    title: "Why Design Systems Fail Without Engineering Buy-In",
    subtitle: "The gap between design intent and production reality — and how to close it",
    category: "Systems",
    date: "March 15, 2026",
    heroColor: "from-[#584dff]/20 to-[#584dff]/5",
    sections: [
      { type: "paragraph", text: "Design systems are often celebrated as the bridge between design and engineering. But too often, they become a bridge that only designers walk across." },
      { type: "paragraph", text: "After working on multiple design systems across different organizations, I've seen the same pattern repeat: a design team builds a beautiful, well-documented system — and engineering quietly builds their own components from scratch." },
      { type: "paragraph", text: "The result? Two sources of truth, constant drift, and a system that exists more in Figma than in production." },
      { type: "heading2", text: "The root cause isn't technical" },
      { type: "paragraph", text: "It's tempting to blame tooling or framework mismatches. But the real issue is almost always organizational. Design systems fail when engineers aren't part of the founding conversation." },
      { type: "paragraph", text: "When a system is handed to engineering fully formed, it feels like a constraint rather than a tool. And constraints without context breed resistance." },
      { type: "bigword", text: "Alignment" },
      { type: "paragraph", text: "The most successful design systems I've seen share a common trait: engineering was at the table from day one. Not as reviewers, but as co-authors." },
      { type: "paragraph", text: "This doesn't mean engineers need to approve every color token. It means the system's architecture — how components compose, how tokens cascade, how variants are structured — reflects both design intent and engineering reality." },
      { type: "image", alt: "Component architecture diagram showing shared mental model", color: "from-[#584dff]/10 to-[#584dff]/5" },
      { type: "caption", text: "A shared component architecture creates alignment between design and engineering teams." },
      { type: "heading2", text: "Three patterns that work" },
      { type: "heading3", text: "1. Shared component contracts" },
      { type: "paragraph", text: "Before building anything, define what a component needs to do — its props, states, and edge cases. Write this together. A shared contract prevents the 'that's not what I designed' conversation before it starts." },
      { type: "bigword", text: "Contracts" },
      { type: "heading3", text: "2. Token-first architecture" },
      { type: "paragraph", text: "Design tokens should be the first thing you build, not the last. When both Figma and code reference the same token layer, changes propagate consistently. The token layer becomes the single source of truth that both sides trust." },
      { type: "heading3", text: "3. Embedded collaboration" },
      { type: "paragraph", text: "Put a designer in the engineering standup. Put an engineer in the design critique. The overhead is minimal; the shared understanding is enormous." },
      { type: "image-full", alt: "Collaboration workflow between design and engineering", color: "from-[#584dff]/8 to-transparent" },
      { type: "heading2", text: "The measure of success" },
      { type: "paragraph", text: "A design system succeeds when engineers reach for it voluntarily — not because they're told to, but because it's genuinely the fastest path to a good outcome." },
      { type: "paragraph", text: "That only happens when the system was built with them, not for them." },
      { type: "bigword", text: "Adoption" },
      { type: "paragraph", text: "The next time you're planning a design system initiative, start with a question: who's building this with us? If the answer doesn't include engineering, you already know how this story ends." },
    ],
  },
  "2": {
    title: "From Figma to Production: Bridging the Designer–Developer Gap",
    subtitle: "Practical workflows for tighter handoff and fewer surprises",
    category: "Engineering",
    date: "February 20, 2026",
    heroColor: "from-[#584dff]/15 to-[#2a1f9e]/10",
    sections: [
      { type: "paragraph", text: "The handoff between design and development remains one of the most friction-filled moments in product work. Despite better tooling, the gap between what's designed and what ships is often wider than we'd like to admit." },
      { type: "paragraph", text: "This isn't a tools problem. It's a workflow problem." },
      { type: "heading2", text: "Why handoff breaks down" },
      { type: "paragraph", text: "Most handoff issues stem from a fundamental mismatch: designers think in visual relationships, developers think in component hierarchies. A design that looks simple can hide enormous complexity in its responsive behavior, state management, and edge cases." },
      { type: "bigword", text: "Clarity" },
      { type: "paragraph", text: "The solution isn't more documentation — it's shared language. When designers understand how components compose in code, and developers understand design intent beyond pixels, the handoff becomes a conversation rather than a throw-over-the-wall moment." },
      { type: "image", alt: "Figma to code workflow diagram", color: "from-[#584dff]/10 to-[#2a1f9e]/5" },
      { type: "caption", text: "A bidirectional workflow reduces the gap between design intent and production output." },
      { type: "heading2", text: "Workflows that actually work" },
      { type: "heading3", text: "Design with component APIs in mind" },
      { type: "paragraph", text: "Every design decision maps to a prop, a variant, or a state. When you design with this awareness, you create designs that translate cleanly into code — because they were conceived with code's constraints in mind." },
      { type: "heading3", text: "Review in the browser, not in Figma" },
      { type: "paragraph", text: "The real design review happens in the browser. Animations, interactions, responsive behavior — these only reveal themselves in the medium they were built for. Make browser reviews a standard part of your process." },
      { type: "bigword", text: "Iteration" },
      { type: "heading3", text: "Ship increments, not perfection" },
      { type: "paragraph", text: "The tightest design-dev loops I've experienced ship small, review fast, and iterate in production. Perfection in Figma is an illusion; real refinement happens after code hits the screen." },
      { type: "image-full", alt: "Iterative design development cycle", color: "from-[#2a1f9e]/8 to-transparent" },
      { type: "heading2", text: "The goal isn't zero friction" },
      { type: "paragraph", text: "Some friction is productive — it surfaces assumptions and edge cases. The goal is to make the friction happen earlier, in conversation, rather than later, in QA tickets." },
      { type: "paragraph", text: "Bridge the gap not by eliminating it, but by crossing it together." },
    ],
  },
  "3": {
    title: "The Case for Outcome-Driven Product Design",
    subtitle: "Moving beyond feature requests to measurable user outcomes",
    category: "Product",
    date: "January 10, 2026",
    heroColor: "from-[#584dff]/15 to-[#1a1145]/10",
    sections: [
      { type: "paragraph", text: "Most product teams ship features. The best product teams ship outcomes. The difference sounds semantic, but it fundamentally changes how you design, prioritize, and measure success." },
      { type: "paragraph", text: "Feature-driven design asks: what should we build? Outcome-driven design asks: what should change for the user?" },
      { type: "bigword", text: "Outcomes" },
      { type: "heading2", text: "The feature trap" },
      { type: "paragraph", text: "Features are easy to ship and easy to measure — did we build it? Yes or no. But they don't tell you whether the user's life improved. A feature can ship on time, under budget, and still fail completely if it doesn't solve the right problem." },
      { type: "paragraph", text: "I've watched teams celebrate shipping a feature that nobody asked for, while ignoring the workflow friction that was costing users hours every week." },
      { type: "image", alt: "Feature vs outcome comparison", color: "from-[#584dff]/10 to-[#1a1145]/5" },
      { type: "caption", text: "Features are outputs. Outcomes are the changes those outputs create." },
      { type: "heading2", text: "Designing for change" },
      { type: "heading3", text: "Start with the behavior you want to see" },
      { type: "paragraph", text: "Before opening Figma, define the user behavior you're trying to enable or change. What will the user do differently after this ships? If you can't answer that clearly, you're not ready to design." },
      { type: "heading3", text: "Measure what matters" },
      { type: "paragraph", text: "Clicks and pageviews are proxies, not outcomes. The real metrics are upstream: did the user accomplish their goal? Did they come back? Did they recommend the product?" },
      { type: "bigword", text: "Impact" },
      { type: "heading3", text: "Kill features that don't perform" },
      { type: "paragraph", text: "Outcome-driven design requires courage — the courage to remove things that aren't working. Every unused feature is cognitive load on the user and maintenance cost on the team." },
      { type: "image-full", alt: "Product outcome measurement framework", color: "from-[#1a1145]/8 to-transparent" },
      { type: "heading2", text: "Making the shift" },
      { type: "paragraph", text: "Moving to outcome-driven design isn't a process change — it's a mindset change. It requires asking harder questions, accepting more ambiguity, and measuring success on a longer timeline." },
      { type: "paragraph", text: "But the products that emerge are fundamentally better. Not because they have more features, but because every feature earns its place." },
    ],
  },
};

function getRelatedPosts(currentId: string): string[] {
  const all = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const currentIndex = all.indexOf(currentId);
  const related: string[] = [];
  for (let i = 1; related.length < 3; i++) {
    related.push(all[(currentIndex + i) % all.length]);
  }
  return related;
}

function getArticle(postId: string): BlogArticle {
  if (ARTICLES[postId]) return ARTICLES[postId];

  // Fallback for posts 4-10
  const fallbackTitles: Record<string, BlogArticle> = {
    "4": {
      title: "Building Accessible UI Components That Actually Ship",
      subtitle: "How to bake accessibility into your component library from day one",
      category: "Design",
      date: "December 5, 2025",
      heroColor: "from-[#584dff]/15 to-[#3d2e99]/10",
      sections: [
        { type: "paragraph", text: "Accessibility is often treated as a final checklist item — something to address after the 'real' design work is done. This approach guarantees that accessibility will always feel like an afterthought, because it literally is one." },
        { type: "paragraph", text: "The best accessible components I've built started with accessibility as a design constraint, not a compliance requirement." },
        { type: "bigword", text: "Inclusive" },
        { type: "heading2", text: "Accessibility is a design decision" },
        { type: "paragraph", text: "Every visual hierarchy, every interaction pattern, every color choice is an accessibility decision whether you frame it that way or not. The question isn't whether to design for accessibility — it's whether to do it intentionally or accidentally." },
        { type: "paragraph", text: "Intentional accessibility starts with understanding that your users navigate your product in more ways than you use it yourself. Keyboard, screen reader, voice control, switch access — each reveals different strengths and weaknesses in your components." },
        { type: "image", alt: "Accessibility testing across different input methods", color: "from-[#584dff]/10 to-[#3d2e99]/5" },
        { type: "caption", text: "Testing across input methods reveals design issues that visual review alone misses." },
        { type: "heading2", text: "Patterns that scale" },
        { type: "heading3", text: "Focus management as a first-class concern" },
        { type: "paragraph", text: "Where focus goes when a modal opens, when a dropdown closes, when a toast appears — these micro-decisions compound into either a coherent experience or a confusing one. Define focus patterns at the system level, not component by component." },
        { type: "bigword", text: "Focus" },
        { type: "heading3", text: "Semantic structure over visual decoration" },
        { type: "paragraph", text: "A heading that looks like a heading but isn't marked up as one is invisible to assistive technology. Structure your components semantically first, then style them. The HTML should make sense even without CSS." },
        { type: "heading3", text: "Test with real assistive technology" },
        { type: "paragraph", text: "Automated accessibility tools catch about 30% of issues. The rest require manual testing with actual screen readers, keyboard navigation, and reduced motion preferences. Build this into your review process." },
        { type: "image-full", alt: "Component accessibility audit workflow", color: "from-[#3d2e99]/8 to-transparent" },
        { type: "heading2", text: "The business case is settled" },
        { type: "paragraph", text: "Accessible products reach more users, face fewer legal risks, and — here's the part that surprises people — are almost always better designed. Constraints breed creativity, and accessibility constraints breed clarity." },
        { type: "paragraph", text: "Stop treating accessibility as extra credit. It's the baseline." },
      ],
    },
    "5": {
      title: "How I Structure Design Tokens for Multi-Platform Products",
      subtitle: "A naming and architecture strategy that scales with your product",
      category: "Systems",
      date: "November 18, 2025",
      heroColor: "from-[#584dff]/18 to-[#2a1f9e]/8",
      sections: [
        { type: "paragraph", text: "Design tokens are the atoms of a design system — the smallest decisions that cascade into every component, every screen, every platform. Get the token architecture right, and the system almost maintains itself. Get it wrong, and you'll spend more time managing tokens than designing." },
        { type: "bigword", text: "Tokens" },
        { type: "heading2", text: "The three-tier model" },
        { type: "paragraph", text: "I structure tokens in three tiers: global, semantic, and component. Global tokens define the raw values — every color, every spacing unit. Semantic tokens give those values meaning — 'surface-primary', not 'gray-100'. Component tokens bind semantic tokens to specific use cases." },
        { type: "paragraph", text: "This layering means a brand refresh touches only the global tier. A theme switch touches only the semantic tier. A component redesign touches only the component tier. Each change is scoped exactly where it belongs." },
        { type: "image", alt: "Three-tier token architecture diagram", color: "from-[#584dff]/10 to-[#2a1f9e]/5" },
        { type: "caption", text: "Three-tier token architecture: global values, semantic meaning, component binding." },
        { type: "heading2", text: "Naming that scales" },
        { type: "heading3", text: "Be descriptive, not clever" },
        { type: "paragraph", text: "Token names should read like sentences: color-surface-primary, spacing-content-gap, font-heading-large. Anyone reading the token name should understand both what it is and where it's used." },
        { type: "bigword", text: "Clarity" },
        { type: "heading3", text: "Platform-agnostic definitions" },
        { type: "paragraph", text: "Define tokens in a platform-neutral format — JSON or YAML — then transform them for each platform. iOS, Android, web, and Figma should all consume the same source of truth, just in different formats." },
        { type: "image-full", alt: "Token transformation pipeline across platforms", color: "from-[#2a1f9e]/8 to-transparent" },
        { type: "heading2", text: "Maintenance is the real test" },
        { type: "paragraph", text: "A token architecture that's elegant on paper but painful to update has failed. The real measure is how easy it is to add a new theme, support a new platform, or evolve the visual language without breaking existing components." },
        { type: "paragraph", text: "Structure your tokens for the changes you know are coming." },
      ],
    },
  };

  if (fallbackTitles[postId]) return fallbackTitles[postId];

  // Generic fallback
  return {
    title: "Article",
    subtitle: "Coming soon",
    category: "Design",
    date: "2025",
    heroColor: "from-[#584dff]/15 to-[#584dff]/5",
    sections: [
      { type: "paragraph", text: "This article is coming soon. Check back later for the full content." },
    ],
  };
}

export function BlogDetail({ postId, onBack, onPostClick }: BlogDetailProps) {
  const article = getArticle(postId);

  return (
    <div className="min-h-screen bg-background text-foreground font-['Clash_Grotesk_Variable',sans-serif] pt-[200px] pb-32">
      {/* Hero Section */}
      <div className="mb-10">
        {/* Title — full width, light weight, large like Figma reference */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-['Cormorant',serif] font-light text-[clamp(48px,6vw,85px)] leading-[1.25] tracking-[-1.8px] mb-10"
        >
          {article.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-[clamp(18px,1.6vw,23px)] text-foreground/50 font-light leading-[1.2] tracking-[0.2px] mb-12"
        >
          {article.subtitle}
        </motion.p>

        {/* Meta row — spread apart like Figma: author left, category center, date right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center text-[15px] tracking-[-0.16px] font-light mb-10"
        >
          <span className="text-foreground">Hein Htet<span className="text-foreground/50">, Product Designer</span></span>
          <span className="text-foreground/50 ml-auto mr-auto">{article.category}</span>
          <span className="text-foreground/50">{article.date}</span>
        </motion.div>

        {/* Hero Image — full bleed, tall aspect ratio like Figma */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className={`w-[calc(100%+32px)] md:w-[calc(100%+48px)] -ml-4 md:-ml-6 aspect-[1392/835] rounded-xl bg-gradient-to-br ${article.heroColor} border border-foreground/[0.06] overflow-hidden relative`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 200" fill="none" className="w-[60%] max-w-[500px] opacity-40">
              <path d="M40 160 Q100 40 200 100 Q300 160 360 60" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground/20" />
              <circle cx="100" cy="80" r="30" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
              <circle cx="300" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
              <rect x="160" y="60" width="80" height="80" rx="8" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Article Body — centered 684px column like Figma */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-[684px] mx-auto pt-16"
      >
        {article.sections.map((section, idx) => {
          switch (section.type) {
            case "paragraph":
              return (
                <p
                  key={idx}
                  className="text-[19px] text-foreground/[0.78] font-light leading-[32px] tracking-[0.2px] mb-8"
                >
                  {section.text}
                </p>
              );
            case "heading2":
              return (
                <h2
                  key={idx}
                  className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[32px] leading-[1.25] tracking-[-0.5px] text-foreground mt-20 mb-8"
                >
                  {section.text}
                </h2>
              );
            case "heading3":
              return (
                <h3
                  key={idx}
                  className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[22px] leading-[28px] tracking-[-0.2px] text-foreground mt-12 mb-4"
                >
                  {section.text}
                </h3>
              );
            case "bigword":
              return (
                <div key={idx} className="w-[calc(100%+200px)] -ml-[100px] my-20 md:my-32 flex items-center justify-center">
                  <span className="font-['Cormorant',serif] font-light text-[clamp(80px,12vw,160px)] leading-[1] tracking-[-0.04em] text-foreground/[0.06] select-none">
                    {section.text}
                  </span>
                </div>
              );
            case "image":
              return (
                <div
                  key={idx}
                  className={`w-full aspect-[684/382] rounded-lg bg-gradient-to-br ${section.color} border border-foreground/[0.06] my-12 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 300 160" fill="none" className="w-[50%] opacity-30">
                      <rect x="40" y="30" width="80" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
                      <rect x="140" y="50" width="80" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
                      <line x1="120" y1="55" x2="140" y2="75" stroke="currentColor" strokeWidth="0.5" className="text-foreground/15" />
                      <circle cx="230" cy="60" r="15" stroke="currentColor" strokeWidth="0.5" className="text-foreground/15" />
                    </svg>
                  </div>
                </div>
              );
            case "image-full":
              return (
                <div
                  key={idx}
                  className={`w-[calc(100%+200px)] -ml-[100px] aspect-[1392/836] rounded-lg bg-gradient-to-br ${section.color} border border-foreground/[0.04] my-16 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 500 250" fill="none" className="w-[60%] opacity-25">
                      <path d="M50 200 Q150 50 250 125 Q350 200 450 80" stroke="currentColor" strokeWidth="1" fill="none" className="text-foreground/20" />
                      <path d="M50 200 Q150 50 250 125 Q350 200 450 80 L450 250 L50 250 Z" fill="currentColor" className="text-foreground/[0.03]" />
                    </svg>
                  </div>
                </div>
              );
            case "caption":
              return (
                <p
                  key={idx}
                  className="text-[13px] text-foreground/35 font-light tracking-[-0.1px] mb-10 -mt-8"
                >
                  {section.text}
                </p>
              );
            case "quote":
              return (
                <blockquote
                  key={idx}
                  className="border-l border-foreground/10 pl-6 my-12 text-[22px] font-light text-foreground/50 leading-[32px] italic"
                >
                  {section.text}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </motion.div>

      {/* Related Articles */}
      <div className="mt-44 w-[calc(100%+32px)] md:w-[calc(100%+48px)] -ml-4 md:-ml-6">
        <h3 className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[22px] leading-[28px] tracking-[-0.2px] text-foreground mb-8 px-4 md:px-6">
          Related Articles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-6">
          {getRelatedPosts(postId).map((relatedId) => {
            const related = getArticle(relatedId);
            return (
              <button
                key={relatedId}
                onClick={() => onPostClick?.(relatedId)}
                className="text-left group cursor-pointer flex flex-col"
              >
                {/* Thumbnail */}
                <div className={`w-full aspect-[448/273] rounded-lg bg-gradient-to-br ${related.heroColor} border border-foreground/[0.06] mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 120" fill="none" className="w-[50%] opacity-30">
                      <rect x="30" y="20" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
                      <rect x="100" y="35" width="50" height="35" rx="4" stroke="currentColor" strokeWidth="0.8" className="text-foreground/20" />
                      <line x1="80" y1="37" x2="100" y2="52" stroke="currentColor" strokeWidth="0.5" className="text-foreground/15" />
                      <circle cx="155" cy="45" r="10" stroke="currentColor" strokeWidth="0.5" className="text-foreground/15" />
                    </svg>
                  </div>
                </div>

                {/* Excerpt */}
                <span className="text-[15px] text-foreground/40 font-light leading-[24px] tracking-[-0.16px] mb-1">
                  {related.subtitle.length > 50 ? related.subtitle.slice(0, 50) + "…" : related.subtitle}
                </span>

                {/* Title */}
                <h4 className="text-[19px] text-foreground font-light leading-[26px] tracking-[-0.2px] group-hover:text-foreground/70 transition-colors mb-4">
                  {related.title}
                </h4>

                {/* Category + Date */}
                <div className="flex items-center gap-4 text-[15px] text-foreground/40 font-light tracking-[-0.16px] leading-[22px]">
                  <span>{related.category}</span>
                  <span>{related.date}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* How can we help */}
      <section className="w-[calc(100%+32px)] md:w-[calc(100%+48px)] -ml-4 md:-ml-6 py-[180px] border-t border-foreground/10 mt-32">
        <div className="px-4 md:px-6 flex flex-col lg:flex-row items-start justify-between">
          <h2 className="font-['Cormorant',serif] text-[clamp(48px,6vw,88px)] font-light leading-[1.1] tracking-tight">How can<br />we help?</h2>
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

      {/* Footer */}
      <footer className="w-[calc(100%+32px)] md:w-[calc(100%+48px)] -ml-4 md:-ml-6 py-20 border-t border-foreground/10">
        <div className="px-4 md:px-6 flex flex-wrap gap-x-32 gap-y-12 items-start">
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60 font-light">Social</span>
            <div className="flex gap-6">
              {["IG", "TW", "LI"].map(s => <a key={s} href="#" className="text-[16px] text-foreground font-light hover:opacity-60 transition-opacity">{s}</a>)}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60 font-light">Office</span>
            <p className="text-[16px] text-foreground font-light">Victoria, BC Canada</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[12px] uppercase tracking-[0.2em] text-foreground/60 font-light">Contact</span>
            <p className="text-[16px] text-foreground font-light">heindsgn@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
