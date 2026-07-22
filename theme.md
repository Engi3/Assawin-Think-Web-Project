# CodeNest Theme — Design System Spec

Purpose: reference doc so any future AI/dev session can build a new
`canvas.html` lesson page (or any new marketing page) that visually matches
the CodeNest brand without re-reading the whole codebase. Source spec:
`CodeNest Coding Platform.md` (hero section prompt). This file generalizes
that one-off prompt into reusable tokens + components.

Two contexts use this theme today:
1. **Next.js app** (`src/`) — uses Tailwind + CSS vars in `src/app/globals.css`.
   Existing `--primary`/`--secondary`/`--border` tokens drive the interactive
   simulation labs (orange brand) and must **not** be repointed at CodeNest
   green — that would break `bg-primary text-white` contrast across ~15
   simulation components. CodeNest tokens live *additively* as `--codenest-*`
   vars and `.codenest-*` utility classes (see `globals.css`).
2. **Standalone `canvas.html` lesson pages** (`public/simulations/<course>/canvas.html`)
   — plain HTML/CSS/JS, no Tailwind build step. Use the vanilla CSS block
   in "§6 Vanilla HTML/CSS Kit" below directly in a `<style>` tag.

---

## 1. Color Tokens

| Token | Value | Use |
|---|---|---|
| `--codenest-bg` | `#070b0a` | Page background (dark, near-black green) |
| `--codenest-accent` | `#5ed29c` | Brand accent — cyan/green, CTAs, eyebrow text, glow |
| `--codenest-accent-ink` | `#070b0a` | Text color placed ON `--codenest-accent` (dark, for contrast) |
| `white / 10%` | `rgba(255,255,255,0.1)` | Hairline borders, grid lines |
| `white / 60%` | `rgba(255,255,255,0.6)` | Card border gradient top |
| `white / 70%` | `rgba(255,255,255,0.7)` | Body copy on dark bg |

Rule: **never** put white text on `--codenest-accent` — it's a light color,
text on it must be `--codenest-accent-ink`.

## 2. Typography

| Role | Font | Weight/Style | Size |
|---|---|---|---|
| Eyebrow label | Plus Jakarta Sans | Bold | 11px, uppercase, `tracking: 0.2em` |
| Main headline | Inter | Extra Bold, uppercase, tight tracking | 40px mobile → 72px desktop |
| Headline accent word | Instrument Serif | italic | inline, same size as surrounding word |
| Headline final period | — | color `--codenest-accent` | — |
| Body/description | Inter | Regular, 70% white opacity on dark bg | 14px, max-width 512px |
| Nav links | Inter | Regular | 16px, hover → `--codenest-accent` |
| Glass card tag | Inter | Regular | 14px |
| Glass card headline | Inter + Instrument Serif italic | — | 18px |
| Glass card description | Inter | Regular | 11px |

Fonts to load: **Inter**, **Plus Jakarta Sans**, **Instrument Serif** (italic cut).

## 3. Layout Primitives

- **Grid overlay**: 3 vertical hairlines at 25% / 50% / 75% of viewport width,
  `white/10` opacity, desktop only (`lg:` breakpoint, hidden on mobile).
- **Center-top glow**: large horizontal SVG/CSS ellipse, cyan-green hue,
  25px Gaussian blur, positioned center-top behind headline.
- **Video/background overlay**: if a full-bleed video/image background is
  used, apply 60% opacity + linear gradient `#070b0a → transparent` from the
  left, plus a bottom-up gradient for text legibility.
- **Liquid Glass card**: 200×200px, floats above the main headline, shifted
  `-50px` up (`translate-y-[-50px]`). See CSS in §5/§6.

## 4. Components

### Navigation
- Sticky/absolute header, transparent-to-blurred on scroll.
- Logo: minimalist mark, white or `--codenest-accent`.
- Desktop links: `PROJECTS / BLOG / ABOUT / RESUME` (or site-equivalent),
  Inter 16px, hover `--codenest-accent`.
