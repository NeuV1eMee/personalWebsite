import { cmsData } from '@/data/cms-data';
import { JournalEntry } from '@/types';

export function getAllJournalEntries(): JournalEntry[] {
  const entries = (cmsData.journal || []).map((data: any) => ({
    id: data._slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: data.content || ''
  }));

  // Sort by date (descending)
  return entries.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getJournalEntry(slug: string): JournalEntry | null {
  const entries = getAllJournalEntries();
  return entries.find(e => e.id === slug) || null;
}
