"use client";

import React, { memo } from "react";
import { SectionTitle, Card, Tag } from "@/shared/ui";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Styling",
    skills: ["Tailwind CSS", "Styled Components", "SCSS", "CSS Modules"],
  },
  {
    title: "State Management",
    skills: ["Redux", "Zustand", "React Query", "Context API"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Figma", "Vercel", "REST API", "Agile/Scrum"],
  },
];

const SkillCard = memo<{ category: SkillCategory }>(({ category }) => (
  <Card variant="elevated" padding="lg" className="h-full hover:shadow-xl">
    <h3 className="text-foreground mb-4 text-lg font-semibold">
      {category.title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {category.skills.map((skill) => (
        <Tag key={skill} variant="default" size="md">
          {skill}
        </Tag>
      ))}
    </div>
  </Card>
));

SkillCard.displayName = "SkillCard";

export const SkillsSection = memo(() => {
  return (
    <section id="skills" className="section bg-surface-elevated/50">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Skills"
          subtitle="주로 사용하는 기술 스택입니다. 새로운 기술을 배우는 것을 즐깁니다."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>

        {/* Additional info with liquid glass effect */}
        <div className="mt-12">
          <div className="liquid-glass rounded-lg p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-md">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                <h4 className="text-foreground mb-1 text-base font-semibold">
                  계속 성장하고 있습니다
                </h4>
                <p className="text-secondary text-sm leading-relaxed">
                  현재 Next.js App Router, 서버 컴포넌트, 그리고 웹 성능
                  최적화에 대해 깊이 공부하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

