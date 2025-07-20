"use client";

import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SkeletonLoader } from "./SkeletonLoader";

const Card = ({
  item,
  isActive,
  index,
  darkMode,
  setFullscreenImage,
  getCategoryColor,
}) => (
  <div
    className={cn(
      "relative w-full sm:w-[100%] lg:w-[75%] mx-auto border p-5 md:p-6 rounded-3xl snap-start transition-all duration-500 ease-in-out",
      isActive &&
        "shadow-xl ring-2 ring-offset-2 animate-border backdrop-blur-md",
      isActive
        ? darkMode
          ? "bg-white text-black border-white ring-white/20"
          : "bg-black text-white border-black ring-black/20"
        : darkMode
          ? "bg-white/5 text-white border-white/10"
          : "bg-white border-black/10 text-black",
      index !== 0 && "mt-[2vh]",
      "mb-10 md:mb-0 sm:ml-5",
    )}
  >
    {darkMode && isActive && <Spotlight />}

    {/* Index Bubble */}
    <div
      className={cn(
        "absolute left-[-14px] top-1/2 -translate-y-1/2 w-7 h-7 text-xs font-bold rounded-full flex items-center justify-center border shadow-sm z-10",
        darkMode ? "bg-white text-black" : "bg-black text-white",
      )}
    >
      {index + 1}
    </div>

    {/* Stylized Category Label */}
    <div
      className={cn(
        "category-label mb-3 px-2 py-[3px] text-[10px] font-black uppercase shadow-md border",
        darkMode
          ? "bg-[#6f00ff] text-white border-white/20"
          : "bg-[#1a1a1a] text-white border-black/10",
      )}
    >
      {item.category}
    </div>

    {/* Title */}
    <h2
      className={cn(
        "text-xl md:text-2xl font-bold uppercase tracking-tight mb-3 leading-snug transition-colors",
        !isActive && (darkMode ? "text-neutral-300" : "text-neutral-700"),
      )}
    >
      {item.title}
    </h2>

    {/* Description & Image */}
    <div className="mt-2 space-y-3">
      {/* Description */}
      <p
        className={cn(
          "text-sm md:text-base leading-relaxed tracking-wide",
          !isActive && (darkMode ? "text-neutral-500" : "text-neutral-600"),
        )}
      >
        {isActive ? (
          <TextGenerateEffect
            words={item.description}
            filter={false}
            duration={0.1}
          />
        ) : (
          item.description
        )}
      </p>

      {/* Mobile Image */}
      <div className="block md:hidden mt-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-[180px] object-cover rounded-lg transition-opacity duration-500 cursor-pointer opacity-0"
            onClick={() => setFullscreenImage(item.image)}
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            loading="lazy"
          />
        ) : (
          <SkeletonLoader height="180px" />
        )}
      </div>
    </div>
  </div>
);

export default Card;