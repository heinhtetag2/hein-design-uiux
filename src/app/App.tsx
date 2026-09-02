import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { X } from "lucide-react";
import Lenis from "lenis";
// Critical "home" shell — eager so the first paint has no extra round-trip.
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { VideoBackground } from "./components/VideoBackground";
import { CaseStudyHoverBackground } from "./components/CaseStudyHoverBackground";
import { CaseStudyHoverContent } from "./components/CaseStudyHoverContent";
import { CustomCursor } from "./components/CustomCursor";
import { VisitorCard } from "./components/VisitorCard";
import { VISITOR_STORAGE_KEY, appendVisitor, isUniqueCardId, type Visitor } from "./visitorStore";
import { CartProvider } from "./shop/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { caseStudies } from "./components/caseStudies";

// Non-home views — code-split. Each loads on navigation and fades in via the
// content crossfade, so there is no perceptible loading state.
const EduSync = lazy(() => import("./components/EduSync").then((m) => ({ default: m.EduSync })));
const CaseStudyTemplate = lazy(() => import("./components/CaseStudyTemplate").then((m) => ({ default: m.CaseStudyTemplate })));
const WhatIDo = lazy(() => import("./components/WhatIDo").then((m) => ({ default: m.WhatIDo })));
const AllWork = lazy(() => import("./components/AllWork").then((m) => ({ default: m.AllWork })));
const Blogs = lazy(() => import("./components/Blogs").then((m) => ({ default: m.Blogs })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const BlogDetail = lazy(() => import("./components/BlogDetail").then((m) => ({ default: m.BlogDetail })));
const VisitorGallery = lazy(() => import("./components/VisitorGallery").then((m) => ({ default: m.VisitorGallery })));
const Shop = lazy(() => import("./components/Shop").then((m) => ({ default: m.Shop })));
const ProductDetail = lazy(() => import("./components/ProductDetail").then((m) => ({ default: m.ProductDetail })));
const Checkout = lazy(() => import("./components/Checkout").then((m) => ({ default: m.Checkout })));

// Dev flag — show the intro on every refresh. Flip to false to gate by first visit (one pass per device).
const ALWAYS_SHOW_VISITOR_INTRO = false;

type View = "home" | "edusync" | "twostay" | "joanx" | "goft" | "probridge" | "cardo" | "what-i-do" | "blogs" | "blog-detail" | "contact" | "visitor-gallery" | "all-work" | "shop" | "product-detail" | "checkout";

// Force rebuild
export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState<string | null>(null);
  const [homeMountKey, setHomeMountKey] = useState(0);
  const [showVisitorCard, setShowVisitorCard] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (ALWAYS_SHOW_VISITOR_INTRO) return true;
    // Show on every visit until the visitor has FILLED a card that's actually visible
    // in the gallery. A missing card — or a legacy card with an all-numeric id (which
    // the gallery now hides) — re-triggers onboarding so the visitor can re-issue it.
    const raw = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (!raw) return true;
    try {
      return !isUniqueCardId((JSON.parse(raw) as Visitor)?.no);
    } catch {
      return true;
    }
  });
  const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  // Bumped after every save so a mounted VisitorGallery re-fetches and shows the change.
  const [visitorRefreshKey, setVisitorRefreshKey] = useState(0);

  // Circle wipe between sections: "cover" grows a solid disc over the outgoing
  // page from screen-center; once it fully covers, the view swaps underneath
  // (hidden) and "reveal" shrinks the same disc back down to 0, uncovering the
  // new page. pendingViewRef carries the destination across the two phases.
  const [wipePhase, setWipePhase] = useState<"idle" | "cover" | "reveal">("idle");
  const pendingViewRef = useRef<View | null>(null);

  const handleVisitorComplete = (visitor: Visitor) => {
    try {
      window.localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(visitor));
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    // Local list updates synchronously; the remote insert resolves in the background.
    // If the remote save fails (dead backend, offline), surface it instead of failing silently.
    void appendVisitor(visitor).then((res) => {
      setSaveFailed(res.remote === "failed");
      // Refresh the gallery once the write settles so the new/edited card appears.
      setVisitorRefreshKey((k) => k + 1);
    });
    if (editingVisitor) {
      setShowVisitorCard(false);
      setEditingVisitor(null);
      return;
    }
    setShowVisitorCard(false);
    setHomeMountKey((k) => k + 1);
  };

  // Skip = dismiss for this session only. Nothing is saved, so the onboarding
  // reappears on the next visit/refresh until the visitor actually fills a card.
  const handleVisitorSkip = () => {
    setShowVisitorCard(false);
    setHomeMountKey((k) => k + 1);
  };

  useEffect(() => {
    if (!saveFailed) return;
    const t = setTimeout(() => setSaveFailed(false), 6000);
    return () => clearTimeout(t);
  }, [saveFailed]);

  const openEditCard = () => {
    try {
      const raw = window.localStorage.getItem(VISITOR_STORAGE_KEY);
      setEditingVisitor(raw ? (JSON.parse(raw) as Visitor) : null);
    } catch {
      setEditingVisitor(null);
    }
    setShowVisitorCard(true);
  };

  const closeEditCard = () => {
    setShowVisitorCard(false);
    setEditingVisitor(null);
  };

  useEffect(() => {
    const lock = currentView === "home" && window.matchMedia("(min-width: 1024px)").matches;
    document.body.style.overflow = lock ? "hidden" : "";
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [currentView]);

  // Subtle smooth-scroll easing on scrollable pages (everywhere except locked home desktop)
  useEffect(() => {
    const isHomeLocked =
      currentView === "home" && window.matchMedia("(min-width: 1024px)").matches;
    if (isHomeLocked) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [currentView]);

  // Navigation just swaps the view; the content AnimatePresence crossfades the
  // old page out and the new one in. Scroll reset happens in onExitComplete,
  // once the outgoing page has faded, so it never yanks visible content.
  const handleBlogPostClick = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentView("blog-detail");
  };

  const handleBackToBlogs = () => {
    setSelectedPostId(null);
    setCurrentView("blogs");
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView("product-detail");
  };

  const handleNavigate = (view: Exclude<View, "blog-detail">) => {
    if (view === currentView || wipePhase !== "idle") return;
    pendingViewRef.current = view;
    setWipePhase("cover");
  };

  return (
    <MotionConfig reducedMotion="user">
    <CartProvider>
    <div
      data-page={currentView}
      className={`bg-background text-foreground w-full selection:bg-brand selection:text-brand-foreground [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] ${
        currentView === "home"
          ? "min-h-screen lg:h-screen lg:overflow-hidden"
          : "overflow-x-hidden"
      }`}
    >
      {/* Video Background - Only on Home */}
      {currentView === "home" && <VideoBackground key={`bg-${homeMountKey}`} />}
      {currentView === "home" && <CaseStudyHoverBackground hoveredStudy={hoveredCaseStudy} />}
      {currentView === "home" && <CaseStudyHoverContent hoveredStudy={hoveredCaseStudy} />}
      
      <CustomCursor />

      {wipePhase !== "idle" && (
        <motion.div
          key="curtain-wipe"
          className="fixed inset-0 z-[9500] bg-background pointer-events-none"
          initial={{ y: "100%" }}
          animate={{ y: wipePhase === "cover" ? "0%" : "-100%" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => {
            if (wipePhase === "cover") {
              setCurrentView(pendingViewRef.current!);
              setHoveredCaseStudy(null);
              window.scrollTo({ top: 0, behavior: "instant" });
              // Brief hold at full coverage so the swap reads as a deliberate
              // beat rather than a jump-cut mid-motion.
              window.setTimeout(() => setWipePhase("reveal"), 140);
            } else {
              setWipePhase("idle");
            }
          }}
        />
      )}

      <AnimatePresence>
        {showVisitorCard && (
          <VisitorCard
            onComplete={handleVisitorComplete}
            onSkip={handleVisitorSkip}
            initial={editingVisitor}
            onClose={editingVisitor ? closeEditCard : undefined}
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto w-full max-w-[1920px] h-full z-10">
        <TopNav
          key={`topnav-${homeMountKey}`}
          onLogoClick={() => handleNavigate("home")}
          onNavigate={handleNavigate}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          currentView={currentView}
        />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
        >
          <motion.div
            key={`${currentView}-${homeMountKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full px-[14px] lg:px-6"
          >
            <Suspense fallback={null}>
            {currentView === "home" ? (
              <>
                {/* Mobile/Tablet Content */}
                <div className="lg:hidden flex flex-col min-h-[100dvh] pt-[100px] pb-[30px]">
                  <div className="flex flex-col gap-[40px]">
                    <Hero isStudyHovered={!!hoveredCaseStudy} />
                    <div className="w-[20px] h-[1px] bg-foreground/20" />
                    <Sidebar
                      onCaseStudyClick={handleNavigate}
                      isMenuOpen={isMenuOpen}
                      activeView={currentView}
                    />
                  </div>
                  <p className="mt-auto pt-16 font-display font-light text-body-sm sm:text-body text-foreground/70 max-w-[300px]">
                    Since 2024, I've helped the most innovative startups and reputable
                    brands design, build, and ship products worth talking about.
                  </p>
                </div>

                {/* Desktop Absolute Content (lg and up) */}
                <div className="hidden lg:block">
                  <Sidebar
                    onCaseStudyClick={handleNavigate}
                    onCaseStudyHover={(study) => {
                      setHoveredCaseStudy(study);
                    }}
                    isMenuOpen={isMenuOpen}
                    activeView={currentView}
                  />
                  <Hero isStudyHovered={!!hoveredCaseStudy} />
                </div>
              </>
            ) : currentView === "edusync" ? (
              <div className="pt-[100px] relative">
                <EduSync onNavigate={handleNavigate} />
              </div>
            ) : caseStudies[currentView] ? (
              <div className="pt-[100px] relative">
                <CaseStudyTemplate data={caseStudies[currentView]} onNavigate={handleNavigate} />
              </div>
            ) : currentView === "what-i-do" ? (
              <WhatIDo onNavigate={handleNavigate} />
            ) : currentView === "all-work" ? (
              <AllWork onNavigate={handleNavigate} />
            ) : currentView === "shop" ? (
              <Shop onOpenProduct={handleProductClick} onNavigate={handleNavigate} />
            ) : currentView === "product-detail" && selectedProductId ? (
              <ProductDetail productId={selectedProductId} onBack={() => handleNavigate("shop")} />
            ) : currentView === "checkout" ? (
              <Checkout onBack={() => handleNavigate("shop")} />
            ) : currentView === "blog-detail" && selectedPostId ? (
              <BlogDetail postId={selectedPostId} onBack={handleBackToBlogs} onPostClick={handleBlogPostClick} onNavigate={handleNavigate} />
            ) : currentView === "blogs" ? (
              <Blogs onPostClick={handleBlogPostClick} onNavigate={handleNavigate} />
            ) : currentView === "visitor-gallery" ? (
              <VisitorGallery onEditCard={openEditCard} refreshKey={visitorRefreshKey} />
            ) : (
              <Contact />
            )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* <AskAnything context={currentView === "home" ? "home" : currentView === "edusync" ? "edusync" : "blogs"} isMenuOpen={isMenuOpen} /> */}

      {/* Save-failure toast — visitor pass is kept locally but didn't reach the gallery. */}
      <AnimatePresence>
        {saveFailed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9500] flex items-center gap-3 rounded-full border border-foreground/15 bg-background/80 backdrop-blur-xl px-4 py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <span className="inline-block size-1.5 rounded-full bg-foreground/40" />
            <span className="font-display text-caption text-foreground/70">
              Saved to this device — couldn't reach the gallery.
            </span>
            <button
              type="button"
              onClick={() => setSaveFailed(false)}
              aria-label="Dismiss"
              className="text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      <CartDrawer
        onBrowseShop={() => handleNavigate("shop")}
        onCheckout={() => handleNavigate("checkout")}
      />
    </CartProvider>
    </MotionConfig>
  );
}