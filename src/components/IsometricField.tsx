import { motion, useTransform } from "framer-motion";
import { globalPointerX, globalPointerY } from "../lib/globalPointer";

// Each tile is a diamond (rotated square) split into four triangular facets
// around its center, shaded as if lit from the top-left — the classic
// folded-paper / low-poly relief look, rendered in the site's yellow family
// instead of white so it reads as part of the background, not a sticker.
const FACETS = {
  topLeft: "#FFFBEA",
  topRight: "#FFEDA3",
  bottomRight: "#D9A600",
  bottomLeft: "#F5C400",
};

function DiamondTile({ id, size }: { id: string; size: number }) {
  const half = size / 2;
  return (
    <pattern id={id} patternUnits="userSpaceOnUse" width={size} height={size}>
      <g stroke="rgba(47,47,47,0.05)" strokeWidth="1" strokeLinejoin="round">
        <polygon points={`0,${half} ${half},0 ${half},${half}`} fill={FACETS.topLeft} />
        <polygon points={`${half},0 ${size},${half} ${half},${half}`} fill={FACETS.topRight} />
        <polygon points={`${size},${half} ${half},${size} ${half},${half}`} fill={FACETS.bottomRight} />
        <polygon points={`${half},${size} 0,${half} ${half},${half}`} fill={FACETS.bottomLeft} />
      </g>
    </pattern>
  );
}

const MASK_DIRECTIONS = ["to right", "to left", "to bottom", "to top"];

/**
 * Tessellated 3D-diamond field standing in for the old scattered
 * illustrations — a continuous folded-paper relief in the site's yellow
 * palette, fading out toward one edge, with a soft cursor-tracked sheen
 * for the "interactive" feel.
 */
export default function IsometricField({ variant = 0 }: { variant?: number }) {
  const id = `diamond-tile-${variant}`;
  const size = 84 + (variant % 3) * 10;
  const maskDir = MASK_DIRECTIONS[variant % MASK_DIRECTIONS.length];
  const mask = `linear-gradient(${maskDir}, transparent 0%, black 32%, black 100%)`;

  const glintX = useTransform(globalPointerX, [-1, 1], ["15%", "85%"]);
  const glintY = useTransform(globalPointerY, [-1, 1], ["15%", "85%"]);
  const glintBackground = useTransform([glintX, glintY], ([x, y]) =>
    `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 70%)`
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          opacity: 0.6,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        <defs>
          <DiamondTile id={id} size={size} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: glintBackground, mixBlendMode: "soft-light" }}
      />
    </div>
  );
}
