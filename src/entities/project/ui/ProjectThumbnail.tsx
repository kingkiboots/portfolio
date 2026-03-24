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
              <img
                src={safeGif}
                alt={`${title} demo`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={handleError}
              />
            ) : (
              <>
                <img
                  src={safeThumbnail!}
                  alt={title}
                  className={`h-full w-full object-cover ${
                    safeGif
                      ? "duration-slow transition-opacity group-hover:opacity-0"
                      : "duration-slow transition-transform group-hover:scale-105"
                  }`}
                  loading="lazy"
                  onError={handleError}
                />
                {safeGif && (
                  <img
                    src={safeGif}
                    alt={`${title} demo`}
                    className="duration-slow absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity group-hover:opacity-100"
                    loading="lazy"
                    onError={handleError}
                  />
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
