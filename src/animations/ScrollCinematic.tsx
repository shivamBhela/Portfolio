import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransformedImage } from '../hooks/useTransformedImage';
// Bundled fallback so image always resolves (Vite will hash the path)
import fallbackHero from '../assets/142032.793e80d3-3e80-48de-b26e-c2a26c3e42fe.jpg';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic scroll morph: Human face → Spider-Man (opacity blend) → Portfolio UI in front.
 * Stage 1: Human image. Stage 2: Mask forming. Stage 3: Full Spider-Man. Stage 4: UI reveal.
 */
const ScrollCinematic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { spidermanSrc, ready } = useTransformedImage();
  const humanImageSrc = fallbackHero;
  const spideyImageSrc = spidermanSrc || fallbackHero;
  const sectionRef = useRef<HTMLDivElement>(null);
  const humanLayerRef = useRef<HTMLDivElement>(null);
  const spideyLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    const humanLayer = humanLayerRef.current;
    const spideyLayer = spideyLayerRef.current;
    const content = contentRef.current;
    if (!section || !humanLayer || !spideyLayer || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        scrub: 1.2,
        pin: true,
      },
    });

    // Stage 1 → 2: Human visible, then mask starts forming (Spider-Man fades in)
    tl.fromTo(
      spideyLayer,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.inOut' },
      0.2
    );

    // Stage 2 → 3: Human fades out as Spider-Man takes over
    tl.to(humanLayer, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 0.8);

    // Stage 3: Full Spider-Man visible (scale/position for background)
    tl.to(
      spideyLayer,
      { scale: 0.9, duration: 0.8, ease: 'power2.inOut' },
      1.5
    );

    // Stage 4: Portfolio UI appears in front
    tl.to(content, { opacity: 1, duration: 1, ease: 'power2.inOut' }, 2.2);

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [ready]);

  return (
    <>
      <div ref={sectionRef} className="relative w-full" style={{ height: '400vh' }}>
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
          {/* Stage 1–3: Human + Spider-Man layers (opacity mask transition) */}
          <div className="absolute inset-0">
            {/* Human face — high resolution, no upscale blur */}
            <div
              ref={humanLayerRef}
              className="absolute inset-0"
              style={{ opacity: 1 }}
            >
              <img
                src={humanImageSrc}
                alt="Shivam Bhela"
                className="w-full h-full object-cover object-center"
                style={{ imageRendering: 'auto' }}
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </div>
            {/* Spider-Man (Gemini-edited or asset) — fades in over human */}
            <div
              ref={spideyLayerRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: 0 }}
            >
              <img
                src={spideyImageSrc}
                alt=""
                className="w-full h-full object-contain object-center max-w-full max-h-full"
                style={{ imageRendering: 'auto' }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Stage 4: Portfolio UI in front */}
          <div
            ref={contentRef}
            className="absolute inset-0 z-10 flex flex-col justify-end opacity-0 pointer-events-none"
          >
            <div className="pb-24 px-4 text-center">
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                Shivam <span className="text-spidey-red">Bhela</span>
              </h2>
              <p className="text-white/90 uppercase tracking-[0.3em] text-sm mt-2">
                AI & Hardware Innovator
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-black">
        {children}
      </div>
    </>
  );
};

export default ScrollCinematic;
