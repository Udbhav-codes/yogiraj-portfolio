import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "../data/content";

export default function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNav]);

  const img = index !== null ? images[index] : null;

  let touchStartX = 0;

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-noir/95 backdrop-blur-md"
          onClick={onClose}
          data-lenis-prevent
          onTouchStart={(e) => (touchStartX = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (diff > 60) onNav(-1);
            if (diff < -60) onNav(1);
          }}
        >
          <button
            onClick={onClose}
            data-cursor="CLOSE"
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-pearl/20 text-pearl transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNav(-1);
            }}
            data-cursor="PREV"
            aria-label="Previous"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-pearl/20 p-3 text-pearl transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean sm:left-8"
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
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-pearl/20 p-3 text-pearl transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean sm:right-8"
          >
            ›
          </button>

          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-[92vw] max-w-5xl flex-col items-center gap-4 sm:flex-row sm:items-end"
          >
            <img
              src={img.img}
              alt={img.title}
              className="max-h-[70vh] w-auto rounded-sm object-contain shadow-2xl sm:max-h-[88vh]"
            />
            <div className="w-full shrink-0 font-body text-pearl sm:w-56">
              <p className="font-display text-lg text-ocean">{img.title}</p>
              <dl className="mt-3 space-y-1 text-xs text-pearl/60">
                <div className="flex justify-between gap-2">
                  <dt>Camera</dt>
                  <dd className="text-right text-pearl/80">{img.meta.camera}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Lens</dt>
                  <dd className="text-right text-pearl/80">{img.meta.lens}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Location</dt>
                  <dd className="text-right text-pearl/80">{img.meta.location}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>Year</dt>
                  <dd className="text-right text-pearl/80">{img.meta.year}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
