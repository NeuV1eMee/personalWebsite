"use client";

import { useEffect, useState } from "react";
import { BracketButton } from "./ui/BracketButton";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectGallery({ project, isOpen, onClose }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opening
  useEffect(() => {
    if (isOpen && project?.gallery) {
      // Find index of sp3.PNG to set as default, fallback to 0
      const defaultIndex = project.gallery.findIndex(src => src.includes("sp3.PNG"));
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
      setCurrentIndex(defaultIndex !== -1 ? defaultIndex : 0);
    }
  }, [isOpen, project]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Auto-scroll logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && project?.gallery && project.gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % project.gallery!.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, project]);

  if (!isOpen || !project || !project.gallery) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.gallery!.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Close Button */}
      <div className="absolute top-6 left-6 z-50">
        <BracketButton 
          text="Close" 
          onClick={onClose} 
          className="text-xs px-2 py-1 md:text-sm md:px-3 text-white hover:text-neutral-300" 
        />
      </div>

      {/* LEFT: Carousel Container */}
      <div className="w-full md:w-[50%] h-[40vh] md:h-full flex items-center justify-center p-0 border-b md:border-b-0 md:border-r border-neutral-900 bg-black relative group select-none overflow-hidden flex-shrink-0">
          
          {/* PREVIOUS Image Preview (Left) */}
          <div 
            className="absolute left-[-15%] md:left-[-10%] top-1/2 -translate-y-1/2 h-[60vh] w-[30%] opacity-20 hover:opacity-40 transition-all duration-500 cursor-pointer z-10 grayscale hover:grayscale-0 hidden md:block"
            onClick={prevImage}
          >
             <img 
               src={project.gallery[(currentIndex - 1 + project.gallery.length) % project.gallery.length]} 
               className="w-full h-full object-contain"
               alt="Previous"
             />
          </div>

          {/* NEXT Image Preview (Right) */}
          <div 
            className="absolute right-[-15%] md:right-[-10%] top-1/2 -translate-y-1/2 h-[60vh] w-[30%] opacity-20 hover:opacity-40 transition-all duration-500 cursor-pointer z-10 grayscale hover:grayscale-0 hidden md:block"
            onClick={nextImage}
          >
             <img 
               src={project.gallery[(currentIndex + 1) % project.gallery.length]} 
               className="w-full h-full object-contain"
               alt="Next"
             />
          </div>

          {/* MAIN Image */}
          <div 
             className="relative z-20 w-[90%] md:w-[70%] h-full flex items-center justify-center cursor-pointer md:cursor-default group/image"
             onClick={(e) => {
                 // Simple tap navigation for mobile
                 if (window.innerWidth < 768) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x > rect.width / 2) nextImage();
                    else prevImage();
                 }
             }}
          >
             {/* Navigation Arrows - Desktop only, visible on hover */}
             <button 
               onClick={(e) => { e.stopPropagation(); prevImage(); }}
               className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 text-white/30 hover:text-white transition-all hidden md:block group-hover/image:translate-x-0 -translate-x-4 opacity-0 group-hover/image:opacity-100"
             >
               <span className="text-3xl font-light font-mono leading-none">&lt;</span>
             </button>

             <img 
               key={currentIndex}
               src={project.gallery[currentIndex]} 
               alt={`Gallery image ${currentIndex + 1}`}
               className="max-w-full max-h-[80vh] object-contain shadow-2xl animate-[fadeScale_0.4s_ease-out]"
             />

             <button 
               onClick={(e) => { e.stopPropagation(); nextImage(); }}
               className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 text-white/30 hover:text-white transition-all hidden md:block group-hover/image:translate-x-0 translate-x-4 opacity-0 group-hover/image:opacity-100"
             >
               <span className="text-3xl font-light font-mono leading-none">&gt;</span>
             </button>
          </div>

          {/* Counter/Indicators */}
          <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
              {project.gallery.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                        "h-1 transition-all duration-300 rounded-full cursor-pointer hover:bg-neutral-500",
                        idx === currentIndex ? "w-8 bg-white" : "w-2 bg-neutral-800"
                    )}
                    onClick={() => setCurrentIndex(idx)}
                  />
              ))}
          </div>

      </div>

      {/* RIGHT: Text Content */}
      <div className="w-full md:w-[50%] h-full overflow-y-auto bg-[#060606]">
          <div className="min-h-full flex flex-col justify-center p-8 md:px-12 md:py-16 lg:px-16 lg:py-24">
            <div className="space-y-8 max-w-2xl animate-[fadeUp_0.6s_ease-out]">
                
                {/* Header */}
                <div className="space-y-2 pt-8 md:pt-0">
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                        {project.year ? `// ${project.year}` : "// ARCHIVE"}
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-100 tracking-tight">
                        {project.title}
                    </h2>
                </div>

                {/* Description */}
                <div className="text-neutral-400 text-sm md:text-base leading-relaxed font-light space-y-6">
                    {(project.fullDescription || project.description).split('\n').filter(Boolean).map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                {/* Tech Stack */}
                {project.tools && (
                    <div className="pt-8 pb-16 md:pb-0">
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                                <span key={tool} className="text-xs text-neutral-400 border border-neutral-800 px-3 py-1 rounded-full">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
      </div>

    </div>
  );
}
