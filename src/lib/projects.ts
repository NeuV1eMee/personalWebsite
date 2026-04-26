import { cmsData } from '@/data/cms-data';
import { Project } from '@/types';

export function getAllProjects(): Project[] {
  const projects = cmsData.projects.map((data: any, index: number) => ({
    id: `project-${index}`,
    title: data.title || '',
    year: data.year || '',
    description: data.description || '',
    fullDescription: data.fullDescription || '',
    imageUrl: data.imageUrl || '',
    tools: data.tools || [],
    link: data.link || '#',
    gallery: data.gallery || []
  }));

  // Sort projects by year (descending)
  return projects.sort((a, b) => {
    const yearA = parseInt(a.year || '0');
    const yearB = parseInt(b.year || '0');
    return yearB - yearA;
  });
}
