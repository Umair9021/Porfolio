"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "OS Spooler Simulation",
    description: "Engineered a full-stack Operating Systems simulation to demonstrate IPC, Multithreading, and CPU Scheduling. Built a native C backend simulating an OS kernel with Banker's Algorithm, connected to a real-time React dashboard via Python WebSockets.",
    tech: ["C", "Python", "WebSockets", "React", "Vite", "Tailwind CSS"],
    github: "https://github.com/Umair9021/Printer-Spooler",
    demo: "https://printer-spooler.vercel.app"
  },
  {
    title: "BookBuddy",
    description: "Developed a full-stack MERN marketplace enabling students to buy, sell, and exchange used textbooks on campus. Features dynamic search filters by academic year and secure user profiles with media uploads.",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Umair9021/bookbuddy",
    demo: "https://bookbuddy-ten.vercel.app/"
  },
  {
    title: "UniPool (UniRide)",
    description: "Built a university-exclusive carpooling application focused on secure campus commuting. Integrated Clerk for robust domain-restricted authentication and Leaflet + OpenRouteService API for real-time interactive mapping.",
    tech: ["Next.js", "Clerk Auth", "MongoDB", "Leaflet", "OpenRouteService"],
    github: "https://github.com/Umair9021/unipool",
    demo: "https://uni-ride-ten.vercel.app/"
  },
  {
    title: "BidForge",
    description: "Developed a high-fidelity frontend prototype for a Bid Response Engine based on complex Figma designs. Focused on creating an intuitive, responsive, and pixel-perfect UI tailored for bidding workflows.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/Umair9021/bidforge",
    demo: "https://bidforge-6s084z3dl-muhammad-umairs-projects-5b072f1f.vercel.app/"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my best work across full-stack web development and systems engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-6 line-clamp-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4 pt-6 border-t bg-muted/20">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Code className="w-4 h-4" /> Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
