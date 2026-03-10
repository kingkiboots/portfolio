"use client";

import React, { memo } from "react";
import { SocialIcon } from "@/shared/ui";
import { useResume } from "@/features/resume";
import { ENV } from "@/shared/env";

export const HeroSection = memo(() => {
  const { resumeUrl, hasResume } = useResume();

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration - subtle gradient */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="bg-primary/5 absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full blur-3xl" />
        <div className="bg-secondary/5 absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          {/* Greeting with Name */}
          <h1
            id="hero-heading"
            className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <span className="text-secondary block text-3xl font-medium sm:text-3xl lg:text-4xl xl:text-5xl">
              Hi, I'm
            </span>
            <span className="relative inline-block">
              <span className="relative z-10">Kihyeon Kim</span>
              <span
                className="bg-primary/40 absolute -bottom-1 left-0 z-0 h-4 w-full -skew-x-6 sm:h-5"
                aria-hidden="true"
              />
            </span>
            <span className="text-primary">,</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            role="doc-subtitle"
          >
            <span className="text-primary capitalize">
              who makes better Experiences!
            </span>
          </p>

          {/* Achievement Stats - 부가 설명 */}
          <p className="text-subtle lg:text-md mb-12 text-sm tracking-wide sm:text-base">
            Time to First PR{" "}
            <span className="text-secondary font-semibold">60%+</span> reduced •
            Duplicate API calls{" "}
            <span className="text-secondary font-semibold">80%</span> reduced •
            Page navigation{" "}
            <span className="text-secondary font-semibold">10x</span> faster
          </p>

          {/* CTA Buttons */}
          <div
            className="mb-8 flex flex-wrap gap-4"
            role="group"
            aria-label="주요 링크"
          >
            <a
              href="#projects"
              className="bg-primary hover:bg-primary-dark duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
            >
              프로젝트 보기
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            {hasResume ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
              >
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                이력서 보기
              </a>
            ) : null}
          </div>

          {/* Social Links */}
          <nav aria-label="소셜 미디어 링크">
            <ul className="flex items-center gap-1" role="list">
              <li>
                <SocialIcon type="github" href={ENV.URL_GITHUB} />
              </li>
              <li>
                <SocialIcon type="linkedin" href={ENV.URL_LINKEDIN} />
              </li>
              <li>
                <SocialIcon type="blog" href={ENV.URL_BLOG} />
              </li>
              <li>
                <SocialIcon type="email" href={`mailto:${ENV.EMAIL}`} />
              </li>
            </ul>
          </nav>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          aria-hidden="true"
        >
          <div className="text-tertiary flex flex-col items-center gap-2">
            <span className="text-xs tracking-wider">SCROLL</span>
            <div className="relative h-12 w-5">
              {/* Track line */}
              <div className="from-border absolute left-1/2 h-full w-px -translate-x-1/2 bg-linear-to-b to-transparent" />
              {/* Animated drop */}
              <div className="scroll-drop absolute top-0 left-1/2 -translate-x-1/2">
                <div className="liquid-glass h-3 w-3 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
