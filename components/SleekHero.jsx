"use client";

import React, { useEffect, useState } from "react";
import ProjectButtons from "@/components/ProjectButtons";
import BackgroundWords from "@/components/HeroBackground";
import AboutMeBox from "@/components/HeroAboutMe";
import HeroTitle from "@/components/HeroTitle";
import LocationTypewriter from "@/components/HeroLocationTypewriter";
import BlobCursor from "@/components/BlobCursorEffect";
import "@/styles/Animations.css";
import { Spotlight } from "@/components/Spotlight";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const SleekHero = ({ navbarHeight = "80px", darkMode }) => {
  const [animate, setAnimate] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [aboutCollapsed, setAboutCollapsed] = useState(false);
  const [hoverInfo, setHoverInfo] = useState(false);

  const [locIndex, setLocIndex] = useState(0);
  const [locSubIndex, setLocSubIndex] = useState(0);
  const [locReverse, setLocReverse] = useState(false);

  const [showLandscapeModal, setShowLandscapeModal] = useState(false);

  const locations = ["Mumbai, India", "\n" + "\n" + " मुंबई, भारत "];

  useEffect(() => {
    // Trigger animation and collapse sequence
    const timeout = setTimeout(() => {
      setAnimate(true);
      setTimeout(() => setInitialLoad(false), 1000);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAboutCollapsed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter logic
  useEffect(() => {
    let timeout;
    const currentLoc = locations[locIndex];
    if (!locReverse && locSubIndex === currentLoc.length) {
      timeout = setTimeout(() => setLocReverse(true), 2000);
    } else if (locReverse && locSubIndex === 0) {
      setLocReverse(false);
      setLocIndex((prev) => (prev + 1) % locations.length);
    } else {
      timeout = setTimeout(
        () => {
          setLocSubIndex((prev) => (locReverse ? prev - 1 : prev + 1));
        },
        locReverse ? 50 : 100,
      );
    }
    return () => clearTimeout(timeout);
  }, [locSubIndex, locReverse, locIndex]);

  // Show modal on initial load if screen is md
  useEffect(() => {
    const checkMdScreen = () => {
      const width = window.innerWidth;
      if (width >= 768 && width < 1024) {
        setShowLandscapeModal(true);
      }
    };
    checkMdScreen();
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-700 ease-in-out flex items-center justify-center h-screen ${
        darkMode ? "bg-black" : "bg-white"
      }`}
      style={{ minHeight: `calc(100vh - ${navbarHeight})` }}
    >
      {/* LANDSCAPE MODAL */}
      <AnimatePresence>
        {showLandscapeModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[1000] top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowLandscapeModal(false)}
                className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-2 text-center">
                Please rotate your device
              </h2>
              <p className="text-sm text-center tracking-wider font-light'">
                For the best experience, we recommend using your tablet in{" "}
                <span className="font-medium">landscape mode</span>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundWords darkMode={darkMode} />

      <div className="relative z-10 flex flex-col items-center justify-between px-4 pt-[12vh] pb-12 w-full max-w-7xl mx-auto">
        {/* Mobile greeting */}
        <p
          className={`
            block sm:hidden font-sans text-sm xs:text-base tracking-wider mb-3 text-center
            ${animate ? "animate-slide-in-top opacity-100" : "opacity-0"}
            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          Hey, I am Aniket!
        </p>

        <Spotlight />

        <AboutMeBox
          animate={animate}
          darkMode={darkMode}
          aboutCollapsed={aboutCollapsed}
          hoverInfo={hoverInfo}
          setHoverInfo={setHoverInfo}
        />

        {/* Desktop/Tablet HeroTitle */}
        <div className="hidden sm:block">
          <HeroTitle
            animate={animate}
            darkMode={darkMode}
            initialLoad={initialLoad}
          />
        </div>

        {/* Mobile-only Hero Title */}
        <h1
          className={`
            block sm:hidden font-hero text-center leading-tight
            text-[12vw] tracking-widest mb-10
            ${darkMode ? "text-white" : " stroke-1"}
            transition-all duration-700
            ${animate ? "animate-slide-in-left opacity-100" : "opacity-0"}
          `}
        >
          <span className="spot-focus tracking-wide">Designer</span> &{" "}
          <span className={`${darkMode ? "text-white" : "text-black"}`}>
            Photographer
          </span>
        </h1>

        <LocationTypewriter
          animate={animate}
          darkMode={darkMode}
          locations={locations}
          locIndex={locIndex}
          locSubIndex={locSubIndex}
        />

        <ProjectButtons darkMode={darkMode} />
      </div>
    </div>
  );
};

export default SleekHero;
