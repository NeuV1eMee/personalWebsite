"use client";

import { useState, useEffect, useRef } from "react";
import { BracketButton } from "@/components/ui/BracketButton";

interface HomeClientProps {
  backgroundVideos: string[];
  taglines: string[];
}

export function HomeClient({ backgroundVideos, taglines }: HomeClientProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [videoErrorCount, setVideoErrorCount] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    // Source switch happens while we are black
    const totalVideos = backgroundVideos.length > 0 ? backgroundVideos.length : 7;
    setCurrentVideoIndex((prev) => (prev + 1) % totalVideos);
    setVideoErrorCount(0);
    
    // Pause briefly at black to ensure a clean source swap, then fade in
    setTimeout(() => {
      setIsVideoFading(false);
    }, 150);
  };

  const handleVideoError = () => {
    console.warn("Video failed to load, trying next one...");
    setVideoErrorCount(prev => prev + 1);
    if (videoErrorCount < 5) {
      handleVideoEnded();
    }
  };

  const currentTagline = taglines[currentTaglineIndex] || "Crafting Code, Capturing Light and Making Some Noise.";

  const fallbackVideos = [
    "/videos/mainpage_vid-1.mov",
    "/videos/mainpage_vid-2.mov",
    "/videos/mainpage_vid-3.mov",
    "/videos/mainpage_vid-4.mov",
    "/videos/mainpage_vid-5.mov",
    "/videos/mainpage_vid-6.mov",
    "/videos/mainpage_vid-7.mov"
  ];
  
  const videoToPlay = (backgroundVideos && backgroundVideos.length > 0 && videoErrorCount < 3) 
    ? backgroundVideos[currentVideoIndex] 
    : fallbackVideos[currentVideoIndex % fallbackVideos.length];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8 text-center overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="absolute top-6 left-10 md:left-12 right-6 z-40 flex justify-between items-center">
        <div className="flex items-center text-neutral-300">
          <span className="font-light tracking-[0.2em] text-xs md:text-sm uppercase select-none">
             ZW 99
          </span>
        </div>

        <BracketButton 
          text="Contact" 
          onClick={() => setIsContactOpen(true)} 
          className="text-xs px-2 py-1 md:text-sm md:px-3"
        />
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
            className={`w-full h-full object-cover grayscale contrast-[1.2] brightness-[0.8] transition-opacity duration-700 ease-in-out ${isVideoFading ? "opacity-0" : "opacity-70"}`}
          >
            <source src={videoToPlay} />
          </video>
        )}
        <div className="absolute inset-0 bg-black/40" />
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
           
           <div className="relative max-w-sm w-full mx-8">
              <h2 className="absolute -top-12 left-0 text-xl font-light text-neutral-400 tracking-wide">
                Contact
              </h2>
              <div className="border border-neutral-600 p-12 text-center bg-transparent">
                 <div className="space-y-8 font-sans font-light text-sm md:text-base text-neutral-300">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-neutral-500">Email</span>
                      <a href="mailto:wangzuocheng99@gmail.com" className="hover:text-white transition-colors">wangzuocheng99@gmail.com</a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-neutral-500">Instagram</span>
                      <a href="https://instagram.com/zzzuochengw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@zzzuochengw</a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-neutral-500">Phone</span>
                      <a href="tel:+14125466006" className="hover:text-white transition-colors">+1 412 546 6006</a>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-neutral-500">WeChat</span>
                      <span className="text-neutral-300">neuLuv</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
