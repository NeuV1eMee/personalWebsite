"use client";

import { useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Photo } from "@/lib/photo-constants";

interface CategoryClientProps {
  filteredPhotos: Photo[];
}

export function CategoryClient({ filteredPhotos }: CategoryClientProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <main className="pt-48 px-6 md:px-16 lg:px-32 xl:px-48 max-w-[1800px] mx-auto">
        {/* Photo Wall (Masonry Layout) */}
        <section className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer break-inside-avoid mb-8"
            >
              <div className="bg-neutral-900 overflow-hidden relative border border-neutral-900 group-hover:border-neutral-700 transition-colors">
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="w-full h-auto object-cover grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-300 ease-in-out"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center', 'h-64');
                    e.currentTarget.parentElement!.innerHTML += `<span class="text-neutral-700 text-xs p-4 text-center">[ IMG: ${photo.title} ]</span>`;
                  }}
                />
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
    </>
  );
}
