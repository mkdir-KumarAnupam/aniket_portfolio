"use client";

import React, { useEffect, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Navbar from "@/components/Navbar";
import { MyWorkMaster } from "@/components/StickyScroll/StickyScroll";
import { content } from "./content";

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <section
      id="my_work"
      className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white"
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="pt-[7%]"></div>
      <MyWorkMaster content={content} darkMode={darkMode} />
    </section>
  );
};

export default Page;