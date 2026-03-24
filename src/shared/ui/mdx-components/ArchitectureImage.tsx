import { CommonImage } from "@/shared/ui";

interface ArchitectureImageProps {
  src: string;
  caption?: string;
  alt?: string;
}

export function ArchitectureImage({
  src,
  caption,
  alt,
}: ArchitectureImageProps) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <CommonImage
          src={src}
          alt={alt || caption || "Architecture diagram"}
          className="w-full"
          aspectRatio="wide"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-tertiary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
