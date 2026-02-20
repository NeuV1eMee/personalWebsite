export interface Project {
  id: string;
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

export interface MusicPageData {
  photoWall: string[];
  band: {
    name: string;
    logo: string;
    description: string;
    members: BandMember[];
  };
  covers: SongCover[];
  personalMonologue: string;
  rig: {
    guitars: string[];
    ampsAndPedals: string[];
    keys: string[];
  };
}
