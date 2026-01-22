"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { BracketButton } from "@/components/ui/BracketButton";
import { Lightbox } from "@/components/ui/Lightbox";
import { photos, Photo, PhotoCategory } from "@/data/photos";
import { useState } from "react";

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = category === "all"
    ? photos
    : photos.filter((p) => p.category === category);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <BracketButton text="< Back" href="/lens" className="text-sm" />
        <h1 className="text-lg font-normal tracking-wide text-neutral-200">
          {category === "all" ? "All Photos" : categoryTitle}
        </h1>
        <div className="w-16" />
      </header>

      <main className="pt-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Photo Wall */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer space-y-3"
            >
              <div className="aspect-[4/5] bg-neutral-900 overflow-hidden relative border border-neutral-900 group-hover:border-neutral-700 transition-colors">
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

      <Lightbox 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
    </div>
  );
}
