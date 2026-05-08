"use client";

import {
  motion,
  type Variants,
  useMotionValue,
  useSpring,
} from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const cards = [
  {
    title: "Performance",
    desc: "Optimized rendering, fast load times, smooth UX.",
  },
  {
    title: "Scalability",
    desc: "Clean structure, reusable patterns, long-term growth.",
  },
  {
    title: "UX Thinking",
    desc: "Designing interactions, not just visuals.",
  },
  {
    title: "Architecture",
    desc: "Systems that teams can build on confidently.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 py-32 overflow-hidden"
      aria-label="About Section"
    >
      {/* 🌌 Layered Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start"
      >
        {/* LEFT */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Designing systems,
            <br />
            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              not just interfaces.
            </span>
          </h2>

          <p className="text-[var(--muted)] max-w-md text-lg leading-relaxed">
            I focus on building scalable frontend architectures that are fast,
            maintainable, and visually refined. Every detail matters — from
            performance to interaction design.
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {cards.map((card) => (
            <InteractiveCard key={card.title} card={card} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* 🔥 Interactive Card Component */
function InteractiveCard({
  card,
}: {
  card: { title: string; desc: string };
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - rect.left - rect.width / 2;
        const py = e.clientY - rect.top - rect.height / 2;

        x.set(px * 0.1);
        y.set(py * 0.1);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-md p-6 space-y-3 transition will-change-transform"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl" />

      <h3 className="relative text-white font-medium">
        {card.title}
      </h3>

      <p className="relative text-sm text-[var(--muted)] leading-relaxed">
        {card.desc}
      </p>

      {/* Animated underline */}
      <div className="relative h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}