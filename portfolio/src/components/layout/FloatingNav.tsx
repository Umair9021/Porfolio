"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="relative">
        <motion.div 
          className="bg-[#111] text-white rounded-full flex items-center justify-between px-6 py-3 shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ width: "240px" }}
        >
          <span className="font-bold tracking-tight text-lg">Majd</span>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200 transition-colors"
          >
            {isOpen ? <X className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
          </button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 10, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-[#111] rounded-3xl p-3 shadow-2xl flex flex-col gap-2 mt-2"
            >
              {[
                { name: "About Me", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Projects", href: "#projects" },
                { name: "Contact", href: "#contact" }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-black px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
