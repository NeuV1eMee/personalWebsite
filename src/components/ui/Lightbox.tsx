"use client";

import { useEffect } from "react";
import { Photo } from "@/lib/photo-constants";
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

  const description = photo.description;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Top Header Mockup for Close Button */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-start items-center z-50">
        <BracketButton 
          text="Close" 
          onClick={onClose} 
          className="text-sm text-neutral-500 hover:text-white" 
        />
      </div>

      <div 
        className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div 
          className="relative flex flex-col items-center justify-center p-4 md:p-8 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container */}
          <div className="relative w-full max-h-[75vh] flex items-center justify-center mb-6">
             <img 
               src={photo.src} 
               alt={photo.title} 
               className="max-w-full max-h-[75vh] object-contain shadow-2xl"
               onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-96 bg-neutral-800 flex items-center justify-center text-neutral-500">[ IMAGE NOT FOUND: ${photo.src} ]</div>`;
               }}
             />
          </div>

          {/* Caption */}
          <div className="text-center space-y-1 font-mono text-xs md:text-sm p-4">
            {photo.location && (
              <p className="text-neutral-400 uppercase tracking-widest mb-1">{photo.location}</p>
            )}
            {(photo.year || photo.camera || photo.lens) && (
              <p className="text-neutral-500">
                {[
                  photo.year,
                  [photo.camera, photo.lens].filter(Boolean).join(" ")
                ].filter(Boolean).join(". ")}
              </p>
            )}
            {description && (
              <p className="text-neutral-600">{"//"} {description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
