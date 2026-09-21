import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midnight px-6 text-center">
      <motion.svg
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        width="140"
        height="110"
        viewBox="0 0 140 110"
        fill="none"
        className="mb-8"
      >
        <rect x="10" y="30" width="120" height="65" rx="8" stroke="#C9A24B" strokeWidth="2" />
        <rect x="45" y="14" width="30" height="20" rx="3" stroke="#C9A24B" strokeWidth="2" />
        <circle cx="70" cy="63" r="24" stroke="#C9A24B" strokeWidth="2" />
        <circle cx="70" cy="63" r="12" stroke="#F5F1E6" strokeWidth="2" />
        <circle cx="112" cy="42" r="4" fill="#C9A24B" />
      </motion.svg>
      <h1 className="font-display text-6xl text-pearl">404</h1>
      <p className="mt-3 font-body text-sm uppercase tracking-[0.2em] text-pearl/60">
        This frame doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-pearl px-6 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-midnight transition-transform hover:scale-105"
      >
        Back to the reel
      </Link>
    </div>
  );
}
