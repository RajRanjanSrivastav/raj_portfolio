"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { Fraunces, Space_Mono } from "next/font/google";

/* ─── Fonts ───────────────────────────────────────────────── */
// Fraunces: optical-size variable serif with personality.
// Has a "wonky" axis that gives display text real character at large sizes.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Space Mono: precise, technical — a sharp contrast to the editorial serif.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ─── Magnetic CTA ────────────────────────────────────────── */
function MagneticCTA({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 420, damping: 24 });
  const sy = useSpring(my, { stiffness: 420, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (primary) {
    return (
      <motion.a
        ref={ref}
        href={href}
        style={{ x: sx, y: sy }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="
          group relative inline-flex items-center gap-2.5
          px-8 py-[14px] rounded-full
          bg-white text-black overflow-hidden
          transition-shadow duration-300
          hover:shadow-[0_0_40px_rgba(255,255,255,0.14)]
        "
      >
        {/* Shimmer sweep */}
        <span className="
          absolute inset-0
          -translate-x-full skew-x-12
          bg-linear-to-r from-transparent via-black/[0.07] to-transparent
          group-hover:translate-x-full
          transition-transform duration-700 ease-in-out
        " />
        <span
          className={`
            ${spaceMono.className}
            relative text-[10.5px] tracking-[0.2em] uppercase
          `}
        >
          {label}
        </span>
        <svg
          className="relative w-3 h-3 group-hover:translate-x-0.75 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="
        inline-flex items-center gap-2.5
        px-8 py-[14px] rounded-full
        border border-white/[0.1]
        bg-white/[0.03] backdrop-blur-xl
        text-white/60
        hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white/85
        transition-all duration-300
      "
    >
      <span
        className={`
          ${spaceMono.className}
          text-[10.5px] tracking-[0.2em] uppercase
        `}
      >
        {label}
      </span>
    </motion.a>
  );
}

/* ─── Headline config ─────────────────────────────────────── */
// Dramatic weight contrast across three lines — the typographic hierarchy
// is the design. Heavy → italic bold → ultralight.
const LINES = [
  {
    text: "Crafting",
    cls: "text-[58px] md:text-[78px] lg:text-[95px] font-[300] tracking-[-0.015em] text-white/50",
    italic: false,
  },
  {
    text: "immersive",
    cls: "text-[65px] md:text-[88px] lg:text-[108px] font-[700] tracking-[-0.025em]",
    italic: true, // gradient applied below
  },
  {
    text: "experiences.",
    cls: "text-[42px] md:text-[58px] lg:text-[70px] font-[200] tracking-[-0.01em] text-white/65",
    italic: false,
  },
];

const STATS = [
  { value: "4+",  label: "Years" },
  { value: "30+", label: "Projects" },
  { value: "12+", label: "Clients" },
];

/* ─── Main component ──────────────────────────────────────── */
export default function HeroMotion() {
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 250], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={`${fraunces.variable} ${spaceMono.variable} space-y-6`}
    >

      {/* ── Availability badge ── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="
          inline-flex items-center gap-2.5
          rounded-full border border-white/[0.08]
          bg-white/[0.03] backdrop-blur-xl
          px-4 py-[8px]
        "
      >
        <span className="relative flex h-[7px] w-[7px]">
          <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative flex h-[7px] w-[7px] rounded-full bg-emerald-500" />
        </span>
        <span
          className={`
            ${spaceMono.className}
            text-[9px] uppercase tracking-[0.25em] text-zinc-400
          `}
        >
          Available for work
        </span>
      </motion.div>

      {/* ── Editorial headline with line-clip reveal ── */}
      {/*
        Each line sits inside overflow-hidden so the text slides up
        from below the clip edge — a classic editorial reveal.
        The three weights (300 / 700 / 200) create visual rhythm
        without needing colour variation.
      */}
      <h1 className="leading-[0.93]">
        {LINES.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              initial={{ y: "108%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: 0.1 + i * 0.13,
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`
                block
                font-[family-name:var(--font-display)]
                ${line.cls}
                ${line.italic ? "italic" : ""}
                ${
                  line.italic
                    ? "bg-gradient-to-r from-white via-white/90 to-zinc-500 bg-clip-text text-transparent"
                    : ""
                }
              `}
            >
              {line.text}
            </motion.span>
          </div>
        ))}
      </h1>

      {/* ── Discipline / role tag ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.58, duration: 0.8 }}
        className={`${spaceMono.className} text-[9px] tracking-[0.32em] uppercase text-zinc-600`}
      >
        Frontend Engineer · UI / UX · Performance
      </motion.p>

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        className="text-zinc-500 text-[15px] font-light leading-[1.82] max-w-[340px]"
      >
        Building scalable systems with pixel-perfect craft —
        where engineering precision meets design intent.
      </motion.p>

      {/* ── CTAs ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.84, duration: 0.6 }}
        className="flex items-center gap-3 flex-wrap pt-1"
      >
        <MagneticCTA href="#projects" label="View Work" primary />
        <MagneticCTA href="#contact"  label="Let's talk →" />
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.02, duration: 0.8 }}
        className="flex items-center pt-2"
      >
        {STATS.map(({ value, label }, i) => (
          <div
            key={i}
            className={`
              flex flex-col gap-[5px] pr-6
              ${i !== 0 ? "pl-6 border-l border-white/[0.07]" : ""}
            `}
          >
            <span
              className="
                font-[family-name:var(--font-display)]
                text-[28px] font-[600] leading-none
                text-white/75 tracking-[-0.02em]
              "
            >
              {value}
            </span>
            <span
              className={`${spaceMono.className} text-[8px] uppercase tracking-[0.28em] text-zinc-700`}
            >
              {label}
            </span>
          </div>
        ))}

        {/* Location note */}
        <div className="pl-7 ml-1 border-l border-white/[0.07]">
          <p
            className={`
              ${spaceMono.className}
              text-[8px] uppercase tracking-[0.2em]
              text-zinc-700 leading-[2]
            `}
          >
            India<br />Remote ok
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}