"use client";

import React, { memo, useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Career", href: "#career" },
  { label: "Contact", href: "#contact" },
];

export const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`duration-normal fixed top-0 right-0 left-0 z-50 transition-all ${
        isScrolled
          ? "bg-background/80 border-border border-b shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      } `}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground hover:text-primary duration-fast text-lg font-semibold tracking-tight transition-colors"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-secondary hover:text-foreground hover:bg-surface-elevated duration-fast rounded-md px-4 py-2 text-sm font-medium transition-all"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Button - Desktop */}
        <a
          href="#contact"
          className="bg-primary hover:bg-primary-dark duration-fast hidden h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md md:inline-flex"
        >
          Contact
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-foreground hover:bg-surface-elevated duration-fast flex h-10 w-10 items-center justify-center rounded-md transition-colors md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
      </nav>

      {/* Mobile Menu */}
      <div
        className={`duration-normal overflow-hidden transition-all md:hidden ${isMobileMenuOpen ? "max-h-80" : "max-h-0"} `}
      >
        <div className="bg-background/95 border-border container mx-auto border-b px-6 py-4 backdrop-blur-lg">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-secondary hover:text-foreground hover:bg-surface-elevated duration-fast block rounded-md px-4 py-3 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-primary hover:bg-primary-dark duration-fast mt-4 flex h-10 w-full items-center justify-center rounded-md text-sm font-medium text-white transition-all"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
