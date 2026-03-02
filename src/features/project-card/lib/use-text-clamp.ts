"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface TextClampResult {
  descRef: React.RefObject<HTMLParagraphElement | null>;
  expanded: boolean;
  isClamped: boolean;
  toggleExpanded: () => void;
}

export function useTextClamp(): TextClampResult {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);

  const checkClamped = useCallback(() => {
    const el = descRef.current;
    if (!el) return;

    setIsClamped(el.scrollHeight > el.clientHeight);
  }, []);

  useEffect(() => {
    checkClamped();
    window.addEventListener("resize", checkClamped, { passive: true });
    return () => window.removeEventListener("resize", checkClamped);
  }, [checkClamped]);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return { descRef, expanded, isClamped, toggleExpanded };
}
