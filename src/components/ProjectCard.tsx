"use client";

import Image from "next/image";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { BracketButton } from "./ui/BracketButton";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-8 md:gap-16 py-20 min-h-[60vh] transition-opacity duration-500",
      isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative aspect-video bg-neutral-900 border border-neutral-800 group overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
           {/* Placeholder for Image */}
           [ Project Image ]
        </div>
        {/* If we had an image:
        <Image 
          src={project.imageUrl || ""} 
          alt={project.title} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        */}
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center space-y-4">
        <h2 className="text-3xl font-bold uppercase tracking-wider">{project.title}</h2>
        <p className="text-neutral-400 leading-relaxed text-lg">{project.description}</p>
        <div className="pt-4">
            <BracketButton text="View Project" href={project.link} />
        </div>
      </div>
    </div>
  );
}
