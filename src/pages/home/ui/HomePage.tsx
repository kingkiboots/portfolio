"use client";

import React from "react";
import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  CareerSection,
} from "@/widgets/home";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero / About Section */}
      <HeroSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Career Section */}
      <CareerSection />
    </main>
  );
}
