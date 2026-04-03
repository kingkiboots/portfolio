"use client";

import { ImagePlaceholder } from "@/shared/ui";
import { getAssetPath } from "@/shared/lib/get-asset-path";
import { memo, useState, useCallback } from "react";

interface ProjectThumbnailProps {
  title: string;
  thumbnailSrc?: string | null;
  gif?: string;
  featured?: boolean;
  ogLoading?: boolean;
  canHover: boolean;
}

export const ProjectThumbnail = memo<ProjectThumbnailProps>(
  ({ title, thumbnailSrc, gif, featured, ogLoading, canHover }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    const shouldShowPlaceholder = !thumbnailSrc || hasError;
    const safeThumbnail = thumbnailSrc ? getAssetPath(thumbnailSrc) : null;
    const safeGif = gif ? getAssetPath(gif) : undefined;

    return (
      <div
        className={`bg-foreground/5 relative min-h-[125px] w-full shrink-0 overflow-hidden ${
          featured ? "flex-1" : "aspect-video"
        }`}
      >
        {shouldShowPlaceholder ? (
          <ImagePlaceholder
            aspectRatio={featured ? undefined : "video"}
            label={ogLoading ? "로딩 중..." : title}
            className="h-full rounded-none"
          />
        ) : (
          <>
            {!canHover && safeGif ? (
              /* Mobile: liquid glass always active */
              <>
                <img
                  src={safeThumbnail!}
                  alt={title}
                  className="h-full w-full scale-110 object-cover blur-sm brightness-50 saturate-150"
                  loading="lazy"
                  onError={handleError}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[92%] overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-[1px]">
                    <img
                      src={safeGif}
                      alt={`${title} demo`}
                      className="w-full object-cover"
                      loading="lazy"
                      onError={handleError}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={safeThumbnail!}
                  alt={title}
                  className={`h-full w-full object-cover transition-all duration-slow ${
                    safeGif
                      ? "group-hover:scale-110 group-hover:blur-sm group-hover:brightness-50 group-hover:saturate-150"
                      : "group-hover:scale-105"
                  }`}
                  loading="lazy"
                  onError={handleError}
                />
                {safeGif && (
                  <>
                    {/* Liquid glass tint overlay */}
                    <div className="duration-slow absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    {/* Floating GIF panel */}
                    <div className="duration-slow absolute inset-0 flex translate-y-2 items-center justify-center opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="duration-slow w-[92%] scale-95 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.55)] backdrop-blur-[1px] transition-transform group-hover:scale-100">
                        <img
                          src={safeGif}
                          alt={`${title} demo`}
                          className="w-full object-cover"
                          loading="lazy"
                          onError={handleError}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  },
);

ProjectThumbnail.displayName = "ProjectThumbnail";
