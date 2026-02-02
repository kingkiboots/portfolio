"use client";

import React, { memo, ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: React.ReactNode;
}

const buttonVariants = {
  base: "inline-flex items-center justify-center font-medium transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
  variants: {
    primary:
      "bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark active:scale-[0.98] shadow-sm hover:shadow-md",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-surface-elevated hover:border-primary active:scale-[0.98]",
    ghost:
      "bg-transparent text-foreground hover:bg-surface-elevated active:scale-[0.98]",
  },
  sizes: {
    sm: "h-8 px-3 text-sm rounded-sm gap-1.5",
    md: "h-10 px-4 text-sm rounded-md gap-2",
    lg: "h-12 px-6 text-base rounded-md gap-2.5",
  },
};

export const getButtonClassName = (
  variant: keyof typeof buttonVariants.variants = "primary",
  size: keyof typeof buttonVariants.sizes = "md",
  className: string = ""
) => {
  return `${buttonVariants.base} ${buttonVariants.variants[variant]} ${buttonVariants.sizes[size]} ${className}`;
};

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        variant = "primary",
        size = "md",
        asChild = false,
        children,
        className = "",
        ...props
      },
      ref
    ) => {
      const Comp = asChild ? Slot : "button";
      const combinedClassName = getButtonClassName(variant, size, className);

      return (
        <Comp ref={ref} className={combinedClassName} {...props}>
          {children}
        </Comp>
      );
    }
  )
);

Button.displayName = "Button";

