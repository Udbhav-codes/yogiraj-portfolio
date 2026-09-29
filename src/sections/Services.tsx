import { useServices } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Expandable from "../components/Expandable";
import AnimatedGradient from "../components/AnimatedGradient";

export default function Services() {
  const services = useServices();
  return (
    <section id="services" className="relative overflow-hidden px-4 py-6 sm:px-8 lg:px-16">
      <AnimatedGradient />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-white sm:text-5xl">
          <RevealText text="Ways to work together." />
        </h2>

        <Expandable fade="black">
        <div className="mt-6 divide-y divide-white/15 border-y border-white/15">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group grid grid-cols-1 items-center gap-4 py-8 transition-all duration-300 hover:translate-x-1 hover:bg-white/[0.04] sm:grid-cols-12 sm:px-4">
                <span className="font-body text-xs text-white/50 transition-colors duration-300 group-hover:text-ocean sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl text-white sm:col-span-3">{s.title}</span>
                <span className="font-body text-sm text-white/70 sm:col-span-4">{s.desc}</span>
                <span className="font-body text-xs uppercase tracking-[0.1em] text-white/60 sm:col-span-2">
                  {s.deliverables}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.1em] text-ocean sm:col-span-1 sm:text-right">
                  {s.timeline}
                </span>
                <a
                  href="#contact"
                  data-cursor="BOOK"
                  className="font-body text-xs uppercase tracking-[0.1em] text-white underline decoration-ocean/60 underline-offset-4 sm:col-span-1 sm:text-right"
                >
                  Enquire
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>
    </section>
  );
}
