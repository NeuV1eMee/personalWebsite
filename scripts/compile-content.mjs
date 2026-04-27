import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');
const outputDir = path.join(process.cwd(), 'src/data');
const outputFile = path.join(outputDir, 'cms-data.ts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function readJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const content = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        ...content,
        _slug: f.replace(/\.json$/, '') // Keep the original filename as the slug/ID
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
        homepage: JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/homepage.json'), 'utf8')),
        about: JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/about.json'), 'utf8')),
        music: JSON.parse(fs.readFileSync(path.join(contentDir, 'settings/music.json'), 'utf8')),
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

// Initial compile
compile();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes in content directory...');
  fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
      compile();
    }
  });
}
