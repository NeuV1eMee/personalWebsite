import { BracketButton } from "@/components/ui/BracketButton";
import { SoundClient } from "./SoundClient";
import { getMusicPhotos } from "@/lib/music";

export default function SoundPage() {
  const photoWall = getMusicPhotos();

  return (
    <div className="min-h-screen bg-[#060606] text-neutral-300 font-sans selection:bg-white selection:text-black pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 bg-[#060606]/80 backdrop-blur-sm">
        <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
          Music
        </h1>
        <div className="w-16 invisible md:visible" />
      </header>

      <SoundClient photoWall={photoWall} />
    </div>
  );
}
