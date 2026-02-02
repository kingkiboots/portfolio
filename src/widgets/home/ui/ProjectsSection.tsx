"use client";

import React, { memo, useRef, useState, useCallback } from "react";
import { SectionTitle } from "@/shared/ui";
import { ProjectCard, Project } from "./ProjectCard";

// 샘플 프로젝트 데이터 - 나중에 실제 데이터로 교체
const projects: Project[] = [
  {
    id: "1",
    title: "포트폴리오 웹사이트",
    description:
      "Next.js 14와 Tailwind CSS를 활용한 개인 포트폴리오 사이트입니다. 미니멀한 디자인과 다크모드를 지원합니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "2",
    title: "프로젝트 2",
    description:
      "프로젝트에 대한 간단한 설명입니다. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성해주세요.",
    tags: ["React", "Redux", "Node.js"],
    links: {
      demo: "#",
      github: "#",
    },
  },
  {
    id: "3",
    title: "프로젝트 3",
    description:
      "프로젝트에 대한 간단한 설명입니다. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성해주세요.",
    tags: ["Vue.js", "Vuex", "Firebase"],
    links: {
      demo: "#",
    },
  },
  {
    id: "4",
    title: "프로젝트 4",
    description:
      "프로젝트에 대한 간단한 설명입니다. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 작성해주세요.",
    tags: ["React Native", "Expo", "TypeScript"],
    links: {
      github: "#",
    },
  },
];

export const ProjectsSection = memo(() => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex items-end justify-between">
          <SectionTitle
            title="My Best Projects"
            subtitle="직접 기획하고 개발한 프로젝트들입니다."
            className="mb-0"
          />

          {/* Slider navigation */}
          <div
            className="hidden items-center gap-2 sm:flex"
            role="group"
            aria-label="프로젝트 슬라이더 네비게이션"
          >
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`border-border duration-fast flex h-10 w-10 items-center justify-center rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                canScrollLeft
                  ? "text-foreground hover:bg-surface-elevated hover:border-primary"
                  : "text-muted cursor-not-allowed"
              } `}
              aria-label="이전 프로젝트"
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
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`border-border duration-fast flex h-10 w-10 items-center justify-center rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                canScrollRight
                  ? "text-foreground hover:bg-surface-elevated hover:border-primary"
                  : "text-muted cursor-not-allowed"
              } `}
              aria-label="다음 프로젝트"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Projects slider */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          role="region"
          aria-label="프로젝트 목록"
          tabIndex={0}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="w-[320px] shrink-0 snap-start sm:w-[360px]"
              aria-label={`프로젝트 ${index + 1}: ${project.title}`}
            >
              <ProjectCard project={project} />
            </article>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-primary hover:text-primary-dark duration-fast inline-flex items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            모든 프로젝트 보기
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";
