import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  ["Home", "#home"],
  ["Photography", "#photography"],
  ["Films", "#films"],
  ["Reels", "#reels"],
  ["Projects", "#projects"],
  ["BTS", "#bts"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Contact", "#contact"],
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const heroHeight = window.innerHeight;
    setScrolled(latest > 40);

    // Stay hidden entirely while still within the hero's first viewport.
    if (latest < heroHeight) {
      setHidden(true);
      return;
    }
    // Past the hero: same hide-on-scroll-down / show-on-scroll-up behavior as before.
    if (latest > prev) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    const sections = LINKS.map(([, href]) => document.querySelector(href)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden && !open ? -100 : 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-3 text-pearl backdrop-blur-xl transition-colors duration-500 ${
          scrolled ? "border-pearl/10" : "border-transparent"
        }`}
        style={{
          background: scrolled ? "rgba(18,18,18,0.65)" : "transparent",
        }}
      >
        <a href="#home" data-cursor="HOME" className="font-display text-sm tracking-[0.25em] text-current">
          YOGIRAJ
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                data-cursor="VIEW"
                className={`group relative font-body text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  active === href ? "text-ocean" : "text-current opacity-80 hover:opacity-100"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-ocean transition-all duration-300 ${
                    active === href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-cursor="BOOK"
            className="hidden rounded-full bg-ocean px-4 py-2 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-midnight transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(201,162,75,0.5)] sm:inline-block"
          >
            Book a Shoot
          </a>
          <button
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-20 z-40 flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-2xl border border-pearl/10 bg-midnight/95 p-4 backdrop-blur-xl lg:hidden"
        >
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm uppercase tracking-wide text-pearl/90 hover:bg-pearl/5"
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
