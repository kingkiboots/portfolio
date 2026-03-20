import { SectionTitle } from "@/shared/ui";
import { ProjectCard, projects } from "@/features/project-card";

const sizeClasses = {
  sm: "col-span-1",
  lg: "col-span-1 md:col-span-2 md:row-span-2",
};

export function ProjectsSection() {
  return (
    <div className="container mx-auto px-6">
      <SectionTitle
        title="Projects"
        subtitle="직접 참여하고 개발한 프로젝트들입니다."
      />

      <div
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
        role="region"
        aria-label="프로젝트 목록"
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className={sizeClasses[project.size === "lg" ? "lg" : "sm"]}
          >
            <ProjectCard
              project={project}
              featured={project.size === "lg"}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
