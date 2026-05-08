"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroMotion() {
  const { scrollY } = useScroll();

  // subtle parallax
  const y = useTransform(scrollY, [0, 500], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div style={{ y, opacity }} className="space-y-6">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-sm text-zinc-400 uppercase tracking-wider"
      >
        Frontend Developer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="text-4xl md:text-6xl font-semibold leading-tight"
      >
        Crafting{" "}
        <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          immersive
        </span>{" "}
        web experiences
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="text-zinc-400 max-w-md"
      >
        Focused on performance, scalability, and pixel-perfect design.
      </motion.p>
    </motion.div>
  );
}