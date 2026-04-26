import { BracketButton } from "@/components/ui/BracketButton";
import { SoundClient } from "./SoundClient";
import { getMusicPhotos, getMusicSettings } from "@/lib/music";

export default function SoundPage() {
  const photoWall = getMusicPhotos();
  const settings = getMusicSettings();

  return (
    <div className="min-h-screen bg-[#060606] text-neutral-300 font-sans selection:bg-white selection:text-black pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 grid grid-cols-3 items-center bg-[#060606]/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
            Music
          </h1>
        </div>
        <div className="flex justify-end">
          {/* Empty space for alignment */}
          <div className="w-16" />
        </div>
      </header>

      <SoundClient photoWall={photoWall} settings={settings} />
    </div>
  );
}
