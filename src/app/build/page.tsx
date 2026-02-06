"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { BracketButton } from "@/components/ui/BracketButton";
import { ProjectGallery } from "@/components/ProjectGallery";
import { projects } from "@/data/projects";
import { Project } from "@/types";

export default function BuildPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-black text-neutral-400 selection:bg-white selection:text-black font-light pb-20">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-widest text-neutral-300 uppercase">
            Projects
          </h1>
        </div>
        <div className="w-16" /> 
      </header>

      <main className="pt-64 md:pt-80 px-8 md:px-24 lg:px-48 xl:px-64 max-w-[1800px] mx-auto">
        
        {/* Page Subtitle */}
        <div className="flex flex-col items-center justify-center pb-48 mb-16 px-4">
            <p className="text-sm md:text-base text-neutral-500 font-light tracking-[0.15em] uppercase text-center max-w-8xl leading-relaxed whitespace-pre-line">
              Digital Experiments & Interactive Realities.{"\n"}{"\n"}
              A collection of works bridging the gap between functional code and sensory experience, or just for fun.
            </p>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-32 mb-40">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={
                project.gallery && project.gallery.length > 0 
                  ? () => setSelectedProject(project) 
                  : undefined
              }
            />
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-left">
           <p className="text-xs text-neutral-600 font-mono">
             // Keep pushing commits. More logic in progress.
           </p>
        </div>

      </main>

      <ProjectGallery 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
