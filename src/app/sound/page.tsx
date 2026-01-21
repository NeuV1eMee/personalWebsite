import { BracketButton } from "@/components/ui/BracketButton";

export default function SoundPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
       <div className="absolute top-6 left-6 z-40">
            <BracketButton text="Back" href="/" />
        </div>

      {/* Section 1: Video Player */}
      <section className="w-full">
        <div className="w-full aspect-[2.35/1] bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <span className="text-neutral-600 tracking-widest">[ MAIN PERFORMANCE VIDEO 2.35:1 ]</span>
        </div>
      </section>

      {/* Section 2: Band Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="aspect-square bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl font-bold mb-4">BAND LOGO</span>
            <span className="text-sm text-neutral-500">[ Band Photo ]</span>
        </div>
        <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase border-b border-neutral-800 pb-4">The Band</h2>
            <p className="text-neutral-400 leading-relaxed">
                Formed in the late winter, we explore the intersection of noise and melody. Our sound is a reflection of the urban decay and the digital rebirth. 
            </p>
        </div>
      </section>

      {/* Section 3: Covers & Stage */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
         <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase border-b border-neutral-800 pb-4">Setlist / Covers</h2>
            <ul className="space-y-4 text-neutral-400 font-sans">
                <li className="flex justify-between hover:text-white cursor-pointer group">
                    <span>01. Radiohead - Weird Fishes</span>
                    <span className="opacity-0 group-hover:opacity-100">[Play]</span>
                </li>
                <li className="flex justify-between hover:text-white cursor-pointer group">
                    <span>02. The Strokes - Reptilia</span>
                    <span className="opacity-0 group-hover:opacity-100">[Play]</span>
                </li>
                <li className="flex justify-between hover:text-white cursor-pointer group">
                    <span>03. Interpol - Obstacle 1</span>
                    <span className="opacity-0 group-hover:opacity-100">[Play]</span>
                </li>
            </ul>
        </div>
        <div className="aspect-video bg-neutral-900 border border-neutral-800 flex items-center justify-center">
            <span className="text-neutral-600">[ STAGE VIDEO PLAYER ]</span>
        </div>
      </section>

      {/* Section 4: Personal & Rig */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
         <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase border-b border-neutral-800 pb-4">Personal Note</h2>
            <p className="text-neutral-400 leading-relaxed">
                Music is not just about sound; it's about the texture of time. My journey started with a cheap acoustic guitar and has evolved into a quest for the perfect tone.
            </p>
        </div>
        <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase border-b border-neutral-800 pb-4">The Rig</h2>
             <ul className="space-y-2 text-neutral-400 font-sans text-sm">
                <li className="border-l-2 border-neutral-800 pl-4">GUITAR: Fender Jazzmaster</li>
                <li className="border-l-2 border-neutral-800 pl-4">AMP: Vox AC30</li>
                <li className="border-l-2 border-neutral-800 pl-4">PEDAL: ProCo Rat 2</li>
                <li className="border-l-2 border-neutral-800 pl-4">PEDAL: Strymon BigSky</li>
            </ul>
        </div>
      </section>
    </div>
  );
}
