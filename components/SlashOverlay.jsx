"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SlashOverlay = () => {
  const [show, setShow] = useState(false);
  const [lastPath, setLastPath] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (lastPath && lastPath !== pathname) {
      setShow(true);
      const timeout = setTimeout(() => {
        setShow(false);
      }, 800); // Duration must match animation

      return () => clearTimeout(timeout);
    }
    setLastPath(pathname);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="slash"
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-full bg-black z-[9999] pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default SlashOverlay;
