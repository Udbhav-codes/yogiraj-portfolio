import { Eyebrow, Reveal, RevealText } from "../components/Reveal";
import InstagramEmbed from "../components/InstagramEmbed";
import Expandable from "../components/Expandable";
import AnimatedGradient from "../components/AnimatedGradient";
import { useReels } from "../data/useSiteData";

export default function Reels() {
  const reelUrls = useReels();
  return (
    <section id="reels" className="relative overflow-hidden px-4 py-6 sm:px-8 lg:px-16">
      <AnimatedGradient variant={1} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow accentClassName="text-[#E62727]">Reels</Eyebrow>
        </Reveal>
        <h2 className="my-0 font-display max-w-2xl text-4xl font-light leading-tight text-midnight sm:text-5xl">
          <RevealText text="Short-form, straight from Instagram." />
        </h2>

        <Expandable fade="yellow">
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reelUrls.map((url, i) => (
            <Reveal key={url} delay={(i % 4) * 0.06}>
              <InstagramEmbed url={url} />
            </Reveal>
          ))}
        </div>
        </Expandable>
      </div>
    </section>
  );
}
