import { ShaderBackground } from "./ShaderBackground";

/**
 * Animated section background — currently the "Silk" WebGL shader
 * (red/black/vanilla), with a light dark scrim so section text stays
 * legible against its brighter cream passages.
 */
export default function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <ShaderBackground className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
