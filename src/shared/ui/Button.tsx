"use client";

import React, { memo, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = memo<ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm hover:shadow-md",
      secondary:
        "bg-secondary text-white hover:bg-secondary-dark active:scale-[0.98] shadow-sm hover:shadow-md",
      outline:
        "border border-border bg-transparent text-foreground hover:bg-surface-elevated hover:border-primary active:scale-[0.98]",
      ghost:
        "bg-transparent text-foreground hover:bg-surface-elevated active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-sm gap-1.5",
      md: "h-10 px-4 text-sm rounded-md gap-2",
      lg: "h-12 px-6 text-base rounded-md gap-2.5",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

