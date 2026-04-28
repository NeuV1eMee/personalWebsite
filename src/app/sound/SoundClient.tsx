"use client";

import { BracketButton } from "@/components/ui/BracketButton";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { musicData } from "@/data/music";
import { MusicSettings } from "@/types";

interface SoundClientProps {
  photoWall: string[];
  settings: MusicSettings | null;
}

export function SoundClient({ photoWall, settings }: SoundClientProps) {
  // Use CMS settings if available, otherwise fallback to static musicData
  const activeData = settings || musicData;
  
  const logoRef = useRef<HTMLDivElement>(null);
  const [isLogoActive, setIsLogoActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLogoActive(true);
          } else {
            setIsLogoActive(false);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smarter Greedy Distribution Logic
  const columnData = useMemo(() => {
    const getDistributedColumns = (numCols: number) => {
      const cols: string[][] = Array.from({ length: numCols }, () => []);
      const heights = Array(numCols).fill(0);

      // Combine CMS photos with static fallback photos to ensure none are missing
      const combinedPhotos = Array.from(new Set([
        ...photoWall,
        ...(musicData.photoWall || [])
      ]));

      combinedPhotos.forEach((src) => {
        // Heuristic: iPhone 'IMG' files are mostly tall (1.6), Fuji/Others are wider (1.0)
        // Treat most iPhone photos as tall by default
        const isIPhone = src.toLowerCase().includes("img_");
        const isTall = isIPhone || 
                       src.includes("DSCF5594") || // Specific Fuji shots that are vertical
                       src.includes("1stguitarstage");
        
        const weight = isTall ? 1.6 : 1.0;
        
        // Find shortest column
        let shortestIdx = 0;
        for (let j = 1; j < numCols; j++) {
          if (heights[j] < heights[shortestIdx]) {
            shortestIdx = j;
          }
        }
        
        cols[shortestIdx].push(src);
        heights[shortestIdx] += weight;
      });
      return cols;
    };

    return {
      xl: getDistributedColumns(6),
    };
  }, [photoWall]);

  return (
    <main className="space-y-32 md:space-y-48">
        {/* Section 1: Photo Wall (Fixed 6-Column Bottom-Aligned Masonry) */}
        <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black flex items-end">
          
          {/* Always 6 Columns */}
          <div className="flex w-full items-end gap-1 md:gap-1.5 px-1 md:px-1.5 relative z-0">
            {columnData.xl.map((col, i) => (
              <div key={`col-${i}`} className="flex-1 flex flex-col justify-end gap-1 md:gap-1.5">
                {col.map((src) => (
                  <img 
                    key={src} 
                    src={src} 
                    className="w-full grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-700" 
                    alt="" 
                    onError={(e) => {
                      console.warn(`Failed to load music photo: ${src}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Enhanced Blur and Gradient Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#060606] via-[#060606]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-sm pointer-events-none z-20" />
        </section>

        {/* Section 2: Band Section */}
        <section className="px-6 md:px-12 lg:px-24 xl:px-64 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div 
            ref={logoRef}
            className="relative aspect-[16/9] w-full overflow-hidden transition-all duration-1000 ease-in-out [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]"
          >
            <Image
              src={activeData.band.logo}
              alt={`${activeData.band.name} Logo`}
              fill
              className={`object-cover transition-all duration-1000 ease-in-out ${
                isLogoActive ? "grayscale-0 brightness-100 scale-105" : "grayscale brightness-75 scale-100 opacity-60"
              }`}
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-medium text-white tracking-widest uppercase">{activeData.band.name}</h3>
              <p className="text-sm md:text-base leading-relaxed font-light text-neutral-400 whitespace-pre-line">
                {activeData.band.description}
              </p>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 font-mono tracking-tight whitespace-pre-line">
              {activeData.band.members.map(member => member.handle).join('\n')}
            </p>
          </div>
        </section>

        {/* Section 3: Covered List - Centered */}
        <section className="px-6 md:px-12 lg:px-24 xl:px-64 flex flex-col items-center text-center space-y-12">
          <div className="space-y-8 w-full max-w-2xl">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">Played/Covered List:</h2>
            <ul className="space-y-4 text-sm md:text-base font-light text-neutral-400">
              {activeData.covers.map((cover, index) => (
                <li key={index}>“{cover.title}” — {cover.originalArtist}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 4: Stage Video - Moved Below */}
        <section className="px-6 md:px-12 lg:px-24 xl:px-64 pb-32 space-y-24">
          <div className="w-full max-w-[1024px] h-px bg-neutral-800/50 mx-auto" />
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative aspect-video bg-neutral-900/50 border border-neutral-800/30 flex items-center justify-center overflow-hidden">
              {activeData.stageVideo?.videoUrl ? (
                <video 
                  src={activeData.stageVideo.videoUrl} 
                  controls 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-600">Stage Video</span>
              )}
            </div>
            {!activeData.stageVideo?.videoUrl && (
              <div className="flex justify-center">
                <button className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
                  &gt; Play
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
  );
}
