import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/types";
import { BracketButton } from "@/components/ui/BracketButton";

// Placeholder Data
const projects: Project[] = [
  {
    id: "1",
    title: "SleePurr",
    description: "An innovative sleep tracking application designed for feline companions. Tracks REM cycles and purr frequency to analyze cat health.",
    link: "#",
  },
  {
    id: "2",
    title: "Neon Horizon",
    description: "A procedural city generator using Three.js. Infinite cyberpunk landscapes created in real-time within the browser.",
    link: "#",
  },
  {
    id: "3",
    title: "Echo Chamber",
    description: "Audio visualization tool that reacts to microphone input. Built with Web Audio API and Canvas.",
    link: "#",
  },
];

export default function BuildPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
             <BracketButton text="Back" href="/" />
        </div>

      <header className="mb-24">
        <h1 className="text-xl md:text-2xl font-light text-neutral-500 uppercase tracking-widest">
          Build Log / Projects
        </h1>
      </header>

      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
