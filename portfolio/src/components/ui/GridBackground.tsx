"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" 
      />
      
      {/* Tech Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%)'
        }}
      />
    </div>
  );
}
