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
        - `page.tsx`: **Lens Landing Page**.
            - **Featured Carousel:** Interactive 3-image carousel driven by `src/data/photos.ts`. Center photo is always in color. Metadata is minimal (Year // Location // Gear) and only appears if explicitly defined in `photoDescriptions`.
            - **Categories:** Links to collections (`Distortion`, `Silence`, etc.).
        - `[category]/page.tsx`: **Dynamic Category Page**.
            - **Layout:** **Masonry Layout** using Tailwind columns (`columns-1` to `columns-4`). Images display at natural aspect ratios.
            - **Styling:** Large horizontal margins (`xl:px-64`) for a "museum wall" feel.
            - **Interaction:** Photos are Grayscale/Dim by default. **Hover** restores full Color/Brightness. No text overlays on hover.
    - `build/`: Projects showcase (Zig-Zag layout).
    - `sound/`: Music portfolio.
    - `about/`: CV and Resume.
- **`src/components/`**: Reusable UI components.
    - `ui/BracketButton.tsx`: Core interactive button component `[ Text ]`.
    - `ui/Lightbox.tsx`: Modal for viewing full-screen photos. Displays only the photo and an optional description (if found in lookup table). Minimal UI (small close button, no titles).
    - `ProjectCard.tsx`: Component for the "Build" section projects.
- **`src/data/`**: Static data files.
    - `photos.ts`: **Central Data Source**.
        - `photos`: Array containing all photo metadata (ID, src, category). **Note:** Titles are intentionally empty strings to enforce minimalism.
        - `photoDescriptions`: **Lookup Table** (Dictionary) mapping `PhotoID -> Description`. Format: "Year, Location, Camera + Lens". Used primarily for Featured photos.
        - `CATEGORIES`: Definitions for the category blocks (ID, Label, Index, Image).
- **`public/`**: Static assets.
    - `photos/`: Organized by category folders (`Distortion`, `Silence`, `Strangers`, `Polariod`, `Featured`).
    - `videos/`: Background video loops for the main page.

### Design System
- **Theme:** Predominantly Black & White.
- **Interaction:**
    - **Hover:** Elements transition from Grayscale/Dim -> Color/Bright.
    - **Cursor:** Default system cursor, but photos react vividly to presence.
- **Typography:** `Inter` (sans-serif) & `JetBrains Mono` (monospace).
- **Visuals:**
    - **Grain:** Global CSS utility `.grainy` for texture.
    - **Masonry:** Photos flow naturally in vertical columns, avoiding rigid grids.

## Building and Running

- **Development:** `npm run dev` (Starts at `http://localhost:3000`)
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Development Conventions

- **Styling:** Tailwind CSS is the primary styling engine.
- **Data Management:**
    - **Photos:** Added to `src/data/photos.ts`.
    - **Descriptions:** Added to the `photoDescriptions` lookup object in `src/data/photos.ts` ONLY if a story/context is needed. Otherwise, photos remain text-free.
- **Assets:**
    - **Photos:** Place in `public/photos/[Category]/`.
- **Navigation:** Use `Link` from `next/link` for internal routing and `BracketButton` for UI-styled actions.