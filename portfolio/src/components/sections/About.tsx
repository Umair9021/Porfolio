"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
      
      {/* Intro Grid (Screenshot 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-40">
        
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col h-full justify-between"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tight text-[#111] mb-12 md:mb-0">
            Hey!
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#111] leading-relaxed max-w-xs">
            I&apos;m Muhammad Umair, a builder based in Pakistan, currently working on full-stack high-performance applications.
          </p>
        </motion.div>

        {/* Center Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#ff0033] relative flex items-center justify-center shadow-[0_20px_50px_rgba(255,0,51,0.2)]"
        >
          {/* Using a red-tinted placeholder to mimic screenshot 2 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          <span className="text-white/50 font-mono z-20">Your Red Tinted Portrait Here</span>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-end h-full pt-12 md:pt-0"
        >
          <div className="space-y-6 text-[#111] text-base md:text-lg leading-relaxed">
            <p>
              I&apos;m a software engineer and creator with a strong focus on building modern, scalable, and conversion-driven web experiences.
            </p>
            <p>
              Over the years, I&apos;ve created and shipped multiple products and templates used by global customers, helping them launch faster.
            </p>
            <a href="#projects" className="inline-flex items-center gap-2 font-bold mt-4 border border-[#111] rounded-full px-4 py-2 hover:bg-[#111] hover:text-white transition-colors">
              Get Started <span className="rotate-[-45deg]">→</span>
            </a>
          </div>
        </motion.div>

      </div>

      {/* Manifesto Text (Screenshot 3) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-4xl mx-auto"
      >
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111] leading-tight">
          From idea to launch. Clean, scalable digital products built to <span className="text-[#111]/30">move fast, stay simple, and perform in real-world use, driven by clarity, structured systems, and intentional design.</span>
        </h3>
      </motion.div>

    </section>
  );
}
