import fs from 'fs';
import path from 'path';
import { Photo, PhotoCategory } from './photo-constants';

export function getAllPhotos(): Photo[] {
  const photosDirectory = path.join(process.cwd(), 'content', 'photos');
  
  if (!fs.existsSync(photosDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(photosDirectory);
  
  const photos = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(photosDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      
      return {
        id: fileName.replace(/\.json$/, ''),
        src: data.image || '',
        title: data.title || '',
        location: data.location || '',
        description: data.description || '',
        isCover: !!data.isCover,
        category: (data.category || 'featured') as PhotoCategory,
        year: data.year || '',
        camera: data.camera || '',
        lens: data.lens || ''
      };
    });

  return photos;
}
