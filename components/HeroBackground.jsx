"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { svgIcons } from "@/lib/SvgIcons";
import { Squares } from "@/components/ui/squares-background";
import { SquaresWhite } from "@/components/ui/squareWhite";

const POP_INTERVAL = 6000;

const generateIcon = (idx, darkMode, reentry = false) => {
  const iconData = svgIcons[idx % svgIcons.length];
  if (!iconData) return null;

  const { Icon, type } = iconData;
  const size = 24 + Math.random() * 48;
  const left = 4 + Math.random() * 92;
  const top = reentry ? 120 : Math.random() * 280;
  const floatType = idx % 3;
  const outline = idx % 5 === 0;
  const rotateDelta = 60 + Math.random() * 60;
  const duration = 14 + Math.random() * 6;
  const delay = Math.random() * 4;

  return {
    id: `icon-${idx}-${Date.now()}`,
    idx,
    Icon,
    type,
    outline,
    floatType,
    x: left,
    y: top,
    visible: true,
    style: {
      position: "absolute",
      top: `${top}vh`,
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      transformOrigin: "center",
      filter: "contrast(1)",
      animationName: `floatIcon-${floatType}`,
      animationDuration: `${duration}s`,
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationFillMode: "forwards",
      animationDirection: "normal",
      animationPlayState: "running",
      animationDelay: `${delay}s`,
      "--rotateDelta": `${rotateDelta}deg`,
    },
  };
};

const BackgroundIcons = ({ darkMode }) => {
  const [icons, setIcons] = useState([]);

  // Determine count and opacity
  const ICON_COUNT = darkMode ? 20 : 40;
  const BASE_OPACITY = darkMode ? 0.05 : 0.1;

  // Initialize icons
  useEffect(() => {
    const initial = Array.from({ length: ICON_COUNT }).map((_, idx) =>
      generateIcon(idx, darkMode),
    );
    setIcons(initial);
  }, [darkMode]);

  // Lifecycle: vanish after POP_INTERVAL and re-spawn
  useEffect(() => {
    const timeouts = [];

    icons.forEach((icon) => {
      if (!icon.visible) return;

      const timeout = setTimeout(
        () => {
          setIcons((prev) =>
            prev.map((it) =>
              it.id === icon.id ? { ...it, visible: false } : it,
            ),
          );

          setTimeout(() => {
            const newIcon = generateIcon(icon.idx, darkMode, true);
            setIcons((prev) =>
              prev.map((it) => (it.id === icon.id ? newIcon : it)),
            );
          }, 1200);
        },
        POP_INTERVAL + Math.random() * 1000,
      );

      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [icons, darkMode]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {darkMode ? (
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={70}
          borderColor="#ffffff20"
          hoverFillColor="#222"
        />
      ) : (
        <SquaresWhite
          direction="diagonal"
          speed={0.5}
          squareSize={50}
          borderColor="#333"
          hoverFillColor="#ffff"
        />
      )}

      {icons.map(({ id, Icon, style, visible, outline }) => (
        <div
          key={id}
          style={{
            ...style,
            opacity: visible ? BASE_OPACITY : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(-10px) scale(0.8)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className={cn(
            "will-change-transform absolute",
            darkMode ? "text-white" : "text-black",
          )}
        >
          <Icon outline={outline} />
          <div
            className="absolute w-full h-full"
            style={{
              zIndex: -1,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full",
                  darkMode ? "bg-white" : "bg-black",
                )}
                style={{
                  position: "absolute",
                  width: `${4 - i}px`,
                  height: `${4 - i}px`,
                  opacity: 0.08,
                  top: `${i * 4}px`,
                  left: `${i * 4}px`,
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <style jsx global>{`
        @keyframes floatIcon-0 {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.04;
          }
          50% {
            transform: translateY(-80vh) rotate(var(--rotateDelta));
            opacity: 0.1;
          }
          100% {
            transform: translateY(-160vh) rotate(calc(var(--rotateDelta) * 2));
            opacity: 0.04;
          }
        }

        @keyframes floatIcon-1 {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.05;
          }
          50% {
            transform: translateY(-60vh) scale(1.02) rotate(var(--rotateDelta));
            opacity: 0.1;
          }
          100% {
            transform: translateY(-120vh) scale(1)
              rotate(calc(var(--rotateDelta) * 2));
            opacity: 0.05;
          }
        }

        @keyframes floatIcon-2 {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.06;
          }
          50% {
            transform: translateY(-100vh) rotate(var(--rotateDelta));
            opacity: 0.12;
          }
          100% {
            transform: translateY(-200vh) rotate(calc(var(--rotateDelta) * 2));
            opacity: 0.06;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundIcons;