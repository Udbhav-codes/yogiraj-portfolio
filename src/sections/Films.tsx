import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "../data/content";
import { useFilms } from "../data/useSiteData";
import { isYouTubeEmbedUrl } from "../lib/youtube";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Expandable from "../components/Expandable";

export default function Films() {
  const films = useFilms();
  const [active, setActive] = useState<Film | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="films" className="relative bg-midnight px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Films</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-pearl sm:text-5xl">
          <RevealText text="Moving stories, cut with intent." />
        </h2>

        <Expandable fade="midnight" light>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film, i) => (
            <Reveal key={film.id} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(film)}
                data-cursor="PLAY"
                className="group relative block w-full overflow-hidden rounded-lg bg-pearl/[0.04] text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={film.thumb}
                    alt={film.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-noir/30 transition-colors group-hover:bg-noir/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 animate-pulse-soft items-center justify-center rounded-full border border-pearl/40 bg-pearl/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:animate-none">
                      <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-pearl" />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded bg-noir/60 px-2 py-1 font-body text-[10px] text-pearl">
                    {film.duration}
                  </span>
                  {film.award && (
                    <span className="absolute left-3 top-3 rounded-full bg-ocean px-3 py-1 font-body text-[9px] font-medium uppercase tracking-wide text-midnight">
                      {film.award}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-display text-lg text-pearl">{film.title}</p>
                  <p className="mt-1 font-body text-[11px] uppercase tracking-[0.15em] text-ocean">
                    {film.category} · {film.year}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            data-lenis-prevent
            className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-noir/95 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-noir">
                {active.videoUrl && isYouTubeEmbedUrl(active.videoUrl) ? (
                  <iframe
                    src={`${active.videoUrl}${active.videoUrl.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
                    title={active.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : active.videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={active.videoUrl}
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                    />
                    <button
                      onClick={() => videoRef.current?.requestFullscreen()}
                      data-cursor="EXPAND"
                      aria-label="Fullscreen"
                      className="absolute bottom-4 right-16 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-pearl/30 bg-noir/50 text-pearl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-ocean hover:text-ocean"
                    >
                      ⛶
                    </button>
                  </>
                ) : (
                  <>
                    <img src={active.thumb} alt={active.title} className="h-full w-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-pearl/40 bg-pearl/10 backdrop-blur-sm">
                        <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-pearl" />
                      </span>
                      <p className="font-body text-xs uppercase tracking-[0.2em] text-pearl/70">
                        No video attached yet — add one from the admin panel
                      </p>
                    </div>
                  </>
                )}
                <button
                  onClick={() => setActive(null)}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-pearl/30 bg-noir/50 text-pearl backdrop-blur-sm"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mt-5 flex flex-col justify-between gap-2 font-body text-pearl sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-xl">{active.title}</p>
                  <p className="text-sm text-pearl/60">{active.description}</p>
                </div>
                {active.client && (
                  <p className="text-xs uppercase tracking-[0.15em] text-ocean">
                    Client: {active.client}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
