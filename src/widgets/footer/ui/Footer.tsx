"use client";

import React, { memo } from "react";
import { SocialIcon, Card } from "@/shared/ui";

export const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-surface-elevated border-t border-border">
      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
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
            className="
              inline-flex items-center justify-center gap-2
              h-12 px-8
              text-base font-medium
              bg-primary text-white
              hover:bg-primary-dark
              rounded-md
              transition-all duration-fast
              shadow-md hover:shadow-lg
              active:scale-[0.98]
              mb-8
            "
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
      <div className="border-t border-border" />

      {/* Bottom */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-lg font-semibold tracking-tight text-foreground">
            GH.Kim
          </div>

          {/* Credits */}
          <p className="text-sm text-tertiary text-center leading-relaxed">
            Designed in{" "}
            <span className="text-secondary">Freeform</span> and coded in{" "}
            <span className="text-secondary">Cursor</span>.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            Built with{" "}
            <span className="text-secondary">Next.js</span> and{" "}
            <span className="text-secondary">Tailwind CSS</span>.
          </p>

          {/* Copyright */}
          <p className="text-sm text-tertiary">
            © {currentYear} GH.Kim
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
