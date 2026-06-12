"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip, registerGsapPlugins } from "@/shared/lib/gsap-plugins";
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
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const prevHeightRef = useRef<number>(0);

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

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    const grid = gridRef.current;
    if (!grid) {
      setActiveTab(tab);
      return;
    }
    // DOM 변경 전에 현재 높이와 요소 위치를 캡처
    prevHeightRef.current = grid.getBoundingClientRect().height;
    flipStateRef.current = Flip.getState(
      grid.querySelectorAll(":scope > article"),
    );
    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state || !gridRef.current) return;
    flipStateRef.current = null;

    const grid = gridRef.current;

    // 애니메이션 중 grid가 즉시 collapse되지 않도록 높이 고정
    gsap.set(grid, { minHeight: prevHeightRef.current, overflow: "hidden" });

    // minHeight 없는 상태의 자연스러운 새 높이를 미리 측정
    gsap.set(grid, { minHeight: 0 });
    const newHeight = grid.getBoundingClientRect().height;
    gsap.set(grid, { minHeight: prevHeightRef.current });

    Flip.from(state, {
      duration: 0.45,
      ease: "power2.inOut",
      absolute: true,
      onEnter: (els) => {
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        );
      },
      onLeave: (els) => {
        gsap.to(els, {
          opacity: 0,
          scale: 0.88,
          duration: 0.25,
          ease: "power2.in",
        });
      },
      onComplete: () => {
        // Flip 완료 후 새 높이로 부드럽게 전환
        gsap.to(grid, {
          minHeight: newHeight,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => { gsap.set(grid, { minHeight: "", overflow: "" }); },
        });
      },
    });
  }, [activeTab]);

  return (
    <div className="container mx-auto px-6">
      <SectionTitle
        title="Projects"
        subtitle="직접 참여하고 개발한 프로젝트들입니다."
      />

      <div className="mb-8 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-subtle hover:bg-foreground/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        ref={gridRef}
        className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
        role="region"
        aria-label="프로젝트 목록"
      >
        {projects.map((project) => (
          <article
            key={project.slug}
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
