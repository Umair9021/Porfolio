"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Glassmorphic Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="glass px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">Available for new opportunities</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 max-w-5xl leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          Building scalable <br className="hidden sm:inline" />
          <span className="text-gradient">digital architectures.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          Hi, I&apos;m Muhammad Umair. A Full-Stack Engineer bridging the gap between high-level web frameworks and low-level systems programming.
        </motion.p>

        {/* Premium Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
        >
          <a href="#projects" className="glow-border relative group">
            <div className="relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg flex items-center gap-2 transition-all group-hover:bg-primary/90">
              View My Work <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
          <a href="#contact" className="glass px-8 py-4 text-foreground font-semibold rounded-lg flex items-center gap-2 transition-all hover:bg-white/5 border border-white/10 hover:border-primary/50">
            <Code2 className="w-5 h-5" /> Contact Me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
