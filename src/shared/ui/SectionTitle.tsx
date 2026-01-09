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
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base text-secondary max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionTitle.displayName = "SectionTitle";

