"use client";

import { useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { cn } from "@/lib/utils";

type Category = "all" | "distortion" | "silence" | "strangers" | "polaroid";

const categories: Category[] = ["distortion", "silence", "strangers", "polaroid", "all"];

// Mock Photos
const photos = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  category: categories[i % 4], // distribute categories
}));

export default function LensPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredPhotos = activeCategory === "all" 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="absolute top-6 left-6 z-40">
            <BracketButton text="Back" href="/" />
        </div>

      {/* Featured Section */}
      <section className="mb-24">
        <div className="w-full aspect-[21/9] bg-neutral-900 border border-neutral-800 flex items-center justify-center relative group cursor-pointer overflow-hidden">
             <span className="text-neutral-600 tracking-widest">[ FEATURED CAROUSEL ]</span>
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <div className="flex justify-between mt-4 text-sm text-neutral-500 font-sans">
            <span>&lt; PREV</span>
            <span>PHOTO TITLE 01 // 2024</span>
            <span>NEXT &gt;</span>
        </div>
      </section>

      {/* Categories */}
      <nav className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
        {categories.map((cat) => (
          <BracketButton 
            key={cat} 
            text={cat} 
            onClick={() => setActiveCategory(cat)}
            active={activeCategory === cat}
          />
        ))}
      </nav>

      {/* Photo Wall */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="aspect-[4/5] bg-neutral-900 border border-neutral-800 relative group cursor-pointer overflow-hidden transition-all duration-300 hover:border-neutral-600"
          >
            <div className="absolute inset-0 flex items-center justify-center text-neutral-700 font-sans text-xs">
              [ {photo.category.toUpperCase()} {photo.id} ]
            </div>
            
            {/* Color Overlay on Hover/Click Effect */}
            <div className="absolute inset-0 bg-neutral-800 mix-blend-color opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
          </div>
        ))}
      </div>
      
      {filteredPhotos.length === 0 && (
          <div className="py-20 text-center text-neutral-500 font-sans">
              [ NO PHOTOS FOUND IN THIS COLLECTION ]
          </div>
      )}
    </div>
  );
}
