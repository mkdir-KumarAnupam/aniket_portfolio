"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useVelocity,
  useAnimationControls,
} from "framer-motion";
import { Mail, Linkedin, Phone } from "lucide-react";

export const DraggableCardBody = ({ className, children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  const [hovered, setHovered] = useState(false);
  const [constraints, setConstraints] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  const springConfig = {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [25, -25]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-25, 25]),
    springConfig,
  );

  const opacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.8, 1, 0.8]),
    springConfig,
  );

  const glareOpacity = useSpring(
    useTransform(mouseX, [-300, 0, 300], [0.2, 0, 0.2]),
    springConfig,
  );

  useEffect(() => {
    const updateConstraints = () => {
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } =
      cardRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: "spring", ...springConfig },
        });

        const vx = velocityX.get();
        const vy = velocityY.get();
        const magnitude = Math.sqrt(vx * vx + vy * vy);
        const bounce = Math.min(0.8, magnitude / 1000);

        animate(info.point.x, info.point.x + vx * 0.3, {
          duration: 0.8,
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });

        animate(info.point.y, info.point.y + vy * 0.3, {
          duration: 0.8,
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        opacity,
        willChange: "transform",
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative ml-[65%]  mt-[60%] xl:mt-[34%] z-[99999] min-h-76 w-[35%] overflow-hidden rounded-md bg-neutral-100 p-4 shadow-2xl transform-3d dark:bg-neutral-900",
        className,
      )}
    >
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>

      {/* Social buttons with blur background area */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={hovered ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 15 }}
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="relative">
          {/* Blurred background only behind icons */}
          <div className="absolute inset-0 -z-10 rounded-full bg-white/60 backdrop-blur-md shadow-md border border-black/10" />
          <div className="flex gap-6 p-5 rounded-full">
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-6 w-6 text-black hover:scale-110 transition-transform" />
            </a>
            <a href="mailto:someone@example.com">
              <Mail className="h-6 w-6 text-black hover:scale-110 transition-transform" />
            </a>
            <a href="tel:+917439449406">
              <Phone className="h-6 w-6 text-black hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Glare overlay */}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 bg-white select-none"
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({ className, children }) => {
  return (
    <div className={cn("[perspective:3000px]", className)}>{children}</div>
  );
};
