"use client";

import React, { useState } from "react";

const AboutMeBox = ({
  animate,
  darkMode,
  aboutCollapsed,
  hoverInfo,
  setHoverInfo,
}) => {
  const [buttonHovered, setButtonHovered] = useState(false);

  const sharedStyles = `${
    darkMode
      ? "bg-black text-white border-white"
      : "bg-white text-black border-black"
  } border border-dashed shadow-lg px-6 py-4 w-[320px]`;

  return (
    <div
      className="relative z-50 ml-[0%] hidden md:block"
      onMouseEnter={() => setHoverInfo(true)}
      onMouseLeave={() => {
        setHoverInfo(false);
        setButtonHovered(false);
      }}
    >
      {/* Floating top static box */}
      <div
        className={`transition-all duration-300 ease-in-out text-center ${
          animate
            ? "animate-slide-in-top opacity-100 diagonal-float"
            : "opacity-0"
        } ${sharedStyles}`}
      >
        <p className="font-normal text-lg sm:text-xl tracking-widest font-sans w-full">
          {aboutCollapsed && !hoverInfo
            ? "•  ANIKET KUMAR •"
            : "LITTLE ABOUT ME"}
        </p>
      </div>

      {/* Hover detail box */}
      {hoverInfo && (
        <div
          className={`absolute top-full left-0 z-50 ${sharedStyles} animate-slide-down-expand`}
        >
          <div className="mt-1 text-sm text-left">
            <p className="font-normal tracking-widest font-sans">
              Unreal Engine Supervisor at{" "}
              <span className="text-orange-300">DNEG</span>, I work across
              virtual production, MoCap, and Real-Time Pipelines blending
              storytelling with cutting-edge 3D technology.
            </p>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-theme-primary animate-pop mt-4 block text-center no-underline transition-colors duration-300 ${
              buttonHovered ? "text-white" : ""
            }`}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            style={{ width: "100%" }}
          >
            <span>
              {buttonHovered ? "Click to download" : "Download Resume"}
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default AboutMeBox;
