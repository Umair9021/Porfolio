"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-8">
      {/* Background Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] md:left-[20%] w-16 h-16 opacity-80"
      >
        <svg viewBox="0 0 24 24" fill="#111" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-[10%] md:right-[20%] w-12 h-12 opacity-80"
      >
        <svg viewBox="0 0 24 24" fill="#111" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
        </svg>
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto w-full">
        
        {/* Massive Typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full"
        >
          <h1 className="text-[12vw] md:text-[140px] leading-[0.85] font-black tracking-tighter text-[#111] uppercase m-0 p-0">
            SOFTWARE
          </h1>
          <h1 className="text-[12vw] md:text-[140px] leading-[0.85] font-black tracking-tighter text-[#111] uppercase m-0 p-0">
            ENGINEER
          </h1>
        </motion.div>

        {/* Center Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-48 h-64 md:w-64 md:h-80 -mt-16 md:-mt-24 z-20 rounded-xl overflow-hidden border border-[#111]/10 shadow-2xl"
          style={{ background: "linear-gradient(to bottom, transparent, #f4f4f0 90%)" }}
        >
          {/* We use a placeholder portrait since we don't have the user's actual image. The user can swap the src later. */}
          <div className="w-full h-full bg-zinc-800 flex items-end justify-center pb-4">
            <span className="text-white/50 text-xs uppercase font-mono">Your Image Here</span>
          </div>
          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#f4f4f0] to-transparent pointer-events-none"></div>
        </motion.div>

      </div>

      {/* Bottom Corner Anchors */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <span className="text-4xl font-bold tracking-tight text-[#111]">©{new Date().getFullYear()}</span>
      </div>
      
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-3">
        <div className="text-sm font-medium tracking-tight text-[#111]">/CREATING SINCE 2020</div>
        <div className="flex flex-col gap-2">
          <a href="#projects" className="bg-[#111] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform text-center">
            View Projects
          </a>
          <a href="#contact" className="bg-[#111] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:scale-105 transition-transform text-center">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
