import { cmsData } from '@/data/cms-data';
import { MusicSettings } from '@/types';

export function getMusicSettings(): MusicSettings {
  return cmsData.settings.music as MusicSettings;
}

export function getHomepageSettings() {
  return cmsData.settings.homepage;
}

export function getMusicPhotos(): string[] {
  return cmsData.musicPhotos
    .map((data: any) => data.image || '')
    .filter(Boolean);
}
