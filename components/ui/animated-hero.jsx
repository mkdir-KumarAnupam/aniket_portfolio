"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import { ButtonAboutMe } from "@/components/button-3";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Spotlight } from "@/components/Spotlight";
import NoiseOverlay from "@/components/NoiseOverlay";

function Hero({ darkMode }) {
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
      className={`flex-1 flex flex-col justify-center items-center transition-colors duration-700 w-full px-6 min-h-screen
        ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-5xl flex flex-col justify-center gap-8">
        {/* Title Animation */}
        <motion.div
          className="flex flex-col gap-4 justify-center sm:w-1/2 sm:text-md lg:text-xl lg:w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-7xl tracking-tight font-regular leading-tight text-left">
            <span className="block tracking-wide text-sans text-spektr-cyan-50 dark:text-spektr-cyan-100">
              Exploring the depth of
            </span>
            <span className="relative flex justify-start overflow-hidden pb-4 pt-1 tracking-wide h-[2rem] sm:h-[2.8rem] md:h-[3.5rem] lg:h-[5.2rem]">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold bg-black text-white dark:bg-white dark:text-black shadow-black"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>
        </motion.div>

        {/* Paragraph & Spotlight */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <Spotlight />
          <div className="text-base sm:p-4 font-sans leading-relaxed space-y-4 max-w-full">
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
            , I built immersive spaces that breathe with tension and truth. From
            virtual sets to grounded reality, At DNEG, I lead real-time VFX
            pipelines built on{" "}
            <span className="font-semibold">Unreal Engine</span>, driving{" "}
            <span className="font-semibold">virtual production</span>,{" "}
            <span className="font-semibold">cinematic lighting</span>, and{" "}
            <span className="font-semibold">lookdev</span>. I specialize in
            bridging <span className="font-semibold">creative vision</span> with{" "}
            <span className="font-semibold">technical execution</span> — helping
            artists create faster without ever compromising on craft.
          </div>
        </motion.div>

        {/* Logo Slider */}
        {!darkMode && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-full max-w-full ml-5">
              <InfiniteSlider
                direction="horizontal"
                gap={24}
                duration={30}
                darkMode={darkMode}
              >
                {usedAppImages.map((num) => (
                  <img
                    key={num}
                    src={`/usedApps/${num}.png`}
                    alt={`used app ${num}`}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                ))}
              </InfiniteSlider>
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
        >
          <ButtonAboutMe />
          {/* Add more buttons here if needed */}
        </motion.div>
      </div>
    </motion.div>
  );
}

export { Hero };