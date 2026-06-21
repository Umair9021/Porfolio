"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink, Box } from "lucide-react";
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
    <section id="projects" className="py-32 px-4 md:px-8 bg-[#111] w-full text-white">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">PROJECTS</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium">
            Hover over the cards to reveal project details.
          </p>
        </motion.div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-1 md:col-span-3 text-center text-white/50">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="col-span-1 md:col-span-3 text-center text-white/50">No projects found.</div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="flip-card-container h-[400px] w-full cursor-pointer"
              >
                <div className="flip-card-inner">
                  
                  {/* FRONT OF CARD */}
                  <div className="flip-card-front bg-[#1a1a1a] rounded-3xl p-8 flex flex-col items-center justify-center border border-white/10 shadow-2xl relative overflow-hidden group">
                    <Box className="w-16 h-16 text-white/20 mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-3xl font-bold tracking-tight text-center">{project.title}</h3>
                    <div className="absolute bottom-6 text-white/30 text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                      Hover to flip <span className="text-lg">↻</span>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div className="flip-card-back bg-white text-[#111] rounded-3xl p-8 flex flex-col border border-[#111]/10 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{project.title}</h3>
                    <p className="text-[#111]/70 font-medium leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags && project.tags.map((tag, i) => (
                        <span key={i} className="bg-[#f4f4f0] text-[#111] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.github && project.github.trim() !== "" && (
                        <a
                           href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-[#111] text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
                        >
                          <Code className="w-4 h-4" /> Code
                        </a>
                      )}
                      {project.demo && project.demo.trim() !== "" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 border-2 border-[#111] text-[#111] py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#f4f4f0] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      )}
                    </div>
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
