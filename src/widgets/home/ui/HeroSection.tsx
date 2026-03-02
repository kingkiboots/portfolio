"use client";

import React, { memo } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ImagePlaceholder, SocialIcon } from "@/shared/ui";
import { ENV } from "@/shared/env";

export const HeroSection = memo(() => {
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="order-2 flex h-full flex-col lg:order-1">
            {/* Name */}
            <h1
              id="hero-heading"
              className="text-foreground mt-auto mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              김기현
            </h1>
            {/* Title */}
            <p
              className="text-primary mb-6 text-xl font-medium sm:text-2xl"
              role="doc-subtitle"
            >
              Web Frontend Developer
            </p>

            {/* Description */}
            <p className="text-secondary mb-8 max-w-lg text-base leading-relaxed sm:text-lg">
              기술과 협업으로 가치를 창출하는 개발자입니다.
              <br />
              사용자 경험을 중시하며, 깔끔하고 유지보수하기 좋은 코드를
              작성하려고 노력합니다.
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
              <button
                type="button"
                className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
                aria-label="이력서 보기"
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
              </button>
              {/* <a
                href="#contact"
                className="text-foreground hover:text-primary hover:bg-surface-elevated duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center rounded-md px-5 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
              >
                연락하기
              </a> */}
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

          {/* Profile Image */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <figure className="relative">
              {/* Decorative elements */}
              <div
                className="from-primary/20 to-secondary/20 absolute -inset-4 rounded-2xl bg-linear-to-br opacity-60 blur-2xl"
                aria-hidden="true"
              />

              {/* Main image container */}
              <div className="relative">
                {/* Liquid glass frame */}
                <div className="liquid-glass rounded-xl p-2">
                  <ImagePlaceholder
                    aspectRatio="square"
                    label="Profile"
                    className="h-64 w-64 rounded-lg sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                  />
                </div>
              </div>
              <VisuallyHidden.Root>
                <figcaption>김기현 프로필 이미지</figcaption>
              </VisuallyHidden.Root>
            </figure>
          </div>
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
