import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Mail, Download } from "lucide-react";
import { useCart } from "../shop/CartContext";
// Site logo — light & dark variants. The theme swaps between them via the
// [data-logo] rules in theme.css. Replacements live in src/assets/brand/.
import logoLight from "../../assets/brand/logo-light.svg";
import logoDark from "../../assets/brand/logo-dark.svg";

interface TopNavProps {
  onLogoClick?: () => void;
  onNavigate?: (view: "home" | "edusync" | "what-i-do" | "blogs" | "contact" | "visitor-gallery" | "all-work" | "shop") => void;
  isMenuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  currentView?: "home" | "edusync" | "what-i-do" | "blogs" | "contact" | "visitor-gallery" | "all-work" | "shop" | "blog-detail" | "product-detail" | "checkout";
}

function Menu({ isOpen, setIsOpen, onNavigate, currentView }: { isOpen: boolean; setIsOpen: (open: boolean) => void; onNavigate?: (view: "home" | "edusync" | "what-i-do" | "blogs" | "contact" | "visitor-gallery" | "all-work" | "shop") => void; currentView?: "home" | "edusync" | "what-i-do" | "blogs" | "contact" | "visitor-gallery" | "all-work" | "shop" | "blog-detail" | "product-detail" | "checkout" }) {
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex h-[22px] items-center justify-center px-[16px] relative rounded-full hover:bg-foreground/10 transition-colors cursor-pointer group shrink-0 z-[101]"
      >
        <div className="absolute border border-solid border-foreground/30 group-hover:border-foreground inset-0 rounded-full transition-colors" />
        <span className="font-display font-light text-caption text-foreground tracking-tight leading-none">
          Menu
        </span>
      </button>

      {createPortal(
        <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/30 z-[150]"
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
                    <p className="font-display text-eyebrow text-muted-foreground">Navigation</p>
                    <h2 className="font-serif text-h2 font-normal leading-tight text-foreground">Select a destination</h2>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center size-8 rounded-full border border-foreground/10 hover:border-foreground transition-colors cursor-pointer"
                  >
                    <span className="font-display text-eyebrow">✕</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <nav className="flex flex-col gap-4">
                    {[
                      { label: 'My Works', view: 'all-work' },
                      { label: 'About Me', view: 'what-i-do' },
                      { label: 'My Blogs', view: 'blogs' },
                      { label: 'Shop', view: 'shop' },
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
                          <span className={`font-display text-micro transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>0{idx + 1}</span>
                          <span className={`font-display text-h4 font-light transition-all ${isActive ? 'text-foreground/40' : 'text-foreground group-hover:translate-x-1'}`}>{item.label}</span>
                          {isActive && <span className="size-1.5 rounded-full bg-foreground/40" />}
                        </motion.button>
                      );
                    })}
                  </nav>

                  <div className="flex flex-col justify-between pt-2 border-t sm:border-t-0 sm:border-l border-foreground/5 sm:pl-12">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <p className="font-display text-eyebrow text-muted-foreground">Contact</p>
                        <p className="font-display text-body-sm text-foreground">heincise@gmail.com</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-display text-eyebrow text-muted-foreground">Follow</p>
                        <div className="flex gap-4">
                          {['IG', 'TW', 'LI'].map(s => (
                            <a key={s} href="#" className="font-display text-caption text-foreground hover:opacity-50 transition-opacity">{s}</a>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            if (currentView !== 'visitor-gallery') onNavigate?.('visitor-gallery');
                            setIsOpen(false);
                          }}
                          className={`group flex items-center justify-between gap-3 w-full text-left cursor-pointer rounded-2xl border px-4 py-3 transition-colors ${
                            currentView === 'visitor-gallery'
                              ? 'border-foreground/30 bg-foreground/[0.04]'
                              : 'border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.03]'
                          }`}
                        >
                          <span className="space-y-0.5">
                            <span className="block font-display text-eyebrow text-muted-foreground">Guestbook</span>
                            <span className="block font-display font-light text-body-sm text-foreground">Visitor Gallery</span>
                          </span>
                          <span className="font-display text-body-sm text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all">→</span>
                        </button>
                        <a
                          href="/cv.pdf"
                          download="Hein-Htet-CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center justify-between gap-3 w-full text-left cursor-pointer rounded-2xl border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.03] px-4 py-2 transition-colors"
                        >
                          <span className="block font-display font-light text-body-sm text-foreground">Download CV</span>
                          <Download className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="font-display text-caption text-muted-foreground italic">
                        Intentional design since 2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// World clock — rotates through these zones, home (MMR) first.
const TIME_ZONES = [
  { label: "MMR", tz: "Asia/Yangon" },
  { label: "NYC", tz: "America/New_York" },
  { label: "LON", tz: "Europe/London" },
  { label: "TOK", tz: "Asia/Tokyo" },
  { label: "PAR", tz: "Europe/Paris" },
  { label: "LAX", tz: "America/Los_Angeles" },
];

function TimeInfo() {
  const [idx, setIdx] = React.useState(0);
  const [now, setNow] = React.useState(() => new Date());

  // Tick the clock every second.
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Rotate to the next city every few seconds.
  React.useEffect(() => {
    const rot = setInterval(
      () => setIdx((i) => (i + 1) % TIME_ZONES.length),
      4000,
    );
    return () => clearInterval(rot);
  }, []);

  const zone = TIME_ZONES[idx];
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: zone.tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <div className="hidden sm:flex font-display font-light items-center text-caption text-right text-foreground tracking-tight whitespace-nowrap overflow-hidden">
      {/* Each city slides up as the previous one leaves */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={zone.label}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex gap-[2px] items-center"
        >
          <span className="leading-none uppercase">{zone.label}</span>
          <span className="leading-none">{time}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function MailIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center shrink-0 h-[22px] cursor-pointer rounded-full border border-transparent hover:border-foreground hover:bg-foreground/10 pl-0 hover:pl-3 pr-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
      aria-label="Get in Touch"
    >
      {/* Label unfolds out from beside the icon via a 0fr→1fr grid column */}
      <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <span className="overflow-hidden whitespace-nowrap font-display font-light text-caption tracking-tight leading-none text-foreground -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:pr-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
          Get in Touch
        </span>
      </span>
      <span className="flex items-center justify-center size-[22px] shrink-0 rounded-full transition-colors duration-500 group-hover:bg-foreground/[0.06]">
        <Mail className="size-[15px] text-foreground transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-px group-hover:translate-x-px" strokeWidth={1.5} />
      </span>
    </button>
  );
}

function CvButton() {
  // Lives in /public, served at the site root. Replace public/cv.pdf with the
  // real résumé and this keeps working — no import or rebuild needed.
  return (
    <a
      href="/cv.pdf"
      download="Hein-Htet-CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center shrink-0 h-[22px] cursor-pointer rounded-full border border-transparent hover:border-foreground hover:bg-foreground/10 pl-0 hover:pl-3 pr-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
      aria-label="Download CV"
      title="Download CV"
    >
      {/* Label unfolds out from beside the icon via a 0fr→1fr grid column */}
      <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <span className="overflow-hidden whitespace-nowrap font-display font-light text-caption tracking-tight leading-none text-foreground -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:pr-2 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
          Download CV
        </span>
      </span>
      <span className="flex items-center justify-center size-[22px] shrink-0 rounded-full transition-colors duration-300 group-hover:bg-foreground/[0.06]">
        <Download className="size-[15px] text-foreground transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-px" strokeWidth={1.5} />
      </span>
    </a>
  );
}

function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Open cart${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
      className="relative flex size-[20px] sm:size-[22px] shrink-0 items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
    >
      <ShoppingBag className="size-[15px] text-foreground" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex min-w-[14px] h-[14px] items-center justify-center rounded-full bg-brand px-1 text-[8px] font-medium leading-none text-brand-foreground tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Home"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center scale-75 sm:scale-100 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <img src={logoLight} alt="Heindsgn" data-logo="light" className="h-[26px] w-auto" />
      <img src={logoDark} alt="Heindsgn" data-logo="dark" className="h-[26px] w-auto" />
    </button>
  );
}

export function TopNav({ onLogoClick, onNavigate, isMenuOpen, onMenuOpenChange, currentView }: TopNavProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <MailIcon onClick={() => onNavigate("contact")} />
        <CvButton />
        <CartButton />
      </div>
    </motion.header>
  );
}