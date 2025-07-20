"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavBarMobile({ items, className }) {
  const pathname = usePathname();

  // Predefined order of your pages
  const routeOrder = ["/", "/aboutme", "/my_work", "/experience"];

  // Normalize and get index of current route
  const normalizedPath = pathname?.split("?")[0].replace(/\/$/, "") || "/";
  const currentIndex = routeOrder.indexOf(normalizedPath || "/");

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-3",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white border border-black px-2 py-1 rounded-full shadow-md">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === currentIndex;

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-black hover:bg-black hover:text-white",
                isActive && "bg-black text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-t-full">
                    <div className="absolute w-12 h-6 bg-black/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-black/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-black/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}