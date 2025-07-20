"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ darkMode, setDarkMode, className }) {
  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: darkMode ? "flex-end" : "flex-start",
        width: "60px",
        height: "30px",
        borderRadius: "9999px",
        padding: "2px",
        cursor: "pointer",
        backgroundColor: darkMode ? "#1b1b1b" : "#e5e5e5",
        border: darkMode ? "1px solid #444" : "1px solid #ccc",
        transition: "all 0.3s ease",
        position: "relative",
      }}
    >
      {/* Sun icon on left side */}
      <div
        style={{
          position: "absolute",
          left: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: darkMode ? 0.4 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <Sun
          size={16}
          color={darkMode ? "#ffffffff" : "#000"}
          strokeWidth={3}
        />
      </div>

      {/* Moon icon on right side */}
      <div
        style={{
          position: "absolute",
          right: "6px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: darkMode ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      >
        <Moon size={16} color={darkMode ? "#fff" : "#555"} strokeWidth={1.5} />
      </div>

      {/* Sliding dot */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          backgroundColor: darkMode ? "#fff" : "#000",
          zIndex: 10,
        }}
      />
    </button>
  );
}