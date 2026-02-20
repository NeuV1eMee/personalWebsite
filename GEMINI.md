# Gemini Context: Personal Portfolio Website

## Project Overview

This is a personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. The project features a distinct **Black & White aesthetic** where color is used selectively to guide user focus and interaction. The design emphasizes minimalism, using grainy video loops for backgrounds, bracketed UI elements (e.g., `[Button]`), and custom masonry layouts.

### Key Technologies
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Animations:** CSS Keyframes & Tailwind Utilities (`animate-[...]`)

## Architecture & Structure

The project follows the standard Next.js App Router structure with feature-based organization and a strong emphasis on data-driven UI.

### Directory Map
- **`src/app/`**: Core application routes.
    - `page.tsx`: **Main Page**. Features a rotating playlist of grainy B&W videos, tagline, and central navigation.
    - `layout.tsx`: Global layout containing the `.grainy` overlay and font configurations.
    - `lens/`: **Photography Portfolio**.
        - `page.tsx`: **Lens Landing Page**. Interactive 3-image carousel and category blocks.
        - `[category]/page.tsx`: **Dynamic Category Page**. Masonry layout using Tailwind columns and a functional `Lightbox`.
    - `build/`: **Projects Showcase**. 
        - Features a wide layout with alternating project cards.
        - Scroll-triggered activation: Projects colorize and gain opacity when they reach the viewport center via `IntersectionObserver`.
    - `sound/`: **Music Portfolio**.
        - **Photo Wall:** 5-column bottom-aligned masonry wall with a fixed viewport height and top-clipping.
        - **Band Section:** Features an interactive logo with a soft radial mask (vignette) and band story.
        - **Covers & Rig:** Centralized list of covered songs and a centered three-column gear rig in the footer.
    - `about/`: CV and Resume. Standardized header with Resume download.
- **`src/components/`**: Reusable UI components.
    - `ui/BracketButton.tsx`: Core interactive button component `[ Text ]`.
    - `ProjectCard.tsx`: Blocky container design with scroll-triggered grayscale-to-color transitions.
    - `ProjectGallery.tsx`: **Project Detail Modal**. Split-screen carousel and description.
- **`src/data/`**: Static data files.
    - `photos.ts`: Metadata for the photography section.
    - `projects.ts`: Central source for the Build section.
    - `music.ts`: **Central Source for Music section**. Stores photo wall assets, band story, member list, song covers, and gear rig.
- **`public/`**: Static assets.
    - `musicPhotos/`: Converted JPEG assets for the music photo wall and band logo.
    - `photos/`: Photography assets organized by category.
    - `projectPhotos/`: Project-specific assets.
    - `videos/`: Background video loops.

### Design System
- **Theme:** Predominantly Black & White (`#000000` / `#060606`).
- **Interaction:**
    - **Activation:** Elements transition from Grayscale/Dim -> Color/Bright based on **Scroll Position** (Build/Sound), **Hover** (Lens), or **Viewport Entry** (Logo Vignette).
    - **Alignment:** Consistent bottom-alignment for masonry walls to create a "grounded" aesthetic.
    - **Typography:** `SF Pro` (sans-serif) & `JetBrains Mono` (monospace).
- **Visuals:**
    - **Grain:** Global CSS utility `.grainy` for texture.
    - **Vignette:** Radial masks used to blend imagery into the black background.

## Building and Running

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Development Conventions

- **Styling:** Tailwind CSS 4 with custom utilities like `grainy` and `no-scrollbar`.
- **Data Management:** All core content (Projects, Photos, Music) must be managed in the `src/data/` directory.
- **Masonry Logic:** Use **Greedy Height Balancing** for photo walls to ensure balanced "jagged" tops and perfectly straight bottom lines.
- **Asset Handling:** Convert `.HEIC` files to `.jpg` using `sips` for web compatibility.
