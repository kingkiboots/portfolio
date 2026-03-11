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

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Career Section */}
      <CareerSection />
    </main>
  );
}
