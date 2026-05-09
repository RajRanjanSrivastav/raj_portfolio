export default function GlobalBackground() {
  return (
    <>
      {/* ── Keyframes (injected once, server-safe) ── */}
      <style>{`
        /* Orb A: drifts top-left → bottom-right */
        @keyframes orb-a {
          0%   { transform: translate(0px, 0px)   scale(1);    opacity: 1; }
          33%  { transform: translate(60px, 80px)  scale(1.08); opacity: 0.85; }
          66%  { transform: translate(-40px, 120px) scale(0.95); opacity: 0.9; }
          100% { transform: translate(0px, 0px)   scale(1);    opacity: 1; }
        }

        /* Orb B: drifts opposite direction */
        @keyframes orb-b {
          0%   { transform: translate(0px, 0px)    scale(1); }
          40%  { transform: translate(-70px, -50px) scale(1.1); }
          70%  { transform: translate(40px, -90px)  scale(0.92); }
          100% { transform: translate(0px, 0px)    scale(1); }
        }

        /* Orb C: small, fast, accent pulse */
        @keyframes orb-c {
          0%   { transform: translate(0px, 0px)   scale(1);    opacity: 0.6; }
          50%  { transform: translate(30px, -60px) scale(1.15); opacity: 0.4; }
          100% { transform: translate(0px, 0px)   scale(1);    opacity: 0.6; }
        }

        .bg-orb-a { animation: orb-a 28s ease-in-out infinite; }
        .bg-orb-b { animation: orb-b 34s ease-in-out infinite; }
        .bg-orb-c { animation: orb-c 18s ease-in-out infinite; }
      `}</style>

      {/*
        fixed + -z-10 → sits permanently behind every section.
        overflow-hidden prevents any orb bleed outside viewport.
      */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 overflow-hidden bg-[#050508]"
      >
        {/* ── Orb A: primary blue — upper-left quadrant ── */}
        <div className="bg-orb-a absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] max-w-225 max-h-225 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14)_0%,rgba(37,99,235,0.05)_45%,transparent_70%)] blur-[2px]" />

        {/* ── Orb B: deep blue — lower-right quadrant ── */}
        <div className="bg-orb-b absolute bottom-[-25%] right-[-10%] w-[65vw] h-[65vw] max-w-205 max-h-205 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.12)_0%,rgba(29,78,216,0.04)_45%,transparent_70%)] blur-[2px]" />

        {/* ── Orb C: accent — center-right, keeps midpage alive ── */}
        <div className="bg-orb-c absolute top-[40%] right-[15%] w-[35vw] h-[35vw] max-w-115 max-h-115 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_65%)]" />

        {/* ── Hard vignette — corners stay near-black ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(5,5,8,0.7)_100%)]" />

        {/* ── Subtle dot-grid ── */}
        {/*
          Two overlapping grids (vertical + horizontal lines) at very low opacity.
          Size 110px matches the hero grid so the hero section feels continuous.
        */}
        <div
          className="absolute inset-0 opacity-[0.026]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "110px 110px",
          }}
        />

        {/* ── Noise / film-grain (SVG turbulence) ── */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.022]">
          <filter id="bg-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#bg-grain)" />
        </svg>

        {/* ── Bottom fade — last section never hits raw black ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-linear-to-t from-[#050508] to-transparent" />
      </div>
    </>
  );
}
