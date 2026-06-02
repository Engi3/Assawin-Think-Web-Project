# [ASSAWIN-THINK-WEB-PROJECT] - Project Architecture & Technical Documentation

## 1. Project Overview
* **Purpose:** This project is an educational web application designed to teach fundamental concepts in digital logic and computer engineering. Its core objective is to provide an interactive, hands-on learning experience through dynamic simulations of digital circuits and number system calculations. The platform appears to be structured as a course-based system, complete with lessons, theory, and corresponding "Advanced Engineering Lab" simulations.
* **Tech Stack:** The project is built on a modern, type-safe, and performant technology stack.
    *   **Language:** **TypeScript** is used throughout the project, ensuring type safety and improving developer experience and code maintainability.
    *   **Framework:** **Next.js (v16+)** using the App Router architecture. This provides a robust foundation with features like Server Components for performance, file-based routing for organization, and seamless integration of client-side interactivity.
    *   **Styling:** **Tailwind CSS** is utilized for styling, indicated by `postcss.config.mjs` and `globals.css`. This enables rapid UI development with a utility-first approach.
    *   **Animation & Interactivity:** **Framer Motion** is used for animations (`MotionWrapper.tsx`), enhancing the user experience with fluid transitions.
    *   **Icons:** **Lucide React** is used for a consistent and lightweight set of UI icons.
    *   **Internationalization (i18n):** The architecture explicitly supports multiple languages (English and Thai), managed through a combination of Next.js middleware, dictionary files, and locale-based routing.

## 2. Directory Tree Diagram
```
C:\...\Assawin-Think-Web-Project
├── next.config.ts        # Next.js framework configuration.
├── package.json          # Project metadata, dependencies, and scripts.
├── tsconfig.json         # TypeScript compiler configuration.
├── postcss.config.mjs    # Configuration for PostCSS (used by Tailwind CSS).
├── public/               # Static assets (images, SVGs, documents).
│   └── assets/
│       └── courses/      # Asset directory for course-specific materials.
└── src/                  # Main source code directory.
    ├── app/              # Next.js App Router core.
    │   ├── globals.css   # Global styles for the application.
    │   └── [locale]/     # Dynamic route for internationalization (i18n).
    │       ├── layout.tsx# Main layout component for each locale.
    │       ├── page.tsx  # Landing page for the selected locale.
    │       └── courses/
    │           └── [courseId]/
    │               ├── page.tsx
    │               └── lessons/
    │                   └── [lessonId]/
    │                       └── page.tsx # Renders a specific lesson.
    ├── components/         # Reusable React components.
    │   ├── Navbar.tsx    # Site-wide navigation bar.
    │   ├── Footer.tsx    # Site-wide footer.
    │   └── simulations/  # Directory for all interactive lab components.
    │       ├── AdderSim.tsx
    │       ├── AdvancedKMapSim.tsx
    │       └── LogicGateExplorer.tsx # etc.
    ├── content/            # Headless CMS-like data storage.
    │   └── courses/
    │       └── digital-basics/
    │           ├── course.json   # Metadata for a course.
    │           └── lessons.json  # Array of lesson data for a course.
    ├── dictionaries/       # Language files for i18n.
    │   ├── en.json
    │   └── th.json
    ├── lib/                # Business logic, data access, and helper functions.
    │   ├── content-api.ts# Functions to read data from the /content dir.
    │   └── get-dictionary.ts # Function to load the correct language dictionary.
    └── middleware.ts       # Next.js middleware, likely for i18n routing.
```

## 3. Module & Component Specification
The project follows a well-defined architecture based on the **Separation of Concerns (SoC)** principle, cleanly dividing configuration, application logic, UI, and data.

*   **Root Configuration:**
    *   `package.json`: Defines project scripts (`dev`, `build`, `start`), dependencies (e.g., `react`, `next`, `tailwindcss`), and project metadata.
    *   `next.config.ts`: Configures the Next.js framework's behavior, such as build optimizations or security headers.
    *   `tsconfig.json`: Governs how the TypeScript compiler transpiles `.ts`/`.tsx` files, enforcing strictness rules and setting up path aliases.

