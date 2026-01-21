export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  year?: string;
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
