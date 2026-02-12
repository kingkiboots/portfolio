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
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
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
