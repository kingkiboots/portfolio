"use client";

import React, { memo, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Card = memo<CardProps>(
  ({
    variant = "default",
    padding = "md",
    children,
    className = "",
    ...props
  }) => {
    const baseStyles = "rounded-md transition-all duration-normal";

    const variants = {
      default: "bg-surface border border-border",
      elevated: "bg-surface-elevated shadow-md hover:shadow-lg",
      glass: "liquid-glass",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
