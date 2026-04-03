"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/shared/lib/gsap-plugins";
import { SectionTitle } from "@/shared/ui";
import { ProjectCard, projects } from "@/features/project-card";

const sizeClasses = {
  sm: "col-span-1",
  md: "col-span-1 md:col-span-2 md:row-span-2",
};

export function ProjectsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.querySelectorAll(":scope > article"),
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-6">
      <SectionTitle
        title="Projects"
        subtitle="직접 참여하고 개발한 프로젝트들입니다."
      />

      <div
        ref={gridRef}
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
        role="region"
        aria-label="프로젝트 목록"
      >
        {projects.map((project) => (
          <article
            key={project.id}
            className={sizeClasses[project.size === "md" ? "md" : "sm"]}
          >
            <ProjectCard project={project} featured={project.size === "md"} />
          </article>
        ))}
      </div>
    </div>
  );
}
