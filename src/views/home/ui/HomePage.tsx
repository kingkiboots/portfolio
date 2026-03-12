import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  CareerSection,
} from "@/widgets/home";
import { ScrollReveal } from "@/shared/ui";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      {/* Hero / About Section */}
      <HeroSection />

      {/* Projects Section */}
      <section
        id="projects"
        className="section bg-surface-elevated/50"
        aria-labelledby="projects-heading"
      >
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>
      </section>

      {/* Career Section */}
      <section
        id="career"
        className="section bg-surface-elevated/50"
        aria-labelledby="career-heading"
      >
        <ScrollReveal>
          <CareerSection />
        </ScrollReveal>
      </section>
    </main>
  );
}
