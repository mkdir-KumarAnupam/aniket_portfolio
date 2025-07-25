"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import BackgroundWords from "@/components/HeroBackground";
import { SkeletonLoader } from "@/components/StickyScroll/SkeletonLoader";
import CategoryCard from "@/components/StickyScroll/CategoryCard";
import Card from "@/components/StickyScroll/Card";
import RightPanel from "@/components/StickyScroll/RightPanel";
import FullscreenModal from "@/components/StickyScroll/FullscreenModal";
import CategoryBubbles from "@/components/StickyScroll/CategoryBubble";

export const MyWorkMaster = ({
  content,
  contentClassName,
  darkMode = false,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const scrollRef = useRef(null);

  const grouped = content.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

  const flatContent = [];
  categories.forEach((cat) => {
    flatContent.push({ type: "category", category: cat });
    grouped[cat].forEach((item) => flatContent.push({ type: "card", ...item }));
  });

  const sectionRefs = useRef([]);
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, categories.length);
  }, [categories.length]);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
    offset: ["start start", "end end"],
  });

  const totalCards = flatContent.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = flatContent.map((_, i) => i / totalCards);
    const closest = breakpoints.reduce(
      (acc, bp, i) =>
        Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc]) ? i : acc,
      0,
    );
    setActiveCard(closest);
  });

  const getCategoryColor = () =>
    darkMode
      ? "bg-black border border-white text-white"
      : "bg-white border border-black text-black";

  const activeCategory =
    flatContent[activeCard]?.type === "category"
      ? flatContent[activeCard].category
      : flatContent[activeCard]?.category;

  return (
    <>
      <div
        ref={scrollRef}
        className={cn(
          "relative z-0 flex h-screen justify-start  md:flex-row flex-col md:space-x-8 space-x-0 overflow-y-scroll px-4 md:px-6 py-20 scrollbar-hide font-sans transition-colors duration-500 snap-y snap-mandatory",
          darkMode ? "text-white bg-black" : "text-black bg-[#fdfdfd]",
        )}
      >
        {/* Decorative Layers */}
        {darkMode && (
          <>
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="w-full h-full bg-[url('/noise.svg')] opacity-[0.05]" />
            </div>
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[120px] rounded-full z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/30 to-transparent z-10 pointer-events-none" />
          </>
        )}
        F
        <BackgroundWords darkMode={darkMode} />
        {/* LEFT SIDE */}
        <div
          className={cn(
            "relative w-full md:w-[38%] md:pr-6 flex items-start z-10 pt-38  md:pt-50",
            // Ensure room for RightPanel on large screens
            "lg:mr-[62vw]", // 🛠 Add spacing to avoid RightPanel overlap
          )}
        >
          <div className="sm:w=[100%] md:w-[90%] space-y-10 ml-0 md:ml-8">
            {flatContent.map((item, i) => {
              const isActive = i === activeCard;

              if (item.type === "category") {
                const categoryIndex = categories.indexOf(item.category);
                return (
                  <CategoryCard
                    key={"category" + item.category}
                    item={item}
                    darkMode={darkMode}
                    index={i}
                    refCallback={(el) => {
                      if (el) sectionRefs.current[categoryIndex] = el;
                    }}
                  />
                );
              }

              return (
                <Card
                  key={item.title + i}
                  item={item}
                  isActive={isActive}
                  index={i}
                  darkMode={darkMode}
                  setFullscreenImage={setFullscreenImage}
                  getCategoryColor={getCategoryColor}
                  setActiveCard={setActiveCard}
                  refCallback={(el) => {
                    if (el) sectionRefs.current[i] = el; // index-wise ref map
                  }}
                />
              );
            })}
            <div className="h-[100vh]" /> {/* Bottom spacer */}
          </div>

          <CategoryBubbles
            categories={categories}
            sectionRefs={sectionRefs}
            darkMode={darkMode}
          />
        </div>
        {/* RIGHT PANEL */}
        <RightPanel
          darkMode={darkMode}
          activeCard={activeCard}
          flatContent={flatContent}
          grouped={grouped}
          activeCategory={activeCategory}
          setFullscreenImage={setFullscreenImage}
          contentClassName={contentClassName}
        />
      </div>

      {fullscreenImage && (
        <FullscreenModal
          src={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
        />
      )}
    </>
  );
};
