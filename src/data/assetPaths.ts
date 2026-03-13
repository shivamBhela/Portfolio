/**
 * Centralized asset paths. Images in public/ are served at base URL.
 * Ensure files exist in public/assets/images/
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '') || '';

export const ASSETS = {
  images: {
    profile: `${BASE}/assets/images/profile.jpg`,
    hero: `${BASE}/assets/images/hero.jpg`,
    heroCinematic: `${BASE}/assets/images/hero_cinematic.png`,
    heroEdited: `${BASE}/assets/images/hero.jpg`,
    spiderman: `${BASE}/assets/images/hero.jpg`,
    defaultCard: `${BASE}/assets/images/hero.jpg`,
  },
} as const;
