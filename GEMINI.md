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
            - **Featured Carousel:** Interactive 3-image carousel. Center photo is always in color and scaled to balance horizontal/vertical sizes (`max-w-[65vh]` on desktop). Side images are grayscale, semi-transparent (`opacity-20`), and animate (`fadeScale`) on switch.
            - **Layout:** Top padding (`pt-36`) and large vertical spacing (`space-y-64`) between sections.
            - **Categories:** Links to collections, styled as tall (`3:5`) blocks with cover images that fade at the edges (using `mask-image`, no distinct borders). Hovering brings color.
        - `[category]/page.tsx`: **Dynamic Category Page**. Displays a grid of photos for a specific category (e.g., "distortion", "silence") or "all".
    - `build/`: Projects showcase (Zig-Zag layout).
    - `sound/`: Music portfolio.
    - `about/`: CV and Resume.
- **`src/components/`**: Reusable UI components.
    - `ui/BracketButton.tsx`: Core interactive button component `[ Text ]`.
    - `ui/Lightbox.tsx`: Modal for viewing full-screen photos.
    - `ProjectCard.tsx`: Component for the "Build" section projects.
- **`src/data/`**: Static data files.
    - `photos.ts`: Photo metadata and categorization logic.
- **`public/`**: Static assets.
    - `photos/`: Organized by category folders (`Distortion`, `Silence`, `Strangers`, `Polariod`, `Featured`).
    - `videos/`: Background video loops for the main page.

### Design System
- **Theme:** Predominantly Black & White.
- **Interaction:**
    - **Hover:** Elements often transition from Grayscale/Dim -> Color/Bright.
    - **Focus:** The "Featured" carousel center image is always colored, while side images wait in the shadows.
- **Typography:** `Inter` (sans-serif) & `JetBrains Mono` (monospace).
- **Visuals:**
    - **Grain:** Global CSS utility `.grainy` for texture.
    - **Soft Edges:** Images often use `mask-image` gradients to blend into the black background rather than hard borders.

## Building and Running

- **Development:** `npm run dev` (Starts at `http://localhost:3000`)
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Development Conventions

- **Styling:** Tailwind CSS is the primary styling engine.
- **Assets:**
    - **Photos:** Place in `public/photos/[Category]/`.
    - **Cover Images:** Each category folder should have a `cover.JPG` (or similar) used for the landing page block.
- **Animations:** Use standard Tailwind animation utilities or define custom keyframes in `globals.css` (e.g., `fadeScale`, `fadeUp`) for specific interactions.
- **Navigation:** Use `Link` from `next/link` for internal routing and `BracketButton` for UI-styled actions.
