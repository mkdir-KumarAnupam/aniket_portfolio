"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageTransition from "./PageTransition";

const TransitionWrapper = ({ children }) => {
  const pathname = usePathname();
  const [routeKey, setRouteKey] = useState(pathname);

  useEffect(() => {
    setRouteKey(pathname); // triggers animation on route change
  }, [pathname]);

  return <PageTransition key={routeKey}>{children}</PageTransition>;
};

export default TransitionWrapper;