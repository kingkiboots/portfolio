"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useResume } from "@/features/resume";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

export const Header = memo(() => {
  const { resumeUrl, hasResume } = useResume();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header
      className={`duration-normal fixed top-0 right-0 left-0 z-50 transition-all ${
        isScrolled
          ? "bg-background/80 border-border border-b shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      } `}
      role="banner"
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-6"
        aria-label="메인 네비게이션"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground hover:text-primary duration-fast text-lg font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          aria-label="홈으로 이동"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation - Radix NavigationMenu */}
        <NavigationMenu.Root className="hidden md:flex">
          <NavigationMenu.List className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link
                  href={item.href}
                  className="text-secondary hover:text-foreground hover:bg-surface-elevated duration-fast rounded-md px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
              className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
            className="bg-primary hover:bg-primary-dark duration-fast inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu - Radix Dialog */}
        <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              className="text-foreground hover:bg-surface-elevated duration-fast flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
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
                  className="text-foreground hover:bg-surface-elevated duration-fast absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                        className="text-secondary hover:text-foreground hover:bg-surface-elevated duration-fast block rounded-md px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                      className="border-border text-foreground hover:bg-surface-elevated hover:border-primary duration-fast flex h-10 w-full items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                    className="bg-primary hover:bg-primary-dark duration-fast flex h-10 w-full items-center justify-center rounded-md text-sm font-medium text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
