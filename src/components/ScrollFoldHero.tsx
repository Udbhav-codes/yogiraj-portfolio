import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFoldHeroProps {
  /** Exactly 3 image URLs: left, center (hero), right. */
  images: [string, string, string];
  alts?: [string, string, string];
  /** Extra scroll distance (as a multiple of viewport height) the fold takes to complete. */
  scrollLength?: number;
  className?: string;
  id?: string;
  /** Overlay content (headline, CTAs, etc.) rendered above the images, unaffected by the fold. */
  children?: ReactNode;
}

/**
 * Scroll-driven hero: 3 panels start side-by-side, then the outer two fold
 * away (diagonal, translate + rotate + skew, pivoting from their top-inner
 * corner) while the center panel scales up to fill the section — driven
 * entirely by scroll progress via GSAP ScrollTrigger (scrub + pin).
 */
export default function ScrollFoldHero({
  images,
  alts = ["", "", ""],
  scrollLength = 1.3,
  className = "",
  id,
  children,
}: ScrollFoldHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      const [panel1, panel2, panel3] = panelRefs.current;
      if (!panel1 || !panel2 || !panel3) return;

      gsap.set(panel1, { transformOrigin: "top right", zIndex: 10 });
      gsap.set(panel3, { transformOrigin: "top left", zIndex: 10 });
      gsap.set(panel2, { transformOrigin: "center center", zIndex: 20 });

      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };

          const outerX = isMobile ? 12 : 20;
          const outerY = isMobile ? 55 : 78;
          const outerRotate = isMobile ? 7 : 13;
          const outerSkew = isMobile ? 6 : 11;
          const outerTiltX = isMobile ? 8 : 16;
          const centerScale = isMobile ? 2.25 : 3.15;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${scrollLength * 100}%`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "power2.inOut" },
          });

          tl.to(
            panel1,
            {
              xPercent: -outerX,
              yPercent: outerY,
              rotateZ: -outerRotate,
              rotateX: outerTiltX,
              skewY: outerSkew,
              scale: 0.82,
              opacity: 0,
            },
            0
          )
            .to(
              panel3,
              {
                xPercent: outerX,
                yPercent: outerY,
                rotateZ: outerRotate,
                rotateX: outerTiltX,
                skewY: -outerSkew,
                scale: 0.82,
                opacity: 0,
              },
              0
            )
            .to(panel2, { scale: centerScale }, 0);

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );
    }, section);

    return () => ctx.revert();
  }, [scrollLength]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative h-[100svh] w-full overflow-hidden bg-midnight ${className}`}
      style={{ perspective: 1600 }}
    >
      <div className="absolute inset-0 flex">
        {images.map((src, i) => (
          <div
            key={src + i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="relative h-full w-1/3 flex-shrink-0 overflow-hidden will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={src}
              alt={alts[i] ?? ""}
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-midnight/35" />
          </div>
        ))}
      </div>

      {children}
    </section>
  );
}
