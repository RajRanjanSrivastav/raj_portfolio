import HeroMotion from "./HeroMotion";
import HeroScene from "./HeroScene";

/* ─── Tech marquee ────────────────────────────────────────── */
const STACK = [
  "React", "TypeScript", "Next.js", "Three.js",
  "Node.js", "Framer Motion", "Angular", "GraphQL",
  "Tailwind CSS", "PostgreSQL", "Figma", "Docker",
];

function Marquee() {
  const items = [...STACK, ...STACK]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden border-t border-white/[0.05] bg-[#050508]/70 backdrop-blur-sm py-[13px]">
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "hero-marquee 30s linear infinite", willChange: "transform" }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-5 text-[8.5px] uppercase tracking-[0.3em] text-zinc-700 font-light"
          >
            {tech}
            <span className="text-zinc-800 text-[5px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Scroll indicator ────────────────────────────────────── */
function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-2.5" aria-hidden="true">
      <div className="relative h-[48px] w-px overflow-hidden bg-white/[0.09]">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-white/50 to-transparent"
          style={{
            height: "50%",
            animation: "scroll-drop 2s ease-in-out infinite",
          }}
        />
      </div>
      <span className="text-[8.5px] uppercase tracking-[0.35em] text-zinc-700 font-light">
        Scroll
      </span>
    </div>
  );
}

/* ─── Hero section ────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <>
      <style>{`
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-drop {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(220%); opacity: 0; }
        }
      `}</style>

      <section
        aria-label="Hero"
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#050508]"
      >
        {/* ── Three.js scene fills the background ── */}
        <HeroScene />

        {/* ── Noise / grain overlay ── */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-[0.02]"
        >
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        {/* ── Hero content — left-aligned ── */}
        {/*
          max-w-[560px] caps the text column so the 3D scene
          remains dramatically visible on the right side.
        */}
        <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 lg:px-20">
          <div className="w-full max-w-7xl mx-auto pt-8 pb-14">
            <div className="max-w-[560px] lg:max-w-[620px]">
              <HeroMotion />
            </div>
          </div>
        </div>

        {/* ── Bottom strip: page index + scroll cue + year ── */}
        <div className="relative z-10 flex items-end justify-between px-8 md:px-14 lg:px-20 pb-7">
          {/* Index */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-white/15" />
            <span className="text-[8.5px] uppercase tracking-[0.35em] text-zinc-700 font-light">
              01
            </span>
          </div>

          <ScrollCue />

          {/* Year */}
          <span className="text-[8.5px] uppercase tracking-[0.3em] text-zinc-800 font-light">
            2025
          </span>
        </div>

        {/* ── Scrolling tech stack marquee ── */}
        <div className="relative z-10">
          <Marquee />
        </div>
      </section>
    </>
  );
}