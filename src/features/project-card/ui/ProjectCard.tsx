"use client";

import React, { memo } from "react";
import Link from "next/link";
import {
  type Project,
  useOgImage,
  getProjectUrl,
} from "@/features/project-card";
import { useBreakpoint } from "@/shared/lib";
import { ProjectTechStack, ProjectThumbnail } from "@/entities/project";

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

    const detailHref = `/projects/${project.slug}`;

    const maxVisibleIcons = (() => {
      if (isMd) {
        return project.size === "sm"
          ? MAX_VISIBLE_ICONS_SM
          : MAX_VISIBLE_ICONS_LG;
      }
      return MAX_VISIBLE_ICONS_SM;
    })();

    return (
      <Link
        href={detailHref}
        className="group border-border bg-surface-elevated duration-normal hover:border-primary/30 hover:shadow-primary/10 relative flex h-full flex-col overflow-hidden rounded-xl border transition-all hover:scale-[1.02] hover:shadow-xl"
      >
        {/* Thumbnail */}
        <ProjectThumbnail
          title={project.title}
          thumbnailSrc={project.thumbnail || ogImage}
          gif={project.gif}
          featured={featured}
          ogLoading={ogLoading}
          canHover={isMd}
        />

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

            {/* Tech Stack Icons */}
            <ProjectTechStack
              tags={project.tags}
              maxVisibleIcons={maxVisibleIcons}
            />
          </div>
        </div>
      </Link>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
