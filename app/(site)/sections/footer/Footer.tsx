"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourhandle",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--border)]">
      
      {/* 🌌 Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center md:text-left"
        >
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Raj Srivastav
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">
            Built with Next.js, TypeScript & Tailwind
          </p>
        </motion.div>

        {/* CENTER (Back to top) */}
        <motion.button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-white/80 hover:text-white transition"
        >
          Back to top ↑
        </motion.button>

        {/* RIGHT (Socials) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex gap-6"
        >
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              className="text-sm text-[var(--muted)] hover:text-white transition relative group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}