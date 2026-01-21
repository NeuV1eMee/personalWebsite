import { BracketButton } from "@/components/ui/BracketButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="absolute top-6 left-6 z-40">
            <BracketButton text="Back" href="/" />
        </div>
        
        <div className="absolute top-6 right-6 z-40">
             <BracketButton text="Resume" href="/resume.pdf" />
        </div>

      <header className="mb-16 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">HELLO, WORLD.</h1>
        <p className="text-xl text-neutral-400 font-sans">
          &gt; Developer. Photographer. Musician.
        </p>
      </header>

      <div className="space-y-12 text-neutral-300 leading-relaxed font-light">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">[ The Code ]</h2>
          <p className="mb-4">
            I am a software engineer focused on building immersive digital experiences. 
            My work bridges the gap between functional engineering and aesthetic design.
            I specialize in React, TypeScript, and modern web frameworks.
          </p>
          <p>
            Currently working on personal projects involving generative art and audio visualization.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">[ The Light ]</h2>
          <p>
            Photography is my way of documenting the silent moments of chaos. I shoot primarily with a Fujifilm X-T5, focusing on high-contrast black and white street photography.
          </p>
        </section>

        <section>
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">[ The Noise ]</h2>
            <p>
                When I'm not coding, I'm making noise. I play guitar in a shoegaze/post-punk band. We are currently recording our first EP.
            </p>
        </section>
        
        <section className="pt-8 border-t border-neutral-800">
             <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">[ Contact ]</h2>
             <ul className="space-y-2 font-sans text-neutral-400">
                 <li><a href="#" className="hover:text-white transition-colors">Email: zuochengw@example.com</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">GitHub: @zuochengw</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Instagram: @zuochengw</a></li>
             </ul>
        </section>
      </div>
    </div>
  );
}
