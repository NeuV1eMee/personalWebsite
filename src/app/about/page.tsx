import { BracketButton } from "@/components/ui/BracketButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-neutral-400 font-light selection:bg-white selection:text-black pb-32">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-[#060606]/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
            About
          </h1>
        </div>
        <div className="flex justify-end">
          <BracketButton text="Resume" href="/resume.pdf" className="text-sm text-neutral-500 hover:text-white" />
        </div>
      </header>

      <main className="pt-48 px-6 md:px-12 max-w-4xl mx-auto space-y-24">
        
        <header className="mb-16 border-b border-neutral-800 pb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-200 mb-6">HELLO, WORLD.</h1>
          <p className="text-lg text-neutral-500 font-mono tracking-tighter">
            &gt; Developer. Photographer. Musician.
          </p>
        </header>

        <div className="space-y-20 text-neutral-400 leading-relaxed font-light">
          <section className="space-y-6">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-[0.3em]">[ The Code ]</h2>
            <div className="space-y-4 text-sm md:text-base">
              <p>
                I am a software engineer focused on building immersive digital experiences. 
                My work bridges the gap between functional engineering and aesthetic design.
                I specialize in React, TypeScript, and modern web frameworks.
              </p>
              <p>
                Currently working on personal projects involving generative art and audio visualization.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-[0.3em]">[ The Light ]</h2>
            <p className="text-sm md:text-base">
              Photography is my way of documenting the silent moments of chaos. I shoot primarily with a Fujifilm X-T5, focusing on high-contrast black and white street photography.
            </p>
          </section>

          <section className="space-y-6">
              <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-[0.3em]">[ The Noise ]</h2>
              <p className="text-sm md:text-base">
                  When I'm not coding, I'm making noise. I play guitar in a shoegaze/post-punk band. We are currently recording our first EP.
              </p>
          </section>
          
          <section className="pt-12 border-t border-neutral-900 space-y-8">
               <h2 className="text-xs font-medium text-neutral-500 uppercase tracking-[0.3em]">[ Contact ]</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                   <div className="flex flex-col gap-2">
                     <span className="text-neutral-700">Email</span>
                     <a href="mailto:wangzuocheng99@gmail.com" className="hover:text-white transition-colors">wangzuocheng99@gmail.com</a>
                   </div>
                   <div className="flex flex-col gap-2">
                     <span className="text-neutral-700">Instagram</span>
                     <a href="https://instagram.com/zzzuochengw" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@zzzuochengw</a>
                   </div>
               </div>
          </section>
        </div>
      </main>
    </div>
  );
}
