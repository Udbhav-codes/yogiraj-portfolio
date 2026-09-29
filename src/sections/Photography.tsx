import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { galleryCategories, type GalleryCategory } from "../data/content";
import { useGallery } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import Expandable from "../components/Expandable";
import AnimatedGradient from "../components/AnimatedGradient";

export default function Photography() {
  const gallery = useGallery();
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pointerOverId, setPointerOverId] = useState<string | null>(null);

  // Mobile-only: track which single-column card is crossing screen-center as the
  // user scrolls, so that one gets color instead of relying on hover (no pointer
  // to hover with on a touch screen).
  const [isMobile, setIsMobile] = useState(false);
  const [centeredId, setCenteredId] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLElement>());
  const centeredIds = useRef(new Set<string>());

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const setItemRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) itemRefs.current.set(id, el);
      else itemRefs.current.delete(id);
    },
    []
  );

  const filtered = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter, gallery]
  );

  // Only show a filter pill for a category that actually has at least one image —
  // keeps this in sync automatically as photos are added/removed via the admin panel.
  const availableCategories = useMemo(
    () => galleryCategories.filter((cat) => gallery.some((g) => g.category === cat)),
    [gallery]
  );

  // If the selected category loses every image (e.g. reassigned via the admin panel),
  // fall back to "All" rather than leaving an empty grid selected.
  useEffect(() => {
    if (filter !== "All" && !availableCategories.includes(filter)) setFilter("All");
  }, [filter, availableCategories]);

  useEffect(() => {
    centeredIds.current.clear();
    setCenteredId(null);
    if (!isMobile) return;

    // Collapse the viewport to a 1px line at screen-center — whichever card
    // crosses that line is the one currently "in view".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.imgId;
          if (!id) continue;
          if (entry.isIntersecting) centeredIds.current.add(id);
          else centeredIds.current.delete(id);
        }
        const last = [...centeredIds.current].pop();
        setCenteredId(last ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile, filtered]);

  const isColor = (id: string) => (isMobile ? centeredId === id : pointerOverId === id);

  return (
    <section id="photography" className="relative overflow-hidden px-4 py-6 sm:px-8 lg:px-16">
      <AnimatedGradient variant={0} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow accentClassName="text-[#E62727]">Photography</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-midnight sm:text-5xl">
          <RevealText text="A gallery, not a grid." />
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["All", ...availableCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-cursor="FILTER"
              className={`relative overflow-hidden rounded-full border px-4 py-2 font-body text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                filter === cat
                  ? "border-[#E62727] text-white"
                  : "border-midnight/15 text-midnight/70 hover:border-midnight/40 hover:text-midnight"
              }`}
            >
              {filter === cat && (
                <motion.span
                  layoutId="photo-filter-pill"
                  className="absolute inset-0 z-0 bg-[#E62727]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <Expandable fade="yellow">
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              ref={setItemRef(img.id)}
              data-img-id={img.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
              onClick={() => setOpenIndex(gallery.findIndex((g) => g.id === img.id))}
              onPointerEnter={() => setPointerOverId(img.id)}
              onPointerLeave={() => setPointerOverId((cur) => (cur === img.id ? null : cur))}
              data-cursor="VIEW"
              className="group relative block w-full overflow-hidden rounded-md bg-midnight/5"
            >
              <img
                src={img.img}
                alt={img.title}
                loading="lazy"
                style={{ aspectRatio: `${img.w}/${img.h}` }}
                className={`h-auto w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
                  isColor(img.id) ? "grayscale-0" : "grayscale"
                }`}
              />
              <div
                className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/0 to-black/0 transition-opacity duration-500 ${
                  isColor(img.id) ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="translate-y-2 p-4 text-left transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <p className="font-display text-sm text-pearl">{img.title}</p>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-ocean">
                    {img.category}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        </Expandable>
      </div>

      <Lightbox
        images={gallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNav={(dir) =>
          setOpenIndex((cur) => {
            if (cur === null) return cur;
            return (cur + dir + gallery.length) % gallery.length;
          })
        }
      />
    </section>
  );
}
