import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Generic full-screen single-image viewer — no metadata required. Used for
 * BTS photos and the Project Detail gallery. For Photography's gallery
 * (which shows camera/lens/location/year), see Lightbox.tsx instead.
 */
export default function ImageLightbox({
  images,
  index,
  onClose,
  onNav,
  alt = "",
  lockBodyScroll = true,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
  alt?: string;
  /** Set false when nested inside a parent modal that already locks body scroll. */
  lockBodyScroll?: boolean;
}) {
  const touchStartX = useRef(0);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    if (!lockBodyScroll) return () => window.removeEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNav, lockBodyScroll]);

  const src = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
          className="fixed inset-0 z-[160] flex items-center justify-center overflow-y-auto bg-noir/95 p-4 backdrop-blur-md"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 60) onNav(-1);
            if (diff < -60) onNav(1);
          }}
        >
          <button
            onClick={onClose}
            data-cursor="CLOSE"
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-pearl/20 bg-midnight/40 text-pearl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNav(-1);
                }}
                data-cursor="PREV"
                aria-label="Previous"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-pearl/20 bg-midnight/40 p-3 text-pearl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean sm:left-8"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNav(1);
                }}
                data-cursor="NEXT"
                aria-label="Next"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-pearl/20 bg-midnight/40 p-3 text-pearl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean sm:right-8"
              >
                ›
              </button>
            </>
          )}

          <motion.img
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            src={src}
            alt={alt}
            className="max-h-[85vh] w-auto max-w-[92vw] rounded-sm object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
