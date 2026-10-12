import { Eyebrow, Reveal } from "../components/Reveal";

// `bg` is each logo file's own background colour, so the fixed-size tile and
// the trimmed artwork blend into one clean card. Order alternates tile colours
// and aspect ratios so the strip has rhythm.
const BRANDS = [
  { slug: "juju", name: "JUJU", bg: "#FFFFFF" },
  { slug: "nataraj", name: "Nataraj", bg: "#E01F26" },
  { slug: "gather", name: "Gather for Good", bg: "#FFFFFF" },
  { slug: "3soul", name: "3 Soul", bg: "#24375C" },
  { slug: "kfc", name: "KFC", bg: "#FFFFFF" },
  { slug: "izi-pizi-street", name: "Izi Pizi Street", bg: "#B4E4FD" },
  { slug: "tata-green-batteries", name: "Tata Green Batteries", bg: "#FFFFFF" },
  { slug: "inorbit", name: "inOrbit", bg: "#292B64" },
  { slug: "cobbler-and-crew", name: "Cobbler & Crew", bg: "#FFFFFF" },
  { slug: "amul", name: "Amul", bg: "#FFFFFF" },
  { slug: "kotak-mahindra-bank", name: "Kotak Mahindra Bank", bg: "#FFFFFF" },
  { slug: "bajaj", name: "Bajaj", bg: "#FFFFFF" },
  { slug: "elephant-and-co", name: "Elephant & Co.", bg: "#FFFFFF" },
];

const EDGE_FADE = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {BRANDS.map((b) => (
        <li key={b.slug} className="shrink-0 pr-4 sm:pr-5">
          <div
            className="flex h-24 w-48 items-center justify-center overflow-hidden rounded-lg p-5 ring-1 ring-white/10 sm:h-28 sm:w-56 sm:p-6"
            style={{ backgroundColor: b.bg }}
          >
            <img
              src={`/logos/${b.slug}.png`}
              alt={hidden ? "" : b.name}
              decoding="async"
              draggable={false}
              className="h-full w-full object-contain"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function BrandMarquee() {
  return (
    <section aria-label="Selected clients" className="relative bg-[#050505] px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Selected clients</Eyebrow>
        </Reveal>
      </div>

      <div
        className="marquee mt-8 overflow-hidden"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <div className="animate-marquee flex w-max will-change-transform">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
