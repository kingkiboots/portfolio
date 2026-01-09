"use client";

import React, { memo } from "react";
import { ImagePlaceholder, SocialIcon } from "@/shared/ui";

export const HeroSection = memo(() => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-16"
    >
      {/* Background decoration - subtle gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute top-1/4 -right-1/4
            w-[600px] h-[600px]
            bg-primary/5
            rounded-full
            blur-3xl
          "
        />
        <div
          className="
            absolute -bottom-1/4 -left-1/4
            w-[400px] h-[400px]
            bg-secondary/5
            rounded-full
            blur-3xl
          "
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Greeting */}
            <p className="text-sm font-medium text-primary mb-4 tracking-wide">
              안녕하세요, 저는
            </p>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              김기현
              <span className="text-primary">.</span>
            </h1>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-medium text-secondary mb-6">
              Web Frontend Developer
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-secondary leading-relaxed mb-8 max-w-lg">
              기술과 협업으로 가치를 창출하는 개발자입니다.
              <br />
              사용자 경험을 중시하며, 깔끔하고 유지보수하기 좋은 코드를
              작성하려고 노력합니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  text-sm font-medium
                  bg-primary text-white
                  hover:bg-primary-dark
                  rounded-md
                  transition-all duration-fast
                  shadow-md hover:shadow-lg
                  active:scale-[0.98]
                "
              >
                프로젝트 보기
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  text-sm font-medium
                  border border-border
                  text-foreground
                  hover:bg-surface-elevated
                  hover:border-primary
                  rounded-md
                  transition-all duration-fast
                  active:scale-[0.98]
                "
              >
                연락하기
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-1">
              <SocialIcon type="github" href="https://github.com" />
              <SocialIcon type="linkedin" href="https://linkedin.com" />
              <SocialIcon type="blog" href="https://tistory.com" />
              <SocialIcon type="email" href="mailto:example@email.com" />
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div
                className="
                  absolute -inset-4
                  bg-linear-to-br from-primary/20 to-secondary/20
                  rounded-2xl
                  blur-2xl
                  opacity-60
                "
              />

              {/* Main image container */}
              <div className="relative">
                {/* Liquid glass frame */}
                <div
                  className="
                    liquid-glass
                    p-2
                    rounded-xl
                  "
                >
                  <ImagePlaceholder
                    aspectRatio="square"
                    label="Profile"
                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg"
                  />
                </div>

                {/* Status badge */}
                <div
                  className="
                    absolute -bottom-3 -right-3
                    liquid-glass-primary
                    px-4 py-2
                    rounded-md
                    text-sm font-medium
                    text-primary
                  "
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-2 text-tertiary">
            <span className="text-xs tracking-wider">SCROLL</span>
            <div className="w-px h-12 bg-linear-to-b from-border to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

