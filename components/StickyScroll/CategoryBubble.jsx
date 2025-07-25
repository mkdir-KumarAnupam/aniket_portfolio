"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// SVG Icon Map
const icons = {
  designing: (
    <Image src="/icons/file.svg" alt="designing" width={24} height={24} />
  ),
  configuration: (
    <Image src="/icons/client.gif" alt="designing" width={24} height={24} />
  ),
  rigging: (
    <Image src="/icons/rig.png" alt="designing" width={24} height={24} />
  ),
  photography: (
    <Image src="/icons/photo.gif" alt="designing" width={24} height={24} />
  ),
};

const CategoryBubbles = ({
  categories,
  sectionRefs,
  darkMode,
  currentCategoryIndex,
}) => {
  return (
    <div className="hidden xl:flex fixed right-[66%] top-1/2 -translate-y-1/2 flex-col items-center space-y-2 z-50">
      {categories.map((cat, idx) => {
        const isActive = idx === currentCategoryIndex;
        const icon = icons[cat.toLowerCase()];

        return (
          <button
            key={cat}
            onClick={() =>
              sectionRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={cn(
              "relative h-[8vh] w-[4vw] rounded-lg border transition-all duration-300 hover:scale-110 group flex items-center justify-center",
              isActive
                ? darkMode
                  ? "bg-white border-white text-black"
                  : "bg-black border-black text-white"
                : darkMode
                  ? "bg-white border-white hover:bg-white hover:text-black"
                  : "bg-white border-black hover:bg-black hover:text-white",
            )}
          >
            {/* Icon if matched */}
            {icon && <span className="text-black dark:text-white">{icon}</span>}

            {/* Tooltip */}
            <span className="absolute top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition transform bg-black text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap z-50">
              {cat}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBubbles;
