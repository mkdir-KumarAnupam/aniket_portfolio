import { useEffect, useMemo, useState } from "react";

const BREAKPOINTS = {
  SM: 0,
  MD: 600,
  LG: 960,
  XL: 1200
};

const useBreakpoints = () => {
  const [deviceWidth, setDeviceWidth] = useState(0);

  const isSM = useMemo(() => deviceWidth < BREAKPOINTS.MD, [deviceWidth]);

  const isMD = useMemo(
    () => deviceWidth >= BREAKPOINTS.MD && deviceWidth < BREAKPOINTS.LG,
    [deviceWidth]
  );

  const isLG = useMemo(
    () => deviceWidth >= BREAKPOINTS.LG && deviceWidth < BREAKPOINTS.XL,
    [deviceWidth]
  );

  const isXL = useMemo(() => deviceWidth >= BREAKPOINTS.XL, [deviceWidth]);

  const isMobile = useMemo(() => deviceWidth < BREAKPOINTS.MD, [deviceWidth]);

  const isDesktop = useMemo(() => deviceWidth >= BREAKPOINTS.MD, [deviceWidth]);

  useEffect(() => {
    const updateSize = () => {
      setDeviceWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    isSM,
    isMD,
    isLG,
    isXL,
    isMobile,
    isDesktop
  };
};

export default useBreakpoints;