- Mobile: hamburger → full-screen dark overlay menu.

### Primary CTA button
- Pill (`rounded-full`), background `--codenest-accent`, text
  `--codenest-accent-ink`, bold uppercase, trailing arrow icon
  (`lucide-react: ArrowRight`), slight scale-up on hover/active.
- Class: `.codenest-cta` in `globals.css`.

### Liquid Glass card
- `background: rgba(255,255,255,0.01)` with `background-blend-mode: luminosity`.
- `backdrop-filter: blur(4px)`.
- `box-shadow: inset 0 1px 1px rgba(255,255,255,0.1)`.
- Border: `::before`, `inset: 0`, `padding: 1.4px`, 180° white gradient,
  masked with `mask-composite: exclude` for a crisp hairline frame (no fill).
- Class: `.codenest-glass` in `globals.css`.

### Eyebrow label
- Small bold uppercase tag above a headline, `--codenest-accent` color.
- Class: `.codenest-eyebrow`.

## 5. Tailwind/Next.js Usage (this repo)

Tokens live in `src/app/globals.css` under `:root { --codenest-* }` and are
**not** wired into `@theme inline` (so they don't override `bg-primary`,
`text-primary`, etc. used by the simulation labs). Reference them directly:

```tsx
<div className="bg-[var(--codenest-accent)] text-[var(--codenest-accent-ink)]">
<span className="codenest-eyebrow">Career-Ready Curriculum</span>
<button className="codenest-cta">Get Started <ArrowRight className="h-4 w-4" /></button>
<div className="codenest-glass w-[200px] h-[200px] -translate-y-[50px]">...</div>
```

If a full CodeNest-branded landing page is built later (e.g. a new
`/[locale]/codenest` marketing route), it's fine to import Instrument Serif
+ Plus Jakarta Sans via `next/font` in that route's layout only — don't add
them to the root layout, since the rest of the app uses Geist Sans/Mono.

## 6. Vanilla HTML/CSS Kit (for `canvas.html` lesson pages)

Standalone lesson pages under `public/simulations/**/canvas.html` have no
Tailwind/build step. Drop this into a `<style>` block to match the theme:

```html
<style>
  :root {
    --bg: #070b0a;
    --accent: #5ed29c;
    --accent-ink: #070b0a;
    --fg: #f1f5f9;
    --fg-muted: rgba(241, 245, 249, 0.7);
    --border: rgba(255, 255, 255, 0.1);
  }
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: 'Inter', 'Segoe UI', sans-serif;
    margin: 0;
  }
  .eyebrow {
    color: var(--accent);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }
  .headline {
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    font-size: clamp(40px, 6vw, 72px);
  }
  .headline .accent { color: var(--accent); }
  .headline em { font-family: 'Instrument Serif', serif; font-style: italic; }
  .cta {
    background: var(--accent);
    color: var(--accent-ink);
    border: none;
    border-radius: 999px;
    padding: 1rem 2rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .glass-card {
    position: relative;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    border-radius: 20px;
  }
  .glass-card::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1.4px;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
</style>
```

Notes for lesson (not landing-page) canvas files specifically:
- These render **inside an iframe** in `LessonDisplay.tsx` (fixed height
  container, not full viewport) — skip the full-screen video background and
  3-line grid overlay; keep the dark bg + accent color + glass-card language
  since those read fine at iframe scale.
- Keep interactive canvas/SVG diagram elements legible: use `--fg` on
  `--bg`, reserve `--accent` for correct/active/highlighted states so it
  doesn't visually compete with the diagram itself.
- Load fonts via Google Fonts `<link>` tag (no bundler available):
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Plus+Jakarta+Sans:wght@700&family=Instrument+Serif:ital@1&display=swap`.

## 7. Icons

`lucide-react` for the Next.js app (already a dependency). For vanilla
`canvas.html` pages, either inline SVG copies of the specific icons needed
(ArrowRight, Menu, X) or skip icons rather than pulling in a CDN icon font.
