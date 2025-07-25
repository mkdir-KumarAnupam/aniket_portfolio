"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import { ButtonAboutMe } from "@/components/button-3";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Spotlight } from "@/components/Spotlight";
import NoiseOverlay from "@/components/NoiseOverlay";
import { DraggableCardBody } from "@/components/ui/draggable-card";

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

  const [safeTop, setSafeTop] = useState(0);

  useEffect(() => {
    const updateSafeArea = () => {
      const safeInset = window?.visualViewport?.offsetTop ?? 0;
      setSafeTop(safeInset);
    };

    updateSafeArea();
    window.visualViewport?.addEventListener("resize", updateSafeArea);
    return () =>
      window.visualViewport?.removeEventListener("resize", updateSafeArea);
  }, []);

  return (
    <motion.div
      className={`w-full h-screen overflow-y-auto transition-colors duration-700 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          paddingTop: `calc(5% + ${safeTop}%`,
        }}
      >
        <div className="lg:w-full w-full px-6 py-12 flex flex-col justify-center gap-8">
          {/* Title Animation */}
          <motion.div
            className="flex flex-col gap-4 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl tracking-tight font-regular leading-tight">
              <span className="block tracking-wide text-sans text-spektr-cyan-50 dark:text-spektr-cyan-100">
                Exploring the depth of
              </span>
              <span className="relative tracking-wide flex overflow-hidden h-[3rem] sm:h-[3.5rem] md:h-[4rem] lg:h-[5rem]">
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-black text-white dark:bg-white dark:text-black shadow-black"
                    initial={{ opacity: 0, y: "-100%" }}
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
            <div className="text-base font-sans leading-relaxed space-y-4">
              Hey, I’m Aniket Kumar — a 3D artist and Unreal Engine Supervisor,
              driven by a love for storytelling and visuals that truly make you
              feel something.
              <br /> <br className="xl:hidden" />
              At DNEG, I lead real-time VFX workflows using Unreal
              Engine—working across virtual production, cinematic lighting, and
              look development. I’m currently part of the epic feature film{" "}
              <LinkPreview
                url="https://www.youtube.com/watch?v=CD5aHzyLTQI"
                imageSrc="https://img.youtube.com/vi/CD5aHzyLTQI/hqdefault.jpg"
                isStatic
                className="font-bold"
              >
                Ramanaya
              </LinkPreview>
              , contributing across the full pipeline—from pre-production to
              post. I’ve also worked on{" "}
              <LinkPreview
                url="https://www.youtube.com/watch?v=qvsiJKdDxPs"
                imageSrc="https://img.youtube.com/vi/qvsiJKdDxPs/hqdefault.jpg"
                isStatic
                className="font-bold"
              >
                Goat Life
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview
                url="https://www.youtube.com/watch?v=PKsVB1wPZ78"
                imageSrc="https://img.youtube.com/vi/PKsVB1wPZ78/hqdefault.jpg"
                isStatic
                className="font-bold"
              >
                SkyForce
              </LinkPreview>
              , building immersive, emotionally grounded environments that
              support powerful narratives. <br />
              <br className="xl:hidden" />
              Alongside my film work, I also bring extensive experience in
              automotive visualization, having worked on high-end real-time
              configurators for McLaren Artura, McLaren 750S, and Royal Enfield.
              These projects strengthened my focus on environment design,
              interactivity, and enhancing user experience through real-time 3D
              solutions.
              <br /> <br className="xl:hidden" />
              I’m always looking to bridge creative vision with strong technical
              execution—helping teams move faster without sacrificing quality.
              Whether it’s a cinematic scene or a digital twin, I aim to build
              visuals that connect, immerse, and last. Let’s create something
              meaningful.
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
              <div className="mt-4">
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
            className="flex flex-col sm:flex-row gap-4 justify-start mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
          >
            <ButtonAboutMe />
            {/* Additional CTA buttons can go here */}
          </motion.div>
          <div className="xl:hidden pt-5 "></div>
        </div>
      </div>
    </motion.div>
  );
}

export { Hero };
