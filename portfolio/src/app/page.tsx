import { FloatingNav } from "@/components/layout/FloatingNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-background text-foreground overflow-hidden">
      <FloatingNav />

      {/* Sections */}
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t border-[#111]/10 bg-background text-center text-sm text-[#111]/50 font-medium">
        <p>© {new Date().getFullYear()} Muhammad Umair. All rights reserved.</p>
      </footer>
    </main>
  );
}
