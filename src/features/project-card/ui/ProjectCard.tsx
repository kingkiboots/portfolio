"use client";

import React, { memo } from "react";
import Link from "next/link";
import {
  type Project,
  useOgImage,
  getProjectUrl,
} from "@/features/project-card";
import { ImagePlaceholder } from "@/shared/ui";
import { useBreakpoint } from "@/shared/lib";
import { techMap } from "../lib/tech-icons";

export type { Project };

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const MAX_VISIBLE_ICONS_SM = 3;
const MAX_VISIBLE_ICONS_LG = 6;

export const ProjectCard = memo<ProjectCardProps>(
  ({ project, featured = false }) => {
    const projectUrl = getProjectUrl(project);
    const { ogImage, loading: ogLoading } = useOgImage(
      project.thumbnail ? null : projectUrl,
    );

    const isMd = useBreakpoint("md");

    const thumbnailSrc = project.thumbnail || ogImage;
    const detailHref = `/projects/${project.slug}`;

    const maxVisibleIcons = (() => {
      if (isMd) {
        return project.size === "sm"
          ? MAX_VISIBLE_ICONS_SM
          : MAX_VISIBLE_ICONS_LG;
      }
      return MAX_VISIBLE_ICONS_SM;
    })();

    const visibleTags = project.tags.slice(0, maxVisibleIcons);
    const remainingCount = project.tags.length - maxVisibleIcons;

    return (
      <Link
        href={detailHref}
        className="group border-border bg-surface-elevated duration-normal hover:border-primary/30 hover:shadow-primary/10 relative flex h-full flex-col overflow-hidden rounded-xl border transition-all hover:scale-[1.02] hover:shadow-xl"
      >
        {/* Thumbnail */}
        <div
          className={`bg-foreground/5 relative w-full shrink-0 overflow-hidden ${featured ? "flex-1" : "aspect-video"}`}
        >
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={project.title}
              className="duration-slow h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <ImagePlaceholder
              aspectRatio={featured ? undefined : "video"}
              label={ogLoading ? "로딩 중..." : project.title}
              className="h-full rounded-none"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between gap-3 p-5">
          <h3
            className={`text-foreground leading-snug font-semibold ${featured ? "text-lg" : "text-base"}`}
          >
            {project.title}
          </h3>

          {/* Footer: View Project + Tech Stack Icons */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-subtle duration-fast group-hover:text-primary inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors">
              View Project
              <svg
                className="duration-fast h-4 w-4 transition-transform group-hover:translate-x-1"
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
            </span>

            <div className="flex items-center gap-2">
              {visibleTags.map((tag) => {
                const tech = techMap[tag];
                if (!tech) {
                  return (
                    <span key={tag} className="text-tertiary shrink-0 text-xs">
                      {tag}
                    </span>
                  );
                }
                if (tech.type === "img") {
                  const colorUrl = tech.hoverUrl || tech.url;
                  return (
                    <span
                      key={tag}
                      className="relative inline-block h-4 w-4 shrink-0"
                    >
                      <span
                        className="bg-tertiary duration-fast absolute inset-0 transition-opacity group-hover:opacity-0"
                        aria-hidden="true"
                        style={{
                          maskImage: `url(${tech.url})`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskImage: `url(${tech.url})`,
                          WebkitMaskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                        }}
                      />
                      <img
                        src={colorUrl}
                        alt={tag}
                        className="duration-fast absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:opacity-100"
                        loading="lazy"
                      />
                    </span>
                  );
                }
                const Icon = tech.icon;
                return (
                  <Icon
                    key={tag}
                    className="text-tertiary duration-fast h-4 w-4 shrink-0 transition-colors"
                    style={
                      { "--brand-color": tech.color } as React.CSSProperties
                    }
                    aria-label={tag}
                  />
                );
              })}
              {remainingCount > 0 && (
                <span className="text-tertiary shrink-0 text-xs">
                  +{remainingCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
