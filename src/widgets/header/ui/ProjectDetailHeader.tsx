"use client";

import { memo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/features/project-card";
import { getAssetPath, useProjectDetailVisibility } from "@/shared/lib";

export const ProjectDetailHeader = memo(() => {
  const { isVisible, bgOpacity } = useProjectDetailVisibility();
  const params = useParams<{ slug: string }>();
  const project = params?.slug ? getProjectBySlug(params.slug) : undefined;

  return (
    <header
      data-header-chrome
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: `rgb(var(--color-background-rgb) / ${0.6 + bgOpacity * 0.3})`,
        backdropFilter: "blur(20px)",
        borderBottom:
          bgOpacity > 0.2 ? "1px solid var(--color-border)" : "none",
        boxShadow: bgOpacity > 0.2 ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
      }}
      role="banner"
    >
      <nav
        className="container relative mx-auto flex h-16 items-center justify-between px-6"
        aria-label="프로젝트 상세 네비게이션"
      >
        {/* Mobile: back button */}
        <Link
          href={getAssetPath("/#projects")}
          className="text-foreground hover:text-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
          aria-label="프로젝트 목록으로"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>

        {/* Desktop: logo */}
        <Link
          href="/"
          className="text-foreground hover:text-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background hidden rounded-sm text-xl font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:block"
          aria-label="홈으로 이동"
        >
          Kihyeon Kim
        </Link>

        {/* Centered project title */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-foreground pointer-events-auto max-w-[55%] truncate text-sm font-semibold md:max-w-[50%]">
            {project?.title}
          </span>
        </div>

        {/* Right spacer (mobile balance) */}
        <div className="w-10 md:hidden" aria-hidden="true" />
      </nav>
    </header>
  );
});

ProjectDetailHeader.displayName = "ProjectDetailHeader";
