"use client";

import { BracketButton } from "@/components/ui/BracketButton";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { musicData } from "@/data/music";
import { cn } from "@/lib/utils";

export default function SoundPage() {
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

      musicData.photoWall.forEach((src) => {
        // Heuristic: iPhone 'IMG' files are mostly tall (1.6), Fuji/Others are wider (1.0)
        const isTall = src.includes("IMG_4252") || src.includes("IMG_3184") || 
                       src.includes("IMG_1491") || src.includes("IMG_3738") || 
                       src.includes("IMG_4013") || src.includes("IMG_1267") || 
                       src.includes("IMG_3249") || src.includes("IMG_0897") ||
                       src.includes("IMG_4252") || src.includes("IMG_4311");
        
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
      mobile: getDistributedColumns(2),
      tablet: getDistributedColumns(3),
      desktop: getDistributedColumns(4),
      xl: getDistributedColumns(5),
    };
  }, []);

  const Column = ({ images }: { images: string[] }) => (
    <div className="flex-1 flex flex-col justify-end gap-3">
      {images.map((src, index) => (
        <img 
          key={index} 
          src={src} 
          className="w-full grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-700" 
          alt="" 
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060606] text-neutral-300 font-sans selection:bg-white selection:text-black pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 bg-[#060606]/80 backdrop-blur-sm">
        <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
          Music
        </h1>
        <div className="w-16 invisible md:visible" />
      </header>

      <main className="space-y-32 md:space-y-48">
        {/* Section 1: Photo Wall (Fixed 5-Column Bottom-Aligned Masonry) */}
        <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black flex items-end">
          
          {/* Always 5 Columns */}
          <div className="flex w-full items-end gap-2 md:gap-3 px-2 md:px-3 relative z-0">
            {columnData.xl.map((col, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-2 md:gap-3">
                {col.map((src, index) => (
                  <img 
                    key={index} 
                    src={src} 
                    className="w-full grayscale brightness-75 contrast-125 hover:grayscale-0 hover:brightness-100 transition-all duration-700" 
                    alt="" 
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
              src={musicData.band.logo}
              alt={`${musicData.band.name} Logo`}
              fill
              className={`object-cover transition-all duration-1000 ease-in-out ${
                isLogoActive ? "grayscale-0 brightness-100 scale-105" : "grayscale brightness-75 scale-100 opacity-60"
              }`}
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-medium text-white tracking-widest uppercase">{musicData.band.name}</h3>
              <p className="text-sm md:text-base leading-relaxed font-light text-neutral-400 whitespace-pre-line">
                {musicData.band.description}
              </p>
            </div>
            <p className="text-xs md:text-sm text-neutral-500 font-mono tracking-tight whitespace-pre-line">
              {musicData.band.members.map(member => member.handle).join('\n')}
            </p>
          </div>
        </section>

        {/* Section 3: Covered List & Stage Video */}
        <section className="px-6 md:px-12 lg:px-24 xl:px-64 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-8">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">Played/Covered List:</h2>
            <ul className="space-y-3 text-sm md:text-base font-light text-neutral-400">
              {musicData.covers.map((cover, index) => (
                <li key={index}>“{cover.title}” — {cover.originalArtist}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="relative aspect-video bg-neutral-900/50 border border-neutral-800/30 flex items-center justify-center overflow-hidden">
              <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-600">Stage Video</span>
            </div>
            <button className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 hover:text-white transition-colors flex items-center gap-2">
              &gt; Play
            </button>
          </div>
        </section>

        {/* Section 4: Rig */}
        <section className="px-6 md:px-12 lg:px-24 xl:px-64 pt-12 border-t border-neutral-900">
          <div className="max-w-2xl mx-auto space-y-8 text-center">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">My Rig:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm md:text-base font-light text-neutral-400">
               <div className="space-y-1">
                 {musicData.rig.guitars.map((item, index) => <p key={index}>{item}</p>)}
               </div>
               
               <div className="space-y-1">
                 {musicData.rig.ampsAndPedals.map((item, index) => <p key={index}>{item}</p>)}
               </div>
               
               <div className="space-y-1">
                 {musicData.rig.keys.map((item, index) => <p key={index}>{item}</p>)}
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
