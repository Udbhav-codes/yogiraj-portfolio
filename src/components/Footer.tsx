import { Link } from "react-router-dom";
import { socials } from "../data/content";
import { useProfile } from "../data/useSiteData";

export default function Footer() {
  const profile = useProfile();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-pearl/10 bg-midnight px-4 py-14 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl text-pearl">YOGIRAJ</p>
          <p className="mt-2 max-w-xs font-body text-sm text-pearl/60">
            Cinematographer &amp; Photographer, based in {profile.location}.
          </p>
          <div className="mt-4 flex gap-4">
            {Object.entries(socials).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="font-body text-xs uppercase tracking-[0.1em] text-pearl/60 transition-colors duration-300 hover:text-ocean"
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-2 font-body text-sm text-pearl/70 sm:grid-cols-3">
          {["Photography", "Films", "Projects", "About", "Services", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="w-fit transition-colors duration-300 hover:text-ocean">
              {l}
            </a>
          ))}
        </nav>

        <div className="max-w-xs">
          <p className="font-body text-xs uppercase tracking-[0.15em] text-pearl/50">Newsletter</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-2 flex items-center border-b border-pearl/20 focus-within:border-ocean"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full bg-transparent py-2 font-body text-sm text-pearl outline-none placeholder:text-pearl/30"
            />
            <button type="submit" className="font-body text-xs uppercase tracking-[0.1em] text-ocean">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-pearl/10 pt-6 sm:flex-row">
        <p className="font-body text-xs text-pearl/40">
          © {new Date().getFullYear()}{" "}
          <Link to="/studio" className="cursor-default no-underline">
            {profile.name}
          </Link>
          . All rights reserved.
        </p>
        <button
          onClick={scrollTop}
          data-cursor="TOP"
          className="font-body text-xs uppercase tracking-[0.1em] text-pearl/60 transition-all duration-300 hover:-translate-y-0.5 hover:text-ocean"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
