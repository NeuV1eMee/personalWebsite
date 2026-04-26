import { getJournalEntry } from "@/lib/journal";
import { BracketButton } from "@/components/ui/BracketButton";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);

  if (!entry) {
    notFound();
  }

  const dateStr = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  return (
    <div className="min-h-screen bg-[#060606] text-neutral-400 font-light selection:bg-white selection:text-black pb-32">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-[#060606]/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/about" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-[10px] md:text-xs font-normal tracking-[0.4em] text-neutral-500 uppercase">
            Monologue
          </h1>
        </div>
        <div className="flex justify-end invisible md:visible">
          <div className="w-16" />
        </div>
      </header>

      <main className="pt-48 px-6 md:px-12 max-w-4xl mx-auto">
        <header className="mb-24 space-y-8">
           <div className="text-[10px] font-mono text-neutral-600 tracking-[0.3em]">
             {dateStr}
           </div>
           <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-100 leading-tight uppercase">
             {entry.title}
           </h1>
           <div className="w-12 h-px bg-neutral-800" />
        </header>

        <article className="prose prose-invert max-w-none">
           <div className="text-neutral-400 text-base md:text-lg leading-relaxed font-light space-y-12 whitespace-pre-wrap">
             {entry.content}
           </div>
        </article>

        <footer className="mt-32 pt-16 border-t border-neutral-900 flex justify-end items-center">
           <div className="text-[10px] font-mono text-neutral-700 tracking-widest uppercase">
             End of Passage
           </div>
        </footer>
      </main>
    </div>
  );
}
