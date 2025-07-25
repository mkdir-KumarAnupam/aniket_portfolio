"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NavBarMobile } from "@/components/ui/tubelight-navbar";
import {
  Home,
  User,
  FileText,
  FolderOpen,
  Mail,
  Linkedin,
  Phone,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(DrawSVGPlugin);

const Navbar = ({ darkMode, setDarkMode }) => {
  const [loaded, setLoaded] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const underlineRefs = useRef([]);

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "aboutme", icon: User },
    { name: "Projects", url: "my_work", icon: FolderOpen },
    { name: "Experience", url: "experience", icon: FileText },
  ];

  const navLinks = [
    { label: "About Me", href: "aboutme" },
    { label: "My Work", href: "my_work" },
    { label: "Experience", href: "experience" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const svgVariants = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="10" viewBox="0 0 310 41" fill="none" preserveAspectRatio="none">
        <path d="M17.0039 33.582C32.2307 33.7406 47.4552 33.7271 62.676 33.7113C67.3044 33.7064 96.546 33.9549 104.728 32.9769C113.615 31.9146 104.516 29.2022 102.022 28.1821C89.9573 23.2459 77.3751 19.9248 65.0451 15.9546C57.8987 13.6536 37.2813 9.3934 44.2314 7.00157C50.9667 4.68363 64.2873 6.71856 70.4249 6.86582C105.866 7.71618 141.306 8.48751 176.75 9.49827C217.874 10.671 258.906 11.9547 300 15.3886" stroke="#000000" stroke-width="10" stroke-linecap="round"/>
      </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="10" viewBox="0 0 310 41" fill="none" preserveAspectRatio="none">
        <path d="M10 30C30 28 45 23 70 25C95 27 95 36 120 33C145 30 140 22 160 20C180 18 185 30 210 28C235 26 240 17 260 15C280 13 290 19 310 22" stroke="#000000" stroke-width="10" stroke-linecap="round"/>
      </svg>`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="10" viewBox="0 0 310 41" fill="none" preserveAspectRatio="none">
        <path d="M5 28C25 34 55 35 85 30C105 27 105 22 135 24C165 26 165 35 195 32C215 30 235 20 260 23C280 25 295 30 310 26" stroke="#000000" stroke-width="10" stroke-linecap="round"/>
      </svg>`,
    ];

    const decorateSVG = (svgEl) => {
      svgEl.setAttribute("preserveAspectRatio", "none");
      svgEl.setAttribute("class", "w-full h-full");
    };

    let nextIndex = 0;

    underlineRefs.current.forEach((el) => {
      if (!el) return;
      const container = el.closest(".group");

      let enterTween = null;
      let leaveTween = null;

      container.addEventListener("mouseenter", () => {
        if (enterTween?.isActive()) return;
        if (leaveTween?.isActive()) leaveTween.kill();

        el.innerHTML = svgVariants[nextIndex];
        const svg = el.querySelector("svg");
        if (!svg) return;
        decorateSVG(svg);

        const path = svg.querySelector("path");
        if (!path) return;

        gsap.set(path, { drawSVG: "0%", opacity: 0 });

        enterTween = gsap.to(path, {
          duration: 0.5,
          drawSVG: "100%",
          opacity: 1,
          ease: "power2.inOut",
          onComplete: () => (enterTween = null),
        });

        nextIndex = (nextIndex + 1) % svgVariants.length;
      });

      container.addEventListener("mouseleave", () => {
        const path = el.querySelector("path");
        if (!path) return;

        const playOut = () => {
          if (leaveTween?.isActive()) return;
          leaveTween = gsap.to(path, {
            duration: 0.5,
            drawSVG: "100% 100%",
            ease: "power2.inOut",
            onComplete: () => {
              leaveTween = null;
              el.innerHTML = "";
            },
          });
        };

        if (enterTween?.isActive()) {
          enterTween.eventCallback("onComplete", playOut);
        } else {
          playOut();
        }
      });
    });
  }, []);

  return (
    <nav
      className={`w-full px-6 py-4 font-bold text-sm fixed top-0 z-[999999] transition-all duration-700 ease-out bg-white ${
        loaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/" passHref className="hidden md:block">
          <Image src="/logo.png" alt="Logo" width={100} height={300} priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-base relative">
          {navLinks.map(({ label, href }, i) => (
            <div
              key={href}
              className="group relative inline-block overflow-visible pb-1"
            >
              <Link
                href={href}
                className="relative z-10 text-black font-medium px-2"
              >
                {label}
              </Link>
              <div
                ref={(el) => (underlineRefs.current[i] = el)}
                className="absolute left-0 bottom-[-0.3em] w-full h-[10px] pointer-events-none"
              />
            </div>
          ))}

          {/* Contact Dropdown */}
          <div className="relative">
            <button
              onClick={() => setContactOpen((prev) => !prev)}
              className="bg-black px-5 py-2 text-white hover:scale-105 hover:shadow-lg hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-200"
            >
              Contact Me
            </button>
            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-32 scale=110 border-1 border-black border-dashed font-medium tracking-wide shadow-xl bg-white overflow-hidden z-50"
                >
                  <a
                    href="https://www.linkedin.com/in/aniketku"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-black hover:text-white transition-all"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </a>
                  <a
                    href="mailto:aniket.owin@gmail.com"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-black hover:text-white transition-all"
                  >
                    <Mail size={18} /> Email
                  </a>
                  <a
                    href="tel:+917980148414"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-black hover:text-white transition-all"
                  >
                    <Phone size={18} /> Mobile
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>

      {/* Mobile Nav + Toggle */}
      <div className="block md:hidden flex items-center justify-between mt-3">
        <NavBarMobile items={navItems} />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </nav>
  );
};

export default Navbar;
