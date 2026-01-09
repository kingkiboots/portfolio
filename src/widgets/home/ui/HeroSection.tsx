"use client";

import React, { memo } from "react";
import { ImagePlaceholder, SocialIcon } from "@/shared/ui";

export const HeroSection = memo(() => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center pt-16"
    >
      {/* Background decoration - subtle gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/5 absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full blur-3xl" />
        <div className="bg-secondary/5 absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Greeting */}
            <p className="text-primary mb-4 text-sm font-medium tracking-wide">
              안녕하세요, 저는
            </p>

            {/* Name */}
            <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              김기현
              <span className="text-primary">.</span>
            </h1>

            {/* Title */}
            <h2 className="text-secondary mb-6 text-xl font-medium sm:text-2xl">
              Web Frontend Developer
            </h2>

            {/* Description */}
            <p className="text-secondary mb-8 max-w-lg text-base leading-relaxed sm:text-lg">
              기술과 협업으로 가치를 창출하는 개발자입니다.
              <br />
              사용자 경험을 중시하며, 깔끔하고 유지보수하기 좋은 코드를
              작성하려고 노력합니다.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="bg-primary hover:bg-primary-dark duration-fast inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
              >
                프로젝트 보기
                <svg
                  className="ml-2 h-4 w-4"
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
                className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast inline-flex h-12 items-center justify-center rounded-md border px-6 text-sm font-medium transition-all active:scale-[0.98]"
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
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="from-primary/20 to-secondary/20 absolute -inset-4 rounded-2xl bg-linear-to-br opacity-60 blur-2xl" />

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

                {/* Status badge */}
                <div className="liquid-glass-primary text-primary absolute -right-3 -bottom-3 rounded-md px-4 py-2 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <span className="bg-secondary h-2 w-2 animate-pulse rounded-full" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="text-tertiary flex flex-col items-center gap-2">
            <span className="text-xs tracking-wider">SCROLL</span>
            <div className="from-border h-12 w-px bg-linear-to-b to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

