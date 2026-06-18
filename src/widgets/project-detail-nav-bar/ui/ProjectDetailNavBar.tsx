"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/features/project-card";
import { getAssetPath, useProjectDetailVisibility } from "@/shared/lib";

export function ProjectDetailNavBar() {
  const { isVisible } = useProjectDetailVisibility();
  const params = useParams<{ slug: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = projects.findIndex((p) => p.slug === params?.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // 숨겨질 때 드롭다운도 닫기
  useEffect(() => {
    if (!isVisible) setIsOpen(false);
  }, [isVisible]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <nav
      data-header-chrome
      className={`fixed right-0 bottom-0 left-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-label="프로젝트 네비게이션"
      style={{
        backgroundColor: "rgb(var(--color-background-rgb) / 0.85)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid var(--color-border)",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        {/* Previous */}
        {prevProject ? (
          <Link
            href={getAssetPath(`/projects/${prevProject.slug}`)}
            className="text-subtle hover:text-foreground duration-fast inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <svg
              className="h-4 w-4 shrink-0"
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
            <span className="hidden sm:inline">이전</span>
          </Link>
        ) : (
          <div className="w-8" aria-hidden="true" />
        )}

        {/* Project list selector */}
        <div ref={containerRef} className="relative">
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className="text-subtle hover:text-foreground border-border hover:bg-surface-elevated duration-fast inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
          >
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16"
              />
            </svg>
            <span className="hidden sm:inline">목록</span>
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-label="프로젝트 목록"
              className="border-border bg-background absolute bottom-full left-1/2 mb-2 w-72 -translate-x-1/2 overflow-hidden rounded-xl border shadow-2xl"
              style={{ backdropFilter: "blur(16px)" }}
            >
              {/* Back to all projects */}
              <Link
                href={getAssetPath("/#projects")}
                onClick={() => setIsOpen(false)}
                className="text-subtle hover:text-foreground hover:bg-surface-elevated border-border flex items-center gap-2 border-b px-4 py-3 text-sm transition-colors"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12h18M3 12l6-6M3 12l6 6"
                  />
                </svg>
                전체 목록
              </Link>

              {/* Project list */}
              <div className="max-h-72 overflow-y-auto py-1">
                {projects.map((project, idx) => (
                  <Link
                    key={project.slug}
                    href={getAssetPath(`/projects/${project.slug}`)}
                    role="option"
                    aria-selected={project.slug === params?.slug}
                    onClick={() => setIsOpen(false)}
                    className={`hover:bg-surface-elevated flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      project.slug === params?.slug
                        ? "text-primary font-semibold"
                        : "text-foreground"
                    }`}
                  >
                    <span className="text-subtle w-5 shrink-0 text-right text-xs tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 truncate">{project.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Next */}
        {nextProject ? (
          <Link
            href={getAssetPath(`/projects/${nextProject.slug}`)}
            className="text-subtle hover:text-foreground duration-fast inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <span className="hidden sm:inline">다음</span>
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div className="w-8" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
