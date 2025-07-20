"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Maximize2 } from "lucide-react";
import { Spotlight } from "@/components/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import BackgroundWords from "@/components/HeroBackground";
import { cn } from "@/lib/utils";

// Skeleton shimmer loader
const SkeletonLoader = ({ height = "200px", borderRadius = "12px" }) => (
  <div
    className="animate-pulse bg-neutral-300 dark:bg-neutral-700 w-full"
    style={{ height, borderRadius }}
  />
);

export const StickyScroll = ({
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
          "relative z-0 flex h-screen justify-start md:justify-center md:flex-row flex-col md:space-x-8 space-x-0 overflow-y-scroll px-4 md:px-6 py-20 scrollbar-hide font-sans transition-colors duration-500 snap-y snap-mandatory",
          darkMode ? "text-white bg-black" : "text-black bg-[#fdfdfd]",
        )}
      >
        {darkMode && (
          <>
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="w-full h-full bg-[url('/noise.svg')] opacity-[0.05]" />
            </div>
            <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[120px] rounded-full z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/30 to-transparent z-10 pointer-events-none" />
          </>
        )}

        <BackgroundWords darkMode={darkMode} />

        {/* LEFT SIDE */}
        <div className="relative w-full md:max-w-[38%] md:pr-4 flex items-start z-10 pt-28 md:pt-50">
          <div className="w-full space-y-10 ml-0 md:ml-8">
            {flatContent.map((item, i) => {
              const isActive = i === activeCard;

              if (item.type === "category") {
                return (
                  <div
                    key={"category" + item.category}
                    ref={(el) => {
                      const index = categories.indexOf(item.category);
                      if (el) sectionRefs.current[index] = el;
                    }}
                    className={cn(
                      "snap-start w-full p-4 rounded-xl border text-center font-bold text-lg shadow-md backdrop-blur-sm",
                      darkMode
                        ? "bg-neutral-900 text-white border-white/10"
                        : "bg-neutral-100 text-black border-black/10",
                    )}
                  >
                    {item.category}
                  </div>
                );
              }

              return (
                <div
                  key={item.title + i}
                  className={cn(
                    "relative w-full border p-5 md:p-6 rounded-2xl snap-start transition-all duration-300",
                    isActive &&
                      "shadow-2xl ring-2 animate-border backdrop-blur-sm",
                    isActive
                      ? darkMode
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black"
                      : darkMode
                        ? "bg-white/5 text-white border-white/10"
                        : "bg-white border-black/10",
                  )}
                >
                  {darkMode && isActive && <Spotlight />}

                  <div
                    className={cn(
                      "absolute left-[-14px] top-1/2 -translate-y-1/2 w-7 h-7 text-xs font-bold rounded-full flex items-center justify-center border shadow-sm",
                      darkMode ? "bg-white text-black" : "bg-black text-white",
                    )}
                  >
                    {i + 1}
                  </div>

                  <span
                    className={cn(
                      "inline-block text-xs px-2 py-1 mb-2 rounded-full",
                      getCategoryColor(),
                    )}
                  >
                    {item.category}
                  </span>

                  <h2
                    className={cn(
                      "text-xl md:text-2xl font-bold uppercase tracking-tight mb-2",
                      !isActive &&
                        (darkMode ? "text-neutral-300" : "text-neutral-700"),
                    )}
                  >
                    {item.title}
                  </h2>

                  <div className="mt-3">
                    <p
                      className={cn(
                        "text-base tracking-wide leading-snug hidden md:block",
                        !isActive &&
                          (darkMode ? "text-neutral-500" : "text-neutral-600"),
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

                    <div className="block md:hidden mt-2">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full rounded-lg object-cover cursor-pointer opacity-0"
                          onClick={() => setFullscreenImage(item.image)}
                          onLoad={(e) =>
                            e.currentTarget.classList.remove("opacity-0")
                          }
                          loading="lazy"
                        />
                      ) : (
                        <SkeletonLoader height="180px" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="h-[100vh]" />
          </div>

          {/* CATEGORY BUBBLES */}
          <div className="hidden xl:flex fixed right-[60.5%] top-1/2 -translate-y-1/2 flex-col items-center space-y-2 z-50">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() =>
                  sectionRefs.current[idx]?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className={cn(
                  "relative h-[5vh] w-[2vw] rounded-full border transition-all duration-300 hover:scale-110 group",
                  darkMode
                    ? "bg-transparent border-white hover:bg-white hover:text-black"
                    : "bg-white border-black hover:bg-black hover:text-white",
                )}
              >
                <span className="absolute -right-1/2 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition transform bg-black text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap z-50">
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className={cn(
            "hidden lg:block sticky top-[-10%] h-[82vh] w-[58vw] rounded-xl overflow-hidden shadow-2xl border backdrop-blur-md bg-white/30 dark:bg-black/30 transition-all",
            contentClassName,
          )}
        >
          <div className="relative w-full h-full">
            <button
              onClick={() => {
                const img = flatContent[activeCard]?.image;
                if (img) setFullscreenImage(img);
              }}
              className={cn(
                "absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-md",
                darkMode
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white hover:bg-neutral-800",
              )}
              aria-label="Maximize image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {flatContent[activeCard]?.type === "category" ? (
              <div className={cn("grid grid-cols-3 gap-[6px] p-9")}>
                {grouped[activeCategory].slice(0, 9).map((img, idx) => (
                  <div key={img.title + idx}>
                    {img.image ? (
                      <motion.img
                        src={img.image}
                        alt={img.title}
                        onClick={() => setFullscreenImage(img.image)}
                        whileHover={{ scale: 1.05 }}
                        className="h-42 w-full object-cover cursor-pointer rounded-md transition-transform duration-300"
                        loading="lazy"
                        width={300}
                        height={200}
                      />
                    ) : (
                      <SkeletonLoader height="140px" />
                    )}
                  </div>
                ))}
              </div>
            ) : flatContent[activeCard]?.image ? (
              <motion.img
                key={flatContent[activeCard].image}
                src={flatContent[activeCard].image}
                alt={flatContent[activeCard].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="h-full w-full object-cover"
                loading="lazy"
                width={1000}
                height={700}
              />
            ) : (
              <SkeletonLoader height="100%" />
            )}
          </div>
        </div>
      </div>

      {/* FULLSCREEN */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-md text-sm"
          >
            Close
          </button>
          <motion.img
            key={fullscreenImage + "-fullscreen"}
            src={fullscreenImage}
            alt="Fullscreen View"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            loading="eager"
          />
        </div>
      )}
    </>
  );
};