"use client";

import React, { memo } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Card, Tag, ImagePlaceholder } from "@/shared/ui";
import {
  type Project,
  useOgImage,
  useTextClamp,
  getProjectUrl,
} from "@/features/project-card";

export type { Project };

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo<ProjectCardProps>(({ project }) => {
  const projectUrl = getProjectUrl(project);
  const { ogImage, loading: ogLoading } = useOgImage(
    project.thumbnail ? null : projectUrl,
  );
  const { descRef, expanded, isClamped, toggleExpanded } = useTextClamp();

  const thumbnailSrc = project.thumbnail || ogImage;

  return (
    <Card
      variant="elevated"
      padding="none"
      className="group flex h-full flex-col duration-normal overflow-hidden transition-all hover:shadow-xl"
    >
      {/* Project Image */}
      <div className="relative shrink-0 overflow-hidden">
        {thumbnailSrc ? (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={thumbnailSrc}
              alt={project.title}
              className="duration-slow h-full w-full rounded-none object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <ImagePlaceholder
            aspectRatio="video"
            label={ogLoading ? "로딩 중..." : project.title}
            className="duration-slow rounded-none transition-transform group-hover:scale-105"
          />
        )}

        {/* Overlay on hover */}
        <div
          className="bg-foreground/80 duration-normal absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100"
          role="group"
          aria-label={`${project.title} 링크`}
        >
          <Tooltip.Provider delayDuration={300}>
            {project.links?.demo ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:bg-primary duration-fast flex h-10 w-10 items-center justify-center rounded-md bg-white transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    aria-label={`${project.title} 데모 보기`}
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-foreground text-background animate-in fade-in-0 zoom-in-95 rounded-md px-3 py-1.5 text-xs font-medium shadow-md"
                    sideOffset={5}
                  >
                    데모 보기
                    <Tooltip.Arrow className="fill-foreground" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : null}
            {project.links?.website ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={project.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:bg-primary duration-fast flex h-10 w-10 items-center justify-center rounded-md bg-white transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    aria-label={`${project.title} 서비스 바로 가기`}
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-foreground text-background animate-in fade-in-0 zoom-in-95 rounded-md px-3 py-1.5 text-xs font-medium shadow-md"
                    sideOffset={5}
                  >
                    서비스 바로 가기
                    <Tooltip.Arrow className="fill-foreground" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : null}
            {project.links?.github ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:bg-primary duration-fast flex h-10 w-10 items-center justify-center rounded-md bg-white transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    aria-label={`${project.title} 소스 코드 보기`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-foreground text-background animate-in fade-in-0 zoom-in-95 rounded-md px-3 py-1.5 text-xs font-medium shadow-md"
                    sideOffset={5}
                  >
                    소스 코드 보기
                    <Tooltip.Arrow className="fill-foreground" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : null}
          </Tooltip.Provider>
        </div>
      </div>

      {/* Project Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-foreground group-hover:text-primary duration-fast mb-2 text-lg font-semibold transition-colors">
          {project.title}
        </h3>
        <p
          ref={descRef}
          className={`text-secondary text-sm leading-relaxed ${expanded ? "" : "line-clamp-2"}`}
        >
          {project.description}
        </p>
        {isClamped || expanded ? (
          <button
            onClick={toggleExpanded}
            className="text-primary hover:text-primary-dark duration-fast mt-1 mb-4 cursor-pointer self-start text-xs font-medium transition-colors"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        ) : (
          <div className="mb-4" />
        )}

        {/* Tags */}
        <ul
          className="mt-auto flex flex-wrap gap-1.5"
          role="list"
          aria-label="사용 기술"
        >
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag variant="primary" size="sm">
                {tag}
              </Tag>
            </li>
          ))}
        </ul>

        {project.period ? (
          <p className="text-tertiary mt-4 border-t border-border pt-3 text-xs">
            {project.period}
          </p>
        ) : null}
      </div>
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";
