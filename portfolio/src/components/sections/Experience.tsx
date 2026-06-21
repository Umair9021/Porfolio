"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Team Leader",
    company: "Suenos International",
    location: "Rawalpindi, PAK",
    date: "2023 — 2024",
    description: "Led a team of marketers to design and execute high-converting campaigns, analyzing metrics to optimize ROI. Developed strong leadership and cross-functional communication.",
    initials: "SIM"
  },
  {
    title: "Full-Stack Dev",
    company: "Freelance",
    location: "Remote",
    date: "2020 — Present",
    description: "Built scalable web architectures bridging high-level frameworks with efficient database designs. Delivered multiple SaaS products for global clients.",
    initials: "FR"
  },
  {
    title: "Systems Engineer",
    company: "Open Source",
    location: "Global",
    date: "2022 — Present",
    description: "Developed low-level OS simulations like Printer Spoolers using C, focusing on IPC and Semaphores. Contributed to various open source initiatives.",
    initials: "OS"
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-32 px-4 md:px-8 bg-[#f4f4f0] w-full">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#111]">EXPERIENCE</h2>
        </motion.div>

        {/* Horizontal Scroll / Grid of Dark Cards (Screenshot 5 Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="dark-card p-8 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
            >
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-12">
                {exp.description}
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#111] font-bold shrink-0">
                  {exp.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base">{exp.title}</h4>
                  <p className="text-white/50 text-sm">{exp.company} • {exp.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
