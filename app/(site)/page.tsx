import AboutSection from "./sections/about/AboutSection";
import ContactSection from "./sections/contact/ContactSection";
import HeroSection from "./sections/hero/HeroSection";
import ProjectsSection from "./sections/projects/ProjectsSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
