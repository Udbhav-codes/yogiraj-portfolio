import Hero from "../sections/Hero";
import Photography from "../sections/Photography";
import Films from "../sections/Films";
import Reels from "../sections/Reels";
import Projects from "../sections/Projects";
import BehindTheScenes from "../sections/BehindTheScenes";
import About from "../sections/About";
import Services from "../sections/Services";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Photography />
      <Films />
      <Reels />
      <Projects />
      <BehindTheScenes />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
