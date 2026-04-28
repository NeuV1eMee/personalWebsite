"use client";

import { useEffect } from "react";
import { Photo } from "@/lib/photo-constants";
import { BracketButton } from "./BracketButton";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function Lightbox({ photo, onClose, onNext, onPrev }: LightboxProps) {
  // Keyboard support
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!photo) return;
      
      if (event.key === "ArrowRight" && onNext) {
        onNext();
      } else if (event.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, onNext, onPrev, onClose]);

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
        {/* Navigation Arrows - Desktop only */}
        {onPrev && (
          <div 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-all cursor-pointer pointer-events-auto hidden md:block"
          >
            <span className="text-4xl font-light font-mono">&lt;</span>
          </div>
        )}

        <div 
          className="relative flex flex-col items-center justify-center p-4 md:p-8 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container */}
          <div className="relative w-full max-h-[75vh] flex items-center justify-center mb-6">
             <img 
               key={photo.src}
               src={photo.src} 
               alt={photo.title} 
               className="max-w-full max-h-[75vh] object-contain shadow-2xl animate-[fadeScale_0.4s_ease-out]"
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

        {onNext && (
          <div 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/20 hover:text-white transition-all cursor-pointer pointer-events-auto hidden md:block"
          >
            <span className="text-4xl font-light font-mono">&gt;</span>
          </div>
        )}
      </div>
    </div>
  );
}
