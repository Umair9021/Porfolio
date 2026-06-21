"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, Terminal } from "lucide-react";

const projects = [
  {
    title: "OS Printer Spooler",
    description: "A low-level operating system simulation of a printer spooler built entirely in C. Features concurrent process management, semaphore-based synchronization, and a custom storytelling animation that visually explains the IPC mechanisms.",
    tags: ["C", "Operating Systems", "IPC", "Semaphores", "Concurrency"],
    github: "https://github.com/Umair9021/Printer-Spooler",
    demo: null,
    icon: <Terminal className="w-8 h-8 text-primary mb-4" />,
    colSpan: "md:col-span-2",
  },
  {
    title: "BookBuddy",
    description: "A full-stack Book Recommendation Application. Features a highly interactive frontend with a robust backend architecture for storing and analyzing user reading preferences.",
    tags: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    github: "https://github.com/Umair9021/Bookbuddy",
    demo: null,
    icon: <Code className="w-8 h-8 text-purple-400 mb-4" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "UniPool",
    description: "A University Carpooling Application designed to reduce campus traffic and carbon footprint. Includes real-time ride matching and user verification.",
    tags: ["React Native", "Firebase", "Google Maps API"],
    github: null,
    demo: null,
    icon: <Code className="w-8 h-8 text-blue-400 mb-4" />,
    colSpan: "md:col-span-1",
  },
  {
    title: "BidForge",
    description: "An advanced bidding application platform designed completely in Figma. Features a highly complex, modern UI/UX prioritizing user trust, real-time auction feedback, and secure transaction flows.",
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
    github: null,
    demo: "https://bidforge-ochre.vercel.app/",
    icon: <Code className="w-8 h-8 text-pink-400 mb-4" />,
    colSpan: "md:col-span-2",
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-4 md:px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Featured Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full glow-border mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of my best technical work, ranging from low-level C programming to high-fidelity UI design.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 relative group flex flex-col ${project.colSpan}`}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <div className="relative z-10 flex-grow">
                {project.icon}
                <h3 className="text-2xl font-bold mb-3 tracking-tight">{project.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/80 border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-white/70 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Code className="w-4 h-4" /> Source Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-white/70 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
