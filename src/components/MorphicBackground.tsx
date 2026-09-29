import { useEffect, useRef } from "react";

// A single rising, gooey circle. Spawned continuously and animated via
// direct transform writes (not React state) so dozens can be alive at once
// without triggering re-renders.
class Bubble {
  private element: SVGElement;
  private position: number;
  private readonly x: number;
  private readonly friction: number;
  private readonly siner: number;
  private readonly rotationDirection: 1 | -1;
  private rotationValue = 0;
  private readonly scale: number;
  private readonly size = 34;
  private readonly steps: number;

  constructor(
    container: HTMLElement,
    x: number,
    spawnY: number,
    friction: number,
    color: string,
    width: number,
    steps: number
  ) {
    this.steps = steps;
    this.x = x;
    this.position = spawnY;
    this.friction = friction;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.scale = 0.5 + Math.random() * 2.1;
    this.siner = (width / 2.5) * Math.random();
    this.element = this.render(container, color);
  }

  private render(container: HTMLElement, color: string): SVGElement {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 67.4 67.4");
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", "33.7");
    circle.setAttribute("cy", "33.7");
    circle.setAttribute("r", "33.7");
    circle.setAttribute("fill", color);
    svg.appendChild(circle);
    svg.style.position = "absolute";
    svg.style.width = `${this.size}px`;
    svg.style.height = `${this.size}px`;
    svg.style.transform = `translate(${this.x}px, ${this.position}px)`;
    container.appendChild(svg);
    return svg;
  }

  move(): boolean {
    this.position -= this.friction;
    const left = this.x + Math.sin((this.position * Math.PI) / this.steps) * this.siner;
    this.rotationValue += this.friction;
    const rotation = this.rotationDirection * this.rotationValue;
    this.element.style.transform = `translate(${left}px, ${this.position}px) scale(${this.scale}) rotate(${rotation}deg)`;
    if (this.position < -this.size) {
      this.element.remove();
      return false;
    }
    return true;
  }
}

const MAX_BUBBLES = 36;

/**
 * Whitish gooey bubbles rising through the yellow section background,
 * merging and splitting via an SVG blur+contrast filter (lava-lamp effect).
 * `variant` just keeps each section's <filter> id unique.
 */
export default function MorphicBackground({
  variant = 0,
  color = "#FFFCF2",
}: {
  variant?: number;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = `morphic-goo-${variant}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let bubbles: Bubble[] = [];
    let paused = false;
    const onFocus = () => (paused = false);
    const onBlur = () => (paused = true);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    const spawn = setInterval(() => {
      if (paused || bubbles.length >= MAX_BUBBLES) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;
      bubbles.push(
        new Bubble(container, Math.random() * width, height + 60, 0.5 + Math.random() * 0.8, color, width, height / 2)
      );
    }, 260);

    let frame: number;
    const tick = () => {
      bubbles = bubbles.filter((b) => b.move());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      clearInterval(spawn);
      cancelAnimationFrame(frame);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      container.innerHTML = "";
    };
  }, [color]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" style={{ filter: `url(#${filterId})`, opacity: 0.85 }} />
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
            <feColorMatrix
              in="blur"
              result="goo"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
