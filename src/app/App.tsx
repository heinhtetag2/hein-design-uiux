import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { Feed } from "./components/Feed";
import { Hero } from "./components/Hero";
import { EduSync } from "./components/EduSync";
import { AskAnything } from "./components/AskAnything";
import { PageTransitionOverlay } from "./components/PageTransitionOverlay";
import { VideoBackground } from "./components/VideoBackground";
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
    
    setIsTransitioning(true);
    
    // Switch content when panels meet in the middle (0.8s)
    setTimeout(() => {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "instant" });
      
      // Start opening panels after a tiny delay to ensure render
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 800);
  };

  return (
    <div
      data-page={currentView}
      className={`bg-background text-foreground w-full selection:bg-[#584dff] selection:text-white [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] ${ 
        currentView === "home"
          ? "min-h-screen lg:h-screen lg:overflow-hidden"
          : "overflow-x-hidden"
      }`}
    >
      {/* Video Background - Only on Home */}
      {currentView === "home" && <VideoBackground />}
      
      <PageTransitionOverlay isTransitioning={isTransitioning} />

      <div className="relative mx-auto w-full max-w-[1920px] h-full z-10 px-4 md:px-6">
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
                    <Hero />
                    <div className="w-[20px] h-[1px] bg-foreground/20" />
                    <Sidebar 
                      onCaseStudyClick={handleNavigate} 
                      isMenuOpen={isMenuOpen}
                      activeView={currentView}
                    />
                  </div>
                  <Feed />
                </div>

                {/* Desktop Absolute Content (lg and up) */}
                <div className="hidden lg:block">
                  <Sidebar 
                    onCaseStudyClick={handleNavigate} 
                    isMenuOpen={isMenuOpen}
                    activeView={currentView}
                  />
                  <Hero />
                  <Feed />
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
      
      <AskAnything context={currentView === "home" ? "home" : currentView === "edusync" ? "edusync" : "blogs"} isMenuOpen={isMenuOpen} />
    </div>
  );
}