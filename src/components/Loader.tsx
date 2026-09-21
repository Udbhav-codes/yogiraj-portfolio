import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const tick = (t: number) => {
      const pct = Math.min(100, Math.round(((t - start) / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 250);
        setTimeout(() => onDoneRef.current(), 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // Intentionally runs once on mount — onDone is read via ref so a parent
    // passing a fresh callback each render can't restart this animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting || progress < 100 ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-midnight"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain" style={{ opacity: 0.08 }} />
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-3xl tracking-[0.2em] text-pearl sm:text-4xl"
          >
            YOGIRAJ
          </motion.h1>
          <div className="mt-8 h-px w-40 overflow-hidden bg-pearl/10 sm:w-56">
            <motion.div
              className="h-full bg-ocean"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-body text-xs tracking-[0.3em] text-pearl/60"
          >
            {String(progress).padStart(3, "0")}%
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
