import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../data/content";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section id="testimonials" className="relative bg-pearl px-4 py-28 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>Testimonials</Eyebrow>
        </Reveal>
        <h2 className="font-display text-4xl font-light leading-tight text-midnight sm:text-5xl">
          <RevealText text="What clients remember." />
        </h2>

        <div className="relative mt-14 min-h-[220px]">
          <span className="font-display pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-midnight/10">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-display mx-auto max-w-2xl text-xl leading-relaxed text-midnight sm:text-2xl">
                {t.quote}
              </p>
              <p className="mt-6 font-body text-sm uppercase tracking-[0.15em] text-ocean">
                {t.name}
              </p>
              <p className="font-body text-xs text-midnight/60">{t.company}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-ocean" : "w-1.5 bg-midnight/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
