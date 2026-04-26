"use client";

import { useState, useEffect, useRef } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { cn } from "@/lib/utils";

interface HomeClientProps {
  backgroundVideos: string[];
  taglines: string[];
  contact: {
    email: string;
    instagram: string;
    phone?: string;
    wechat?: string;
    github?: string;
  };
}

export function HomeClient({ backgroundVideos, taglines, contact }: HomeClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [videoErrorCount, setVideoErrorCount] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Close contact on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false);
      }
    }
    if (isContactOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isContactOpen]);

  // Tagline rotation logic
  useEffect(() => {
    if (taglines.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsFading(false);
      }, 500);
    }, 4500);

    return () => clearInterval(interval);
  }, [taglines]);

  // Pre-emptive fade to black logic
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      // Start fading 0.8 seconds before the end
      if (video.duration - video.currentTime < 0.8 && !isVideoFading) {
        setIsVideoFading(true);
      }
    }
  };

  const handleVideoEnded = () => {
    if (backgroundVideos.length === 0) return;
    setCurrentVideoIndex((prev) => (prev + 1) % backgroundVideos.length);
    setVideoErrorCount(0);
    
    // Pause briefly at black to ensure a clean source swap, then fade in
    setTimeout(() => {
      setIsVideoFading(false);
    }, 150);
  };

  const handleVideoError = () => {
    console.warn("Video failed to load, trying next one...");
    setVideoErrorCount(prev => prev + 1);
    // If we have videos and keep failing, try next
    if (backgroundVideos.length > 0 && videoErrorCount < backgroundVideos.length) {
      handleVideoEnded();
    }
  };

  const currentTagline = taglines[currentTaglineIndex] || "";

  const videoToPlay = (backgroundVideos && backgroundVideos.length > 0) 
    ? backgroundVideos[currentVideoIndex] 
    : null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8 text-center overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center">
        <div className="flex justify-start text-neutral-300">
          <span className="font-light tracking-[0.2em] text-xs md:text-sm uppercase select-none">
             ZW 99
          </span>
        </div>

        <div className="flex justify-center" />

        <div className="flex justify-end">
          <BracketButton 
            text="Contact" 
            onClick={() => setIsContactOpen(true)} 
            className="text-xs px-2 py-1 md:text-sm md:px-3"
          />
        </div>
      </header>

      {/* Center Content */}
      <div className="z-10 flex flex-col items-center space-y-8">
        <h1 className={`text-lg md:text-2xl font-medium tracking-wide uppercase text-neutral-100 max-w-4xl transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}>
          {currentTagline}
        </h1>

        <nav className="flex flex-wrap justify-center items-center gap-2 text-neutral-400 font-sans text-sm md:text-base">
          <BracketButton text="Build" href="/build" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="Visual" href="/lens" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="Sound" href="/sound" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="About" href="/about" className="text-neutral-300 hover:text-white" />
        </nav>
      </div>
      
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 bg-black">
        {videoToPlay && (
          <video 
            ref={videoRef}
            key={videoToPlay}
            autoPlay 
            muted 
            playsInline 
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className={`w-full h-full object-cover contrast-[1.2] brightness-[0.8] transition-all duration-1000 ease-in-out ${isVideoFading ? "opacity-0" : "opacity-70"} ${isGrayscale ? "grayscale" : "grayscale-0"}`}
          >
            <source src={videoToPlay} />
          </video>
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Background Color Toggle */}
      <div className="absolute bottom-6 right-10 md:right-12 z-40">
        <button 
          onClick={() => setIsGrayscale(!isGrayscale)}
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors duration-300"
        >
          <span className="select-none font-mono order-1">
            {isGrayscale ? "Mono" : "Chroma"}
          </span>
          <div className="flex h-4 w-10 border border-neutral-700 rounded-full p-[2px] transition-colors group-hover:border-neutral-400 order-2">
            <div className={cn(
              "h-full aspect-square rounded-full transition-all duration-300",
              isGrayscale ? "bg-white translate-x-0" : "bg-neutral-600 translate-x-[230%]"
            )} />
          </div>
        </button>
      </div>

      {/* Contact Overlay */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="absolute top-6 right-6">
             <BracketButton 
               text="Close" 
               onClick={() => setIsContactOpen(false)} 
               className="text-xs px-2 py-1 md:text-sm md:px-3 text-neutral-400 hover:text-white"
             />
           </div>
           
           <div ref={contactRef} className="relative max-w-sm w-full mx-8">
              <h2 className="absolute -top-12 left-0 text-xl font-light text-neutral-400 tracking-wide">
                Contact
              </h2>
              <div className="border border-neutral-600 p-12 text-center bg-transparent">
                 <div className="space-y-8 font-sans font-light text-sm md:text-base text-neutral-300">
                    {contact.email && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Email</span>
                        <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                      </div>
                    )}
                    {contact.instagram && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Instagram</span>
                        <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@{contact.instagram}</a>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Phone</span>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{contact.phone}</a>
                      </div>
                    )}
                    {contact.wechat && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">WeChat</span>
                        <span className="text-neutral-300">{contact.wechat}</span>
                      </div>
                    )}
                    {contact.github && (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-neutral-500">GitHub</span>
                        <a href={`https://github.com/${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@{contact.github}</a>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
