import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');
const outputDir = path.join(process.cwd(), 'src/data');
const outputFile = path.join(outputDir, 'cms-data.ts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get actual files from public directories to handle case-sensitivity
const musicPhotosFiles = fs.existsSync(path.join(process.cwd(), 'public/musicPhotos')) 
  ? fs.readdirSync(path.join(process.cwd(), 'public/musicPhotos')) 
  : [];
const uploadsFiles = fs.existsSync(path.join(process.cwd(), 'public/photos/uploads')) 
  ? fs.readdirSync(path.join(process.cwd(), 'public/photos/uploads')) 
  : [];

function normalizePath(p) {
  if (typeof p !== 'string') return p;
  
  // Normalize /musicPhotos/
  if (p.startsWith('/musicPhotos/')) {
    const fileName = p.replace('/musicPhotos/', '');
    const match = musicPhotosFiles.find(f => f.toLowerCase() === fileName.toLowerCase());
    return match ? `/musicPhotos/${match}` : p;
  }
  
  // Normalize /photos/uploads/
  if (p.startsWith('/photos/uploads/')) {
    const fileName = p.replace('/photos/uploads/', '');
    const match = uploadsFiles.find(f => f.toLowerCase() === fileName.toLowerCase());
    return match ? `/photos/uploads/${match}` : p;
  }
  
  return p;
}

function walkAndNormalize(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => walkAndNormalize(item));
  }
  
  const normalized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      normalized[key] = normalizePath(value);
    } else {
      normalized[key] = walkAndNormalize(value);
    }
  }
  return normalized;
}

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const normalized = walkAndNormalize(content);
      return {
        ...normalized,
        _slug: f.replace(/\.json$/, '')
      };
    });
}

function compile() {
  try {
    const data = {
      photos: readJsonFiles(path.join(contentDir, 'photos')).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)),
      musicPhotos: readJsonFiles(path.join(contentDir, 'music-photos')).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)),
      projects: readJsonFiles(path.join(contentDir, 'projects')),
      journal: readJsonFiles(path.join(contentDir, 'journal')),

      settings: {
        homepage: walkAndNormalize(JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/homepage.json'), 'utf8'))),
        about: walkAndNormalize(JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/about.json'), 'utf8'))),
        music: walkAndNormalize(JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/music.json'), 'utf8'))),
      }
    };

    const tsContent = `// AUTO-GENERATED FILE - DO NOT EDIT
export const cmsData = ${JSON.stringify(data, null, 2)};
`;

    fs.writeFileSync(outputFile, tsContent);
    console.log(`✅ [${new Date().toLocaleTimeString()}] CMS Content compiled to src/data/cms-data.ts`);
  } catch (err) {
    console.error('❌ Error compiling CMS content:', err.message);
  }
}

compile();

if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes in content directory...');
  fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
      compile();
    }
  });
}
