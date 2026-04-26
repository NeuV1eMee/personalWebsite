import { cmsData } from '@/data/cms-data';

export function getMusicSettings() {
  return cmsData.settings.music;
}

export function getHomepageSettings() {
  return cmsData.settings.homepage;
}

export function getMusicPhotos(): string[] {
  return cmsData.musicPhotos
    .map((data: any) => data.image || '')
    .filter(Boolean);
}
