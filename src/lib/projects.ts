import fs from 'fs';
import path from 'path';
import { Project } from '@/types';

export function getAllProjects(): Project[] {
  const projectsDirectory = path.join(process.cwd(), 'content', 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  
  const projects = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      
      return {
        id: fileName.replace(/\.json$/, ''),
        title: data.title || '',
        year: data.year || '',
        description: data.description || '',
        fullDescription: data.fullDescription || '',
        imageUrl: data.imageUrl || '',
        tools: data.tools || [],
        link: data.link || '#',
        gallery: data.gallery || []
      };
    });

  // Sort projects by year (descending)
  return projects.sort((a, b) => {
    const yearA = parseInt(a.year || '0');
    const yearB = parseInt(b.year || '0');
    return yearB - yearA;
  });
}
