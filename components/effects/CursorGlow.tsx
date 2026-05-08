"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(e) =>
        setPosition({ x: e.clientX, y: e.clientY })
      }
      className="fixed inset-0 pointer-events-none z-50"
    >
      <motion.div
        animate={{
          x: position.x - 150,
          y: position.y - 150,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-3xl"
      />
    </motion.div>
  );
}