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
