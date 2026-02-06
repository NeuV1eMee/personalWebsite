import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "SleePurr",
    description: "SleePurr is a gamified iOS tracker that uses an interactive virtual cat and social competitions to transform sleep data into personalized, habit-building insights.",
    fullDescription: "SleePurr transforms sleep health into a delightful experience by reflecting a user's sleep quality through the mood and status of a virtual cat companion. Built with SwiftUI and Supabase, the application employs a sophisticated \"Slow Loop\" AI architecture to analyze 10 dimensions of sleep data and generate personalized, empathetic dialogues that help users identify habits like caffeine intake or screen time that affect their rest. By combining this AI core with a 7-day social competition system inspired by Apple Fitness, SleePurr bridges the gap between raw health metrics and actionable behavior change, offering a resilient and engaging platform for improving long-term sleep hygiene.\n\n\nThe application is built on a modern, scalable stack centered around SwiftUI for a native iOS frontend and HealthKit for robust health data integration. The backend infrastructure utilizes Supabase, leveraging PostgreSQL with Row Level Security (RLS) for data integrity and TypeScript-based Edge Functions (Deno) for performant serverless logic. Advanced AI interactions are orchestrated through OpenRouter, providing access to various Large Language Models (LLMs) such as GPT-4 and Claude. The project also employs a modularized architecture via Swift Package Manager (SPM) and maintains high code quality through a custom Deno-based testing framework and a structured migration system for database evolution.",
    link: "#",
    year: "2025",
    tools: ["Supabase", "Swift", "Experience Design"],
    imageUrl: "/projectPhotos/sleepurr/icon.jpg",
    gallery: [
      "/projectPhotos/sleepurr/sp1.PNG",
      "/projectPhotos/sleepurr/sp2.PNG",
      "/projectPhotos/sleepurr/sp3.PNG",
      "/projectPhotos/sleepurr/sp4.png",
      "/projectPhotos/sleepurr/sp5.jpg"
    ]
  },
  {
    id: "2",
    title: "Neon Horizon",
    description: "A procedural city generator using Three.js. Infinite cyberpunk landscapes created in real-time within the browser.",
    link: "#",
    year: "2023",
    tools: ["Three.js", "WebGL", "GLSL"],
    imageUrl: "/photos/projects/neon.jpg"
  },
  {
    id: "3",
    title: "Echo Chamber",
    description: "Audio visualization tool that reacts to microphone input. Built with Web Audio API and Canvas.",
    link: "#",
    year: "2023",
    tools: ["Web Audio API", "Canvas", "Vanilla JS"],
    imageUrl: "/photos/projects/echo.jpg"
  },
];
