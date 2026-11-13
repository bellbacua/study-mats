import { useEffect, useState } from 'react';

// Reading comfort: colour theme, text size and focus mode. These are per-device
// choices (like a browser's zoom), so they live in this browser's storage, not
// in the saved progress. index.html applies the theme before the first paint.
export const THEMES = [
  { id: 'dark', label: 'Dark', swatch: ['#08090b', '#f2f4f7'] },
  { id: 'light', label: 'Light', swatch: ['#ffffff', '#16191d'] },
  { id: 'sepia', label: 'Sepia', swatch: ['#f4ecd8', '#3b2f22'] },
];
export const TEXT_SIZES = [
  { id: 's', label: 'Small', scale: 0.9 },
  { id: 'm', label: 'Normal', scale: 1 },
  { id: 'l', label: 'Large', scale: 1.12 },
  { id: 'xl', label: 'Extra large', scale: 1.25 },
];

const KEY = 'reading-prefs';
const DEFAULTS = { theme: 'dark', text: 'm', focus: false };

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}'), focus: false };
  } catch {
    return { ...DEFAULTS };
  }
}

let prefs = load();
const listeners = new Set();

function apply() {
  const root = document.documentElement;
  root.dataset.theme = prefs.theme;
  root.dataset.text = prefs.text;
  root.style.setProperty('--read-scale', String(TEXT_SIZES.find((t) => t.id === prefs.text)?.scale || 1));
  if (prefs.focus) root.dataset.focus = 'on';
  else delete root.dataset.focus;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = THEMES.find((t) => t.id === prefs.theme)?.swatch[0] || '#08090b';
}
if (typeof document !== 'undefined') apply();

export function setPrefs(patch) {
  prefs = { ...prefs, ...patch };
  try {
    // Focus mode is for this sitting only: the app always opens normally.
    localStorage.setItem(KEY, JSON.stringify({ theme: prefs.theme, text: prefs.text }));
  } catch {
    /* private window: the choice just isn't remembered */
  }
  apply();
  listeners.forEach((fn) => fn(prefs));
}

export function usePrefs() {
  const [p, setP] = useState(prefs);
  useEffect(() => {
    listeners.add(setP);
    return () => listeners.delete(setP);
  }, []);
  return [p, setPrefs];
}
