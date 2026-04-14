import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export function PageTransitionOverlay({ isTransitioning, onTransitionComplete }: PageTransitionOverlayProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShouldRender(true);
    }
  }, [isTransitioning]);

  return (
    <AnimatePresence 
      onExitComplete={() => {
        setShouldRender(false);
        onTransitionComplete?.();
      }}
    >
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden">
          {/* Left Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.65, 0, 0.35, 1], // Custom ease-in-out
            }}
            className="absolute top-0 left-0 w-1/2 h-full bg-foreground"
          />
          {/* Right Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.65, 0, 0.35, 1],
            }}
            className="absolute top-0 right-0 w-1/2 h-full bg-foreground"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
