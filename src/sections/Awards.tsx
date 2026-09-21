import { awards } from "../data/content";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Expandable from "../components/Expandable";

export default function Awards() {
  return (
    <section id="awards" className="relative overflow-hidden bg-noir px-4 py-28 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Awards & Recognition</Eyebrow>
        </Reveal>
        <h2 className="font-display max-w-2xl text-4xl font-light leading-tight text-pearl sm:text-5xl">
          <RevealText text="Milestones worth marking." />
        </h2>

        <Expandable fade="noir" light>
        <div className="mt-14 flex flex-col divide-y divide-pearl/10 border-y border-pearl/10">
          {awards.map((a, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group flex flex-col gap-2 py-8 transition-colors hover:bg-pearl/[0.03] sm:flex-row sm:items-center sm:gap-8 sm:px-4">
                <span className="font-display w-24 shrink-0 text-2xl text-ocean">{a.year}</span>
                <span className="font-display text-xl text-pearl sm:w-72 sm:shrink-0">{a.title}</span>
                <span className="font-body text-sm text-pearl/60">{a.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>
    </section>
  );
}
