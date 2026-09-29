import { motion } from "framer-motion";
import { ShaderBackground } from "./ShaderBackground";

const GRADIENTS = [
  "linear-gradient(135deg, #E62727 0%, #FFDE00 100%)",
  "linear-gradient(225deg, #FFDE00 0%, #E62727 100%)",
  "linear-gradient(45deg, #E62727 0%, #FFDE00 100%)",
  "linear-gradient(315deg, #FFDE00 0%, #E62727 100%)",
  "linear-gradient(135deg, #E62727 0%, #FFDE00 100%)",
];

/**
 * Animated section background. A plain CSS gradient is the base layer — it
 * works on every device with zero dependencies. The "Silk" WebGL shader
 * renders on top of it when the browser/GPU supports WebGL; since the shader
 * always draws fully opaque pixels, it visually replaces the CSS gradient
 * the moment it starts rendering, and if WebGL fails for any reason (older
 * GPU, disabled hardware acceleration, driver blocklist) the canvas stays
 * transparent and the CSS gradient underneath is all anyone ever sees —
 * no black hole, no crash, just a slightly less fancy background.
 */
export default function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: GRADIENTS[0] }}
        animate={{ background: GRADIENTS }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <ShaderBackground className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
