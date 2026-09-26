import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { Button } from "./button";
import { throttle } from "../../lib/utils";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = throttle(() => {
      setIsVisible(window.scrollY > 300);
    }, 150);

    // Seed from the current position (e.g. a restored scroll offset).
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const reveal = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.2 },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...reveal}
          // Sits clear of the home indicator on iOS and clear of the footer CTA
          // on small screens. Stacked above the 56px chat launcher (Chatbot.jsx)
          // and centred on it, so the two floating buttons never overlap.
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          className="fixed bottom-20 right-6 sm:bottom-24 sm:right-10 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            variant="glow"
            aria-label="Scroll back to top"
            className="rounded-full shadow-lg hover:shadow-xl"
          >
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
