import {
  HeroSection,
  SkillsSection,
  ProjectsSection,
  CareerSection,
  MyExpertiseSection,
} from "@/widgets/home";
import { ScrollReveal } from "@/shared/ui";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      {/* Hero / About Section */}
      <HeroSection />

      <section
        id="projects"
        className="section bg-surface-elevated/50"
        aria-labelledby="projects-heading"
      >
        <ScrollReveal>
          <MyExpertiseSection />
        </ScrollReveal>
      </section>
      {/* Projects Section */}
      <section
        id="projects"
        className="section"
        aria-labelledby="projects-heading"
      >
        <ScrollReveal>
          <ProjectsSection />
        </ScrollReveal>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="section bg-surface-elevated/50"
        aria-labelledby="skills-heading"
      >
        <ScrollReveal>
          <SkillsSection />
        </ScrollReveal>
      </section>

      {/* Career Section */}
      <section id="career" className="section" aria-labelledby="career-heading">
        <ScrollReveal>
          <CareerSection />
        </ScrollReveal>
      </section>
    </main>
  );
}
