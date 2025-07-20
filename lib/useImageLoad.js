"use client";

import { useState, useEffect } from "react";

export function useImageLoad() {
  const [loaded, setLoaded] = useState(false);

  const markAsLoaded = () => setLoaded(true);

  return { loaded, markAsLoaded };
}