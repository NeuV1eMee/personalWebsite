import { use } from "react";
import { BracketButton } from "@/components/ui/BracketButton";
import { getAllPhotos } from "@/lib/photos";
import { CategoryClient } from "@/app/lens/[category]/CategoryClient";

export default function LocationPage({ params }: { params: Promise<{ place: string }> }) {
  const resolvedParams = use(params);
  const place = decodeURIComponent(resolvedParams.place);
  
  const photos = getAllPhotos();
  const filteredPhotos = photos.filter((p) => p.location === place);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/lens" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase whitespace-nowrap truncate px-4">
            {place}
          </h1>
        </div>
        <div className="w-16 invisible md:visible" />
      </header>

      <CategoryClient 
        filteredPhotos={filteredPhotos} 
      />
    </div>
  );
}
