import { useServices } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Expandable from "../components/Expandable";
import AnimatedGradient from "../components/AnimatedGradient";

export default function Services() {
  const services = useServices();
  return (
    <section id="services" className="relative overflow-hidden px-4 py-6 sm:px-8 lg:px-16">
      <AnimatedGradient variant={2} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow accentClassName="text-[#E62727]">Services</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-midnight sm:text-5xl">
          <RevealText text="Ways to work together." />
        </h2>

        <Expandable fade="yellow">
        <div className="mt-6 divide-y divide-midnight/10 border-y border-midnight/10">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group grid grid-cols-1 items-center gap-4 py-8 transition-all duration-300 hover:translate-x-1 hover:bg-midnight/[0.02] sm:grid-cols-12 sm:px-4">
                <span className="font-body text-xs text-midnight/50 transition-colors duration-300 group-hover:text-[#E62727] sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl text-midnight sm:col-span-3">{s.title}</span>
                <span className="font-body text-sm text-midnight/60 sm:col-span-4">{s.desc}</span>
                <span className="font-body text-xs uppercase tracking-[0.1em] text-midnight/50 sm:col-span-2">
                  {s.deliverables}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.1em] text-[#E62727] sm:col-span-1 sm:text-right">
                  {s.timeline}
                </span>
                <a
                  href="#contact"
                  data-cursor="BOOK"
                  className="font-body text-xs uppercase tracking-[0.1em] text-midnight underline decoration-[#E62727]/60 underline-offset-4 sm:col-span-1 sm:text-right"
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
