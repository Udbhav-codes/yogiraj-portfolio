import Hero from "../sections/Hero";
import Photography from "../sections/Photography";
import Films from "../sections/Films";
import Reels from "../sections/Reels";
import Projects from "../sections/Projects";
import BehindTheScenes from "../sections/BehindTheScenes";
import About from "../sections/About";
import Services from "../sections/Services";
import Contact from "../sections/Contact";
import SectionErrorBoundary from "../components/SectionErrorBoundary";

export default function Home() {
  return (
    <main>
      <SectionErrorBoundary>
        <Hero />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Photography />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Films />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Reels />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Projects />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <BehindTheScenes />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <About />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Services />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Contact />
      </SectionErrorBoundary>
    </main>
  );
}
