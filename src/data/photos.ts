export type PhotoCategory = "distortion" | "silence" | "strangers" | "polaroid" | "featured";

export interface Photo {
  id: string;
  src: string; // Path to image in public folder
  title: string;
  category: PhotoCategory;
  year: string;
  camera: string;
  lens: string;
}

export interface Category {
  id: string;
  label: string;
  index: string;
  image: string;
}

export const CATEGORIES: Category[] = [
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

export const photos: Photo[] = [
  // --- Featured Photos ---
  {
    id: "f1",
    src: "/photos/Featured/feature.JPG",
    title: "",
    category: "featured",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 35mm f/1.4",
  },
  {
    id: "f2",
    src: "/photos/Featured/07cf0d1b1c9e5dc454411b12817255bf.JPG",
    title: "",
    category: "featured",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 35mm f/1.4",
  },
  {
    id: "f3",
    src: "/photos/Featured/DSCF7414.JPG",
    title: "",
    category: "featured",
    year: "2023",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/2",
  },
  {
    id: "f4",
    src: "/photos/Featured/XT308590.jpg",
    title: "",
    category: "featured",
    year: "2023",
    camera: "Fujifilm X-T30",
    lens: "XF 35mm f/2",
  },

  // --- Distortion ---
  {
    id: "d1",
    src: "/photos/Distortion/cover.JPG",
    title: "",
    category: "distortion",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 35mm f/1.4",
  },

  // --- Silence ---
  {
    id: "s1",
    src: "/photos/Silence/R0003929.JPG",
    title: "",
    category: "silence",
    year: "2023",
    camera: "Ricoh GR IIIx",
    lens: "26.1mm",
  },
  {
    id: "s2",
    src: "/photos/Silence/cover.JPG",
    title: "",
    category: "silence",
    year: "2023",
    camera: "Fujifilm X-T5",
    lens: "XF 16mm f/1.4",
  },

  // --- Strangers ---
  {
    id: "st1",
    src: "/photos/Strangers/DSCF4308.jpg",
    title: "",
    category: "strangers",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 56mm f/1.2",
  },
  {
    id: "st2",
    src: "/photos/Strangers/cover.jpg",
    title: "",
    category: "strangers",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/1.4",
  },

  // --- Polaroid ---
  {
    id: "p1",
    src: "/photos/Polariod/cover.JPG",
    title: "",
    category: "polaroid",
    year: "2022",
    camera: "Polaroid Now+",
    lens: "Standard",
  },
];

export const photoDescriptions: Record<string, string> = {
  // Featured
  "f1": "2024, Brooklyn, Fujifilm X-T5 + XF 35mm f/1.4",
  "f2": "2024, Manhattan, Fujifilm X-T5 + XF 35mm f/1.4",
  "f3": "2023, Tokyo, Fujifilm X-T5 + XF 23mm f/2",
  "f4": "2023, Kyoto, Fujifilm X-T30 + XF 35mm f/2",
  
  // You can add descriptions for the new IDs below if you wish:
  // "s1": "2023, Location, Camera + Lens",
};
