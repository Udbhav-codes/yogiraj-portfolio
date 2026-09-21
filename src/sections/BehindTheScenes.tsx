import { useState } from "react";
import { useEquipment } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import ImageLightbox from "../components/ImageLightbox";
import Expandable from "../components/Expandable";

const BTS_IMAGES = [
  "/photos/cocktail-food/cocktail-food-25.jpg",
  "/photos/cocktail-food/cocktail-food-33.jpg",
  "/photos/cocktail-food/cocktail-food-41.jpg",
  "/photos/cocktail-food/cocktail-food-48.jpg",
];

export default function BehindTheScenes() {
  const equipment = useEquipment();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="bts" className="relative bg-midnight px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>BTS</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-pearl sm:text-5xl">
          <RevealText text="What it takes to get the frame." />
        </h2>

        <Expandable fade="midnight" light>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {BTS_IMAGES.map((src, i) => (
            <Reveal key={src} delay={i * 0.08} className={i % 3 === 0 ? "sm:row-span-2" : ""}>
              <button
                onClick={() => setOpenIndex(i)}
                data-cursor="VIEW"
                className="group relative block h-full w-full overflow-hidden rounded-md"
              >
                <img
                  src={src}
                  alt="On-set behind the scenes"
                  loading="lazy"
                  className="h-full min-h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            </Reveal>
          ))}
        </div>
        </Expandable>

        <div className="mt-20">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-pearl/60">The Kit</p>
          <Expandable fade="midnight" light>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((group, i) => (
              <Reveal key={group.category} delay={i * 0.06}>
                <div className="group rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ocean/50 hover:bg-pearl/[0.05]">
                  <p className="font-display text-lg text-ocean">{group.category}</p>
                  <ul className="mt-3 space-y-1 font-body text-sm text-pearl/60">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          </Expandable>
        </div>
      </div>

      <ImageLightbox
        images={BTS_IMAGES}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNav={(dir) =>
          setOpenIndex((cur) => {
            if (cur === null) return cur;
            return (cur + dir + BTS_IMAGES.length) % BTS_IMAGES.length;
          })
        }
        alt="On-set behind the scenes"
      />
    </section>
  );
}
