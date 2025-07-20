"use client";

import React from "react";

const PageHeaderBackground = ({
  title = "Explore the World",
  subtitle = "Discover new places and unforgettable memories.",
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{title}</h1>
      <p style={styles.paragraph}>{subtitle}</p>
      <div style={styles.background} />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    textAlign: "center",
    padding: "120px 15px",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    zIndex: 1,
    overflow: "hidden",
  },
  heading: {
    fontSize: "56px",
    fontWeight: 700,
    margin: "0 0 10px",
  },
  paragraph: {
    fontSize: "16px",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "24px",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "158px",
    zIndex: -1,
    backgroundImage:
      "url('https://solverwp.com/demo/html/travhub/assets/images/shapes/page-header-bg-shape.png')",
    backgroundSize: "cover",
    backgroundRepeat: "repeat-x",
    animation: "cityMoving 60s linear infinite",
  },
};

// Add keyframe animation globally
if (typeof window !== "undefined") {
  const styleTagId = "city-moving-animation";
  if (!document.getElementById(styleTagId)) {
    const style = document.createElement("style");
    style.id = styleTagId;
    style.innerHTML = `
      @keyframes cityMoving {
        0% { background-position: 10000% 100%; }
        100% { background-position: 0% 100%; }
      }
    `;
    document.head.appendChild(style);
  }
}

export default PageHeaderBackground;