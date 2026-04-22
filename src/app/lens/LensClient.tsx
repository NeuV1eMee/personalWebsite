"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo, CATEGORIES } from "@/lib/photo-constants";

interface LensClientProps {
  featuredPhotos: Photo[];
  allPhotos: Photo[];
}

export function LensClient({ featuredPhotos, allPhotos }: LensClientProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const nextFeatured = () => {
    if (featuredPhotos.length === 0) return;
    setFeaturedIndex((prev) => (prev + 1) % featuredPhotos.length);
  };

  const prevFeatured = () => {
    if (featuredPhotos.length === 0) return;
    setFeaturedIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length);
  };

  const currentFeatured = featuredPhotos.length > 0 ? featuredPhotos[featuredIndex] : null;
  const currentDescription = currentFeatured ? currentFeatured.description : "";

  return (
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
                {featuredPhotos.length === 0 ? (
                   <div className="text-neutral-600 font-mono text-sm md:text-base tracking-widest uppercase">
                     [ NO FEATURED PHOTO YET ]
                   </div>
                ) : currentFeatured && (
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
         <div className="flex justify-center items-center text-xs md:text-sm text-neutral-500 font-mono min-h-[20px]">
             {currentFeatured && (
               <div className="flex flex-col items-center gap-1 text-center animate-[fadeUp_1s_ease-out]">
                   {(currentFeatured.year || currentFeatured.camera || currentFeatured.lens) && (
                     <span>
                       {[
                         currentFeatured.year,
                         [currentFeatured.camera, currentFeatured.lens].filter(Boolean).join(" ")
                       ].filter(Boolean).join(". ")}
                     </span>
                   )}
                   {currentDescription && <span className="text-neutral-600">{"//"} {currentDescription}</span>}
               </div>
             )}
         </div>
      </section>

      {/* Categories Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {CATEGORIES.map((cat) => {
              const catPhotos = (allPhotos || []).filter(p => p.category === cat.id);
              const explicitCover = catPhotos.find(p => p.isCover);
              const catCover = explicitCover ? explicitCover.src : (catPhotos.length > 0 ? catPhotos[0].src : "");

              return (
              <Link
                  key={cat.id}
                  href={`/lens/${cat.id}`}
                  className="aspect-[3/5] flex flex-col justify-end p-8 text-neutral-300 hover:text-white transition-all duration-500 group relative bg-neutral-900 border border-neutral-900 hover:border-neutral-700"
              >
                  {/* Background Image with Mask for soft edges */}
                  <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] overflow-hidden">
                       {catCover ? (
                         <img 
                           src={catCover} 
                           alt={cat.label} 
                           className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300 ease-in-out scale-100 group-hover:scale-105"
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-black">
                           <span className="text-neutral-700 font-mono text-[10px] tracking-widest uppercase">
                             [ NO PHOTO ]
                           </span>
                         </div>
                       )}
                       {/* Dark overlay to ensure text readability initially */}
                       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10" />
                  
                  <span className="text-2xl font-light mb-2 block relative z-20 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">{cat.index}</span>
                  <span className="text-sm tracking-widest uppercase relative z-20 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500 delay-75">[{cat.label}]</span>
              </Link>
          )})}
      </section>

      {/* Places Blocks */}
      {(() => {
        const places = Array.from(new Set((allPhotos || []).map(p => p.location).filter(Boolean))).sort();
        if (places.length === 0) return null;
        return (
          <section className="space-y-8 flex flex-col items-center">
            <h2 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-medium">By Places</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
              {places.map(place => (
                <Link
                  key={place}
                  href={`/lens/location/${encodeURIComponent(place as string)}`}
                  className="text-xs tracking-widest uppercase text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  [{place}]
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

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
  );
}
