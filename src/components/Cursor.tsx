import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [color, setColor] = useState("#ffffff");
  const [visible, setVisible] = useState(false);
  const [isTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches
  );

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 35, mass: 0.4 });

  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        let element = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        let bgColor = "transparent";
        let depth = 0;

        // Walk up the DOM to find actual background color
        while (element && depth < 10) {
          const style = window.getComputedStyle(element);
          const bg = style.backgroundColor;
          if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
            bgColor = bg;
            break;
          }
          element = element.parentElement as HTMLElement;
          depth++;
        }

        // Parse RGB values from background color
        const rgbMatch = bgColor.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]);
          const g = parseInt(rgbMatch[1]);
          const b = parseInt(rgbMatch[2]);
          // Calculate luminance: light (>150) = black cursor, dark (<=150) = white cursor
          const luminance = (r * 299 + g * 587 + b * 114) / 1000;
          setColor(luminance > 150 ? "#000000" : "#ffffff");
        } else {
          // Fallback for light backgrounds
          setColor("#000000");
        }
      });
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full transition-[opacity,background-color] duration-200 ease-out"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 12,
        height: 12,
        background: color,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
