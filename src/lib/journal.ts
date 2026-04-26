import fs from 'fs';
import path from 'path';
import { JournalEntry } from '@/types';

export function getAllJournalEntries(): JournalEntry[] {
  const directory = path.join(process.cwd(), 'content', 'journal');
  
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  
  const entries = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      
      return {
        id: fileName.replace(/\.json$/, ''),
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        content: data.content || ''
      };
    });

  // Sort by date (descending)
  return entries.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getJournalEntry(slug: string): JournalEntry | null {
  const filePath = path.join(process.cwd(), 'content', 'journal', `${slug}.json`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return {
    id: slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: data.content || ''
  };
}
