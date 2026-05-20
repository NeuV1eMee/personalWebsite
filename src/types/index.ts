export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface AboutData {
  resumeUrl: string;
  intro: {
    heading: string;
    subheading: string;
    description: string;
  };
  contact: {
    email: string;
    instagram: string;
    phone?: string;
    wechat?: string;
    github?: string;
  };
}

export interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl?: string;
  link: string;
  year?: string;
  tools?: string[];
  gallery?: string[];
}

export interface Photo {
  id: string;
  src: string;
  title?: string;
  collection: "distortion" | "silence" | "strangers" | "polaroid" | "all";
  description?: string;
}

export interface MusicRig {
  id: string;
  name: string;
  type: string;
}

export interface SongCover {
  title: string;
  originalArtist: string;
  videoUrl?: string;
}

export interface BandMember {
  handle: string;
  name?: string;
}

export interface MusicSettings {
  band: {
    name: string;
    logo: string;
    description: string;
    members: BandMember[];
  };
  covers: SongCover[];
  stageVideo?: {
    videoUrl: string;
  };
}

export interface MusicPageData extends MusicSettings {
  photoWall: string[];
}
