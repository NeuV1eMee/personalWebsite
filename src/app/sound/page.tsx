"use client";

import { BracketButton } from "@/components/ui/BracketButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

      <main className="pt-48 px-6 md:px-12 lg:px-24 xl:px-64 space-y-32 md:space-y-48">
        {/* Section 1: Cinematic Video */}
        <section className="w-full animate-in fade-in duration-1000">
          <div className="relative w-full aspect-[2.35/1] bg-neutral-900/50 border border-neutral-800/30 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-600 font-light text-center px-4">
                2.35:1 instrument playing video looping in black&white
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Band Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div 
            ref={logoRef}
            className="relative aspect-[4/3] w-full bg-neutral-900/30 border border-neutral-800/20 overflow-hidden transition-all duration-1000 ease-in-out"
          >
            <Image
              src="/musicPhotos/aedlogo.png"
              alt="V-DISTRICT Band Logo"
              fill
              className={`object-cover transition-all duration-1000 ease-in-out ${
                isLogoActive ? "grayscale-0 brightness-100 scale-105" : "grayscale brightness-75 scale-100 opacity-60"
              }`}
            />
          </div>
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-relaxed font-light text-neutral-400">
              Story of the band.<br />
              How we get this name.<br />
              Members of the band.
            </p>
          </div>
        </section>

        {/* Section 3: Covered List & Stage Video */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="space-y-8">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">Covered List:</h2>
            <ol className="space-y-2 text-sm md:text-base font-light text-neutral-400">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-neutral-600">{i}.</span>
                  <span>song name - Artist</span>
                </li>
              ))}
            </ol>
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

        {/* Section 4: Monologue & Rig */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 pt-12 border-t border-neutral-900">
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-relaxed font-light text-neutral-400">
              Monologue of mine, talking about what instrument do I play and the story of why I picked it up.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">The Rig:</h2>
            <div className="space-y-6 text-sm md:text-base font-light text-neutral-400">
               <div className="space-y-1">
                 <p>Epiphone Les Paul Standard 60s, Cherry Sunburst</p>
                 <p>Squier Affinity Stratocaster, Metallic Ice Blue</p>
               </div>
               
               <div className="space-y-1">
                 <p>Boss Katana 50</p>
                 <p>Hotone Ampero II Stomp</p>
                 <p>Spark Mini</p>
               </div>
               
               <div className="space-y-1">
                 <p>Roland Go Key 3</p>
                 <p>Yamaha SHS-500</p>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
