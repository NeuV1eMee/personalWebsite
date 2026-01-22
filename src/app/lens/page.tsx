"use client";

import { useState } from "react";
import Link from "next/link";
import { BracketButton } from "@/components/ui/BracketButton";
import { cn } from "@/lib/utils";
import { photos, photoDescriptions, CATEGORIES } from "@/data/photos";

export default function LensPage() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredPhotos = photos.filter(p => p.category === "featured");

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredPhotos.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length);
  };

  const currentFeatured = featuredPhotos[featuredIndex];
  const currentDescription = currentFeatured ? photoDescriptions[currentFeatured.id] : "";

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <BracketButton text="< Back" href="/" className="text-sm" />
        <h1 className="text-lg font-normal tracking-wide text-neutral-200">Gallery</h1>
        <div className="w-16" />
      </header>

      <main className="pt-36 px-6 md:px-12 max-w-[1600px] mx-auto space-y-64">
        
        {/* Featured Section (Carousel) */}
        <section className="w-full space-y-8 select-none">
           {/* Carousel Container */}
           <div className="relative w-full h-[60vh] flex items-center justify-center group/carousel">
               
               {/* PREV Photo (Left) */}
               <div 
                 className="absolute left-0 md:left-4 h-[50%] md:h-[60%] z-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:opacity-80 opacity-20 grayscale"
                 onClick={prevFeatured}
               >
                  {featuredPhotos.length > 0 && (
                    <img 
                      key={featuredPhotos[(featuredIndex - 1 + featuredPhotos.length) % featuredPhotos.length].src}
                      src={featuredPhotos[(featuredIndex - 1 + featuredPhotos.length) % featuredPhotos.length].src}
                      alt="Previous"
                      className="h-full w-auto object-contain shadow-xl animate-[fadeScale_0.8s_ease-out]"
                    />
                  )}
               </div>

               {/* CURRENT Photo (Center) */}
               <div className="relative z-20 h-full w-full flex items-center justify-center shadow-2xl overflow-hidden pointer-events-none">
                  {currentFeatured && (
                    <img 
                      key={currentFeatured.src}
                      src={currentFeatured.src}
                      alt={currentFeatured.title}
                      className="max-h-full w-auto max-w-[85vw] md:max-w-[65vh] object-contain transition-all duration-1000 ease-in-out pointer-events-auto"
                    />
                  )}
               </div>

               {/* NEXT Photo (Right) */}
               <div 
                 className="absolute right-0 md:right-4 h-[50%] md:h-[60%] z-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:opacity-80 opacity-20 grayscale"
                 onClick={nextFeatured}
               >
                  {featuredPhotos.length > 0 && (
                    <img 
                      key={featuredPhotos[(featuredIndex + 1) % featuredPhotos.length].src}
                      src={featuredPhotos[(featuredIndex + 1) % featuredPhotos.length].src}
                      alt="Next"
                      className="h-full w-auto object-contain shadow-xl animate-[fadeScale_0.8s_ease-out]"
                    />
                  )}
               </div>
           </div>
           
           {/* Metadata */}
           <div className="flex justify-center items-center text-xs md:text-sm text-neutral-500 font-mono">
               {currentFeatured && (
                 <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center animate-[fadeUp_1s_ease-out]">
                     {currentDescription && <span className="text-neutral-600">// {currentDescription}</span>}
                     {!currentDescription && <span>{currentFeatured.year} // {currentFeatured.camera} + {currentFeatured.lens}</span>}
                 </div>
               )}
           </div>
        </section>

        {/* Categories Blocks */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((cat) => (
                <Link
                    key={cat.id}
                    href={`/lens/${cat.id}`}
                    className="aspect-[3/5] flex flex-col justify-end p-8 text-neutral-300 hover:text-white transition-all duration-500 group relative bg-transparent"
                >
                    {/* Background Image with Mask for soft edges */}
                    <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
                         <img 
                           src={cat.image} 
                           alt={cat.label} 
                           className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                         />
                         {/* Dark overlay to ensure text readability initially */}
                         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10" />
                    
                    <span className="text-2xl font-light mb-2 block relative z-20 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">{cat.index}</span>
                    <span className="text-sm tracking-widest uppercase relative z-20 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 delay-75">[{cat.label}]</span>
                </Link>
            ))}
        </section>

        {/* All Photos Button */}
        <div className="flex justify-center">
            <Link 
                href="/lens/all"
                className="text-sm tracking-widest uppercase text-neutral-600 hover:text-neutral-400 transition-colors duration-300"
            >
                [ All Photos ]
            </Link>
        </div>

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
    </div>
  );
}