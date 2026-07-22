# Manual — Project Management Guide (for developers)

How to run the project and add/edit content (courses, units, lessons,
simulations) without touching app logic. For visual/brand rules, see
[theme.md](theme.md).

## 1. Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, type-checks via next build
npm run start   # serve the build
npm run lint
```

Stack: Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion.
Content is "Git as a CMS" — JSON files under `src/content/`, no database.

## 2. Where things live

```
src/
  app/[locale]/
    page.tsx                                  # landing page (profile/portfolio)
    courses/page.tsx                          # course list
    courses/[courseId]/page.tsx               # course detail + lesson list
    courses/[courseId]/lessons/[lessonId]/
      layout.tsx                              # lesson sidebar nav (prev/next chapter)
      page.tsx                                # single lesson page
  components/
    Navbar.tsx, Footer.tsx, CourseCard.tsx     # shell + list UI
    LessonDisplay.tsx                          # renders lesson body + iframe + resources
    simulations/SimulationManager.tsx          # maps lesson.simulationId -> React sim component
    simulations/*.tsx                         # individual interactive labs
  content/
    courses/<courseSlug>/course.json          # one course's metadata
    courses/<courseSlug>/lessons.json         # array of that course's lessons
    profile/profile.json, portfolio.json      # landing page data
  dictionaries/en.json, th.json               # UI copy (nav labels, buttons, etc.)
  lib/
    content-api.ts                            # reads content/ JSON -> typed Course/Lesson
    get-dictionary.ts                         # loads en.json/th.json
public/
  assets/courses/<courseSlug>/<image>         # course cover images, worksheets
  simulations/<courseSlug>/canvas.html        # standalone HTML lesson embeds (see §5)
```

`<courseSlug>` is the folder name under `src/content/courses/` — it becomes
the `course.id` / URL segment (`/en/courses/<courseSlug>`).

## 3. Add a new course

1. Create `src/content/courses/<new-slug>/course.json`:

```json
{
  "id": "<new-slug>",
  "code": "COURSE-CODE",
  "title_en": "English Title",
  "title_th": "ชื่อภาษาไทย",
  "description_en": "One-paragraph course summary (English).",
  "description_th": "สรุปรายวิชาหนึ่งย่อหน้า (ไทย)",
  "image": "/assets/courses/<new-slug>/cover.jpg",
  "syllabus_en": "Longer syllabus text (English).",
  "syllabus_th": "เนื้อหารายละเอียดรายวิชา (ไทย)"
}
```

2. Create `src/content/courses/<new-slug>/lessons.json` — start with `[]`
   or one lesson (see §4).
3. Drop the cover image at `public/assets/courses/<new-slug>/cover.jpg`.
4. Nothing else to wire up — `content-api.ts` reads every folder under
   `src/content/courses/` automatically (`getCourses()`), so the new course
   appears on `/courses` immediately.

## 4. Add a unit/lesson to a course

Append an object to that course's `lessons.json`:

```json
{
  "id": "unique-lesson-slug",
  "title_en": "Chapter N: Topic Name",
  "title_th": "บทที่ N: ชื่อหัวข้อ",
  "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
  "iframeUrl": "/simulations/<courseSlug>/unit_N.html",
  "content_en": "Lesson body text (English). Supports **markdown-ish** bold via LessonDisplay's plain rendering — currently literal, keep formatting simple.",
  "content_th": "เนื้อหาบทเรียน (ไทย)",
  "simulationId": "some-sim-id",
  "resources": [
    { "name_en": "Worksheet", "name_th": "ใบงาน", "url": "/assets/courses/<courseSlug>/worksheet.pdf" }
  ]
}
```

Field notes:
- `id` must be unique within the course; it's the URL segment
  (`/lessons/<id>`) and the sidebar nav key in `layout.tsx`.
- `videoUrl` (YouTube embed) and `iframeUrl` (any embeddable page, typically
  your own `canvas.html`/`unit_N.html`) are both optional — omit either you
  don't use. `iframeUrl` renders inside `LessonDisplay.tsx` with a
  full-screen toggle.
- `simulationId` is optional. Only set it if a matching React component
  exists in `SimulationManager.tsx` (see §5) — otherwise a "Coming Soon"
  placeholder renders, which is fine as a stub.
- `resources[].url` — path into `public/assets/courses/<courseSlug>/`.
- Lesson order = array order in `lessons.json`; there's no separate sort
  field.

The lesson order in `lessons.json` also drives the prev/next chapter
sidebar in `.../lessons/[lessonId]/layout.tsx` — no separate config needed.

## 5. Add an interactive simulation (React lab)

Used for labs embedded directly in the Next.js bundle (not standalone HTML).

1. Build the component in `src/components/simulations/YourSim.tsx`
   (`"use client"`, accepts a `locale: string` prop, bilingual strings
   inline via `locale === 'en' ? ... : ...`).
2. Register it in `src/components/simulations/SimulationManager.tsx`:
   - import it,
   - add `{simulationId === "your-sim-id" && <YourSim locale={locale} />}`,
   - add `"your-sim-id"` to the fallback exclusion array.
3. Set `"simulationId": "your-sim-id"` on the relevant lesson in
   `lessons.json`.

## 6. Add a standalone `canvas.html` lesson (no React)

Used when a lesson needs a full custom HTML/JS/canvas page (drawing tools,
free-form diagrams) instead of a parameterized React component, or when you
want an AI (e.g. a future Claude session) to generate the whole page from a
prompt.

1. Create `public/simulations/<courseSlug>/canvas.html` (or
   `unit_N.html` for a specific chapter — see the `measurement-and-control`
   folder for the multi-unit pattern: `unit_1.html` … `unit_6.html`).
2. Style it using the vanilla CSS kit in [theme.md §6](theme.md#6-vanilla-htmlcss-kit-for-canvashtml-lesson-pages)
   so it matches the CodeNest look (dark bg, `#5ed29c` accent).
3. Point the lesson's `iframeUrl` at `/simulations/<courseSlug>/<file>.html`
   (paths under `public/` are served from site root).
4. Remember it renders inside a fixed-height iframe, not the full viewport —
   skip full-screen video backgrounds; keep it self-contained (no imports
   from `src/`, since it's served as a static file, not bundled by Next.js).

Shared assets already exist under `public/simulations/_shared/` — reuse them
instead of re-writing from scratch:
- `codenest-canvas.css` — the dark theme, header/eyebrow, toolbar, canvas,
  slider, and readout styles used by every canvas.html page so far.
- `codenest-canvas-engine.js` — a generic "stamp a component, then wire two
  of them together" node-editor engine (auto-saves to `localStorage`). Point
  a page at it via `window.CANVAS_CONFIG`-style init call — see
  `digital-basics/canvas.html`, `mct101/canvas.html`, or
  `measurement-and-control/canvas.html` for the ~40-line wiring.

For anything that isn't a stamp-and-wire diagram (a live calculator, a
kinematics visualizer, a ladder-diagram builder), write bespoke `<script>`
logic in the page itself but still link the shared CSS for a consistent
look — see `rob201/canvas.html` (slider-driven 2-link arm) and
`measurement-and-control/unit_6.html` (ladder rung builder) for that pattern.

When briefing an AI to generate one of these pages, hand it `theme.md`
directly plus the lesson's learning objective — that's exactly what
`theme.md` §6 was written for.

## 7. Update UI copy / add a new language string

Add the same key to **both** `src/dictionaries/en.json` and `th.json`
(same nested path), then reference it in a component via the `dict` prop,
e.g. `dict.courses.enter_course`. Missing keys render `undefined` silently —
always add to both files together.

## 8. Theming

Global CSS vars + Tailwind utility classes live in `src/app/globals.css`.
- `--primary` / `--secondary` / `--border` / `--accent` — the site's base
  orange brand, driving every simulation lab (`bg-primary`, `text-primary`,
  etc. via Tailwind). Changing these affects the whole app.
- `--codenest-*` vars and `.codenest-*` classes — additive CodeNest brand
  layer (dark bg, green accent) used for the Navbar logo mark and course
  code badges today, and available for any new marketing/landing surface.
  See [theme.md](theme.md) for full spec and rationale for why it's kept
  separate from `--primary`.

## 9. Sanity checklist before shipping content changes

- [ ] Every new/edited JSON is valid (`npm run build` will fail loudly on
      broken JSON since `content-api.ts` uses `JSON.parse` with no try/catch).
- [ ] `_en` and `_th` fields both filled — the site has no fallback if one
      is missing, it'll just render blank for that locale.
- [ ] Image/PDF paths under `public/` actually exist (case-sensitive on
      Linux hosting even if Windows dev doesn't complain).
- [ ] New `simulationId` either has a registered component in
      `SimulationManager.tsx` or is intentionally left as "Coming Soon".
- [ ] `npm run build` passes (also type-checks all `.tsx`).
