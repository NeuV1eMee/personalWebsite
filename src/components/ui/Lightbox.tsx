"use client";

import { useEffect } from "react";
import { Photo } from "@/data/photos";
import { BracketButton } from "./BracketButton";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export function Lightbox({ photo, onClose }: LightboxProps) {
  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Close Button */}
      <div className="absolute top-6 right-6 z-50">
        <BracketButton text="Close" onClick={onClose} className="text-white hover:text-white" />
      </div>

      <div className="relative max-w-5xl w-full h-full p-8 flex flex-col items-center justify-center">
        {/* Image Container */}
        <div className="relative w-full max-h-[80vh] flex items-center justify-center mb-6">
           {/* In a real app, use next/image. For now using div placeholder if src fails or mocking */}
           {/* We use a simple img tag here to ensure color is shown (no CSS filters applied) */}
           <img 
             src={photo.src} 
             alt={photo.title} 
             className="max-w-full max-h-full object-contain shadow-2xl"
             onError={(e) => {
                 // Fallback for missing images
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-96 bg-neutral-800 flex items-center justify-center text-neutral-500">[ IMAGE NOT FOUND: ${photo.src} ]</div>`;
             }}
           />
        </div>

        {/* Caption */}
        <div className="text-center space-y-2 text-neutral-300">
          <h3 className="text-xl font-medium tracking-wide text-white uppercase">{photo.title}</h3>
          <p className="text-sm font-light text-neutral-500">
            {photo.year} // {photo.camera} + {photo.lens}
          </p>
          {photo.description && (
            <p className="text-sm font-light italic opacity-80 max-w-2xl mx-auto mt-2">
              "{photo.description}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
