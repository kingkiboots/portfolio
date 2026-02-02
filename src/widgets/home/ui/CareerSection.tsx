"use client";

import React, { memo } from "react";
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
    title: "Frontend Developer",
    organization: "회사명",
    period: "2024.01 - Present",
    description:
      "웹 프론트엔드 개발을 담당하고 있습니다. React와 TypeScript를 사용하여 사용자 친화적인 인터페이스를 구현합니다.",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "2",
    type: "work",
    title: "Web Developer Intern",
    organization: "회사명",
    period: "2023.06 - 2023.12",
    description:
      "웹 개발 인턴으로 근무하며 실무 경험을 쌓았습니다. 기존 레거시 코드 리팩토링 및 새로운 기능 개발에 참여했습니다.",
    skills: ["JavaScript", "Vue.js", "Git"],
  },
  {
    id: "3",
    type: "education",
    title: "컴퓨터공학과",
    organization: "대학교",
    period: "2019.03 - 2024.02",
    description:
      "컴퓨터공학을 전공하며 프로그래밍 기초와 소프트웨어 개발 방법론을 학습했습니다.",
  },
];

const CareerCard = memo<{ item: CareerItem; isLast: boolean }>(
  ({ item, isLast }) => (
    <article
      className="group relative pb-8 pl-8"
      aria-labelledby={`career-${item.id}-title`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          className="bg-border group-hover:bg-primary/30 duration-normal absolute top-6 bottom-0 left-[11px] w-px transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Timeline dot */}
      <div
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
  )
);

CareerCard.displayName = "CareerCard";

export const CareerSection = memo(() => {
  return (
    <section
      id="career"
      className="section bg-surface-elevated/50"
      aria-labelledby="career-heading"
    >
      <div className="container mx-auto px-6">
        <SectionTitle title="Career" subtitle="저의 경력과 학력 사항입니다." />

        <div
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
    </section>
  );
});

CareerSection.displayName = "CareerSection";


