"use client";

import React, { memo } from "react";
import { SocialIcon, Card } from "@/shared/ui";

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-surface-elevated border-border border-t">
      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground mb-4 text-2xl font-semibold sm:text-3xl">
            Get in Touch
          </h2>
          <p className="text-secondary mb-8 leading-relaxed">
            새로운 기회나 협업에 관심이 있으시다면 언제든 연락해 주세요.
            <br />
            빠른 시일 내에 답변 드리겠습니다.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:example@email.com"
            className="bg-primary hover:bg-primary-dark duration-fast mb-8 inline-flex h-12 items-center justify-center gap-2 rounded-md px-8 text-base font-medium text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2">
            <SocialIcon type="github" href="https://github.com" />
            <SocialIcon type="linkedin" href="https://linkedin.com" />
            <SocialIcon type="blog" href="https://tistory.com" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-border border-t" />

      {/* Bottom */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo */}
          <div className="text-foreground text-lg font-semibold tracking-tight">
            GH.Kim
          </div>

          {/* Credits */}
          <p className="text-tertiary text-center text-sm leading-relaxed">
            Designed in <span className="text-secondary">Freeform</span> and
            coded in <span className="text-secondary">Cursor</span>.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with <span className="text-secondary">Next.js</span> and{" "}
            <span className="text-secondary">Tailwind CSS</span>.
          </p>

          {/* Copyright */}
          <p className="text-tertiary text-sm">© {currentYear} GH.Kim</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
