import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "AI Job Matcher",
    description:
      "A smart job matching platform that filters and ranks jobs based on user profile using AI-driven scoring.",
    tech: ["Next.js", "TypeScript", "Node.js"],
  },
  {
    title: "Leave Management System",
    description:
      "Enterprise-grade leave system with real-time validation, approval workflow, and analytics dashboard.",
    tech: ["Angular", "RxJS", "Material UI"],
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 md:px-12 py-24"
      aria-label="Projects Section"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Selected Work
          </h2>
          <p className="text-[var(--muted)] max-w-xl">
            A collection of projects focused on performance, scalability, and
            real-world problem solving.
          </p>
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}