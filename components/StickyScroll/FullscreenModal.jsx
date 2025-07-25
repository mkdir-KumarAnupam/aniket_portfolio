"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const FullscreenModal = ({ src, onClose }) => {
  const backdropRef = useRef(null);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Click outside image closes modal
  const handleClickOutside = (e) => {
    if (e.target === backdropRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleClickOutside}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
    >
      {/* Ensure stacking works correctly */}
      <div className="absolute inset-0 z-[101] pointer-events-none" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute z-[9999999999] top-6 right-6 px-4 py-2 text-white bg-white hover:bg-white/20 backdrop-blur-lg rounded-md text-sm font-semibold pointer-events-auto"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Animated image */}
      <motion.img
        key={src + "-fullscreen"}
        src={src}
        alt="Fullscreen View"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="mt-[5%] max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        loading="eager"
      />
    </div>
  );
};

export default FullscreenModal;
