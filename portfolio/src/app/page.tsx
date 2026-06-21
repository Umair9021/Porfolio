import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { GridBackground } from "@/components/ui/GridBackground";
import { ScrollSpine, SceneNav } from "@/components/ui/ScrollFx";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-background text-foreground">
      <GridBackground />
      <ScrollSpine count={4} />
      <SceneNav />
      {/* Navigation (Simple sticky header) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">Umair<span className="text-primary">.dev</span></span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <Experience />
      <Projects />
      <Contact />

      {/* Footer */}
      <footer className="py-8 border-t bg-background text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Muhammad Umair. All rights reserved.</p>
      </footer>
    </main>
  );
}
