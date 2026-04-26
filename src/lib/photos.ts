import { cmsData } from '@/data/cms-data';
import { Photo, PhotoCategory } from './photo-constants';

export function getAllPhotos(): Photo[] {
  return cmsData.photos.map((data: any) => ({
    id: data._slug,
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
