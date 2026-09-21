import { motion } from "framer-motion";
import ScrollFoldHero from "../components/ScrollFoldHero";

const IMAGES: [string, string, string] = [
  "/photos/cocktail-food/cocktail-food-06.jpg",
  "/photos/cocktail-food/cocktail-food-12.jpg",
  "/photos/cocktail-food/cocktail-food-19.jpg",
];

export default function Hero() {
  return (
    <ScrollFoldHero id="home" images={IMAGES} scrollLength={1.3}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="pointer-events-none absolute bottom-6 right-6 z-30 flex flex-col items-center gap-2 sm:right-10"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-8 w-px bg-pearl/40"
        />
      </motion.div>
    </ScrollFoldHero>
  );
}
