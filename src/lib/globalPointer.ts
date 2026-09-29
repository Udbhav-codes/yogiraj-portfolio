import { motionValue } from "framer-motion";

/**
 * Shared, page-wide pointer position (normalized -1..1 per axis), fed by one
 * window-level listener. Any component can read it via useTransform without
 * each one attaching its own pointermove handler.
 */
export const globalPointerX = motionValue(0);
export const globalPointerY = motionValue(0);

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      globalPointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      globalPointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
