"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Project } from "@/types";

interface BuildClientProps {
  projects: Project[];
}

export function BuildClient({ projects }: BuildClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
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
             {"//"} Keep pushing commits. More logic in progress.
           </p>
        </div>

      </main>

      <ProjectGallery 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
