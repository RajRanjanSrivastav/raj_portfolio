"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,            // smoothness
      smoothWheel: true,        // mouse wheel
      wheelMultiplier: 1,       // control speed
      touchMultiplier: 1.5,     // touch feel
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId); // ✅ prevent memory leak
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}