# Gemini Context: Personal Portfolio Website

## Project Overview

This is a personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. The project features a distinct **Black & White aesthetic** where color is used selectively to guide user focus and interaction. The design emphasizes minimalism, using grainy video backgrounds and bracketed UI elements (e.g., `[Button]`).

### Key Technologies
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript

## Architecture & Structure

The project follows the standard Next.js App Router structure.

### Directory Map
- **`src/app/`**: Core application routes and layouts.
    - `page.tsx`: Main landing page with the tagline, navigation, and video background.
    - `layout.tsx`: Global layout including the grainy overlay and font configurations.
    - `build/`, `lens/`, `sound/`, `about/`: Sub-pages for different portfolio sections.
- **`src/components/`**: Reusable UI components.
    - `ui/BracketButton.tsx`: The primary interactive button component, styled with brackets `[ ]`.
- **`public/`**: Static assets.
    - `videos/`: Background video loops for the main page.
    - `resume.pdf`: Downloadable resume.
- **`designs/`**: Reference images and mockups for the project's visual design.

### Design System
- **Theme:** Predominantly Black & White.
- **Interaction:** Color is revealed on hover or scroll focus (e.g., specialized behavior in the "Build" section).
- **Typography:** Uses `Inter` (sans-serif) and `JetBrains Mono` (monospace).
- **Visuals:** Heavy use of video backgrounds with a custom "grainy" CSS utility class overlay.

## Building and Running

The project uses `npm` for dependency management and script execution.

### Key Commands
- **Development Server:**
  ```bash
  npm run dev
  ```
  Starts the local development server at `http://localhost:3000`.

- **Production Build:**
  ```bash
  npm run build
  ```
  Compiles the application for production.

- **Start Production Server:**
  ```bash
  npm run start
  ```
  Runs the built application in production mode.

- **Linting:**
  ```bash
  npm run lint
  ```
  Runs ESLint to check for code quality issues.

## Development Conventions

- **Styling:** Use Tailwind CSS utility classes for all styling. Custom utilities (like `.grainy`) are defined in `src/app/globals.css`.
- **UI Components:** Prefer using the `BracketButton` component for any clickable links or actions to maintain consistency with the design language.
- **Assets:** Place large media files (videos) in `public/videos`.
- **Reference:** Consult `WEBSITE_STRUCTURE.md` for detailed design specifications, interaction models (like the "Zig-Zag" project layout), and the site's mental model.
