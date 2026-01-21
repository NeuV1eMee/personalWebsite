export type PhotoCategory = "distortion" | "silence" | "strangers" | "polaroid";

export interface Photo {
  id: string;
  src: string; // Path to image in public folder
  title: string;
  category: PhotoCategory;
  year: string;
  camera: string;
  lens: string;
  description?: string;
}

export const photos: Photo[] = [
  {
    id: "1",
    src: "/photos/distortion/1.jpg",
    title: "Urban Glitch",
    category: "distortion",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 35mm f/1.4",
    description: "Reflections in the glass create a distorted reality of the city."
  },
  {
    id: "2",
    src: "/photos/silence/1.jpg",
    title: "Empty Hallway",
    category: "silence",
    year: "2023",
    camera: "Fujifilm X-T5",
    lens: "XF 16mm f/1.4",
    description: "The sound of silence in an abandoned space."
  },
  {
    id: "3",
    src: "/photos/strangers/1.jpg",
    title: "The Passerby",
    category: "strangers",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 56mm f/1.2",
    description: "A fleeting moment of connection with a stranger."
  },
  {
    id: "4",
    src: "/photos/polaroid/1.jpg",
    title: "Instant Memory",
    category: "polaroid",
    year: "2022",
    camera: "Polaroid Now+",
    lens: "Standard",
    description: "Fading colors of a summer afternoon."
  },
  {
    id: "5",
    src: "/photos/distortion/2.jpg",
    title: "Water Ripple",
    category: "distortion",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 90mm f/2",
  },
  {
    id: "6",
    src: "/photos/silence/2.jpg",
    title: "Snow Field",
    category: "silence",
    year: "2023",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/2",
  },
   {
    id: "7",
    src: "/photos/strangers/2.jpg",
    title: "Metro Crowd",
    category: "strangers",
    year: "2024",
    camera: "Fujifilm X-T5",
    lens: "XF 23mm f/1.4",
  },
  {
    id: "8",
    src: "/photos/polaroid/2.jpg",
    title: "Coffee Stain",
    category: "polaroid",
    year: "2022",
    camera: "Polaroid OneStep",
    lens: "Standard",
  },
];
