import fs from 'fs';
import path from 'path';
import { AboutData } from '@/types';

export function getAboutData(): AboutData {
  const filePath = path.join(process.cwd(), 'content', 'settings', 'about.json');
  
  if (!fs.existsSync(filePath)) {
    return {
      resumeUrl: "/resume.pdf",
      intro: {
        heading: "HELLO, WORLD.",
        subheading: "> Developer. Photographer. Musician.",
        description: "This page was originally intended to be a traditional CV. However, since my digital experiments, photography collections, and musical noise are already documented in their respective sections, a standard resume felt redundant here. Instead, I've converted this space into a living archive."
      },
      contact: {
        email: "wangzuocheng99@gmail.com",
        instagram: "zzzuochengw",
        phone: "+1 412 546 6006",
        wechat: "neuLuv"
      }
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
