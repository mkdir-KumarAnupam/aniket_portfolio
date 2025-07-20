"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DroneHeroBackground from "@/components/DroneHeroBackground";
import { Hero } from "@/components/ui/animated-hero";
import TextMarque from "@/components/text-marque";

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main split layout */}
      <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
        {/* Left: Drone image - only on large screens */}
        <div className="hidden lg:block lg:w-1/2 relative h-full">
          <DroneHeroBackground darkMode={darkMode} />
        </div>

        {/* Right: Hero content, full width on md and smaller */}
        <div className="w-full lg:w-1/2 ">
          <Hero darkMode={darkMode} />
        </div>
      </div>

      {/* Marquee text - only on large screens */}
      <div className="hidden lg:block">
        <TextMarque
          clasname={`tracking-wide shadow-black opacity-90 ${
            darkMode ? "bg-white text-black" : "text-white bg-black"
          }`}
          delay={0.5}
        >
          Designer - Photographer - Artist -
        </TextMarque>
      </div>
    </div>
  );
};

export default Page;