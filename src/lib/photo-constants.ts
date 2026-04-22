export type PhotoCategory = "distortion" | "silence" | "strangers" | "polaroid" | "featured";

export interface Photo {
  id: string;
  src: string;
  title: string;
  location?: string;
  description?: string;
  isCover?: boolean;
  category: PhotoCategory;
  year?: string;
  camera?: string;
  lens?: string;
}

export const CATEGORIES = [
  { 
    id: "distortion", 
    label: "Distortion", 
    index: "01", 
    image: "/photos/Distortion/cover.JPG",
  },
  { 
    id: "silence", 
    label: "Silence", 
    index: "02", 
    image: "/photos/Silence/cover.JPG",
  },
  { 
    id: "strangers", 
    label: "Strangers", 
    index: "03", 
    image: "/photos/Strangers/cover.jpg",
  },
  { 
    id: "polaroid", 
    label: "Polaroid", 
    index: "04", 
    image: "/photos/Polariod/cover.JPG",
  },
];
