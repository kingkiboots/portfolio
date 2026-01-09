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
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-normal
        ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-fast"
        >
          GH.Kim
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="
                  px-4 py-2
                  text-sm font-medium
                  text-secondary
                  hover:text-foreground
                  hover:bg-surface-elevated
                  rounded-md
                  transition-all duration-fast
                "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume Button - Desktop */}
        <a
          href="#contact"
          className="
            hidden md:inline-flex
            items-center justify-center
            h-9 px-4
            text-sm font-medium
            bg-primary text-white
            hover:bg-primary-dark
            rounded-md
            transition-all duration-fast
            shadow-sm hover:shadow-md
          "
        >
          Contact
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="
            md:hidden
            w-10 h-10
            flex items-center justify-center
            text-foreground
            hover:bg-surface-elevated
            rounded-md
            transition-colors duration-fast
          "
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
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
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-normal
          ${isMobileMenuOpen ? "max-h-80" : "max-h-0"}
        `}
      >
        <div className="container mx-auto px-6 py-4 bg-background/95 backdrop-blur-lg border-b border-border">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    block px-4 py-3
                    text-sm font-medium
                    text-secondary
                    hover:text-foreground
                    hover:bg-surface-elevated
                    rounded-md
                    transition-colors duration-fast
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="
              mt-4
              flex items-center justify-center
              h-10 w-full
              text-sm font-medium
              bg-primary text-white
              hover:bg-primary-dark
              rounded-md
              transition-all duration-fast
            "
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";
