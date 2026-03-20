"use client";

import { useState, useEffect } from "react";

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return matches;
}
