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
  const wrapperRef = useRef<HTMLDivElement>(null);
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
    const wrapper = wrapperRef.current;
    if (!grid || !wrapper) {
      setActiveTab(tab);
      return;
    }

    prevHeightRef.current = wrapper.getBoundingClientRect().height;

    // display:none 아이템은 Flip.getState()가 위치를 캡처하지 못함
    // Work↔Personal처럼 disjoint한 탭 전환 시 2회차부터 gap이 깨지는 원인
    // 모든 아이템을 일시적으로 보여줘서 grid 위치를 정확히 캡처한 뒤 복원
    const hiddenItems = Array.from(
      grid.querySelectorAll<HTMLElement>(":scope > article.hidden"),
    );
    hiddenItems.forEach((el) => el.classList.remove("hidden"));
    flipStateRef.current = Flip.getState(
      grid.querySelectorAll(":scope > article"),
    );
    hiddenItems.forEach((el) => el.classList.add("hidden"));

    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state || !gridRef.current || !wrapperRef.current) return;
    flipStateRef.current = null;

    const grid = gridRef.current;
    const wrapper = wrapperRef.current;

    // grid가 아닌 wrapper에 height 고정 → grid 내부 fr 행 레이아웃 영향 없음
    gsap.set(wrapper, { height: prevHeightRef.current, overflow: "hidden" });

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
        // absolute: true가 hidden 아이템에 심은 display: block 포함 모든 잔여 인라인 스타일 제거
        // display를 빠뜨리면 2회차부터 hidden 아이템이 grid flow에 남아 gap이 넓어짐
        gsap.set(grid.querySelectorAll(":scope > article"), {
          clearProps: "all",
        });

        const newHeight = grid.getBoundingClientRect().height;
        gsap.to(wrapper, {
          height: newHeight,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(wrapper, { clearProps: "height,overflow" });
          },
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

      <div ref={wrapperRef}>
        <div
          ref={gridRef}
          className="relative grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
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
    </div>
  );
}
