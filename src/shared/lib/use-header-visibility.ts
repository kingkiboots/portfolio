"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface ScrollInfo {
  scrollY: number;
  deltaY: number;
  direction: "up" | "down";
}

export interface ClickInfo {
  target: EventTarget | null;
}

export interface UseHeaderVisibilityOptions {
  /** scroll 이벤트마다 호출. true=노출, false=숨김, undefined=유지 */
  onScroll?: (info: ScrollInfo, isVisible: boolean) => boolean | undefined;
  /** document click 이벤트마다 호출. true=노출, false=숨김, undefined=유지 */
  onClick?: (info: ClickInfo, isVisible: boolean) => boolean | undefined;
  /** scroll 위치로 배경 투명도(0~1)를 계산 */
  getBgOpacity?: (scrollY: number) => number;
}

export interface UseHeaderVisibilityReturn {
  isVisible: boolean;
  bgOpacity: number;
  show: () => void;
  hide: () => void;
}

export function useHeaderVisibility(
  options: UseHeaderVisibilityOptions = {},
): UseHeaderVisibilityReturn {
  const [isVisible, setIsVisible] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0);

  const isVisibleRef = useRef(true);
  const lastScrollY = useRef(0);

  // 콜백을 ref로 보관 → effect 의존 배열 없이 항상 최신값 사용
  const onScrollRef = useRef(options.onScroll);
  const onClickRef = useRef(options.onClick);
  const getBgOpacityRef = useRef(options.getBgOpacity);
  useEffect(() => {
    onScrollRef.current = options.onScroll;
    onClickRef.current = options.onClick;
    getBgOpacityRef.current = options.getBgOpacity;
  });

  const applyVisibility = useCallback((next: boolean) => {
    if (isVisibleRef.current === next) return;
    isVisibleRef.current = next;
    setIsVisible(next);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const deltaY = scrollY - lastScrollY.current;
      const direction: "up" | "down" = deltaY > 0 ? "down" : "up";

      const next = onScrollRef.current?.(
        { scrollY, deltaY, direction },
        isVisibleRef.current,
      );
      if (next !== undefined) applyVisibility(next);

      const opacity = getBgOpacityRef.current?.(scrollY);
      if (opacity !== undefined) setBgOpacity(opacity);

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [applyVisibility]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!onClickRef.current) return;
      const next = onClickRef.current(
        { target: e.target },
        isVisibleRef.current,
      );
      if (next !== undefined) applyVisibility(next);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [applyVisibility]);

  const show = useCallback(() => applyVisibility(true), [applyVisibility]);
  const hide = useCallback(() => applyVisibility(false), [applyVisibility]);

  return { isVisible, bgOpacity, show, hide };
}
