"use client";

import React, { memo } from "react";
import { SectionTitle, Card, Tag } from "@/shared/ui";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Typescript", "Javascript", "Java"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "MUI", "HTML/CSS"],
  },
  {
    title: "State Management",
    skills: ["Zustand", "Tanstack Query", "Recoil", "Context API"],
  },
  {
    title: "Build & CI/CD",
    skills: [
      "Vite",
      "Turborepo",
      "Webpack",
      "Docker",
      "Gitlab CI/CD",
      "Github Actions",
    ],
  },
  {
    title: "Testing & Analysis",
    skills: [
      "Storybook",
      "Playwright",
      "Vitest",
      "Puppeteer",
      "Google Analytics",
    ],
  },
  {
    title: "Cooperation & Base",
    skills: [
      "Spring Boot",
      "JPA",
      "MyBatis",
      "JDBC",
      "OracleSQL",
      "PostgreSQL",
    ],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Figma"],
  },
];

const SkillCard = memo<{ category: SkillCategory }>(({ category }) => (
  <Card
    variant="elevated"
    padding="lg"
    className="h-full hover:shadow-xl"
    role="article"
    aria-labelledby={`skill-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
  >
    <h3
      id={`skill-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="text-foreground mb-4 text-lg font-semibold"
    >
      {category.title}
    </h3>
    <ul
      className="flex flex-wrap gap-2"
      role="list"
      aria-label={`${category.title} 기술 목록`}
    >
      {category.skills.map((skill) => (
        <li key={skill}>
          <Tag variant="default" size="md">
            {skill}
          </Tag>
        </li>
      ))}
    </ul>
  </Card>
));

SkillCard.displayName = "SkillCard";

export const SkillsSection = memo(() => {
  return (
    <section
      id="skills"
      className="section bg-surface-elevated/50"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Skills"
          subtitle="주로 사용하는 기술 스택입니다. 새로운 기술을 배우는 것을 즐깁니다."
        />

        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          role="region"
          aria-label="기술 카테고리 목록"
        >
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>

        {/* Additional info with liquid glass effect */}
        <aside className="mt-12" aria-labelledby="learning-heading">
          <div className="liquid-glass rounded-lg p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="shrink-0" aria-hidden="true">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-md">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h4
                  id="learning-heading"
                  className="text-foreground mb-1 text-base font-semibold"
                >
                  계속 성장하고 있습니다
                </h4>
                <p className="text-secondary text-sm leading-relaxed">
                  현재 Next.js App Router, 서버 컴포넌트, 그리고 모노레포와
                  테스팅에 대해 깊이 공부하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";
