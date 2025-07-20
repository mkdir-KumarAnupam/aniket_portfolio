"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import { ButtonAboutMe } from "@/components/button-3";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Spotlight } from "@/components/Spotlight";
import NoiseOverlay from "@/components/NoiseOverlay";

function HeroMobile({ darkMode }) {
  const [titleNumber, setTitleNumber] = useState(0);
  const usedAppImages = [1, 2, 3, 4, 5, 6];

  const titles = useMemo(
    () => [
      "storytelling",
      "cinema",
      "visual design",
      "emotion",
      "light and shadow",
      "real-time worlds",
      "creative chaos",
      "narrative space",
      "set design",
      "cinematic language",
      "pixels and purpose",
      "unreal reality",
      "stillness and motion",
      "immersive experiences",
      "digital aesthetics",
      "perspective",
      "framed moments",
      "imagined worlds",
      "composition",
      "visual rhythm",
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <motion.div
      className={`w-full px-4 py-8 transition-colors duration-700 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full flex flex-col justify-center gap-8">
        {/* Title */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-xl sm:text-2xl tracking-tight leading-tight">
            <span className="block text-spektr-cyan-50 dark:text-spektr-cyan-100">
              Exploring the depth of
            </span>
            <span className="relative flex overflow-hidden h-[2rem] pt-1">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold bg-black text-white dark:bg-white dark:text-black"
                  initial={{ opacity: 0, y: "-100%" }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                  transition={{ type: "spring", stiffness: 50 }}
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* Paragraph + Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <Spotlight />
          <p className="text-sm leading-relaxed space-y-3 mt-4">
            I’m driven by obsession — with storytelling and with the kind of
            visuals that make you feel something real. In{" "}
            <LinkPreview
              url="https://www.youtube.com/watch?v=qvsiJKdDxPs"
              imageSrc="https://img.youtube.com/vi/qvsiJKdDxPs/hqdefault.jpg"
              isStatic
              className="font-bold"
            >
              Goat Life
            </LinkPreview>
            , I built immersive spaces that breathe with tension and truth. At
            DNEG, I lead real-time VFX pipelines built on{" "}
            <span className="font-semibold">Unreal Engine</span>, driving{" "}
            <span className="font-semibold">virtual production</span>,{" "}
            <span className="font-semibold">cinematic lighting</span>, and{" "}
            <span className="font-semibold">lookdev</span>.
          </p>
        </motion.div>

        {/* App Icons */}
        {!darkMode && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
          >
            <InfiniteSlider
              direction="horizontal"
              gap={16}
              duration={20}
              darkMode={darkMode}
            >
              {usedAppImages.map((num) => (
                <img
                  key={num}
                  src={`/usedApps/${num}.png`}
                  alt={`used app ${num}`}
                  className="w-8 h-8 object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              ))}
            </InfiniteSlider>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
        >
          <ButtonAboutMe />
        </motion.div>
      </div>
    </motion.div>
  );
}

export { HeroMobile };