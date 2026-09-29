import { motion, useTransform } from "framer-motion";
import { globalPointerX, globalPointerY } from "../lib/globalPointer";

/**
 * A small set of hand-drawn, line-art optics motifs — an aperture iris, lens
 * rings, a film-strip sprocket edge, a viewfinder's crop-mark corners, and a
 * light-ray burst. Stroke-only, currentColor, so each instance just needs a
 * text color + opacity from its wrapper. These are the recurring visual
 * vocabulary for a cinematographer's site: the actual hardware of the trade,
 * not decorative blobs.
 */
function ApertureIris({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1" />
      <polygon points="50,10 81,29 81,71 50,90 19,71 19,29" stroke="currentColor" strokeWidth="1" />
      <polygon points="50,27 65,37.5 65,62.5 50,73 35,62.5 35,37.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
}

function LensRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
  );
}

function FilmSprocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 120" fill="none" className={className} aria-hidden="true">
      <rect x="1" y="1" width="38" height="118" stroke="currentColor" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="5" y={9 + i * 22} width="6" height="9" stroke="currentColor" strokeWidth="1" />
          <rect x="29" y={9 + i * 22} width="6" height="9" stroke="currentColor" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function CropMarks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path d="M8 28 V8 H28" stroke="currentColor" strokeWidth="2" />
      <path d="M72 8 H92 V28" stroke="currentColor" strokeWidth="2" />
      <path d="M92 72 V92 H72" stroke="currentColor" strokeWidth="2" />
      <path d="M28 92 H8 V72" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LightRays({ className }: { className?: string }) {
  const lines = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const inner = 14;
    const outer = i % 2 === 0 ? 48 : 34;
    return {
      x1: 50 + Math.cos(a) * inner,
      y1: 50 + Math.sin(a) * inner,
      x2: 50 + Math.cos(a) * outer,
      y2: 50 + Math.sin(a) * outer,
    };
  });
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

const MOTIFS = [ApertureIris, LensRings, FilmSprocket, CropMarks, LightRays];

interface Placement {
  Motif: (typeof MOTIFS)[number];
  top: string;
  left: string;
  size: number;
  rotate: number;
  opacity: number;
  depth: number; // parallax strength
  idleDuration: number;
}

