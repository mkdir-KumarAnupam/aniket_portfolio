"use client";

import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SkeletonLoader } from "./SkeletonLoader";
import React, { useRef } from "react";

const Card = ({
  item,
  isActive,
  index,
  darkMode,
  setFullscreenImage,
  getCategoryColor,
  setActiveCard,
  refCallback,
}) => {
  const cardRef = useRef(null);

  const handleClick = () => {
    if (setActiveCard) setActiveCard(index);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const normalizedImage = Array.isArray(item.image)
    ? item.image.find(Boolean)
    : item.image;

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (refCallback) refCallback(el);
      }}
      onClick={handleClick}
      className={cn(
        "relative w-full sm:w-[100%] md:w-[270%] lg:w-[75%] mx-auto border p-5 md:p-6 rounded-3xl snap-start transition-all duration-500 ease-in-out cursor-pointer",
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

      <div
        className={cn(
          "absolute left-[-14px] top-1/2 -translate-y-1/2 w-7 h-7 text-xs font-bold rounded-full flex items-center justify-center border shadow-sm z-10",
          darkMode ? "bg-white text-black" : "bg-black text-white",
        )}
      >
        {index + 1}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {item.tags?.map((tag, i) => (
          <div
            key={i}
            className={cn(
              "category-label px-2 py-[3px] text-[10px] font-black uppercase shadow-md border",
              darkMode
                ? "bg-[#6f00ff] text-white border-white/20"
                : "bg-[#1a1a1a] text-white border-black/10",
            )}
          >
            {tag}
          </div>
        ))}
      </div>

      <h2
        className={cn(
          "text-xl md:text-2xl font-bold uppercase tracking-tight mb-3 leading-snug transition-colors",
          !isActive && (darkMode ? "text-neutral-300" : "text-neutral-700"),
        )}
      >
        {item.title}
      </h2>

      <div className="mt-2 space-y-3">
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

        <div className="block lg:hidden mt-3">
          {normalizedImage ? (
            <img
              src={normalizedImage}
              alt={item.title}
              className="w-full h-[180px] object-cover rounded-lg transition-opacity duration-500 cursor-pointer opacity-0"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage(normalizedImage);
              }}
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
};

export default Card;
