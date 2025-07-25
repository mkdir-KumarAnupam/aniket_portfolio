"use client";

import React, { useEffect, useState } from "react";
import "@/styles/buttons.css";
import "@/styles/Animations.css";

const ProjectButtons = ({ darkMode = false }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`w-full flex flex-col sm:flex-row items-center justify-center gap-4 px-4 mt-12`}
    >
      {/* Available Button */}
      <button
        className={`
                    btn-theme-available dot-btn
                    ${darkMode ? "dark" : ""}
                    ${loaded ? "animate-slide-fade-up" : ""}
                `}
        style={{ animationDelay: "0.1s" }}
      >
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <span className="label">Available for new project</span>
      </button>

      {/* Let's Talk Button */}
      <button
        className={`
                    btn-theme-primary talk-btn
                    ${darkMode ? "bg-black " : ""}
                    ${loaded ? "animate-slide-fade-up" : ""}
                `}
        style={{ animationDelay: "0.2s" }}
        onClick={() => window.open("https://calendly.com/your-link", "_blank")}
      >
        <span className="talk-label pl-6">Let's Talk</span>
        <span className="arrow">→</span>
      </button>

      {/* Get Resume Button — visible ONLY on mobile */}
      <div className="w-full flex justify-center sm:hidden">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`
                        btn-theme-primary talk-btn
                        ${darkMode ? "dark" : ""}
                        ${loaded ? "animate-slide-fade-up" : ""}
                    `}
          style={{ animationDelay: "0.3s" }}
        >
          <span className="talk-label pl-6">Get Resume</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectButtons;
