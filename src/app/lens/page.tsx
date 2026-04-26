import { BracketButton } from "@/components/ui/BracketButton";
import { LensClient } from "./LensClient";
import { getAllPhotos } from "@/lib/photos";

export default function LensPage() {
  const photos = getAllPhotos();
  const featuredPhotos = photos.filter(p => p.category === "featured");

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
            Gallery
          </h1>
        </div>
        <div className="flex justify-end">
          <div className="w-16" />
        </div>
      </header>

      <LensClient featuredPhotos={featuredPhotos} allPhotos={photos} />

      {/* Footer */}
      <footer className="px-6 md:px-12 max-w-[1600px] mx-auto mt-32 flex flex-col md:flex-row justify-between items-end text-[10px] md:text-xs text-neutral-600 font-mono space-y-4 md:space-y-0">
          <div className="space-y-1">
              <p>© 2026 Zuocheng Wang.</p>
              <p>Please don&apos;t steal my soul (or my photos). If you love them, just ask.</p>
          </div>
          <div>
              <a href="https://instagram.com/neuseezz" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
                  [IG: @neuseezz]
              </a>
          </div>
      </footer>
    </div>
  );
}
