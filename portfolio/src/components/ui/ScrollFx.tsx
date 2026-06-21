"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import Lenis from "lenis";

/* ===== Lenis smooth scroll ===== */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}

/* ===== Vertical spine connecting every scene ===== */
export function ScrollSpine({ count = 4 }: { count?: number }) {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-px pointer-events-none z-40 mix-blend-screen hidden sm:block">
      <div className="absolute inset-0 bg-primary/20" />
      <motion.div style={{ scaleY: fill }} className="absolute inset-0 bg-primary origin-top glow-border" />
      <div className="absolute inset-0 flex flex-col justify-between py-[10vh]">
        {Array.from({ length: count }).map((_, i) => {
          const stop = i / (count - 1);
          const startOffset = Math.max(0, stop - 0.05);
          const lit = useTransform(scrollYProgress, [startOffset, stop], [0.2, 1]);
          return (
            <motion.div
              key={i}
              style={{ opacity: lit }}
              className="-translate-x-[4px] w-[9px] h-[9px] rounded-full border border-primary bg-background shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            />
          );
        })}
      </div>
    </div>
  );
}

/* ===== Right-side scene navigator ===== */
const SCENES = ["HERO", "EXPERIENCE", "PROJECTS", "CONTACT"];

export function SceneNav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Determine active section based on scroll progress
    let activeIdx = 0;
    if (v < 0.25) activeIdx = 0;
    else if (v >= 0.25 && v < 0.6) activeIdx = 1;
    else if (v >= 0.6 && v < 0.9) activeIdx = 2;
    else activeIdx = 3;
    setActive(activeIdx);
  });

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 mix-blend-screen">
      {SCENES.map((scene, i) => (
        <div key={scene} className="flex items-center justify-end gap-4">
          <span 
            className={`text-xs tracking-[0.2em] font-medium transition-all duration-300 ${
              active === i ? "text-primary opacity-100" : "text-white/40 opacity-0 translate-x-4"
            }`}
          >
            {scene}
          </span>
          <div 
            className={`w-1 transition-all duration-300 rounded-full ${
              active === i ? "h-8 bg-primary glow-border" : "h-2 bg-white/20"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
