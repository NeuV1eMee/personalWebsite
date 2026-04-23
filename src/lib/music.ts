import fs from 'fs';
import path from 'path';

export function getHomepageSettings() {
  const filePath = path.join(process.cwd(), 'content', 'settings', 'homepage.json');
  if (!fs.existsSync(filePath)) {
    return { backgroundVideos: [] };
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getMusicPhotos(): string[] {
  const directory = path.join(process.cwd(), 'content', 'music-photos');
  
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);
  
  const photos = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map((fileName) => {
      const filePath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      return data.image || '';
    })
    .filter(Boolean);

  return photos;
}
