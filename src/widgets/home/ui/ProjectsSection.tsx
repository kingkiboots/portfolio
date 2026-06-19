"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as Tabs from "@radix-ui/react-tabs";
import { SectionTitle } from "@/shared/ui";
import { ProjectCard, projects } from "@/features/project-card";
import type { ProjectCategory } from "@/features/project-card";

type Tab = "all" | ProjectCategory;

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "personal", label: "Personal" },
];

const sizeClasses = {
  sm: "col-span-1",
  md: "col-span-1 md:col-span-2 md:row-span-2",
};

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

      <Tabs.Root
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as Tab)}
      >
        <Tabs.List className="mb-8 flex gap-2" aria-label="프로젝트 필터">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=inactive]:bg-foreground/5 data-[state=inactive]:text-subtle data-[state=inactive]:hover:bg-foreground/10"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      <div
        ref={gridRef}
        className="relative grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
        role="region"
        aria-label="프로젝트 목록"
      >
        {projects.map((project) => (
          <article
            key={project.slug}
            data-category={project.category}
            className={`${sizeClasses[project.size === "md" ? "md" : "sm"]} ${
              activeTab !== "all" && project.category !== activeTab
                ? "hidden"
                : ""
            }`}
          >
            <ProjectCard project={project} featured={project.size === "md"} />
          </article>
        ))}
      </div>
    </div>
  );
}
