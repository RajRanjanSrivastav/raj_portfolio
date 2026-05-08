import HeroMotion from "./HeroMotion";

export default function HeroSection() {
  return (
    <section
      aria-label="Hero Section"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* 🌌 Ambient Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* 📦 Content Container */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* 🧠 LEFT: Text + Motion */}
        <div className="space-y-6">
          <HeroMotion />

          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            I build high-performance, scalable, and visually refined web
            experiences using modern frontend architecture.
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:scale-105 transition-transform"
            >
              View Work
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-xl border border-white/10 backdrop-blur-md text-white hover:bg-white/5 transition"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* 💻 RIGHT: Glass Card (visual balance) */}
        <div className="relative">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl">
            <div className="text-sm text-zinc-400 mb-4">
              Currently Building
            </div>

            <div className="space-y-3">
              <div className="h-3 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
              <div className="h-3 bg-white/10 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* 🧭 Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll" />
        </div>
        <span className="text-xs text-zinc-500">Scroll</span>
      </div>
    </section>
  );
}