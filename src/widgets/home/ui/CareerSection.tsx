"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/shared/lib/gsap-plugins";
import { SectionTitle, Card, Tag } from "@/shared/ui";

interface CareerItem {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  period: string;
  description: string;
  skills?: string[];
}

const careerItems: CareerItem[] = [
  {
    id: "1",
    type: "work",
    title: "Frontend Core Developer",
    organization: "(주)이포넷",
    period: "2022.10 - Present",
    description:
      "프론트엔드 아키텍처 설계와 빌드 환경 구축을 담당하고 있으며, 공통 컴포넌트와 라이브러리를 개발하고 있습니다.",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Turborepo",
      "Zustand",
      "Tanstack Query",
      "Storybook",
      "Vitest",
      "HTML/CSS",
      "MUI",
      "Git",
      "Figma",
    ],
  },
  {
    id: "2",
    type: "education",
    title: "영미어문학과",
    organization: "가천대학교",
    period: "2014.03 - 2022.02",
    description: "",
  },
];

function CareerCard({ item, isLast }: { item: CareerItem; isLast: boolean }) {
  return (
    <article
      className="group relative pb-8 pl-8"
      aria-labelledby={`career-${item.id}-title`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          data-timeline-line
          className="bg-border group-hover:bg-primary/30 duration-normal absolute top-6 bottom-0 left-[11px] w-px transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Timeline dot */}
      <div
        data-timeline-dot
        className={`duration-normal absolute top-1.5 left-0 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
          item.type === "work"
            ? "border-primary bg-primary/10 group-hover:bg-primary group-hover:border-primary"
            : "border-secondary bg-secondary/10 group-hover:bg-secondary group-hover:border-secondary"
        } `}
        aria-hidden="true"
      >
        <div
          className={`h-2 w-2 rounded-full ${item.type === "work" ? "bg-primary" : "bg-secondary"} duration-normal transition-colors group-hover:bg-white`}
        />
      </div>

      {/* Card content */}
      <Card
        variant="default"
        padding="lg"
        className="hover:border-primary/30 duration-normal transition-all hover:shadow-md"
      >
        {/* Header */}
        <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3
              id={`career-${item.id}-title`}
              className="text-foreground text-lg font-semibold"
            >
              {item.title}
            </h3>
            <p className="text-secondary text-sm">{item.organization}</p>
          </div>
          <time
            className={`rounded-sm px-3 py-1 text-xs font-medium ${
              item.type === "work"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/10 text-secondary"
            } `}
            dateTime={item.period}
          >
            {item.period}
          </time>
        </header>

        {/* Description */}
        <p className="text-secondary mb-4 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Skills */}
        {item.skills && item.skills.length > 0 && (
          <ul
            className="flex flex-wrap gap-1.5"
            role="list"
            aria-label={`${item.title}에서 사용한 기술`}
          >
            {item.skills.map((skill) => (
              <li key={skill}>
                <Tag variant="default" size="sm">
                  {skill}
                </Tag>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </article>
  );
}

export function CareerSection() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const cards = list.querySelectorAll<HTMLElement>(":scope > article");
      const dots = list.querySelectorAll<HTMLElement>("[data-timeline-dot]");
      const line = list.querySelector<HTMLElement>("[data-timeline-line]");

      // 타임라인 라인 드로우
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: list,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // 도트 + 카드 stagger
      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
          stagger: 0.25,
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        cards,
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: list,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-6">
      <SectionTitle title="Career" subtitle="저의 경력과 학력 사항입니다." />

      <div
        ref={listRef}
        className="max-w-3xl"
        role="feed"
        aria-label="경력 및 학력 타임라인"
      >
        {careerItems.map((item, index) => (
          <CareerCard
            key={item.id}
            item={item}
            isLast={index === careerItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
