import { BracketButton } from "@/components/ui/BracketButton";
import { BuildClient } from "./BuildClient";
import { getAllProjects } from "@/lib/projects";
import { getAboutData } from "@/lib/about";

export const dynamic = "force-static";

export default function BuildPage() {
  const projects = getAllProjects();
  const aboutData = getAboutData();

  return (
    <div className="min-h-screen bg-black text-neutral-400 selection:bg-white selection:text-black font-light pb-20">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 grid grid-cols-3 items-center bg-black/80 backdrop-blur-sm border-b border-neutral-900/50">
        <div className="flex justify-start">
          <BracketButton text="< Back" href="/" className="text-sm text-neutral-500 hover:text-white" />
        </div>
        <div className="flex justify-center">
          <h1 className="text-sm md:text-base font-normal tracking-[0.3em] text-neutral-300 uppercase">
            Projects
          </h1>
        </div>
        <div className="flex justify-end">
          <BracketButton text="Resume" href={aboutData.resumeUrl} className="text-sm text-neutral-500 hover:text-white" />
        </div>
      </header>

      <BuildClient projects={projects} />
    </div>
  );
}
