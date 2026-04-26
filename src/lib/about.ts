import { cmsData } from '@/data/cms-data';
import { AboutData } from '@/types';

export function getAboutData(): AboutData {
  return cmsData.settings.about as AboutData;
}
