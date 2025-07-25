"use client";

import { motion } from "framer-motion";
import { Maximize2, PlayCircle } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";
import { cn } from "@/lib/utils";
import { useState } from "react";
import VideoModal from "@/components/VideoModal"; // Ensure this exists

const RightPanel = ({
  darkMode,
  activeCard,
  flatContent,
  grouped,
  activeCategory,
  setFullscreenImage,
  contentClassName,
}) => {
  const [videoOpen, setVideoOpen] = useState(false);

  const active = flatContent[activeCard];
  const isArray = Array.isArray(active?.image);
  const images = isArray
    ? active.image.filter(Boolean)
    : [active?.image].filter(Boolean); // avoid undefineds
  const thumbnail = images?.[0]; // First image used as primary

  return (
    <div
      className={cn(
        "hidden lg:block fixed top-10 right-20 z-40 h-[82vh] mt-[4%] w-[58vw] rounded-xl overflow-hidden shadow-2xl border backdrop-blur-md bg-white/30 dark:bg-black/30 transition-all",
        contentClassName,
      )}
    >
      <div className="relative w-full h-full">
        {/* Fullscreen Button */}
        {thumbnail && (
          <button
            onClick={() => setFullscreenImage(thumbnail)}
            className={cn(
              "absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-md",
              darkMode
                ? "bg-white text-black hover:bg-gray-300"
                : "bg-black text-white hover:bg-neutral-800",
            )}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Video Play Button */}
        {active?.videoAvailable && (
          <motion.button
            onClick={() => setVideoOpen(true)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={cn(
              "absolute top-3 left-3 z-10 p-2 rounded-full backdrop-blur bg-black/60 text-white shadow-lg scale-140 hover:scale-160",
            )}
          >
            <PlayCircle className="w-6 h-6 animate-pulse" />
          </motion.button>
        )}

        {/* Category Mode */}
        {active?.type === "category" ? (
          <div className="grid grid-cols-3 gap-[6px] p-9">
            {grouped[activeCategory].slice(0, 9).map((img, idx) => {
              // Fix: Use only the first valid image from array or string
              const normalizedImage = Array.isArray(img.image)
                ? img.image.find(Boolean)
                : img.image;

              return (
                <div key={img.title + idx}>
                  {normalizedImage ? (
                    <motion.img
                      src={normalizedImage}
                      alt={img.title}
                      onClick={() => setFullscreenImage(normalizedImage)}
                      whileHover={{ scale: 1.05 }}
                      className="h-42 w-full object-cover cursor-pointer rounded-md transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <SkeletonLoader height="140px" />
                  )}
                </div>
              );
            })}
          </div>
        ) : images.length > 1 ? (
          // Multi-image layout
          <div className="p-5 grid gap-3 h-full overflow-auto">
            {images.length === 3 ? (
              <div className="grid grid-rows-[2fr_1fr] gap-3 h-full">
                <motion.img
                  key={images[0]}
                  src={images[0]}
                  alt="Main"
                  onClick={() => setFullscreenImage(images[0])}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                <div className="grid grid-cols-2 gap-3">
                  {images.slice(1).map((img, idx) => (
                    <motion.img
                      key={img + idx}
                      src={img}
                      alt={`Sub ${idx}`}
                      onClick={() => setFullscreenImage(img)}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : images.length === 2 ? (
              <div className="grid grid-cols-2 gap-3 h-full">
                {images.map((img, idx) => (
                  <motion.img
                    key={img + idx}
                    src={img}
                    alt={`Image ${idx}`}
                    onClick={() => setFullscreenImage(img)}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    loading="lazy"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <motion.img
                    key={img + idx}
                    src={img}
                    alt={`Grid ${idx}`}
                    onClick={() => setFullscreenImage(img)}
                    className="w-full h-[180px] object-cover rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        ) : thumbnail ? (
          <motion.img
            key={thumbnail}
            src={thumbnail}
            alt={active?.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <SkeletonLoader height="100%" />
        )}
      </div>

      {/* Video Modal */}
      {active?.videoAvailable && (
        <VideoModal
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          videoUrl={active.videoAvailable}
        />
      )}
    </div>
  );
};

export default RightPanel;
