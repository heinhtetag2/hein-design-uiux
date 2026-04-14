import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music } from "lucide-react";
import svgPaths from "../../imports/svg-lb0wh4b8mk";

interface TopNavProps {
  onLogoClick?: () => void;
  onNavigate?: (view: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact") => void;
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  currentView?: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact";
}

function Menu({ isOpen, setIsOpen, onNavigate, currentView }: { isOpen: boolean; setIsOpen: (open: boolean) => void; onNavigate?: (view: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact") => void; currentView?: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact" }) {
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex h-[22px] items-center justify-center px-[16px] relative rounded-full hover:bg-foreground/10 transition-colors cursor-pointer group shrink-0 z-[101]"
      >
        <div className="absolute border border-solid border-foreground/30 group-hover:border-foreground inset-0 rounded-full transition-colors" />
        <span className="font-['Clash_Grotesk_Variable',sans-serif] font-light text-[12px] text-foreground tracking-tight leading-none">
          Menu
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/40 z-[150]"
            />
            
            {/* Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-[10px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] sm:w-[645px] bg-background/95 backdrop-blur-3xl border border-foreground/10 rounded-[28px] z-[160] overflow-hidden"
            >
              <div className="p-8 sm:p-12">
                <div className="flex justify-between items-start mb-16">
                  <div className="space-y-1">
                    <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Navigation</p>
                    <h2 className="font-['Cormorant',serif] text-[32px] font-normal leading-tight text-foreground">Select a destination</h2>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center size-8 rounded-full border border-foreground/10 hover:border-foreground transition-colors cursor-pointer"
                  >
                    <span className="font-['Clash_Grotesk_Variable',sans-serif] text-[10px] uppercase">✕</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <nav className="flex flex-col gap-4">
                    {[
                      { label: 'Home', view: 'home' },
                      { label: 'What I Do', view: 'what-i-do' },
                      { label: 'About Me', view: 'about' },
                      { label: 'My Blogs', view: 'blogs' },
                      { label: 'Get in Touch', view: 'contact' },
                    ].map((item, idx) => {
                      const isActive = currentView === item.view;
                      return (
                        <motion.button
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 + 0.1 }}
                          onClick={() => {
                            if (!isActive) onNavigate?.(item.view as any);
                            setIsOpen(false);
                          }}
                          className="group flex items-center gap-3 text-left cursor-pointer"
                        >
                          <span className={`font-['Clash_Grotesk_Variable',sans-serif] text-[10px] transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>0{idx + 1}</span>
                          <span className={`font-['Clash_Grotesk_Variable',sans-serif] text-[18px] font-light transition-all ${isActive ? 'text-foreground/40' : 'text-foreground group-hover:translate-x-1'}`}>{item.label}</span>
                          {isActive && <span className="size-1.5 rounded-full bg-foreground/40" />}
                        </motion.button>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col justify-between pt-2 border-t sm:border-t-0 sm:border-l border-foreground/5 sm:pl-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Contact</p>
                        <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[14px] text-foreground">heindsgn@gmail.com</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Follow</p>
                        <div className="flex gap-4">
                          {['IG', 'TW', 'LI'].map(s => (
                            <a key={s} href="#" className="font-['Clash_Grotesk_Variable',sans-serif] text-[12px] text-foreground hover:opacity-50 transition-opacity">{s}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 sm:mt-0">
                      <div className="h-px w-full bg-foreground/5 mb-4" />
                      <p className="font-['Clash_Grotesk_Variable',sans-serif] text-[10px] text-muted-foreground italic">
                        Intentional design since 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function TimeInfo() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Yangon",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex font-['Clash_Grotesk_Variable',sans-serif] font-light gap-[2px] items-center text-[12px] text-right text-foreground tracking-tight whitespace-nowrap">
      <span className="leading-none uppercase">MMR</span>
      <span className="leading-none">{time}</span>
    </div>
  );
}

function MoonIcon({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative size-[20px] sm:size-[22px] shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <path clipRule="evenodd" d={svgPaths.p228d1600} className="fill-foreground" fillRule="evenodd" />
      </svg>
    </button>
  );
}

function MailIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center size-[20px] sm:size-[22px] shrink-0 cursor-pointer"
      aria-label="Get in Touch"
    >
      <svg className="block w-[10px] h-[8px]" fill="none" preserveAspectRatio="none" viewBox="0 0 10 8">
        <path d={svgPaths.p2da61a00} className="stroke-foreground" />
        <path d={svgPaths.p234cb200} className="stroke-foreground" />
      </svg>
    </button>
  );
}

function MusicIcon({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative size-[20px] sm:size-[22px] shrink-0 cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center group"
    >
      <div className="relative flex items-center justify-center">
        <Music className={`size-[12px] transition-all duration-300 ${isPlaying ? "text-foreground opacity-100" : "text-foreground/40 opacity-50"}`} />
        {!isPlaying && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "16px" }}
            className="absolute h-[1px] bg-foreground/60 rotate-45 pointer-events-none"
          />
        )}
      </div>
    </button>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="relative lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 flex items-end lg:left-1/2 lg:top-1/2 scale-75 sm:scale-100 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="h-[18px] w-[15px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3226 18.2338">
          <path d={svgPaths.p6e9c80} className="fill-foreground" />
        </svg>
      </div>
      <div className="h-[18px] w-[15px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3226 18.2338">
          <path d={svgPaths.p6e9c80} className="fill-foreground" />
        </svg>
      </div>
      <div className="flex flex-col h-[18px] items-start justify-center relative">
        <div className="w-[9px] h-[9px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.35484 9.20151">
            <path d={svgPaths.p996def0} className="fill-foreground" />
          </svg>
        </div>
        <div className="bg-foreground h-[9px] rounded-tr-[3px] w-[9px]" />
      </div>
    </button>
  );
}

export function TopNav({ onLogoClick, onNavigate, isMenuOpen, onMenuOpenChange, currentView }: TopNavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const handleVideoLoaded = () => {
      setTimeout(() => setIsVisible(true), 100);
    };

    window.addEventListener('videoLoaded', handleVideoLoaded);
    
    // Fallback
    const fallbackTimer = setTimeout(() => setIsVisible(true), 1300);

    return () => {
      window.removeEventListener('videoLoaded', handleVideoLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  React.useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    
    // Attempt to autoplay
    if (isMusicPlaying) {
      audioRef.current.play().catch(e => {
        console.log("Autoplay blocked by browser. Music will start on user interaction.");
      });
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Ensure dark mode is active by default on first load
    if (!document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('light')) {
      document.documentElement.classList.add('dark');
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <motion.header 
      className={`fixed top-[10px] left-1/2 -translate-x-1/2 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full border ${
        isMenuOpen
          ? "w-[calc(100%-32px)] sm:w-[645px] h-[54px] px-[16px] sm:px-[24px] bg-transparent border-transparent backdrop-blur-none z-50"
          : scrolled 
          ? "w-[calc(100%-32px)] sm:w-[645px] h-[54px] px-[16px] sm:px-[24px] bg-background/20 border-foreground/10 backdrop-blur-[10px] z-50" 
          : "w-[calc(100%-32px)] md:w-[calc(100%-80px)] max-w-[1880px] h-[80px] px-0 bg-transparent border-transparent backdrop-blur-none z-50"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Menu isOpen={isMenuOpen} setIsOpen={onMenuOpenChange} onNavigate={onNavigate} currentView={currentView} />
      <Logo onClick={onLogoClick} />
      <div className="flex gap-2 sm:gap-[8px] items-center">
        <TimeInfo />
        <MoonIcon onClick={toggleTheme} />
        <MusicIcon isPlaying={isMusicPlaying} onClick={toggleMusic} />
        <MailIcon onClick={() => onNavigate("contact")} />
      </div>
    </motion.header>
  );
}