"use client";

import React, { memo } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionTitle = memo<SectionTitleProps>(
  ({ title, subtitle, align = "left", className = "" }) => {
    const alignStyles = {
      left: "text-left",
      center: "text-center",
    };

    return (
      <div className={`mb-12 ${alignStyles[align]} ${className}`}>
        <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="text-secondary mt-3 max-w-2xl text-base">{subtitle}</p>
        )}
      </div>
    );
  },
);

SectionTitle.displayName = "SectionTitle";
