"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Team Leader (Facebook Marketing)",
    company: "Suenos International Marketing Company",
    location: "Rawalpindi, PAK",
    date: "02-06-2023 — 31-03-2024",
    description: [
      "Led a team of marketers to design and execute high-converting Facebook marketing campaigns, analyzing metrics to optimize ROI.",
      "Developed strong leadership, cross-functional communication, and project management skills while mentoring team members to meet key performance indicators.",
      "Utilized data-driven decision-making to identify target demographics and streamline promotional strategies."
    ],
    skills: ["Leadership", "Project Management", "Digital Marketing", "Data Analysis"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-32 relative">
      <div className="container px-4 md:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Experience</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full glow-border mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A history of bridging technical systems with strategic leadership.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-[50%] top-0 bottom-0 w-px bg-white/10 hidden sm:block"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              className={`relative flex flex-col sm:flex-row items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""} mb-16`}
            >
              {/* Timeline Dot */}
              <div className="hidden sm:flex absolute left-[50%] w-10 h-10 -ml-5 bg-background border-4 border-primary rounded-full items-center justify-center z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>

              {/* Content Card */}
              <div className="w-full sm:w-[calc(50%-40px)] glass p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 relative group">
                {/* Subtle internal glow on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 tracking-wider uppercase">
                  {exp.date}
                </span>
                <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                <p className="text-primary font-medium mb-6">{exp.company} <span className="text-muted-foreground font-normal ml-2">({exp.location})</span></p>
                
                <ul className="space-y-3 mb-8 text-muted-foreground/90 font-light">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-primary mt-1 text-lg leading-none">▹</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-white/5 border-white/10 text-foreground py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
