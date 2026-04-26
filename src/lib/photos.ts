import { cmsData } from '@/data/cms-data';
import { Photo, PhotoCategory } from './photo-constants';

export function getAllPhotos(): Photo[] {
  // Use pre-compiled data instead of fs for Cloudflare compatibility
  return cmsData.photos.map((data: any, index: number) => ({
    id: `photo-${index}`,
    src: data.image || '',
    title: data.title || '',
    location: data.location || '',
    description: data.description || '',
    isCover: !!data.isCover,
    category: (data.category || 'featured') as PhotoCategory,
    year: data.year || '',
    camera: data.camera || '',
    lens: data.lens || ''
  }));
}
