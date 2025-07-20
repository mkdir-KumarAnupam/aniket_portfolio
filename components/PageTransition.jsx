"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transitionVariants = {
  initial: {
    clipPath: "polygon(100% 0, 100% 100%, 100% 100%, 100% 0)",
    opacity: 0,
  },
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export default function PageTransition({ children }) {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsPageReady(true);

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
      return () => window.removeEventListener("load", handleReady);
    }
  }, []);

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={
          typeof window !== "undefined" ? window.location.pathname : "initial"
        }
        variants={transitionVariants}
        initial="initial"
        animate={isPageReady ? "animate" : false}
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}