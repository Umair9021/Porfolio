"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Code, ExternalLink, Terminal } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  col_span: string;
  created_at: string;
};

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching projects:", error);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
            A selection of my best technical work, ranging from low-level programming to high-fidelity UI design.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="col-span-1 md:col-span-3 text-center text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="col-span-1 md:col-span-3 text-center text-muted-foreground">No projects found. Add some from the Admin Dashboard!</div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -5 }}
                className={`glass rounded-3xl p-8 border border-white/5 hover:border-primary/50 transition-all duration-300 relative group flex flex-col ${project.col_span || 'md:col-span-1'}`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                
                <div className="relative z-10 flex-grow">
                  <Terminal className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{project.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags && project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/80 border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    {project.github && project.github.trim() !== "" && (
                      <a
                         href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-white/70 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <Code className="w-4 h-4" /> Source Code
                      </a>
                    )}
                    {project.demo && project.demo.trim() !== "" && (
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