function Scattered({ p }: { p: Placement }) {
  const x = useTransform(globalPointerX, [-1, 1], [-14 * p.depth, 14 * p.depth]);
  const y = useTransform(globalPointerY, [-1, 1], [-14 * p.depth, 14 * p.depth]);
  const { Motif } = p;
  return (
    <motion.div
      className="absolute text-[#1A1A1A]"
      style={{ top: p.top, left: p.left, width: p.size, height: p.size, opacity: p.opacity, x, y }}
      animate={{ rotate: [p.rotate, p.rotate + 6, p.rotate - 6, p.rotate] }}
      transition={{ duration: p.idleDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      <Motif className="h-full w-full" />
    </motion.div>
  );
}

// Fixed, hand-placed layout per instance — "random" in feel, not literally
// randomized on every render (which would jump around on re-render/HMR).
// Spread across the full 0–100% height so long, scrollable sections stay
// populated throughout, not just near the top.
const LAYOUTS: Placement[][] = [
  [
    { Motif: ApertureIris, top: "3%", left: "85%", size: 130, rotate: -8, opacity: 0.18, depth: 1.6, idleDuration: 26 },
    { Motif: FilmSprocket, top: "13%", left: "3%", size: 65, rotate: 4, opacity: 0.15, depth: 1, idleDuration: 32 },
    { Motif: CropMarks, top: "7%", left: "44%", size: 75, rotate: 0, opacity: 0.14, depth: 0.7, idleDuration: 40 },
    { Motif: LensRings, top: "28%", left: "94%", size: 100, rotate: 0, opacity: 0.16, depth: 1.3, idleDuration: 30 },
    { Motif: LightRays, top: "36%", left: "14%", size: 115, rotate: 0, opacity: 0.15, depth: 1.1, idleDuration: 22 },
    { Motif: ApertureIris, top: "52%", left: "60%", size: 95, rotate: 14, opacity: 0.14, depth: 0.9, idleDuration: 34 },
    { Motif: FilmSprocket, top: "66%", left: "90%", size: 75, rotate: -5, opacity: 0.16, depth: 1.4, idleDuration: 28 },
    { Motif: CropMarks, top: "60%", left: "4%", size: 85, rotate: 0, opacity: 0.13, depth: 0.8, idleDuration: 38 },
    { Motif: LensRings, top: "84%", left: "36%", size: 145, rotate: 0, opacity: 0.15, depth: 1.2, idleDuration: 24 },
    { Motif: LightRays, top: "91%", left: "78%", size: 105, rotate: 0, opacity: 0.14, depth: 1, idleDuration: 30 },
  ],
  [
    { Motif: LightRays, top: "4%", left: "20%", size: 125, rotate: 0, opacity: 0.16, depth: 1.2, idleDuration: 28 },
    { Motif: LensRings, top: "11%", left: "70%", size: 95, rotate: 0, opacity: 0.15, depth: 1.5, idleDuration: 34 },
    { Motif: ApertureIris, top: "24%", left: "4%", size: 90, rotate: -6, opacity: 0.17, depth: 0.8, idleDuration: 24 },
    { Motif: CropMarks, top: "33%", left: "90%", size: 78, rotate: 0, opacity: 0.14, depth: 1.1, idleDuration: 36 },
    { Motif: FilmSprocket, top: "44%", left: "42%", size: 62, rotate: 8, opacity: 0.15, depth: 1, idleDuration: 30 },
    { Motif: LensRings, top: "54%", left: "82%", size: 135, rotate: 0, opacity: 0.14, depth: 0.9, idleDuration: 26 },
    { Motif: ApertureIris, top: "64%", left: "13%", size: 105, rotate: 10, opacity: 0.16, depth: 1.3, idleDuration: 32 },
    { Motif: LightRays, top: "75%", left: "58%", size: 90, rotate: 0, opacity: 0.13, depth: 1.4, idleDuration: 22 },
    { Motif: CropMarks, top: "85%", left: "7%", size: 82, rotate: 0, opacity: 0.15, depth: 0.7, idleDuration: 38 },
    { Motif: FilmSprocket, top: "90%", left: "70%", size: 68, rotate: -4, opacity: 0.14, depth: 1, idleDuration: 30 },
  ],
  [
    { Motif: CropMarks, top: "5%", left: "92%", size: 92, rotate: 0, opacity: 0.15, depth: 1.1, idleDuration: 30 },
    { Motif: FilmSprocket, top: "9%", left: "9%", size: 70, rotate: 5, opacity: 0.16, depth: 1, idleDuration: 34 },
    { Motif: ApertureIris, top: "21%", left: "50%", size: 105, rotate: -10, opacity: 0.17, depth: 0.9, idleDuration: 26 },
    { Motif: LightRays, top: "31%", left: "80%", size: 118, rotate: 0, opacity: 0.14, depth: 1.3, idleDuration: 24 },
    { Motif: LensRings, top: "41%", left: "6%", size: 98, rotate: 0, opacity: 0.15, depth: 0.8, idleDuration: 38 },
    { Motif: CropMarks, top: "50%", left: "64%", size: 78, rotate: 0, opacity: 0.13, depth: 1.2, idleDuration: 28 },
    { Motif: ApertureIris, top: "60%", left: "24%", size: 112, rotate: 12, opacity: 0.16, depth: 1, idleDuration: 32 },
    { Motif: FilmSprocket, top: "71%", left: "89%", size: 60, rotate: -8, opacity: 0.15, depth: 1.4, idleDuration: 22 },
    { Motif: LightRays, top: "81%", left: "15%", size: 102, rotate: 0, opacity: 0.14, depth: 1.1, idleDuration: 36 },
    { Motif: LensRings, top: "89%", left: "55%", size: 148, rotate: 0, opacity: 0.15, depth: 0.9, idleDuration: 26 },
  ],
];

/**
 * Scattered, slowly drifting optics motifs with a subtle cursor-parallax —
 * moves the whole page through, not gated on any single element's hover.
 * `variant` just picks one of the hand-placed layouts above.
 */
export default function AbstractGraphics({ variant = 0 }: { variant?: number }) {
  const layout = LAYOUTS[variant % LAYOUTS.length];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {layout.map((p, i) => (
        <Scattered key={i} p={p} />
      ))}
    </div>
  );
}
