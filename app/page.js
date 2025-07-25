"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SleekHero from "@/components/SleekHero";
import { X } from "lucide-react";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showOrientationModal, setShowOrientationModal] = useState(false);

  useEffect(() => {
    // Run after initial paint to avoid hydration mismatch or false trigger
    const checkTabletPortrait = () => {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const width = window.innerWidth;

      const isTablet = width >= 768 && width <= 1024;

      if (isTablet && isPortrait) {
        setShowOrientationModal(true);
      } else {
        setShowOrientationModal(false);
      }
    };

    const handleInitialCheck = () => {
      // Delay slightly to allow orientation/layout to stabilize
      setTimeout(checkTabletPortrait, 100);
    };

    handleInitialCheck(); // Initial load

    window.addEventListener("resize", checkTabletPortrait);
    window.addEventListener("orientationchange", checkTabletPortrait);

    return () => {
      window.removeEventListener("resize", checkTabletPortrait);
      window.removeEventListener("orientationchange", checkTabletPortrait);
    };
  }, []);

  return (
    <div className={darkMode ? "dark overflow-hidden" : "overflow-hidden"}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <SleekHero darkMode={darkMode} />
    </div>
  );
}
