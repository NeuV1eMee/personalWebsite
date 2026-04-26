import { BracketButton } from "@/components/ui/BracketButton";
import { getAllPhotos } from "@/lib/photos";
import { CategoryClient } from "@/app/lens/[category]/CategoryClient";

interface PageProps {
  params: Promise<{ place: string }>;
}

export async function generateStaticParams() {
  const photos = getAllPhotos();
  const locations = Array.from(new Set(photos.map(p => p.location).filter(Boolean)));
  return locations.map((place) => ({
    place: encodeURIComponent(place as string),
  }));
}

export default async function LocationPage({ params }: PageProps) {
  const { place: encodedPlace } = await params;
  const place = decodeURIComponent(encodedPlace);
  
  const photos = getAllPhotos();
  const filteredPhotos = photos.filter((p) => p.location === place);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/lens" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase whitespace-nowrap truncate px-4">
            {place}
          </h1>
        </div>
        <div className="flex justify-end invisible md:visible">
          <div className="w-16" />
        </div>
      </header>

      <CategoryClient 
        filteredPhotos={filteredPhotos} 
      />
    </div>
  );
}
