import React, { useState, useRef } from "react";
import BlobCursor from "@/components/BlobCursorEffect";

const HeroTitle = ({ animate, darkMode, initialLoad, handleMouseMove }) => {
  const [hoverDesigner, setHoverDesigner] = useState(false);
  const [hoverPhotographer, setHoverPhotographer] = useState(false);
  const heroRef = useRef(null);

  const designerStyle = hoverDesigner
    ? {
        backgroundImage: `url('/images/work_ex_4.jpg')`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  const photographerStyle = hoverPhotographer
    ? {
        backgroundImage: `url('/images/photo_exp_1.jpg')`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center w-full mt-6 px-2"
    >
      <BlobCursor parentRef={heroRef} />
      <h1
        className={`
                    font-hero
                    leading-none
                    transition-all duration-700 text-center
                    text-[12vw] xs:text-[10vw] md:text-[15w]
                    ${animate ? "animate-slide-in-left opacity-100" : "opacity-0"}
                    ${darkMode ? "black-fill-white-stroke" : initialLoad ? "text-black" : "stroke-text"}
                `}
        onMouseEnter={(e) => {
          setHoverDesigner(true);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoverDesigner(false);
        }}
        style={designerStyle}
      >
        <span className="hover-trigger spark">Designer</span>
      </h1>

      <h1
        className={`
                    font-hero
                    leading-none
                    transition-all duration-700 text-center
                    text-[12vw] xs:text-[10vw]
                    ${animate ? "animate-slide-in-right opacity-100" : "opacity-0"}
                    ${darkMode ? "text-white" : ""}
                `}
        onMouseEnter={(e) => {
          setHoverPhotographer(true);
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoverPhotographer(false);
        }}
        style={photographerStyle}
      >
        <span className="hover-trigger text-nowrap">& Photographer</span>
      </h1>
    </div>
  );
};

export default HeroTitle;