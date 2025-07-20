"use client";

import Image from "next/image";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import NoiseOverlay from "./NoiseOverlay";

const DroneHeroBackground = ({ darkMode }) => {
  const imageRef = useRef(null);
  const [aspectClass, setAspectClass] = useState("aspect-default");

  const updateAspect = () => {
    const ratio = window.innerWidth / window.innerHeight;
    if (ratio < 0.9) setAspectClass("aspect-tall");
    else if (ratio < 1.6) setAspectClass("aspect-medium");
    else setAspectClass("aspect-wide");
  };

  useLayoutEffect(() => {
    updateAspect();
    window.addEventListener("resize", updateAspect);
    return () => window.removeEventListener("resize", updateAspect);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${offset * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        absolute inset-0 pointer-events-none 
        hidden md:block 
        md:opacity-50 md:-z-10
        lg:opacity-100 lg:z-[9999]
      `}
    >
      {/* Background noise - only for large screens */}
      <div className="hidden lg:block">
        <NoiseOverlay />
      </div>

      {/* Drone image */}
      <div
        ref={imageRef}
        className={`absolute bottom-0 transition-transform duration-500 ease-out ${aspectClass}`}
        style={{
          marginLeft: "clamp(0rem, 0vw, 0rem)", // remove excess margin if needed
        }}
      >
        <div className="relative w-full h-auto">
          <Image
            src="/aboutmebg.png"
            alt="Drone Launch Pose"
            width={1600}
            height={1600}
            priority
            className="
              w-[150%] ml-[15%] max-w-none h-auto object-contain scale-x-[-1]
              contrast-[1.4] brightness-110 grayscale
              mask-image-[linear-gradient(to_top,black,transparent)]
            "
          />
        </div>
      </div>
    </div>
  );
};

export default DroneHeroBackground;