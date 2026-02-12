"use client";

import React, { memo, useCallback } from "react";

interface SkipLinkProps {
  targetId?: string;
  children?: React.ReactNode;
}

export const SkipLink = memo<SkipLinkProps>(
  ({ targetId = "main-content", children = "본문 바로가기" }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: "smooth" });
        }
      },
      [targetId]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const target = document.getElementById(targetId);
          if (target) {
            target.focus();
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      },
      [targetId]
    );

    return (
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="bg-primary text-white fixed top-0 left-0 right-0 z-[100] -translate-y-full py-3 text-center text-sm font-medium shadow-lg transition-transform duration-200 focus:translate-y-0 focus:outline-none"
      >
        {children}
      </a>
    );
  }
);

SkipLink.displayName = "SkipLink";

