import UnfurlingGallery from "../components/ui/3d-parallax-unfurling-gallery";
import { useHeroImages } from "../data/useSiteData";

export default function Hero() {
  const images = useHeroImages();
  return <UnfurlingGallery id="home" images={images} />;
}
