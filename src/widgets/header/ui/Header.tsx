"use client";

import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useResume } from "@/features/resume";

const navItems = [
  { label: "Expertise", href: "#my-expertise" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

export const Header = memo(() => {
  const { resumeUrl, hasResume } = useResume();
  const [isVisible, setIsVisible] = useState(true);
  const [bgOpacity, setBgOpacity] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const heroThreshold = useRef(0);
  const showTimer = useRef<NodeJS.Timeout | null>(null);
  const hasPassedThreshold = useRef(false);

  useEffect(() => {
    heroThreshold.current = window.innerHeight * 0.5;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY < 50) {
        if (showTimer.current) {
          clearTimeout(showTimer.current);
          showTimer.current = null;
        }
        setIsVisible(true);
        setBgOpacity(0);
        hasPassedThreshold.current = false;
      } else if (currentScrollY < heroThreshold.current) {
        if (isScrollingDown && !hasPassedThreshold.current) {
          if (showTimer.current) {
            clearTimeout(showTimer.current);
            showTimer.current = null;
          }
          setIsVisible(false);
        }
        setBgOpacity(0);
      } else {
        if (!showTimer.current && !isVisible) {
          showTimer.current = setTimeout(() => {
            setIsVisible(true);
            hasPassedThreshold.current = true;
            showTimer.current = null;
          }, 300);
        }
        if (isVisible) {
          hasPassedThreshold.current = true;
        }
        const opacityProgress = Math.min(
          (currentScrollY - heroThreshold.current) / 200,
          1,
        );
        setBgOpacity(opacityProgress);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (showTimer.current) {
        clearTimeout(showTimer.current);
      }
    };
  }, [isVisible]);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: `rgb(var(--color-background-rgb) / ${0.6 + bgOpacity * 0.3})`,
        backdropFilter: "blur(20px)",
        borderBottom:
          bgOpacity > 0.2 ? "1px solid var(--color-border)" : "none",
        boxShadow: bgOpacity > 0.2 ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
      }}
      role="banner"
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-6"
        aria-label="메인 네비게이션"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground hover:text-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background rounded-sm text-xl font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="홈으로 이동"
        >
          Kihyeon Kim
        </Link>

        {/* Desktop Navigation - Radix NavigationMenu */}
        <NavigationMenu.Root className="hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link
                  href={item.href}
                  className={`focus-visible:ring-primary focus-visible:ring-offset-background px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    bgOpacity > 0.5
                      ? "text-foreground/80 hover:text-primary"
                      : "text-subtle hover:text-foreground"
                  }`}
                >
                  {item.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        {/* CTA Buttons - Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          {hasResume ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
              Resume
            </a>
          ) : null}
          <a
            href="#contact"
            className="bg-primary hover:bg-primary-dark duration-fast focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu - Radix Dialog */}
        <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              className="text-foreground hover:bg-surface-elevated duration-fast focus-visible:ring-primary focus-visible:ring-offset-background flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
              aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 backdrop-blur-sm md:hidden" />
            <Dialog.Content
              className="bg-background border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed top-0 right-0 z-50 h-full w-[280px] border-l p-6 shadow-lg duration-300 focus:outline-none md:hidden"
              aria-describedby={undefined}
            >
              <VisuallyHidden.Root>
                <Dialog.Title>네비게이션 메뉴</Dialog.Title>
              </VisuallyHidden.Root>

              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  className="text-foreground hover:bg-surface-elevated duration-fast focus-visible:ring-primary absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
                  aria-label="메뉴 닫기"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Dialog.Close>

              {/* Mobile Navigation */}
              <nav className="mt-12" aria-label="모바일 네비게이션">
                <ul className="flex flex-col gap-1" role="menu">
                  {navItems.map((item) => (
                    <li key={item.href} role="none">
                      <a
                        href={item.href}
                        onClick={handleMobileMenuClose}
                        className="text-subtle hover:text-foreground hover:bg-surface-elevated duration-fast focus-visible:ring-primary block rounded-md px-4 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                        role="menuitem"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  {hasResume ? (
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleMobileMenuClose}
                      className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast focus-visible:ring-primary flex h-10 w-full items-center justify-center gap-1.5 rounded-md border text-base font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
                      Resume
                    </a>
                  ) : null}
                  <a
                    href="#contact"
                    onClick={handleMobileMenuClose}
                    className="bg-primary hover:bg-primary-dark duration-fast focus-visible:ring-primary flex h-10 w-full items-center justify-center rounded-md text-base font-medium text-white transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Contact
                  </a>
                </div>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