*   **Source Directory (`/src`):**
    *   **Application Logic (`app/`)**: This directory leverages the Next.js App Router. Routing is handled by folder structure. The `[locale]`, `[courseId]`, and `[lessonId]` folders are dynamic segments that map URL parameters to page props. `layout.tsx` provides a shared UI shell, while `page.tsx` files are the unique content for each route. This structure promotes a clear and predictable routing system.
    *   **Presentation Layer (`components/`)**: This directory stores all reusable React components. It's further subdivided:
        *   General-purpose components like `Navbar.tsx`, `Footer.tsx`, and `ThemeToggle.tsx` handle the main application shell.
        *   The `simulations/` subdirectory is a critical feature area, encapsulating the complex, interactive logic for each educational simulation (e.g., `AdderSim.tsx`, `KMapSim.tsx`). These are likely Client Components (`"use client"`) as they rely heavily on state and user interaction.
    *   **Data & Content (`content/`, `dictionaries/`)**: The project employs a "Git as a CMS" strategy. Course and lesson content is stored in simple `.json` files, decoupling the application's data from its code. This allows content to be updated without requiring a full application redeployment. The `dictionaries/` folder serves a similar purpose for localization strings.
    *   **Service & Abstraction Layer (`lib/`)**: This directory abstracts the data-sourcing logic. `content-api.ts` acts as a service layer, providing functions that read and parse the JSON files from the `/content` directory. This is a crucial architectural pattern, as it allows the data source to be swapped in the future (e.g., to a real headless CMS) with minimal changes to the application pages. `get-dictionary.ts` performs a similar role for i18n.
    *   **Middleware (`middleware.ts`)**: This file intercepts incoming requests before they reach a page. Its primary role in this architecture is almost certainly to manage the i18n system—detecting user language preferences and redirecting to the appropriate `/[locale]/...` path (e.g., `/en` or `/th`).

## 4. Data Flow & Architecture Blueprint
The application follows a modern Server-First data flow model, leveraging Next.js Server Components.

1.  **Request & Routing:** A user request hits the server. The `middleware.ts` runs first, determining the correct locale and ensuring the URL path is correct (e.g., redirecting `/` to `/en`).
2.  **Data Fetching:** Next.js maps the URL to a `page.tsx` file (e.g., `app/[locale]/courses/[courseId]/lessons/[lessonId]/page.tsx`). This is an `async` Server Component. On the server, it calls functions from the `content-api.ts` library to fetch the relevant course and lesson data from the JSON files. It also calls `get-dictionary` to fetch the localization strings.
3.  **Server-Side Rendering (SSR):** The `page.tsx` component is rendered on the server using the fetched data. This produces a static HTML document that is sent to the browser for a fast initial load (First Contentful Paint).
4.  **Hydration & Interactivity:** The browser receives the HTML. JavaScript bundles are then downloaded and executed. React "hydrates" the static HTML, attaching event listeners and turning the page into a fully interactive Single-Page Application (SPA).
5.  **Client-Side State:** User interactions within a simulation component (e.g., `AdderSim.tsx`) are managed locally within that component using React hooks like `useState`. Data does not need to flow back up to the server; the simulation logic is self-contained on the client, ensuring fast and responsive interactions.

This architecture optimizes for both initial load performance (via SSR) and rich interactivity (via client-side hydration and state management).

## 5. Build & Deployment Pipeline
*   **Development Workflow:**
    *   To run the project locally, the command is `npm run dev`. This starts a local development server with hot-reloading, allowing for real-time feedback as code is changed.

*   **Compilation Execution:**
    *   The command `npm run build` triggers the `next build` process.
    *   Next.js orchestrates the entire build: it runs the TypeScript compiler (`tsc`) to type-check the code, then uses its internal bundler (Turbopack) to transpile all `.tsx` and `.ts` files into optimized JavaScript bundles (code splitting, minification, etc.).
    *   It pre-renders Server Components and identifies which parts of the application are static vs. dynamic.

*   **Target Directory:**
    *   The output of the build process is placed in the `.next/` directory.
    *   This directory contains all the production-ready assets: static HTML files, JavaScript chunks, CSS files, and serverless function handlers needed to run the application.
    *   This `.next` folder is the self-contained build artifact that gets deployed to a hosting platform like Vercel, AWS, or a standalone Node.js server.
