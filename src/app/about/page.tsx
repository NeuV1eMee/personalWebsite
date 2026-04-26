import { BracketButton } from "@/components/ui/BracketButton";
import { getAllJournalEntries } from "@/lib/journal";
import { getAboutData } from "@/lib/about";
import { JournalCard } from "@/components/JournalCard";
import Link from "next/link";

export const dynamic = "force-static";

export default function AboutPage() {
  const entries = getAllJournalEntries();
  const aboutData = getAboutData();

  // Helper to render description with a specific link style for the Resume markdown
  const renderDescription = (text: string) => {
    const parts = text.split(/(\[Resume\]\(\/resume\.pdf\))/);
    return parts.map((part, i) => {
      if (part === "[Resume](/resume.pdf)") {
        return (
          <Link key={i} href={aboutData.resumeUrl} className="text-white hover:underline underline-offset-4 decoration-neutral-600 transition-all">
            Resume
          </Link>
        );
      }
      return part;
    });
  };

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
          <BracketButton text="Resume" href={aboutData.resumeUrl} className="text-sm text-neutral-500 hover:text-white" />
        </div>
      </header>

      <main className="pt-48 px-6 md:px-12 max-w-[1800px] mx-auto">
        
        {/* About Header */}
        <div className="max-w-4xl mx-auto mb-32 border-b border-neutral-800 pb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-200 mb-6 uppercase">
            {aboutData.intro.heading}
          </h1>
          <p className="text-lg text-neutral-500 font-mono tracking-tighter mb-8">
            {aboutData.intro.subheading}
          </p>
          <div className="text-neutral-400 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {renderDescription(aboutData.intro.description)}
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-16 mb-64">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <JournalCard 
                key={entry.id} 
                entry={entry} 
              />
            ))
          ) : (
            <div className="text-center py-24 border border-dashed border-neutral-800">
               <p className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
                 {"//"} No monologues found in the archive.
               </p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto text-left">
           <p className="text-xs text-neutral-600 font-mono">
             {"//"} Thinking in public.
           </p>
        </div>
      </main>
    </div>
  );
}
