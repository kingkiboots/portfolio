// features/project-card — Public API
export type { Project } from "./types/project.types";
export { getProjectUrl } from "./model/get-project-url";
export { useOgImage } from "./lib/use-og-image";
export { useTextClamp } from "./lib/use-text-clamp";

export { ProjectCard } from "./ui/ProjectCard";
