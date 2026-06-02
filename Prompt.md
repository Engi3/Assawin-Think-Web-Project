# Role and Objective
You are an expert Frontend Developer and Educator specializing in Next.js, React, Tailwind CSS, and Bootstrap 5. 
Your task is to generate the complete code and folder structure for a personal teacher portfolio and E-Learning website for "Teacher Assawin Namsert", specializing in "Mechatronics and Robotics".

# Tech Stack
- Framework: Next.js (App Router preferred for modern routing)
- Styling: Tailwind CSS (Primary for layout and utility classes) and Bootstrap 5 (for specific pre-built UI components, ensure no class conflicts). HTML/CSS/JS.

# Target Audience & Theme
- Audience: Students, academic peers, and visitors interested in Mechatronics and Robotics.
- Theme/Design: Professional, modern, and tech-oriented (colors like robotic blue, steel gray, and clean white).

# Site Architecture (Sitemap)

## 1. Home / About Page (`/`)
This is the landing page. It should contain:
- **Hero Section:** Teacher's name (Assawin Namsert), title, department, and a welcoming professional photo area.
- **Biography (About Me):** Educational background, expertise, and teaching philosophy.
- **Portfolio & Related Works:** A grid or carousel showcasing research, projects, or publications.
- **Other Essential Info:** Contact information, social/academic links (e.g., GitHub, ResearchGate).

## 2. Courses List Page (`/courses`)
A page displaying all currently taught subjects.
- **UI:** A responsive Grid layout of "Course Cards".
- **Course Card:** Should show Course Image, Course Code, Course Name, and a short description.
- **Scalability:** Must fetch data from a JSON array or mock database so new courses can be easily added in the future.

## 3. Course Detail Page (`/courses/[courseId]`)
Dynamic routing page for a specific course.
- **Header:** Course title and full course description (Syllabus).
- **Online Lessons Section:** A list or accordion displaying all available online lessons for this specific course. Each item links to the lesson page.

## 4. Lesson Content Page (`/courses/[courseId]/lessons/[lessonId]`)
Dynamic routing page for the actual online lesson.
- **Sidebar/Navigation:** To easily switch between lessons within the same course.
- **Content Area:** - Lesson Title.
  - Video placeholder (e.g., YouTube embed).
  - Text content / HTML descriptions.
  - Downloadable resources section.
- **Pagination:** "Previous Lesson" and "Next Lesson" buttons.

# Requirements for the Generated Code
1. **File Structure:** Please provide a clear Next.js folder structure (e.g., `app/page.tsx`, `app/courses/page.tsx`, etc.).
2. **Mock Data:** Create a `data.js` or `courses.json` file containing mock data for at least 2 courses and 3 lessons each, to demonstrate how dynamic routing works.
3. **Components:** Separate reusable components like `Navbar`, `Footer`, `CourseCard`, and `LessonSidebar`.
4. **Responsive Design:** Ensure the entire site is mobile-friendly using Tailwind's responsive prefixes (e.g., `md:`, `lg:`).
5. **Clear Comments:** Add detailed comments in Thai to explain how to add new courses and lessons in the future.

Please generate the file structure, the mock data file, and the core page codes step-by-step.