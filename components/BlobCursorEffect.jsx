"use client";

import React, { useEffect, useRef, useState } from "react";

const BlobCursor = ({ parentRef }) => {
  const cursorRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!parentRef?.current) return;

    const parent = parentRef.current;

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetPos.current = { x, y };
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    let frameId;

    const animateCursor = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += dx * 0.15;
      currentPos.current.y += dy * 0.15;

      if (cursorRef.current && visible) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      frameId = requestAnimationFrame(animateCursor);
    };

    frameId = requestAnimationFrame(animateCursor);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [parentRef, visible]);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="absolute top-0 left-0 pointer-events-none w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="w-full h-full border-2 border-dashed border-black rounded-full opacity-60 darkmode:border-white" />
    </div>
  );
};

export default BlobCursor;