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
    <div className="relative pl-8 pb-8 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border group-hover:bg-primary/30 transition-colors duration-normal" />
      )}

      {/* Timeline dot */}
      <div
        className={`
        absolute left-0 top-1.5
        w-6 h-6
        rounded-full
        border-2
        flex items-center justify-center
        transition-all duration-normal
        ${
          item.type === "work"
            ? "border-primary bg-primary/10 group-hover:bg-primary group-hover:border-primary"
            : "border-secondary bg-secondary/10 group-hover:bg-secondary group-hover:border-secondary"
        }
      `}
      >
        <div
          className={`
          w-2 h-2 rounded-full
          ${item.type === "work" ? "bg-primary" : "bg-secondary"}
          group-hover:bg-white
          transition-colors duration-normal
        `}
        />
      </div>

      {/* Card content */}
      <Card
        variant="default"
        padding="lg"
        className="hover:shadow-md hover:border-primary/30 transition-all duration-normal"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="text-sm text-secondary">{item.organization}</p>
          </div>
          <span
            className={`
            px-3 py-1
            text-xs font-medium
            rounded-sm
            ${
              item.type === "work"
                ? "bg-primary/10 text-primary"
                : "bg-secondary/10 text-secondary"
            }
          `}
          >
            {item.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Skills */}
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <Tag key={skill} variant="default" size="sm">
                {skill}
              </Tag>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
);

CareerCard.displayName = "CareerCard";

export const CareerSection = memo(() => {
  return (
    <section id="career" className="section bg-surface-elevated/50">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Career"
          subtitle="저의 경력과 학력 사항입니다."
        />

        <div className="max-w-3xl">
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

