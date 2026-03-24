"use client";

import { ImagePlaceholder } from "@/shared/ui";
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
    // [rerender-functional-setstate] 및 [rerender-derived-state] 원칙 적용
    const [hasError, setHasError] = useState(false);

    // 에러 발생 시 호출될 콜백 - useCallback으로 안정성 확보
    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    // 이미지 출력 여부 결정 (원본 소스가 없거나 에러가 발생한 경우 fallback 노출)
    const shouldShowPlaceholder = !thumbnailSrc || hasError;

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
            {!canHover && gif ? (
              <img
                src={gif}
                alt={`${title} demo`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={handleError}
              />
            ) : (
              <>
                <img
                  src={thumbnailSrc}
                  alt={title}
                  className={`h-full w-full object-cover ${
                    gif
                      ? "duration-slow transition-opacity group-hover:opacity-0"
                      : "duration-slow transition-transform group-hover:scale-105"
                  }`}
                  loading="lazy"
                  onError={handleError}
                />
                {gif && (
                  <img
                    src={gif}
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
