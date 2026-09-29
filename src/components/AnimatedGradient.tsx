import { motion } from "framer-motion";
import MorphicBackground from "./MorphicBackground";

const GRADIENTS = [
  "linear-gradient(135deg, #FFE666 0%, #FFDE00 100%)",
  "linear-gradient(225deg, #FFDE00 0%, #FFE666 100%)",
  "linear-gradient(45deg, #FFE666 0%, #FFDE00 100%)",
  "linear-gradient(315deg, #FFDE00 0%, #FFE666 100%)",
  "linear-gradient(135deg, #FFE666 0%, #FFDE00 100%)",
];

/**
 * Section background: a slow-cycling light-yellow → brand-yellow gradient
 * (plain CSS, works everywhere, no WebGL) with whitish gooey bubbles rising
 * and merging through it (lava-lamp effect).
 */
export default function AnimatedGradient({ variant = 0 }: { variant?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: GRADIENTS[0] }}
        animate={{ background: GRADIENTS }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <MorphicBackground variant={variant} />
    </div>
  );
}
