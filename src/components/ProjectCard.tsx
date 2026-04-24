"use client";

import { useRef, useEffect, useState } from "react";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const isEven = index % 2 === 0;
  // Format index as "01", "02", etc.
  const displayIndex = (index + 1).toString().padStart(2, '0');

  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        root: null, // viewport
        rootMargin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of screen
        threshold: 0,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const CardContent = (
    <div 
      ref={cardRef}
      className={cn(
        "flex flex-col md:flex-row w-full items-stretch transition-opacity duration-700",
        isEven ? "md:flex-row" : "md:flex-row-reverse",
        isActive ? "opacity-100" : "opacity-60"
      )}
    >
      
      {/* IMAGE BLOCK - Forced Square & Smaller */}
      <div className={cn(
          "w-full md:w-[280px] lg:w-[320px] aspect-square relative bg-neutral-800 border overflow-hidden transition-all duration-700 flex-shrink-0",
          isActive ? "border-neutral-600" : "border-neutral-800"
      )}>
        {project.imageUrl ? (
           <img 
             src={project.imageUrl}
             alt={project.title}
             className={cn(
               "w-full h-full object-cover transition-all duration-1000 ease-in-out",
               isActive ? "grayscale-0 brightness-100 contrast-100" : "grayscale brightness-75 contrast-125"
             )}
             onError={(e) => {
               e.currentTarget.style.display = 'none';
             }}
           />
        ) : null}
        
        {/* Large Index Number Overlay */}
        <div className="absolute bottom-0 left-2 md:left-4 leading-none select-none pointer-events-none z-10">
            <span className={cn(
                "text-[6rem] md:text-[8rem] font-bold transition-colors duration-700 font-sans tracking-tighter",
                isActive ? "text-white/25" : "text-white/10"
            )}>
                {displayIndex}
            </span>
        </div>
      </div>

      {/* CONTENT BLOCK - Fills remaining width */}
      <div className={cn(
          "flex-grow transition-colors duration-700 p-8 md:p-12 flex flex-col justify-start space-y-6",
          isActive ? "bg-neutral-900/90" : "bg-neutral-900/50"
      )}>
        
        {/* Header Info */}
        <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-500">
                {project.year ? project.year : "ARCHIVE"}
            </div>
            <h2 className={cn(
                "text-2xl md:text-3xl font-bold transition-colors duration-700",
                isActive ? "text-white" : "text-neutral-200"
            )}>
                {project.title}
            </h2>
        </div>

        {/* Description */}
        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-lg">
            {project.description}
        </p>

        {/* Tech Stack */}
        <div className="pt-4 mt-auto">
            <div className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {project.tools ? project.tools.join(" // ") : ""}
            </div>
        </div>

      </div>
    </div>
  );

  if (onClick) {
      return (
          <div onClick={onClick} className="block group cursor-pointer">
              {CardContent}
          </div>
      );
  }

  return (
    <Link href={project.link} className="block group">
        {CardContent}
    </Link>
  );
}
