import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { EduSync } from "./components/EduSync";
import { AskAnything } from "./components/AskAnything";
import { PageTransitionOverlay } from "./components/PageTransitionOverlay";
import { VideoBackground } from "./components/VideoBackground";
import { CaseStudyHoverBackground } from "./components/CaseStudyHoverBackground";
import { CaseStudyHoverContent } from "./components/CaseStudyHoverContent";
import { WhatIDo } from "./components/WhatIDo";
import { Blogs } from "./components/Blogs";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { BlogDetail } from "./components/BlogDetail";

// Force rebuild
export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "edusync" | "what-i-do" | "blogs" | "blog-detail" | "about" | "contact">("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    const lock = currentView === "home" && window.matchMedia("(min-width: 1024px)").matches;
    document.body.style.overflow = lock ? "hidden" : "";
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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

  const handleNavigate = (view: "home" | "edusync" | "what-i-do" | "blogs" | "about" | "contact") => {
    if (view === currentView) return;

    // Lock the case-study hover state so the closing panels cover the hover
    // backdrop/content (not the home Hero) when navigating from home into a study
    if (view === "edusync" && currentView === "home") {
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
    <div
      data-page={currentView}
      className={`bg-background text-foreground w-full selection:bg-brand selection:text-brand-foreground [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] ${
        currentView === "home"
          ? "min-h-screen lg:h-screen lg:overflow-hidden"
          : "overflow-x-hidden"
      }`}
    >
      {/* Video Background - Only on Home */}
      {currentView === "home" && <VideoBackground />}
      {currentView === "home" && <CaseStudyHoverBackground hoveredStudy={hoveredCaseStudy} />}
      {currentView === "home" && <CaseStudyHoverContent hoveredStudy={hoveredCaseStudy} />}
      
      <PageTransitionOverlay isTransitioning={isTransitioning} />

      <div className="relative mx-auto w-full max-w-[1920px] h-full z-10 px-6">
        <TopNav 
          onLogoClick={() => handleNavigate("home")} 
          onNavigate={handleNavigate}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          currentView={currentView}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {currentView === "home" ? (
              <>
                {/* Mobile/Tablet Content */}
                <div className="lg:hidden flex flex-col pt-[100px] pb-40 gap-12">
                  <div className="flex flex-col gap-[26px]">
                    <Hero isStudyHovered={!!hoveredCaseStudy} />
                    <div className="w-[20px] h-[1px] bg-foreground/20" />
                    <Sidebar
                      onCaseStudyClick={handleNavigate}
                      onCaseStudyHover={(study) => {
                      if (isTransitioning) return;
                      setHoveredCaseStudy(study);
                    }}
                      isMenuOpen={isMenuOpen}
                      activeView={currentView}
                    />
                  </div>
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
            ) : currentView === "what-i-do" ? (
              <WhatIDo />
            ) : currentView === "blog-detail" && selectedPostId ? (
              <BlogDetail postId={selectedPostId} onBack={handleBackToBlogs} onPostClick={handleBlogPostClick} />
            ) : currentView === "blogs" ? (
              <Blogs onPostClick={handleBlogPostClick} />
            ) : currentView === "about" ? (
              <About />
            ) : (
              <Contact />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* <AskAnything context={currentView === "home" ? "home" : currentView === "edusync" ? "edusync" : "blogs"} isMenuOpen={isMenuOpen} /> */}
    </div>
  );
}