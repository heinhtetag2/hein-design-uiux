import React, { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { X } from "lucide-react";
import Lenis from "lenis";
// Critical "home" shell — eager so the first paint has no extra round-trip.
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { PageTransitionOverlay } from "./components/PageTransitionOverlay";
import { VideoBackground } from "./components/VideoBackground";
import { CaseStudyHoverBackground } from "./components/CaseStudyHoverBackground";
import { CaseStudyHoverContent } from "./components/CaseStudyHoverContent";
import { CustomCursor } from "./components/CustomCursor";
import { VisitorCard } from "./components/VisitorCard";
import { VISITOR_STORAGE_KEY, VISITOR_INTRO_SEEN_KEY, appendVisitor, type Visitor } from "./visitorStore";
import { CartProvider } from "./shop/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { caseStudies } from "./components/caseStudies";

// Non-home views — code-split. Each loads on navigation, fully covered by the
// 800ms page-transition overlay, so there is no perceptible loading state.
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState<string | null>(null);
  const [homeMountKey, setHomeMountKey] = useState(0);
  const [showVisitorCard, setShowVisitorCard] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    if (ALWAYS_SHOW_VISITOR_INTRO) return true;
    // Show only on the true first visit: neither seen the intro nor already
    // saved a card. Merely having seen it once (even without filling/skipping)
    // suppresses future nags on refresh.
    const seen = window.localStorage.getItem(VISITOR_INTRO_SEEN_KEY);
    const hasCard = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    return !seen && !hasCard;
  });
  const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);

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
    });
    if (editingVisitor) {
      setShowVisitorCard(false);
      setEditingVisitor(null);
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setShowVisitorCard(false);
      setHomeMountKey((k) => k + 1);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 800);
  };

  useEffect(() => {
    if (!saveFailed) return;
    const t = setTimeout(() => setSaveFailed(false), 6000);
    return () => clearTimeout(t);
  }, [saveFailed]);

  // Once the onboarding intro is on screen, mark it seen so refreshing (without
  // filling or skipping) doesn't bring it back. The edit-card flow is exempt.
  useEffect(() => {
    if (showVisitorCard && !editingVisitor) {
      try {
        window.localStorage.setItem(VISITOR_INTRO_SEEN_KEY, "1");
      } catch {
        // ignore storage failures (private mode, etc.)
      }
    }
  }, [showVisitorCard, editingVisitor]);

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
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
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

  const handleBlogPostClick = (postId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPostId(postId);
      setCurrentView("blog-detail");
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
  };

  const handleBackToBlogs = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedPostId(null);
      setCurrentView("blogs");
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
  };

  const handleProductClick = (id: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProductId(id);
      setCurrentView("product-detail");
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
  };

  const handleNavigate = (view: Exclude<View, "blog-detail">) => {
    if (view === currentView) return;

    // Lock the case-study hover state on desktop only so the closing panels
    // cover the hover backdrop/content (not the home Hero) when navigating
    // from home into a study. On mobile we keep the home background instead.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && view === "edusync" && currentView === "home") {
      setHoveredCaseStudy("EduSync");
    }

    setIsTransitioning(true);

    // Switch content when panels meet in the middle (0.8s)
    setTimeout(() => {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "instant" });
      setHoveredCaseStudy(null);

      // Start opening panels after a tiny delay to ensure render
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
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
      
      <PageTransitionOverlay isTransitioning={isTransitioning} />
      <CustomCursor />

      {showVisitorCard && (
        <VisitorCard
          onComplete={handleVisitorComplete}
          initial={editingVisitor}
          onClose={editingVisitor ? closeEditCard : undefined}
        />
      )}

      <div className="relative mx-auto w-full max-w-[1920px] h-full z-10 px-[14px] lg:px-6">
        <TopNav
          key={`topnav-${homeMountKey}`}
          onLogoClick={() => handleNavigate("home")}
          onNavigate={handleNavigate}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          currentView={currentView}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentView}-${homeMountKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
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
                      if (isTransitioning) return;
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
              <WhatIDo />
            ) : currentView === "all-work" ? (
              <AllWork onNavigate={handleNavigate} />
            ) : currentView === "shop" ? (
              <Shop onOpenProduct={handleProductClick} />
            ) : currentView === "product-detail" && selectedProductId ? (
              <ProductDetail productId={selectedProductId} onBack={() => handleNavigate("shop")} />
            ) : currentView === "checkout" ? (
              <Checkout onBack={() => handleNavigate("shop")} />
            ) : currentView === "blog-detail" && selectedPostId ? (
              <BlogDetail postId={selectedPostId} onBack={handleBackToBlogs} onPostClick={handleBlogPostClick} />
            ) : currentView === "blogs" ? (
              <Blogs onPostClick={handleBlogPostClick} />
            ) : currentView === "visitor-gallery" ? (
              <VisitorGallery onEditCard={openEditCard} />
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