import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const CAP_RATIO = 2.5; // 250vh

const FADE_CLASS = {
  midnight: "from-midnight",
  pearl: "from-pearl",
  noir: "from-noir",
} as const;

/**
 * Caps its children at 250vh and reveals a centered "See More" button once
 * content actually exceeds that — the button is skipped entirely when the
 * content already fits, so short sections render unchanged.
 */
export default function Expandable({
  children,
  fade,
  light = false,
}: {
  children: ReactNode;
  fade: keyof typeof FADE_CLASS;
  light?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [capHeight, setCapHeight] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      setFullHeight(el.scrollHeight);
      setCapHeight(window.innerHeight * CAP_RATIO);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  const overflowing = fullHeight > capHeight + 1;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overflow-hidden transition-[max-height] duration-700 ease-in-out"
        style={{
          maxHeight: !overflowing ? "none" : expanded ? `${fullHeight}px` : `${capHeight}px`,
        }}
      >
        {children}
      </div>

      {overflowing && !expanded && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t ${FADE_CLASS[fade]} to-transparent`}
        />
      )}

      {overflowing && (
        <div className="relative z-10 mt-10 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            data-cursor="VIEW"
            className={`rounded-full border px-6 py-3 font-body text-[11px] uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 ${
              light
                ? "border-pearl/25 text-pearl hover:border-ocean hover:text-ocean"
                : "border-midnight/20 text-midnight hover:border-ocean hover:text-ocean"
            }`}
          >
            {expanded ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
}
