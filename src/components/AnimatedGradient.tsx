import { ShaderBackground } from "./ShaderBackground";

/**
 * Animated section background — the "Silk" WebGL shader, with a light dark
 * scrim on top so section text stays legible against its brighter passages.
 */
export default function AnimatedGradient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <ShaderBackground className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
