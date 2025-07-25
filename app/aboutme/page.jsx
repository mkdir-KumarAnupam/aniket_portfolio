"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DroneHeroBackground from "@/components/DroneHeroBackground";
import { Hero } from "@/components/ui/animated-hero";
import TextMarque from "@/components/text-marque";
import { DraggableCardBody } from "@/components/ui/draggable-card";
import Image from "next/image";

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    // Lock scrolling on page
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [darkMode]);

  return (
    <div
      className={`h-screen w-full overflow-hidden transition-colors duration-700 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main split layout */}
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* Left: Drone image - only on large screens */}
        <div className="hidden lg:block lg:w-1/2 relative h-full">
          <DroneHeroBackground darkMode={darkMode} />
          <DraggableCardBody>
            <Image
              src="/images/abouthero.jpg"
              alt="Drone Launch Pose"
              width={600}
              height={600}
              className="pointer-events-none select-none"
            />
          </DraggableCardBody>
        </div>

        {/* Right: Hero content */}
        <div className="w-full lg:w-1/2">
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
