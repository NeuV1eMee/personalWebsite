import { cmsData } from '@/data/cms-data';
import { MusicSettings } from '@/types';

export function getMusicSettings(): MusicSettings {
  return cmsData.settings.music as MusicSettings;
}

export function getHomepageSettings() {
  return cmsData.settings.homepage;
}

export function getMusicPhotos() {
  return cmsData.musicPhotos || [];
}
