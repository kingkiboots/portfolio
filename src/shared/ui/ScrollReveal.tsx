"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "../lib/gsap-plugins";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  speed?: "fast" | "normal" | "slow";
  delay?: number;
}

const durations = { fast: 0.5, normal: 0.75, slow: 1.0 } as const;

export function ScrollReveal({
  children,
  className = "",
  speed = "normal",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // y만 초기 설정 (opacity는 SSR inline style로 이미 0)
      gsap.set(el, { y: 20 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: durations[speed],
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
