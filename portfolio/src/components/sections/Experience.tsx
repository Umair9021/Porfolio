"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Team Leader (Facebook Marketing)",
    company: "Suenos International Marketing Company",
    location: "Rawalpindi, PAK",
    date: "02-06-2023 - 31-03-2024",
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
    <section id="experience" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey blending leadership, marketing, and technical engineering.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">
                      {exp.date}
                    </span>
                  </div>
                  <CardDescription className="text-base font-medium text-foreground">
                    {exp.company} • {exp.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 mb-6 text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
