"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
                                       words,
                                       className = "",
                                       filter = true,
                                       duration = 0.5,
                                   }) => {
    const [scope, animate] = useAnimate();
    const wordsArray = words.trim().split(" ");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
            },
            {
                duration,
                delay: stagger(0.15),
            }
        );
    }, [scope, animate, filter, duration]);

    return (
        <span
            ref={scope}
            className={cn("inline-block leading-snug tracking-wide", className)}
        >
      {wordsArray.map((word, idx) => (
          <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                  display: "inline-block",
                  marginRight: "0.25rem",
                  filter: filter ? "blur(10px)" : "none",
              }}
          >
              {word}
          </motion.span>
      ))}
    </span>
    );
};
