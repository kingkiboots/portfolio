"use client";

import { useScrollAnimation } from "../lib/use-scroll-animation";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  speed?: "fast" | "normal" | "slow";
  delay?: number;
}

export function ScrollReveal({
  children,
  className = "",
  speed = "normal",
  delay = 0,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const speedClass = {
    fast: "scroll-fade-in-fast",
    normal: "scroll-fade-in",
    slow: "scroll-fade-in-slow",
  }[speed];

  return (
    <div
      ref={ref}
      className={`${speedClass} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
