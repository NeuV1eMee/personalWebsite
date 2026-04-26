"use client";

import { useRef, useEffect, useState } from "react";
import { JournalEntry } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface JournalCardProps {
  entry: JournalEntry;
}

export function JournalCard({ entry }: JournalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const dateStr = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).toUpperCase();

  return (
    <Link href={`/about/${entry.id}`} className="block group">
      <div 
        ref={cardRef}
        className={cn(
          "w-full transition-all duration-700 ease-in-out border-b border-neutral-900 pb-8",
          isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-4"
        )}
      >
        <div className={cn(
            "transition-colors duration-700 p-8 md:p-12 flex flex-col space-y-6",
            isActive ? "bg-neutral-900/30" : "bg-transparent"
        )}>
          <div className="space-y-4">
              <div className="text-[10px] font-mono text-neutral-600 tracking-[0.3em]">
                {dateStr}
              </div>
              <h2 className={cn(
                  "text-2xl md:text-4xl font-light transition-colors duration-700 uppercase tracking-tight",
                  isActive ? "text-white" : "text-neutral-400"
              )}>
                  {entry.title}
              </h2>
          </div>

          <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-3xl font-light italic">
              {entry.excerpt}
          </p>

          <div className="pt-4">
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                  [ Read Passage ]
              </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
