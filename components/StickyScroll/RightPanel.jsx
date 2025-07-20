import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { SkeletonLoader } from "./SkeletonLoader";
import { cn } from "@/lib/utils";

const RightPanel = ({
  darkMode,
  activeCard,
  flatContent,
  grouped,
  activeCategory,
  setFullscreenImage,
  contentClassName,
}) => {
  const active = flatContent[activeCard];

  return (
    <div
      className={cn(
        "hidden lg:block fixed top-10 right-20 z-40 h-[82vh] mt-[4%] w-[58vw] rounded-xl overflow-hidden shadow-2xl border backdrop-blur-md bg-white/30 dark:bg-black/30 transition-all",
        contentClassName,
      )}
    >
      <div className="relative w-full h-full">
        <button
          onClick={() => {
            const img = active?.image;
            if (img) setFullscreenImage(img);
          }}
          className={cn(
            "absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-md",
            darkMode
              ? "bg-white text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-neutral-800",
          )}
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {active?.type === "category" ? (
          <div className="grid grid-cols-3 gap-[6px] p-9">
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
                  />
                ) : (
                  <SkeletonLoader height="140px" />
                )}
              </div>
            ))}
          </div>
        ) : active?.image ? (
          <motion.img
            key={active.image}
            src={active.image}
            alt={active.title}
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
    </div>
  );
};

export default RightPanel;