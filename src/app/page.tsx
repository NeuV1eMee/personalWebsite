"use client";

import { useEffect, useRef, useState } from "react";
import { BracketButton } from "@/components/ui/BracketButton";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-8 text-center overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="absolute top-6 left-6 right-6 z-40 flex justify-between items-center">
        {/* Top Left: Logo & Name */}
        <div className="flex items-center gap-3 text-neutral-300">
          <div className="w-8 h-8 rounded-full bg-neutral-200 text-black flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
             </svg>
          </div>
          <span className="font-light tracking-wide text-lg">Zuocheng Wang</span>
        </div>

        {/* Top Right: Contact Button (Smaller & Opens Overlay) */}
        <BracketButton 
          text="Contact" 
          onClick={() => setIsContactOpen(true)} 
          className="text-xs px-2 py-1 md:text-sm md:px-3"
        />
      </header>

      {/* Center Content */}
      <div className="z-10 flex flex-col items-center space-y-8">
        <h1 className="text-xl md:text-3xl font-medium tracking-wide uppercase text-neutral-100 max-w-none md:whitespace-nowrap">
          Crafting Code, Capturing Light and Making Some Noise.
        </h1>

        {/* Navigation Buttons with Separators */}
        <nav className="flex flex-wrap justify-center items-center gap-2 text-neutral-400 font-sans text-sm md:text-base">
          <BracketButton text="Build" href="/build" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="Lens" href="/lens" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="Sound" href="/sound" className="text-neutral-300 hover:text-white" />
          <span>/</span>
          <BracketButton text="About" href="/about" className="text-neutral-300 hover:text-white" />
        </nav>
      </div>
      
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 bg-black">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 grayscale contrast-[1.35]"
        >
          <source src="/videos/mainpage_video_1.MOV" type="video/quicktime" />
          <source src="/videos/mainpage_video_1.MOV" type="video/mp4" />
        </video>
        {/* Overlay to darken video slightly for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contact Overlay */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
           {/* Close Button Top Right of Screen */}
           <div className="absolute top-6 right-6">
             <BracketButton 
               text="Close" 
               onClick={() => setIsContactOpen(false)} 
               className="text-xs px-2 py-1 md:text-sm md:px-3 text-neutral-400 hover:text-white"
             />
           </div>
           
           {/* Center Container */}
           <div className="relative max-w-sm w-full mx-8">
              {/* 'Contact' Label - Outside Top Left */}
              <h2 className="absolute -top-12 left-0 text-xl font-light text-neutral-400 tracking-wide">
                Contact
              </h2>

              {/* Wireframe Box */}
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
