import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../data/content";
import ImageLightbox from "./ImageLightbox";

export default function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    if (!project || openImageIndex !== null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, openImageIndex]);

  useEffect(() => {
    setOpenImageIndex(null);
  }, [project]);

  const allImages = project ? [project.cover, ...project.gallery] : [];

  const navImage = (dir: 1 | -1) =>
    setOpenImageIndex((cur) => {
      if (cur === null) return cur;
      return (cur + dir + allImages.length) % allImages.length;
    });

  return (
    <>
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
          className="fixed inset-0 z-[150] overflow-y-auto bg-noir/95 p-4 backdrop-blur-md sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-5xl rounded-lg bg-midnight p-6 sm:p-10"
          >
            <button
              onClick={onClose}
              data-cursor="CLOSE"
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-pearl/20 bg-midnight/60 text-pearl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean"
            >
              ✕
            </button>

            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ocean">
              {project.category} · {project.year}
            </p>
            <h3 className="font-display mt-2 max-w-2xl text-3xl text-pearl sm:text-4xl">{project.title}</h3>
            <p className="mt-1 font-body text-sm text-pearl/60">{project.client}</p>

            <button
              onClick={() => setOpenImageIndex(0)}
              data-cursor="VIEW"
              className="mt-8 block w-full overflow-hidden rounded-lg"
            >
              <img
                src={project.cover}
                alt={project.title}
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>

            <div className="mt-8 grid grid-cols-1 gap-6 font-body text-sm text-pearl/70 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-pearl/40">Challenge</p>
                <p>{project.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-pearl/40">Process</p>
                <p>{project.process}</p>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-[0.15em] text-pearl/40">Result</p>
                <p>{project.result}</p>
              </div>
            </div>

            {allImages.length > 0 && (
              <div className="mt-10">
                <p className="font-body text-xs uppercase tracking-[0.25em] text-pearl/40">
                  Gallery ({allImages.length})
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {allImages.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setOpenImageIndex(i)}
                      data-cursor="VIEW"
                      className="block aspect-square w-full overflow-hidden rounded-md"
                    >
                      <img
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <ImageLightbox
      images={allImages}
      index={openImageIndex}
      onClose={() => setOpenImageIndex(null)}
      onNav={navImage}
      alt={project?.title}
      lockBodyScroll={false}
    />
    </>
  );
}
