"use client";

import { useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { Lightbox } from "@/components/ui/Lightbox";
import { photos, Photo, PhotoCategory } from "@/data/photos";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: PhotoCategory; label: string; index: string }[] = [
  { id: "distortion", label: "Distortion", index: "01" },
  { id: "silence", label: "Silence", index: "02" },
  { id: "strangers", label: "Strangers", index: "03" },
  { id: "polaroid", label: "Polaroid", index: "04" },
];

export default function LensPage() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | "all">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filter photos
  const filteredPhotos = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <BracketButton text="< Back" href="/" className="text-sm" />
        <h1 className="text-lg font-normal tracking-wide text-neutral-200">Gallery</h1>
        <div className="w-16" /> {/* Spacer for balance */}
      </header>

      <main className="pt-24 px-6 md:px-12 max-w-[1600px] mx-auto space-y-24">
        
        {/* Featured Section (Carousel Placeholder) */}
        <section className="w-full space-y-4">
           {/* Aspect Ratio 21:9 roughly */}
           <div className="w-full aspect-[2/1] md:aspect-[21/9] bg-neutral-800/50 border border-neutral-800 relative group cursor-pointer overflow-hidden flex items-center justify-center">
               <div className="text-center">
                   <p className="text-xl md:text-2xl text-neutral-600 font-light tracking-widest">[ FEATURED ]</p>
               </div>
               {/* Hover Effect */}
               <div className="absolute inset-0 bg-neutral-700/10 opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
           
           <div className="flex justify-between text-xs md:text-sm text-neutral-500 font-mono">
               <span>Date.</span>
               <span>Description of this photo.</span>
               <span>Taken by [Camera] + [Lens]</span>
           </div>
        </section>

        {/* Categories Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                        "aspect-[3/4] flex flex-col justify-end p-8 border transition-all duration-300 group relative overflow-hidden",
                        activeCategory === cat.id 
                            ? "bg-neutral-900 border-neutral-600 text-white" 
                            : "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-2xl font-light mb-2 block relative z-10">{cat.index}</span>
                    <span className="text-sm tracking-widest uppercase relative z-10">[{cat.label}]</span>
                </button>
            ))}
        </section>

        {/* All Photos Button */}
        <div className="flex justify-center">
            <button 
                onClick={() => setActiveCategory("all")}
                className={cn(
                    "text-sm tracking-widest uppercase transition-colors duration-300",
                    activeCategory === "all" ? "text-white underline underline-offset-8" : "text-neutral-600 hover:text-neutral-400"
                )}
            >
                [ All Photos ]
            </button>
        </div>

        {/* Photo Wall */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPhotos.map((photo) => (
                <div 
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group cursor-pointer space-y-3"
                >
                    <div className="aspect-[4/5] bg-neutral-900 overflow-hidden relative border border-neutral-900 group-hover:border-neutral-700 transition-colors">
                        {/* Image Placeholder - In real app use next/image */}
                         {/* We force grayscale here as per design requirement */}
                        <img 
                            src={photo.src} 
                            alt={photo.title}
                            className="w-full h-full object-cover grayscale brightness-75 contrast-125 group-hover:brightness-90 transition-all duration-500"
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                                e.currentTarget.parentElement!.innerHTML += `<span class="text-neutral-700 text-xs p-4 text-center">[ IMG: ${photo.title} ]</span>`;
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-1">
                        <span className="text-xs text-neutral-400 font-mono uppercase truncate max-w-[70%]">{photo.title}</span>
                        <span className="text-[10px] text-neutral-600 font-mono">{photo.year}</span>
                    </div>
                </div>
            ))}
            
            {filteredPhotos.length === 0 && (
                <div className="col-span-full py-20 text-center text-neutral-600 font-mono text-sm">
                    [ NO PHOTOS FOUND IN THIS COLLECTION ]
                </div>
            )}
        </section>

      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 max-w-[1600px] mx-auto mt-32 flex flex-col md:flex-row justify-between items-end text-[10px] md:text-xs text-neutral-600 font-mono space-y-4 md:space-y-0">
          <div className="space-y-1">
              <p>© 2026 Zuocheng Wang.</p>
              <p>Please don't steal my soul (or my photos). If you love them, just ask.</p>
          </div>
          <div>
              <a href="https://instagram.com/neuseezz" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
                  [IG: @neuseezz]
              </a>
          </div>
      </footer>

      {/* Lightbox Modal */}
      <Lightbox 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </div>
  );
}