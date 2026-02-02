"use client";

import React, { memo } from "react";

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  label?: string;
  className?: string;
}

export const ImagePlaceholder = memo<ImagePlaceholderProps>(
  ({ width, height, aspectRatio = "square", label, className = "" }) => {
    const aspectRatios = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      wide: "aspect-[2/1]",
    };

    const sizeStyles =
      width || height
        ? `${width ? `w-[${width}]` : ""} ${height ? `h-[${height}]` : ""}`.trim()
        : "w-full";

    return (
      <div
        className={` ${sizeStyles} ${aspectRatios[aspectRatio]} bg-surface-elevated border-border flex items-center justify-center overflow-hidden rounded-md border ${className} `}
      >
        <div className="text-tertiary flex flex-col items-center gap-2">
          <svg
            className="h-8 w-8 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {label && <span className="text-xs">{label}</span>}
        </div>
      </div>
    );
  },
);

ImagePlaceholder.displayName = "ImagePlaceholder";

