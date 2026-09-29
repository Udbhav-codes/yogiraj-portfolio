import { useState } from "react";
import type { Project } from "../data/content";
import { useProjects } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import ProjectDetail from "../components/ProjectDetail";
import Expandable from "../components/Expandable";
import AnimatedGradient from "../components/AnimatedGradient";

export default function Projects() {
  const projects = useProjects();
  const [active, setActive] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative overflow-hidden px-4 py-6 sm:px-8 lg:px-16">
      <AnimatedGradient variant={1} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow accentClassName="text-[#E62727]">Featured Projects</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-midnight sm:text-5xl">
          <RevealText text="Case studies, not just credits." />
        </h2>

        <Expandable fade="yellow">
        <div className="mt-6 flex flex-col gap-24">
          {projects.map((p, i) => (
            <Reveal key={p.id} className="w-full" x={i % 2 === 1 ? 40 : -40} y={20}>
              <button
                onClick={() => setActive(p)}
                data-cursor="OPEN"
                className={`group flex w-full flex-col gap-8 text-left lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center`}
              >
                <div className="w-full overflow-hidden rounded-lg lg:w-3/5">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="w-full lg:w-2/5">
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-[#E62727]">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="font-display mt-3 text-2xl text-midnight transition-colors duration-300 group-hover:text-[#E62727] sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-midnight/60">{p.client}</p>

                  <div className="mt-6 space-y-4 font-body text-sm text-midnight/70">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.15em] text-midnight/50">Challenge</p>
                      <p>{p.challenge}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.15em] text-midnight/50">Process</p>
                      <p>{p.process}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-[0.15em] text-midnight/50">Result</p>
                      <p>{p.result}</p>
                    </div>
                  </div>

                  {p.gallery.length > 0 && (
                    <div className="mt-6 flex gap-2">
                      {p.gallery.slice(0, 4).map((src, gi) => (
                        <img
                          key={src + gi}
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-16 w-16 rounded-md object-cover transition-transform duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
                        />
                      ))}
                      {p.gallery.length > 4 && (
                        <span className="flex h-16 w-16 items-center justify-center rounded-md bg-midnight/5 font-body text-xs text-midnight/50 sm:h-20 sm:w-20">
                          +{p.gallery.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="mt-6 font-body text-xs font-medium uppercase tracking-[0.15em] text-midnight underline decoration-[#E62727]/60 underline-offset-4">
                    View Full Case Study →
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  );
}
