---
name: Study Mats
mood: calm, precise, quietly modern; a study tool, not a marketing site
based_on: Linear's DESIGN.md (VoltAgent/awesome-design-md), adapted for long reading sessions and maths animation
---

# Study Mats design system

Read this before changing any UI. Tokens live at the top of `src/app.css` (`:root`).

## Principles
1. **Content first.** The lesson, the animation and the maths are the interface. Chrome stays quiet.
2. **Depth from surfaces, not shadows.** Use the surface ladder; shadows only on floating things (tooltips, pop quiz, notes panel).
3. **One accent.** Blue (`--blue`) is the only interactive accent: links, primary buttons, focus, current step.
4. **Subject colours are data, not decoration.** Math blue, Chemistry green, Physics purple, Materials gold appear only to label a subject (chips, lane dots, card top edges, bars).
5. **Motion explains.** Animate to show change (scroll reveal, a step appearing, a value easing), never to show off. Respect `prefers-reduced-motion`.

## Colour
| Token | Value | Use |
|---|---|---|
| `--bg` | `#08090b` | canvas |
| `--surface` | `#0f1216` | cards, panels |
| `--surface-2` | `#151920` | raised / selected |
| `--surface-3` | `#1b2028` | hover on raised |
| `--line` | `#22272f` | 1px hairlines |
| `--line-strong` | `#323843` | inputs, focused hairlines |
| `--text` | `#f2f4f7` | primary text |
| `--muted` | `#a3abb6` | secondary text |
| `--faint` | `#6c7480` | captions, disabled |
| `--blue` | `#58c4dd` | the accent |
| `--green` / `--red` | `#83c167` / `#fc6255` | right / wrong only |
| subject: math `#58c4dd`, chem `#83c167`, phys `#b48ad0`, mate `#f0ac5f` | | |

Don't: gradients on cards, more than one accent in a view, pure `#000` canvas, coloured fills behind body text.

## Type
- **UI and headings:** Inter (fallback system-ui). Display 600, tight tracking: h1 34px/-0.02em, h2 22px/-0.01em.
- **Long reading (Story tab):** Newsreader serif 19–20px, line-height 1.65, measure ≤ 72 characters.
- **Numbers, code, ticks:** JetBrains Mono 12–13px.
- **Eyebrows:** 12px, 600, uppercase, +0.08em, `--muted`.
- Body 16px/1.55. Never below 12px.

## Space, radius, borders
- 4px grid: 4, 8, 12, 16, 24, 32, 48, 96.
- Radius: 8 buttons and inputs, 12 cards, 16 large panels and the animation stage, 999 chips and pills only.
- Borders: always 1px `--line`; selected or hover goes to `--line-strong` or the subject colour.
- Content max width 1080px; story text max 720px.

## Components
- **Buttons:** primary = solid blue, dark text; ghost = transparent with hairline. 8px 14px padding, 14px/600.
- **Cards:** `--surface`, hairline, 12px radius, 16–24px padding. Hover lifts 2px and brightens the border; no shadow.
- **Chips:** pill, hairline; "on" state tints with the subject colour at ~14%.
- **Animation stage:** dark radial vignette behind a transparent WebGL canvas; caption bar below, never on top of the drawing.
- **Floating layers** (tooltip, pop quiz, notes): `#0b0e12`, hairline, one soft shadow `0 20px 60px rgba(0,0,0,.5)`.

## Motion
- Scroll reveal: `[data-reveal]` fades from 18px below, 600ms, `cubic-bezier(.2,.7,.2,1)`, once.
- Hover: 150–200ms colour/translate only.
- 3D/2D scenes: values ease exponentially (~5/s); curves draw in over ~1.4s on first show.
- Nothing loops forever except physical motion inside a scene (orbiting electrons, vibrating atoms).

## Accessibility
- Contrast ≥ 4.5:1 for text. Focus ring 2px `--blue` at 2px offset on every interactive element.
- Touch targets ≥ 40px on mobile. All animation has a static readout beside it.

## Themes and reading comfort
- Three themes: **dark** (default), **light** and **sepia**, set on `<html data-theme>` from the "Aa" menu (`src/state/prefs.js`, saved per device). Light and sepia redefine the same tokens in `src/features.css`; never hard-code a colour that only works on dark. Text on a solid accent uses `--on-accent`.
- The animation stage stays dark in every theme (a film screen); `.scene-stage` resets the tokens to the dark set.
- Text size scales the reading blocks of a class with `zoom: var(--read-scale)`; the top bar and the canvas keep their size.
- Focus mode (`data-focus="on"`) hides the top bar, pop-quiz button and notes handle. A faint "Leave focus · Esc" pill stays in the corner.

## App-feel components (src/features.css)
- **Today** is the home view: one hero card (the class to continue, with its parts as pills), Review and Streak cards beside it, then "Coming up" and the collection.
- **Search** (Ctrl K, ⌘K or "/"): a floating palette. Name matches are grouped (classes, glossary, people, materials, discoveries); text-only matches follow under "Also mentioned in".
- **Animation player**: one bar under the caption: previous, play, next, replay step · segmented scrub bar (one segment per step, the running one fills over its duration) · step count, speed (0.5–2×), narration, full screen. Keys while it has focus: space, ←/→, R, F.
- **Finishing moments**: the class recap card (what you learned, who, new collection cards, what it unlocks) and a streak toast at 3, 7, 14, 30, 50, 100… days. Confetti is CSS only and is skipped under reduced motion.
- **Collection**: Library "My collection" album. Cards are worked out from passed classes (`src/state/collection.js`), so nothing extra is saved.

## Library games (src/components/Challenges.jsx, src/components/Games.jsx)
- Four game shelves share the `ch-*` look: Design challenges, Failure detective, **Spot the microstructure** and **Estimate it**. Wins are saved as readings ids (`brief:`, `case:`, `spot:<micrograph id>`, `est:<question id>`).
- **Spot the microstructure**: 8 pictures a round from the Microscope pictures list. A Commons picture is used only if its own description matches the right answer's pattern and none of the wrong options', so the answer is never in doubt. Clue (costs a star) shows "what to notice" with the answer's words blanked. Needs internet; says so when offline.
- **Estimate it** (src/data/library/estimates.js): one slider on a powers-of-ten scale, then the real value on the same scale with a green ×10 band. Stars: within ×2 = 3, ×10 = 2, ×100 = 1. Every question carries its reasoning steps and sources.
