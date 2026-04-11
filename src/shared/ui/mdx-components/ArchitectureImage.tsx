import { CommonImage } from "@/shared/ui";

interface ArchitectureImageProps {
  src: string;
  caption?: string;
  alt?: string;
  isFullWidthString?: "true" | "false";
}

export function ArchitectureImage({
  src,
  caption,
  alt,
  isFullWidthString = "true",
}: ArchitectureImageProps) {
  const isFullWidth = isFullWidthString === "true";
  return (
    <figure className="my-8">
      <div className="border-border bg-surface flex items-center justify-center overflow-hidden rounded-lg border shadow-sm">
        <CommonImage
          src={src}
          alt={alt || caption || "Architecture diagram"}
          className={isFullWidth ? "w-full" : ""}
          aspectRatio={isFullWidth ? "wide" : "square"}
        />
      </div>
      {caption && (
        <figcaption className="text-tertiary mt-3 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
