"use client";

import { motion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  tech: string[];
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-md p-6 space-y-4 cursor-pointer"
    >
      {/* Title */}
      <h3 className="text-xl font-semibold group-hover:text-white transition">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--muted)] leading-relaxed">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 pt-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover line effect */}
      <div className="h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}