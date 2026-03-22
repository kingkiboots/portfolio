import { memo, type CSSProperties } from "react";
import { techMap } from "../lib/tech-icons";

interface ProjectTechStackProps {
  tags: string[];
  maxVisibleIcons: number;
}

export const ProjectTechStack = memo(function ProjectTechStack({
  tags,
  maxVisibleIcons,
}: ProjectTechStackProps) {
  const visibleTags = tags.slice(0, maxVisibleIcons);
  const remainingCount = tags.length - maxVisibleIcons;

  return (
    <div className="flex items-center gap-2">
      {visibleTags.map((tag) => {
        const tech = techMap[tag];

        if (!tech) {
          return (
            <span key={tag} className="text-tertiary shrink-0 text-xs">
              {tag}
            </span>
          );
        }

        if (tech.type === "img") {
          const colorUrl = tech.hoverUrl || tech.url;
          return (
            <span key={tag} className="relative inline-block h-4 w-4 shrink-0">
              <span
                className="bg-tertiary duration-fast absolute inset-0 transition-opacity group-hover:opacity-0"
                aria-hidden="true"
                style={{
                  maskImage: `url(${tech.url})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${tech.url})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
              <img
                src={colorUrl}
                alt={tag}
                className="duration-fast absolute inset-0 h-full w-full opacity-0 transition-opacity group-hover:opacity-100"
                loading="lazy"
              />
            </span>
          );
        }

        const Icon = tech.icon;
        return (
          <Icon
            key={tag}
            className="text-tertiary duration-fast h-4 w-4 shrink-0 transition-colors"
            style={{ "--brand-color": tech.color } as CSSProperties}
            aria-label={tag}
          />
        );
      })}
      {remainingCount > 0 && (
        <span className="text-tertiary shrink-0 text-xs">
          +{remainingCount}
        </span>
      )}
    </div>
  );
});
