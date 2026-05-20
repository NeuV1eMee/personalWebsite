"use client";

import { useState, useEffect, useCallback } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectDetailClientProps {
  project: Project;
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com/embed/") || url.includes("youtu.be/");
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gallery = project.gallery || [];

  const nextImage = useCallback(() => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevImage = useCallback(() => {
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Auto-scroll — pause on video slides
  useEffect(() => {
    if (gallery.length <= 1) return;
    const currentItem = gallery[currentIndex];
    if (isYouTubeUrl(currentItem)) return; // don't auto-advance on video

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, gallery]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") nextImage();
      else if (event.key === "ArrowLeft") prevImage();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  const currentItem = gallery[currentIndex] || "";
  const isVideo = isYouTubeUrl(currentItem);

  return (
    <div className="min-h-screen bg-black text-neutral-400 selection:bg-white selection:text-black font-light">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton
            text="< Back"
            href="/build"
            className="text-sm text-neutral-500 hover:text-white"
          />
        </div>
        <div className="flex justify-center">
          <h1 className="text-[10px] md:text-xs font-normal tracking-[0.4em] text-neutral-500 uppercase">
            Project
          </h1>
        </div>
        <div className="flex justify-end">
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content — Split Layout */}
      <div className="flex flex-col md:flex-row min-h-screen pt-[73px]">
        {/* LEFT: Gallery */}
        <div className="w-full md:w-[55%] h-[45vh] md:h-[calc(100vh-73px)] md:sticky md:top-[73px] flex items-center justify-center bg-black relative group select-none overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-neutral-900/50">
          {gallery.length > 0 && (
            <>
              {/* Previous preview — desktop only */}
              {gallery.length > 1 && (
                <div
                  className="absolute left-[-15%] md:left-[-10%] top-1/2 -translate-y-1/2 h-[60%] w-[30%] opacity-15 hover:opacity-30 transition-all duration-500 cursor-pointer z-10 grayscale hover:grayscale-0 hidden md:block"
                  onClick={prevImage}
                >
                  {!isYouTubeUrl(gallery[(currentIndex - 1 + gallery.length) % gallery.length]) && (
                    <img
                      src={gallery[(currentIndex - 1 + gallery.length) % gallery.length]}
                      className="w-full h-full object-contain"
                      alt="Previous"
                    />
                  )}
                </div>
              )}

              {/* Next preview — desktop only */}
              {gallery.length > 1 && (
                <div
                  className="absolute right-[-15%] md:right-[-10%] top-1/2 -translate-y-1/2 h-[60%] w-[30%] opacity-15 hover:opacity-30 transition-all duration-500 cursor-pointer z-10 grayscale hover:grayscale-0 hidden md:block"
                  onClick={nextImage}
                >
                  {!isYouTubeUrl(gallery[(currentIndex + 1) % gallery.length]) && (
                    <img
                      src={gallery[(currentIndex + 1) % gallery.length]}
                      className="w-full h-full object-contain"
                      alt="Next"
                    />
                  )}
                </div>
              )}

              {/* Main media */}
              <div
                className="relative z-20 w-[90%] md:w-[70%] h-full flex items-center justify-center cursor-pointer md:cursor-default"
                onClick={(e) => {
                  if (window.innerWidth < 768 && !isVideo) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    if (x > rect.width / 2) nextImage();
                    else prevImage();
                  }
                }}
              >
                {isVideo ? (
                  <iframe
                    key={currentItem}
                    src={`${currentItem}?rel=0&modestbranding=1`}
                    className="w-full aspect-[9/16] max-h-[80%] rounded-sm shadow-2xl animate-[fadeScale_0.4s_ease-out]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    key={currentIndex}
                    src={currentItem}
                    alt={`${project.title} - ${currentIndex + 1}`}
                    className="max-w-full max-h-[80vh] object-contain shadow-2xl animate-[fadeScale_0.4s_ease-out]"
                  />
                )}
              </div>

              {/* Arrow indicators — desktop */}
              {gallery.length > 1 && (
                <>
                  <div
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-4 text-white/15 hover:text-white/40 transition-colors cursor-pointer hidden md:block"
                    onClick={prevImage}
                  >
                    <span className="text-4xl font-light font-mono leading-none">&lt;</span>
                  </div>
                  <div
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-4 text-white/15 hover:text-white/40 transition-colors cursor-pointer hidden md:block"
                    onClick={nextImage}
                  >
                    <span className="text-4xl font-light font-mono leading-none">&gt;</span>
                  </div>
                </>
              )}

              {/* Dot indicators */}
              {gallery.length > 1 && (
                <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
                  {gallery.map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1 transition-all duration-300 rounded-full cursor-pointer hover:bg-neutral-500",
                        idx === currentIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-neutral-800",
                        isYouTubeUrl(item) && idx !== currentIndex && "bg-neutral-700"
                      )}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* RIGHT: Project Info */}
        <div className="w-full md:w-[45%] overflow-y-auto bg-[#060606]">
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
                {(project.fullDescription || project.description)
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
              </div>

              {/* Tech Stack */}
              {project.tools && project.tools.length > 0 && (
                <div className="pt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs text-neutral-400 border border-neutral-800 px-3 py-1 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="pt-16 mt-auto">
                <div className="w-12 h-px bg-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
