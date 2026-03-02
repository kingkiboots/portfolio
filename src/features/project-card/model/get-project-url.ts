import type { Project } from "../types/project.types";

const PLACEHOLDER_LINK = "#";

export function getProjectUrl(project: Project): string | null {
  const url = project.links?.website || project.links?.demo || null;

  if (!url || url === PLACEHOLDER_LINK) return null;

  return url;
}
