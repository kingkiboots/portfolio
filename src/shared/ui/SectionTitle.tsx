"use client";

import React, { memo, useId } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export const SectionTitle = memo<SectionTitleProps>(
  ({ title, subtitle, align = "left", className = "", id }) => {
    const generatedId = useId();
    const headingId = id || `section-title-${generatedId}`;

    const alignStyles = {
      left: "text-left",
      center: "text-center",
    };

    return (
      <header className={`mb-12 ${alignStyles[align]} ${className}`}>
        <h2
          id={headingId}
          className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-secondary mt-3 max-w-2xl text-base">{subtitle}</p>
        )}
      </header>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

