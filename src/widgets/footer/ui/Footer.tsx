"use client";

import React, { memo } from "react";
import * as Separator from "@radix-ui/react-separator";
import { SocialIcon } from "@/shared/ui";
import { useResume } from "@/features/resume";
import { ENV } from "@/shared/env";

export const Footer = memo(() => {
  const { resumeUrl, hasResume } = useResume();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-surface-elevated border-border border-t"
      role="contentinfo"
      aria-label="연락처 및 사이트 정보"
    >
      {/* Contact Section */}
      <section
        className="container mx-auto px-6 py-16 sm:py-20"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-heading"
            className="text-foreground mb-4 text-2xl font-semibold sm:text-3xl"
          >
            Get in Touch
          </h2>
          <p className="text-secondary mb-8 leading-relaxed">
            새로운 기회나 협업에 관심이 있으시다면 언제든 연락해 주세요.
            <br />
            빠른 시일 내에 답변 드리겠습니다.
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${ENV.EMAIL}`}
            className="bg-primary hover:bg-primary-dark duration-fast focus-visible:ring-primary focus-visible:ring-offset-background mb-8 inline-flex h-12 items-center justify-center gap-2 rounded-md px-8 text-base font-medium text-white shadow-md transition-all hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98]"
            aria-label="이메일 보내기"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            이메일 보내기
          </a>

          {/* Resume Link */}
          {hasResume ? (
            <div className="mb-8">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary duration-fast group focus-visible:ring-primary focus-visible:ring-offset-background inline-flex items-center gap-1.5 rounded-sm text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                이력서 보기
                <svg
                  className="duration-fast h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
              </a>
            </div>
          ) : null}

          {/* Social Links */}
          <nav aria-label="소셜 미디어 링크">
            <ul className="flex items-center justify-center gap-2" role="list">
              <li>
                <SocialIcon type="github" href={ENV.URL_GITHUB} />
              </li>
              <li>
                <SocialIcon type="linkedin" href={ENV.URL_LINKEDIN} />
              </li>
              <li>
                <SocialIcon type="blog" href={ENV.URL_BLOG} />
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Divider - Radix Separator */}
      <Separator.Root
        className="bg-border h-px w-full"
        decorative
        orientation="horizontal"
      />

      {/* Bottom */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <div className="text-foreground text-lg font-semibold tracking-tight">
            Kihyeon Kim
          </div>

          {/* Credits */}
          <p className="text-tertiary text-center text-sm leading-relaxed">
            Roughly designed in <span className="text-secondary">Freeform</span>{" "}
            and coded in <span className="text-secondary">Cursor</span>.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with <span className="text-secondary">Next.js</span> and{" "}
            <span className="text-secondary">Tailwind CSS</span>.
          </p>

          {/* Copyright */}
          <p className="text-tertiary text-sm">
            <small>© {currentYear} Kihyeon Kim</small>
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
