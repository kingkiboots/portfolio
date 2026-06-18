"use client";

import {
  useHeaderVisibility,
  type UseHeaderVisibilityOptions,
} from "./use-header-visibility";

// 모듈 레벨 순수함수 — 의존성 없으므로 useCallback 불필요
const onScroll: NonNullable<UseHeaderVisibilityOptions["onScroll"]> = ({
  direction,
}) => {
  if (direction === "down") return false;
  if (direction === "up") return true;
  return undefined;
};

const onClick: NonNullable<UseHeaderVisibilityOptions["onClick"]> = (
  { target },
  isVisible,
) => {
  if (target instanceof Element && target.closest("[data-header-chrome]")) {
    return undefined;
  }
  return !isVisible;
};

const getBgOpacity = (scrollY: number): number => Math.min(scrollY / 100, 1);

/**
 * 프로젝트 상세 페이지 크롬(헤더/NavBar) 노출 제어 훅.
 * - 스크롤 다운 → 숨김 / 스크롤 업 → 노출
 * - 콘텐츠 클릭 → 토글 (data-header-chrome 영역 제외)
 */
export function useProjectDetailVisibility() {
  return useHeaderVisibility({ onScroll, onClick, getBgOpacity });
}
