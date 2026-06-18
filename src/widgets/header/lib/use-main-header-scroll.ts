"use client";

import { useRef, useCallback } from "react";
import {
  useHeaderVisibility,
  type UseHeaderVisibilityOptions,
} from "@/shared/lib";

// 의존성 없는 순수함수 — 모듈 레벨로 안정적 참조
const getBgOpacity = (scrollY: number): number => {
  const heroThreshold = window.innerHeight * 0.5;
  if (scrollY < heroThreshold) return 0;
  return Math.min((scrollY - heroThreshold) / 200, 1);
};

export function useMainHeaderScroll() {
  const hasPassedThreshold = useRef(false);

  // ref 클로저이므로 deps [] — 리렌더 시 재생성 방지
  const onScroll = useCallback<
    NonNullable<UseHeaderVisibilityOptions["onScroll"]>
  >(
    ({ scrollY, direction }) => {
      const heroThreshold = window.innerHeight * 0.5;

      if (scrollY < 50) {
        hasPassedThreshold.current = false;
        return true;
      }

      if (scrollY >= heroThreshold) {
        hasPassedThreshold.current = true;
        return true;
      }

      if (direction === "down" && !hasPassedThreshold.current) {
        return false;
      }
      return undefined;
    },
    [], // hasPassedThreshold은 ref — 안정적 의존성
  );

  return useHeaderVisibility({ onScroll, getBgOpacity });
}
