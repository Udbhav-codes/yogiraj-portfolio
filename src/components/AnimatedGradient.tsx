import { motion } from "framer-motion";

const GRADIENTS = [
  "linear-gradient(135deg, #FFF44F 0%, #FFB74D 45%, #92000A 100%)",
  "linear-gradient(135deg, #FFB74D 0%, #92000A 45%, #4A0040 100%)",
  "linear-gradient(135deg, #92000A 0%, #4A0040 45%, #FFF44F 100%)",
  "linear-gradient(135deg, #4A0040 0%, #FFF44F 45%, #FFB74D 100%)",
  "linear-gradient(135deg, #FFF44F 0%, #FFB74D 45%, #92000A 100%)",
];

/**
 * Slow-cycling gradient behind a section, with a dark scrim baked in so
 * light-on-dark section text stays legible across every phase of the cycle
 * (including the near-white #FFF44F stop).
 */
export default function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: GRADIENTS[0] }}
        animate={{ background: GRADIENTS }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
