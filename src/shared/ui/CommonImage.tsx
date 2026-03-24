"use client";

import { memo, useCallback, useState } from "react";
import { type AspectRatio, ImagePlaceholder } from "./ImagePlaceholder";
import { getAssetPath } from "@/shared/lib/get-asset-path";

interface CommonImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "alt" | "onError"
  > {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
}

export const CommonImage = memo<CommonImageProps>(
  ({
    src,
    alt,
    className,
    aspectRatio = "video",
    loading = "lazy",
    ...props
  }) => {
    const [hasError, setHasError] = useState(false);
    const safeSrc = getAssetPath(src);

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    if (hasError || !src) {
      return (
        <ImagePlaceholder
          aspectRatio={aspectRatio}
          label={alt || "이미지를 불러올 수 없습니다."}
          className={className}
        />
      );
    }

    return (
      <img
        {...props}
        src={safeSrc}
        alt={alt}
        className={className}
        loading={loading}
        onError={handleError}
      />
    );
  },
);

CommonImage.displayName = "CommonImage";
