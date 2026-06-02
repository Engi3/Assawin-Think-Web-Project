You are an expert in Software Architecture and Technical Writing. 
Your task is to analyze the source code and directory structure of this project, then write a comprehensive summary of the entire project architecture (Comprehensive Project Architecture Documentation) into the `PROJECT_STRUCTURE.md` file for systematic reference.

Please structure and summarize the content based on academic reasoning and software engineering principles as follows:

---

# [ASSAWIN-THINK-WEB-PROJECT] - Project Architecture & Technical Documentation

## 1. Project Overview
* **Purpose:** Explain the core objectives of this project, its main functionalities, and what problem it solves.
* **Tech Stack:** Summarize the primary programming languages (e.g., TypeScript), frameworks, bundlers (e.g., Vite), and critical libraries used, along with their technical rationales.

## 2. Directory Tree Diagram
* Present the folder structure and essential files in a code block format (ASCII/Text Tree), spanning at least 3 levels deep from the root directory.
* Append brief inline comments or descriptions at the end of key file/folder names to clarify their primary roles.

## 3. Module & Component Specification
Provide an in-depth analysis of the code layering based on the Separation of Concerns (SoC) or Clean Architecture principles:
* **Root Configuration:** Roles and responsibilities of system configuration files such as `tsconfig.json`, `package.json`, and `vite.config.ts`.
* **Source Directory (`/src`):**
    * **Components / Views:** The structure and specific responsibilities of UI components.
    * **State Management / Context:** The application's state management system, illustrating data flow and state control.
    * **Services / API Layer:** Modules handling external communication or backend integrations.
    * **Utils / Helpers:** Centralized functions for mathematical calculations, logic processing, or helper utilities.
    * **Types / Interfaces:** Data model and type definitions using TypeScript.

## 4. Data Flow & Architecture Blueprint
* Describe the application lifecycle from the initial entry point (e.g., `main.ts` or `index.html`) through the rendering process on the user's screen.
* Illustrate the component hierarchy and how data flows between them.

## 5. Build & Deployment Pipeline
* **Development Workflow:** Commands utilized for local execution, debugging, and development.
* **Compilation Execution:** Explain the transpile and build process that converts TypeScript (`.ts`) into production-ready JavaScript (`.js`).
* **Target Directory:** The output structure generated in the destination folder (e.g., `/dist`) prepared for deployment on cloud platforms.

---

💡 Formatting Rules:
1. Adhere strictly to proper Markdown Typography (e.g., `#` for main headings, `##` for subheadings, and `*` for bullet points).
2. Utilize appropriate Code Blocks (e.g., ```typescript ... ```) when showcasing essential syntax examples or type declarations.
3. Emphasize logical traceability, integrating software engineering principles and theories where contextually appropriate.