import { BracketButton } from "@/components/ui/BracketButton";
import { getAllPhotos } from "@/lib/photos";
import { CategoryClient } from "./CategoryClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = ["distortion", "silence", "strangers", "polaroid", "featured", "all"];
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  const photos = getAllPhotos();
  const filteredPhotos = category === "all"
    ? photos
    : photos.filter((p) => p.category === category);

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-black text-neutral-400 font-light selection:bg-white selection:text-black pb-20">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/lens" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase whitespace-nowrap">
            {category === "all" ? "All Photos" : categoryTitle}
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
