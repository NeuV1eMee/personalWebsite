# Gemini Context: Personal Portfolio Website

## Project Overview

This is a personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. The project features a distinct **Black & White aesthetic** where color is used selectively to guide user focus and interaction. The design emphasizes minimalism, using grainy video loops for backgrounds and bracketed UI elements (e.g., `[Button]`).

### Key Technologies
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Animations:** CSS Keyframes & Tailwind Utilities (`animate-[...]`)

## Architecture & Structure

The project follows the standard Next.js App Router structure with feature-based organization.

### Directory Map
- **`src/app/`**: Core application routes.
    - `page.tsx`: **Main Page**. Features a grainy video background (subtly darkened), tagline, and central navigation.
    - `layout.tsx`: Global layout containing the `.grainy` overlay and font configurations.
    - `lens/`: **Photography Portfolio**.
        - `page.tsx`: **Lens Landing Page**. Interactive 3-image carousel driven by `src/data/photos.ts`. Center photo is always in color.
        - `[category]/page.tsx`: **Dynamic Category Page**. Masonry layout using Tailwind columns. Large horizontal margins (`xl:px-64`).
    - `build/`: **Projects Showcase**. 
        - Features a wide layout with large margins.
        - Scroll-triggered activation: Projects colorize and gain opacity when they reach the viewport center via `IntersectionObserver`.
    - `sound/`: Music portfolio.
    - `about/`: CV and Resume.
- **`src/components/`**: Reusable UI components.
    - `ui/BracketButton.tsx`: Core interactive button component `[ Text ]`.
    - `ProjectCard.tsx`: Blocky container design with large index numbers and tech stack tags.
    - `ProjectGallery.tsx`: **Project Detail Modal**. Split-screen design (Left: Preview Carousel, Right: Detailed Introduction with `#060606` background).
- **`src/data/`**: Static data files.
    - `photos.ts`: Central data source for the photography section.
    - `projects.ts`: **Central Data Source for Build section**. Stores project summaries, full descriptions, tech stacks, and gallery image paths.
- **`public/`**: Static assets.
    - `photos/`: Photography assets organized by category.
    - `projectPhotos/`: Project-specific assets (icons, screenshots).
    - `videos/`: Background video loops.

### Design System
- **Theme:** Predominantly Black & White.
- **Interaction:**
    - **Activation:** Elements transition from Grayscale/Dim -> Color/Bright based on **Scroll Position** (in Build) or **Hover** (in Lens).
    - **Responsive:** Project details stack vertically on mobile; side-by-side on desktop.
- **Typography:** `SF Pro` (sans-serif) & `JetBrains Mono` (monospace).
- **Visuals:**
    - **Grain:** Global CSS utility `.grainy` for texture.
    - **Masonry:** Vertical column flows for photo collections.

## Building and Running

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Development Conventions

- **Styling:** Tailwind CSS 4 with custom utilities like `grainy` and `no-scrollbar`.
- **Data Management:**
    - **Projects:** Added to `src/data/projects.ts`. Use `description` for cards and `fullDescription` for the detail modal.
    - **Photos:** Added to `src/data/photos.ts`.
- **Navigation:** Use `Link` from `next/link` for internal routing. `ProjectCard` handles its own navigation/modal logic based on data presence.
