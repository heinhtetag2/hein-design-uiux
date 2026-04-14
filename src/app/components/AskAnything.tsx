import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/svg-lb0wh4b8mk";

const HOME_SUGGESTIONS = [
  { label: "Who is he?", value: "Who is Hein Htet?" },
  { label: "Skills", value: "What are your technical skills?" },
  { label: "Personality", value: "Tell me about your personality" },
  { label: "Projects", value: "What projects have you worked on?" },
];

const EDUSYNC_SUGGESTIONS = [
  { label: "Goal", value: "What was the main goal of EduSync?" },
  { label: "Role", value: "What was your role in this project?" },
  { label: "Tech", value: "What technologies were used for EduSync?" },
  { label: "Impact", value: "What was the impact of the redesign?" },
];

interface AskAnythingProps {
  context?: "home" | "edusync" | "blogs";
  isMenuOpen?: boolean;
}

export function AskAnything({ context = "home", isMenuOpen = false }: AskAnythingProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = context === "home" ? HOME_SUGGESTIONS : context === "edusync" ? EDUSYNC_SUGGESTIONS : [
    { label: "AI Articles", value: "Show me articles about AI" },
    { label: "Design Process", value: "What is your design process?" },
    { label: "Latest Post", value: "What is the most recent blog post?" },
  ];

  useEffect(() => {
    const handleVideoLoaded = () => {
      setTimeout(() => setIsVisible(true), 600);
    };

    window.addEventListener('videoLoaded', handleVideoLoaded);
    
    // Fallback
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1900);

    return () => {
      window.removeEventListener('videoLoaded', handleVideoLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isMobile]);

  useEffect(() => {
    // Reset state when context changes
    setResponse(null);
    setQuestion("");
    setIsOpen(false);
  }, [context]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRun = (customQuestion?: string) => {
    const finalQuestion = customQuestion || question;
    if (!finalQuestion.trim()) return;

    if (customQuestion) setQuestion(customQuestion);
    
    setIsTyping(true);
    setResponse(null);
    setIsOpen(true);

    setTimeout(() => {
      const q = finalQuestion.toLowerCase();
      let res = "";

      if (context === "home") {
        res = "That's a great question! Hein Htet is a multi-disciplinary designer and developer focused on crafting intentional digital experiences.";
        if (q.includes("who") || q.includes("about")) {
          res = "Hein Htet is a product designer specializing in creating high-fidelity, interactive prototypes and scalable design systems.";
        } else if (q.includes("skill") || q.includes("tech")) {
          res = "He specializes in React, Tailwind CSS, Motion, and Figma, bridging the gap between design and engineering.";
        } else if (q.includes("work") || q.includes("project")) {
          res = "His work ranges from educational platforms like EduSync to complex music and AI-driven interfaces.";
        } else if (q.includes("personality")) {
          res = "Hein Htet is detail-oriented, collaborative, and deeply curious. He brings a blend of technical precision and creative empathy to every project, always striving for 'Experience, intentionally'.";
        }
      } else if (context === "edusync") {
        // EduSync context
        res = "EduSync is a comprehensive educational management platform. I can tell you more about the design system, the user research, or the technical implementation.";
        if (q.includes("goal")) {
          res = "The main goal of EduSync was to streamline communication between teachers, students, and parents while providing a clear overview of academic progress.";
        } else if (q.includes("role")) {
          res = "As the Lead Product Designer, I was responsible for the end-to-end design process, from initial wireframing and user testing to building the design system in Figma.";
        } else if (q.includes("tech")) {
          res = "For EduSync, we used a stack including React for the frontend, Node.js for the backend, and PostgreSQL for data management. The interface was styled with custom CSS modules.";
        } else if (q.includes("impact")) {
          res = "The redesign led to a 40% increase in daily active users and significantly reduced the time teachers spent on administrative tasks.";
        } else if (q.includes("hi") || q.includes("hello")) {
          res = "Hi! Interested in learning more about the EduSync case study? I'm here to help with any details!";
        }
      } else if (context === "blogs") {
        res = "I'm the blog assistant. I can help you find specific articles or tell you more about our writing themes like AI, Design, and Strategy.";
        if (q.includes("ai")) {
          res = "We have several articles on AI, including 'Designing a New Relationship with AI' by Sara Vienna and 'Remote Bubble' by Jane Moore.";
        } else if (q.includes("design")) {
          res = "Design is a core theme here. You might like 'The Problem with Brand Guidelines' or 'Evolving with Intent'.";
        } else if (q.includes("recent") || q.includes("latest")) {
          res = "The most recent post is 'Designing a New Relationship with AI' from July 2025.";
        }
      }

      setResponse(res);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <motion.div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[500px] px-4 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'opacity-100'}`}
      data-theme-exempt="true"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative flex flex-col items-center ${isExpanded ? 'gap-4 w-full' : 'gap-0 w-auto'}`}>
        {/* Hidden state — minimal pill to reopen */}
        <AnimatePresence mode="wait">
          {isHidden ? (
            <motion.button
              key="toggle-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => { setIsHidden(false); setIsExpanded(!isMobile); }}
              className="group relative rounded-full p-[1px] active:scale-95 transition-transform cursor-pointer overflow-hidden"
              aria-label="Show assistant"
            >
              {/* Spinning gradient border */}
              <div className="absolute inset-[-50%] animate-[spin_2.5s_linear_infinite]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, transparent 25%, #584dff 45%, #584dff 55%, transparent 75%, transparent 100%)',
                }}
              />
              <div className="relative flex items-center gap-2 px-5 h-10 rounded-full bg-background/80 backdrop-blur-xl text-foreground/60 group-hover:text-foreground transition-colors">
                <svg width="14" height="14" viewBox="0 0 10 10" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity">
                  <path d={svgPaths.p996def0} />
                </svg>
                <span className="font-['Clash_Grotesk_Variable',sans-serif] text-[12px] tracking-wide">
                  Ask me anything
                </span>
              </div>
            </motion.button>
          ) : !isExpanded ? (
            <motion.button
              key="toggle-collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "linear" }}
              onClick={() => setIsExpanded(true)}
              className="lg:hidden flex items-center gap-2.5 px-6 h-12 rounded-full bg-background/60 backdrop-blur-xl text-foreground border border-foreground/10 active:scale-95 transition-all cursor-pointer z-50"
              aria-label="Show Chat"
            >
              <svg width="16" height="16" viewBox="0 0 10 10" fill="currentColor">
                <path d={svgPaths.p996def0} />
              </svg>
              <span className="font-['Cormorant',serif] font-medium tracking-normal mt-0.5 text-[13px]">
                Ask anything
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="chat-expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "linear" }}
              className="w-full flex flex-col items-center gap-4"
            >
              {/* Collapse / Hide buttons */}
              <div className="w-full flex justify-center mb-[-12px] px-2 gap-2">
                {/* Mobile collapse (keep chat accessible) */}
                {isMobile && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 rounded-full bg-background/40 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    aria-label="Minimize"
                  >
                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                      <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                )}
                {/* Hide button — works on both mobile and desktop */}
                <button
                  onClick={() => { setIsHidden(true); setIsOpen(false); setResponse(null); setQuestion(""); }}
                  className="w-8 h-8 rounded-full bg-background/40 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  aria-label="Hide assistant"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap justify-center gap-2 mb-[-8px]">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleRun(s.value)}
                    className="bg-background/60 backdrop-blur-md border border-foreground/8 hover:border-foreground/20 px-3 py-1.5 rounded-full text-[11px] font-['Clash_Grotesk_Variable',sans-serif] text-foreground/80 hover:text-foreground transition-all cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Response Bubble */}
              <AnimatePresence>
                {isOpen && (response || isTyping) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-12 w-full bg-background/80 backdrop-blur-md border border-foreground/10 rounded-2xl p-[20px]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-['Clash_Grotesk_Variable',sans-serif] text-muted-foreground text-[10px] uppercase tracking-widest">
                        {context === "home" ? "Portfolio Assistant" : context === "edusync" ? "Project Assistant" : "Blog Assistant"}
                      </div>
                      <button 
                        onClick={() => {
                          setIsOpen(false);
                          setResponse(null);
                          setQuestion("");
                        }}
                        className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </button>
                    </div>
                    <div className="font-['Clash_Grotesk_Variable',sans-serif] text-[15px] text-foreground leading-relaxed">
                      {isTyping ? (
                        <div className="flex gap-1 items-center h-[24px]">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                        </div>
                      ) : (
                        response
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Input Bar */}
              <div className="bg-background/60 backdrop-blur-xl rounded-full pl-[20px] pr-[10px] py-[10px] w-full flex items-center gap-[10px] border border-foreground/10 focus-within:border-foreground/30 transition-all">
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRun()}
                    placeholder={context === "home" ? "Ask about Hein Htet" : context === "edusync" ? "Ask about EduSync" : "Ask about blogs"}
                    className="bg-transparent border-none outline-none text-[15px] text-foreground font-['Clash_Grotesk_Variable',sans-serif] placeholder:text-foreground/40 flex-1 min-w-0"
                  />
                  <div className="hidden sm:flex items-center gap-1 bg-foreground/5 border border-foreground/10 rounded px-1.5 py-0.5 pointer-events-none">
                    <span className="text-[10px] text-muted-foreground font-sans">⌘</span>
                    <span className="text-[10px] text-muted-foreground font-sans uppercase">K</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRun()}
                  disabled={isTyping || !question.trim()}
                  className="bg-foreground flex gap-[4px] h-[36px] items-center justify-center px-[14px] rounded-full shrink-0 border border-transparent hover:border-background/50 active:scale-95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <span className="font-['Clash_Grotesk_Variable',sans-serif] font-medium text-background text-[14px]">
                    Ask
                  </span>
                  <div className="flex items-center">
                    <div className="w-[12px] h-[12px] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="stroke-background">
                        <path d="M10 3V6C10 7.10457 9.10457 8 8 8H2M2 8L5 5M2 8L5 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}