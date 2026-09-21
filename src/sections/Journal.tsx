import { journal } from "../data/content";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import Expandable from "../components/Expandable";

export default function Journal() {
  return (
    <section id="journal" className="relative bg-midnight px-4 py-28 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Journal</Eyebrow>
        </Reveal>
        <h2 className="font-display max-w-2xl text-4xl font-light leading-tight text-pearl sm:text-5xl">
          <RevealText text="Notes from behind the camera." />
        </h2>

        <Expandable fade="midnight" light>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {journal.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <a href="#" data-cursor="READ" className="group block">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-4 font-body text-[11px] uppercase tracking-[0.15em] text-ocean">
                  {post.category}
                </p>
                <p className="font-display mt-1 text-xl text-pearl transition-colors group-hover:text-ocean">
                  {post.title}
                </p>
                <p className="mt-1 font-body text-sm text-pearl/60">{post.excerpt}</p>
              </a>
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>
    </section>
  );
}
