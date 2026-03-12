import { useState, useEffect } from 'react';
import { ASSETS } from '../data/assetPaths';
import { getGeminiTransformedImage } from '../services/gemini';

/**
 * Provides human image and Spider-Man (transformed) image for scroll morph.
 * Tries Gemini first; falls back to assets folder Spider-Man image.
 */
export function useTransformedImage() {
  const [spidermanSrc, setSpidermanSrc] = useState<string>(ASSETS.images.spiderman);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const transformed = await getGeminiTransformedImage(
          window.location.origin + ASSETS.images.profile
        );
        if (!cancelled && transformed) {
          setSpidermanSrc(transformed);
        }
      } catch {
        // keep fallback asset
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    humanSrc: ASSETS.images.profile,
    spidermanSrc,
    ready,
  };
}
