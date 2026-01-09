"use client";

import React, { memo, useRef, useState } from "react";
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

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle
            title="My Best Projects"
            subtitle="직접 기획하고 개발한 프로젝트들입니다."
            className="mb-0"
          />

          {/* Slider navigation */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`
                w-10 h-10
                flex items-center justify-center
                border border-border
                rounded-md
                transition-all duration-fast
                ${
                  canScrollLeft
                    ? "text-foreground hover:bg-surface-elevated hover:border-primary"
                    : "text-muted cursor-not-allowed"
                }
              `}
              aria-label="Previous projects"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              className={`
                w-10 h-10
                flex items-center justify-center
                border border-border
                rounded-md
                transition-all duration-fast
                ${
                  canScrollRight
                    ? "text-foreground hover:bg-surface-elevated hover:border-primary"
                    : "text-muted cursor-not-allowed"
                }
              `}
              aria-label="Next projects"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
          className="
            flex gap-6
            overflow-x-auto
            scrollbar-hide
            -mx-6 px-6
            pb-4
            snap-x snap-mandatory
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[320px] sm:w-[360px] snap-start"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="
              inline-flex items-center gap-2
              text-sm font-medium
              text-primary
              hover:text-primary-dark
              transition-colors duration-fast
            "
          >
            모든 프로젝트 보기
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

