import { useEffect, useRef, type Ref } from "react";
import { Eyebrow, Reveal } from "../components/Reveal";

// `bg` is each logo file's own background colour, so the fixed-size tile and
// the trimmed artwork blend into one clean card. Order alternates tile colours
// and aspect ratios so the strip has rhythm.
const BRANDS = [
  { slug: "juju", name: "JUJU", bg: "#FFFFFF" },
  { slug: "nataraj", name: "Nataraj", bg: "#E01F26" },
  { slug: "gather", name: "Gather for Good", bg: "#FFFFFF" },
  { slug: "3soul", name: "3 Soul", bg: "#24385D" },
  { slug: "kfc", name: "KFC", bg: "#FFFFFF" },
  { slug: "izi-pizi-street", name: "Izi Pizi Street", bg: "#B4E4FD" },
  { slug: "tata-green-batteries", name: "Tata Green Batteries", bg: "#FFFFFF" },
  { slug: "inorbit", name: "Inorbit", bg: "#FFFFFF" },
  { slug: "cobbler-and-crew", name: "Cobbler & Crew", bg: "#FFFFFF" },
  { slug: "amul", name: "Amul", bg: "#FFFFFF" },
  { slug: "wit-and-chai", name: "Wit & Chai", bg: "#FFFFFF" },
  { slug: "kotak-mahindra-bank", name: "Kotak Mahindra Bank", bg: "#FFFFFF" },
  { slug: "bajaj", name: "Bajaj", bg: "#FFFFFF" },
  { slug: "elephant-and-co", name: "Elephant & Co.", bg: "#FFFFFF" },
];

const EDGE_FADE = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";
const AUTO_SPEED = 38; // px per second
const RESUME_AFTER_MS = 1800;

function Track({ hidden, trackRef }: { hidden?: boolean; trackRef?: Ref<HTMLUListElement> }) {
  return (
    <ul ref={trackRef} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
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

/**
 * A real horizontal scroller (swipe, trackpad, shift+wheel, arrow keys, mouse
 * drag) that also drifts on its own. Three identical copies of the track sit
 * side by side and the scroll position is kept inside the middle copy, so it
 * loops seamlessly in both directions. Auto-drift pauses while the pointer is
 * over it or the user is interacting, and resumes shortly after.
 */
export default function BrandMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let period = track.offsetWidth;
    let pos = period;
    el.scrollLeft = pos;

    let hovered = false;
    let dragging = false;
    let inView = true;
    let idleUntil = 0;
    let last = performance.now();
    let raf = 0;
    let dragStartX = 0;
    let dragStartScroll = 0;

    const bump = () => {
      idleUntil = performance.now() + RESUME_AFTER_MS;
    };

    const wrap = () => {
      if (el.scrollLeft >= period * 2) el.scrollLeft -= period;
      else if (el.scrollLeft < period) el.scrollLeft += period;
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = false;
    };
    const onDown = (e: PointerEvent) => {
      bump();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      el.dataset.dragging = "true";
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // Capture is only a convenience so the drag survives leaving the strip.
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      bump();
      el.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.dragging;
      if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId);
      bump();
    };

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const auto = !reduced && inView && !hovered && !dragging && now > idleUntil;
      if (auto) {
        pos += (AUTO_SPEED * dt) / 1000;
        if (pos >= period * 2) pos -= period;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => {
      const next = track.offsetWidth;
      if (next === period || next === 0) return;
      const rel = (el.scrollLeft - period) / period;
      period = next;
      pos = period * (1 + rel);
      el.scrollLeft = pos;
    });
    resizeObserver.observe(track);

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    intersection.observe(el);

    el.addEventListener("scroll", wrap, { passive: true });
    el.addEventListener("wheel", bump, { passive: true });
    el.addEventListener("touchstart", bump, { passive: true });
    el.addEventListener("touchmove", bump, { passive: true });
    el.addEventListener("keydown", bump);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("wheel", bump);
      el.removeEventListener("touchstart", bump);
      el.removeEventListener("touchmove", bump);
      el.removeEventListener("keydown", bump);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section aria-label="Brands I have worked with" className="relative bg-[#050505] px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>Brands I have worked with</Eyebrow>
        </Reveal>
      </div>

      <div className="mt-8" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
        <div
          ref={scrollerRef}
          role="region"
          aria-label="Brand logos, drag or swipe to scroll"
          tabIndex={0}
          className="flex cursor-grab select-none overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] data-[dragging=true]:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <Track trackRef={trackRef} />
          <Track hidden />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
