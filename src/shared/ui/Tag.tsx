"use client";

import React, { memo, HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export const Tag = memo<TagProps>(
  ({ variant = "default", size = "sm", children, className = "", ...props }) => {
    const baseStyles =
      "inline-flex items-center font-medium rounded-sm transition-colors duration-fast";

    const variants = {
      default: "bg-surface-elevated text-secondary border border-border",
      primary: "bg-primary/10 text-primary border border-primary/20",
      secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = "Tag";


