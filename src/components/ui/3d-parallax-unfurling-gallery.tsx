import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const DEFAULT_IMAGES = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67].map(
  (n) => `/photos/cocktail-food/cocktail-food-${String(n).padStart(2, "0")}.jpg`
);

function ImageCard({ src }: { src: string }) {
  return (
    <div className="relative h-[200px] w-full flex-shrink-0 cursor-pointer bg-[#111] transition-transform duration-300 will-change-transform hover:scale-[1.02] sm:h-[300px] md:h-[400px]">
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  );
}

export default function Component({
  id,
  images = DEFAULT_IMAGES,
}: {
  id?: string;
  images?: string[];
}) {
  const containerRef = useRef<HTMLElement>(null);

  const cols = useMemo(() => {
    const make = (mod: number) => {
      const base = images.filter((_, i) => i % 4 === mod);
      return [...base, ...base];
    };
    return [make(0), make(1), make(2), make(3)];
  }, [images]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  const bannerWidth = useTransform(p, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(p, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(p, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(p, [0, 0.15], ["4px", "0px"]);

  const rotateY = useTransform(p, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(p, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(p, [0.15, 1], [15, 2]);
  const translateZ = useTransform(p, [0.15, 1], [-800, 0]);

  const yCols = [
    useTransform(p, [0.15, 1], ["0%", "-40%"]),
    useTransform(p, [0.15, 1], ["-40%", "10%"]),
    useTransform(p, [0.15, 1], ["0%", "-40%"]),
    useTransform(p, [0.15, 1], ["-30%", "20%"]),
  ];

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative h-[500vh] w-full bg-[#050505] text-white"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "#2c2738",
          }}
          className="relative mx-auto flex max-w-[1920px] items-center justify-center overflow-hidden bg-black will-change-transform"
        >
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(0,0,0,1),inset_0_-100px_150px_-50px_rgba(0,0,0,1)]" />
            <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(0,0,0,1),inset_-150px_0_150px_-50px_rgba(0,0,0,1)]" />

            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex h-[150vh] w-[120vw] origin-center items-center justify-center gap-4 will-change-transform md:gap-6"
            >
              {cols.map((col, ci) => (
                <motion.div
                  key={ci}
                  style={{ y: yCols[ci] }}
                  className="pointer-events-auto flex w-[22vw] min-w-[200px] flex-col gap-4 md:gap-6"
                >
                  {col.map((src, i) => (
                    <ImageCard key={`${ci}-${i}`} src={src} />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
