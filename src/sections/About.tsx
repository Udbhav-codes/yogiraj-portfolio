import { motion } from "framer-motion";
import { stats, timeline } from "../data/content";
import { useProfile } from "../data/useSiteData";
import { Eyebrow, Reveal, RevealText } from "../components/Reveal";

function Counter({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="font-display text-4xl text-ocean sm:text-5xl"
    >
      {value}
    </motion.span>
  );
}

export default function About() {
  const profile = useProfile();
  return (
    <section id="about" className="relative bg-midnight px-4 py-6 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="overflow-hidden rounded-lg" data-cursor="VIEW">
                <img
                  src="/photos/about/portrait.jpg"
                  alt={profile.name}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <Eyebrow>About</Eyebrow>
            <h2 className="my-0 font-display max-w-xl text-3xl font-light leading-tight text-pearl sm:text-4xl">
              <RevealText text={`${profile.name}, based in ${profile.location}.`} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-pearl/60 sm:text-base">
                {profile.bio}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.expertise.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-pearl/15 px-3 py-1 font-body text-[11px] uppercase tracking-[0.1em] text-pearl/70"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} />
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.1em] text-pearl/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-16 pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-pearl/10" />
              <motion.div
                className="absolute left-0 top-0 w-px origin-top bg-ocean"
                style={{ height: "100%" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              {timeline.map((t, i) => (
                <Reveal key={i} delay={i * 0.05} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-ocean bg-midnight" />
                  <p className="font-body text-[11px] uppercase tracking-[0.15em] text-ocean">
                    {t.year} · {t.kind === "education" ? "Education" : "Work"}
                  </p>
                  <p className="font-display mt-1 text-lg text-pearl">{t.title}</p>
                  <p className="font-body text-sm text-pearl/70">{t.org}</p>
                  <p className="mt-1 max-w-md font-body text-sm text-pearl/60">{t.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
