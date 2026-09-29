// Central content layer. Swap `img`/`video` fields for real client media —
// everything currently points to seeded placeholder photography (picsum.photos)
// because we don't have licensed rights to pull Yogiraj's actual Behance files.
// Replace by editing this file only; no component code needs to change.

export const profile = {
  name: "Yogiraj Somavanshi",
  title: "Cinematographer / Photographer / Editor",
  location: "Pune, India",
  email: "yogiraj24.somavanshi@gmail.com",
  phone: "+91 96071 15677",
  address: "39/B UMEY, Anurekha Society, Karve Nagar, Pune-411052",
  behance: "https://www.behance.net/yogirajsomavan",
  tagline: "Capturing Stories Beyond Frames.",
  subTagline:
    "Photography is frozen emotion. Cinema is moving memory. Every frame tells a story.",
  bio: "A passionate cinematographer and video editor with a deep love for storytelling and visual artistry. Five years in the industry — 2.5 of them professional — blending technical command of camera and lighting with strong visual storytelling. Worked across films, documentaries and commercial projects; available for freelance and full-time work.",
  expertise: [
    "Cinematography",
    "Direction",
    "Photography",
    "Video Editing",
    "Graphic Designing",
  ],
  tools: ["Adobe Premiere Pro", "Photoshop", "After Effects"],
};

export const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "4", label: "Agencies & Studios" },
  { value: "10+", label: "Brand Campaigns" },
  { value: "1", label: "Documentary Screened Internationally" },
];

export const timeline = [
  {
    year: "2017–2019",
    title: "HSC Science",
    org: "Dr. Kalmadi Junior College",
    detail: "68.40%",
    kind: "education" as const,
  },
  {
    year: "2019–2021",
    title: "B.A. Photography",
    org: "MIT-WPU, Kothrud",
    detail: "8.94 / 10 CGPA",
    kind: "education" as const,
  },
  {
    year: "Mar 2021",
    title: "Cinematographer & Photographer",
    org: "Kathak Adi Kathak (documentary)",
    detail:
      "1.5-hour Kathak documentary funded by Bhandarkar Oriental Research Institute — screened across India and the U.S.",
    kind: "work" as const,
  },
  {
    year: "Jun–Sep 2022",
    title: "Assistant Cinematographer & Video Editor",
    org: "Pixel Village",
    detail: "Edited YouTube and educational content; assisted on set.",
    kind: "work" as const,
  },
  {
    year: "Oct 2022–Jan 2024",
    title: "Videographer & Content Creator",
    org: "Malpani Groups",
    detail:
      "Full creative ownership of social content — events, daily activity, brand communication.",
    kind: "work" as const,
  },
  {
    year: "Apr 2024–Jul 2025",
    title: "AV Executive, Videographer & Production Coordinator",
    org: "Wit & Chai Media",
    detail: "Ad films for Amul, KFC India, Kotak (811) and Godrej.",
    kind: "work" as const,
  },
  {
    year: "Aug 2025 – Present",
    title: "Senior Cinematographer & Editor",
    org: "Rare Ideas",
    detail:
      "Leads content for hospitality brands Elephant & Co. and Cobbler & Crew — food, beverage and lifestyle visuals, end to end.",
    kind: "work" as const,
  },
];

export type GalleryCategory =
  | "Commercial"
  | "Lifestyle"
  | "Food"
  | "Portrait"
  | "Wedding"
  | "Architecture"
  | "Travel";

export interface GalleryImage {
  id: string;
  category: GalleryCategory;
  title: string;
  img: string;
  w: number;
  h: number;
  meta: { camera: string; lens: string; location: string; year: string };
}

const seededImg = (seed: string, w = 1200, h = 1500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const galleryCategories: GalleryCategory[] = [
  "Commercial",
  "Lifestyle",
  "Food",
  "Portrait",
  "Wedding",
  "Architecture",
  "Travel",
];

export const gallery: GalleryImage[] = [
  { id: "cf1", category: "Food", title: "Cocktail & Food Study 01", img: "/photos/cocktail-food/cocktail-food-01.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf2", category: "Lifestyle", title: "Cocktail & Food Study 02", img: "/photos/cocktail-food/cocktail-food-02.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf3", category: "Lifestyle", title: "Cocktail & Food Study 03", img: "/photos/cocktail-food/cocktail-food-03.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf4", category: "Commercial", title: "Cocktail & Food Study 04", img: "/photos/cocktail-food/cocktail-food-04.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf5", category: "Commercial", title: "Cocktail & Food Study 05", img: "/photos/cocktail-food/cocktail-food-05.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf6", category: "Food", title: "Cocktail & Food Study 06", img: "/photos/cocktail-food/cocktail-food-06.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf7", category: "Food", title: "Cocktail & Food Study 07", img: "/photos/cocktail-food/cocktail-food-07.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf8", category: "Food", title: "Cocktail & Food Study 08", img: "/photos/cocktail-food/cocktail-food-08.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf9", category: "Food", title: "Cocktail & Food Study 09", img: "/photos/cocktail-food/cocktail-food-09.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf10", category: "Food", title: "Cocktail & Food Study 10", img: "/photos/cocktail-food/cocktail-food-10.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf11", category: "Lifestyle", title: "Cocktail & Food Study 11", img: "/photos/cocktail-food/cocktail-food-11.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf12", category: "Food", title: "Cocktail & Food Study 12", img: "/photos/cocktail-food/cocktail-food-12.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf13", category: "Food", title: "Cocktail & Food Study 13", img: "/photos/cocktail-food/cocktail-food-13.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf14", category: "Food", title: "Cocktail & Food Study 14", img: "/photos/cocktail-food/cocktail-food-14.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf15", category: "Food", title: "Cocktail & Food Study 15", img: "/photos/cocktail-food/cocktail-food-15.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf16", category: "Commercial", title: "Cocktail & Food Study 16", img: "/photos/cocktail-food/cocktail-food-16.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf17", category: "Lifestyle", title: "Cocktail & Food Study 17", img: "/photos/cocktail-food/cocktail-food-17.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf18", category: "Food", title: "Cocktail & Food Study 18", img: "/photos/cocktail-food/cocktail-food-18.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf19", category: "Lifestyle", title: "Cocktail & Food Study 19", img: "/photos/cocktail-food/cocktail-food-19.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf20", category: "Food", title: "Cocktail & Food Study 20", img: "/photos/cocktail-food/cocktail-food-20.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf21", category: "Food", title: "Cocktail & Food Study 21", img: "/photos/cocktail-food/cocktail-food-21.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf22", category: "Commercial", title: "Cocktail & Food Study 22", img: "/photos/cocktail-food/cocktail-food-22.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf23", category: "Lifestyle", title: "Cocktail & Food Study 23", img: "/photos/cocktail-food/cocktail-food-23.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf24", category: "Lifestyle", title: "Cocktail & Food Study 24", img: "/photos/cocktail-food/cocktail-food-24.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf25", category: "Lifestyle", title: "Cocktail & Food Study 25", img: "/photos/cocktail-food/cocktail-food-25.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf26", category: "Food", title: "Cocktail & Food Study 26", img: "/photos/cocktail-food/cocktail-food-26.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf27", category: "Lifestyle", title: "Cocktail & Food Study 27", img: "/photos/cocktail-food/cocktail-food-27.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf28", category: "Food", title: "Cocktail & Food Study 28", img: "/photos/cocktail-food/cocktail-food-28.jpg", w: 1854, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf29", category: "Commercial", title: "Cocktail & Food Study 29", img: "/photos/cocktail-food/cocktail-food-29.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf30", category: "Food", title: "Cocktail & Food Study 30", img: "/photos/cocktail-food/cocktail-food-30.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf31", category: "Food", title: "Cocktail & Food Study 31", img: "/photos/cocktail-food/cocktail-food-31.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf32", category: "Commercial", title: "Cocktail & Food Study 32", img: "/photos/cocktail-food/cocktail-food-32.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf33", category: "Food", title: "Cocktail & Food Study 33", img: "/photos/cocktail-food/cocktail-food-33.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf34", category: "Commercial", title: "Cocktail & Food Study 34", img: "/photos/cocktail-food/cocktail-food-34.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf35", category: "Food", title: "Cocktail & Food Study 35", img: "/photos/cocktail-food/cocktail-food-35.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf36", category: "Lifestyle", title: "Cocktail & Food Study 36", img: "/photos/cocktail-food/cocktail-food-36.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf37", category: "Food", title: "Cocktail & Food Study 37", img: "/photos/cocktail-food/cocktail-food-37.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf38", category: "Lifestyle", title: "Cocktail & Food Study 38", img: "/photos/cocktail-food/cocktail-food-38.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf39", category: "Lifestyle", title: "Cocktail & Food Study 39", img: "/photos/cocktail-food/cocktail-food-39.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf40", category: "Food", title: "Cocktail & Food Study 40", img: "/photos/cocktail-food/cocktail-food-40.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf41", category: "Commercial", title: "Cocktail & Food Study 41", img: "/photos/cocktail-food/cocktail-food-41.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf42", category: "Lifestyle", title: "Cocktail & Food Study 42", img: "/photos/cocktail-food/cocktail-food-42.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf43", category: "Food", title: "Cocktail & Food Study 43", img: "/photos/cocktail-food/cocktail-food-43.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf44", category: "Lifestyle", title: "Cocktail & Food Study 44", img: "/photos/cocktail-food/cocktail-food-44.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf45", category: "Food", title: "Cocktail & Food Study 45", img: "/photos/cocktail-food/cocktail-food-45.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf46", category: "Lifestyle", title: "Cocktail & Food Study 46", img: "/photos/cocktail-food/cocktail-food-46.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf47", category: "Food", title: "Cocktail & Food Study 47", img: "/photos/cocktail-food/cocktail-food-47.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf48", category: "Food", title: "Cocktail & Food Study 48", img: "/photos/cocktail-food/cocktail-food-48.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf49", category: "Lifestyle", title: "Cocktail & Food Study 49", img: "/photos/cocktail-food/cocktail-food-49.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf50", category: "Food", title: "Cocktail & Food Study 50", img: "/photos/cocktail-food/cocktail-food-50.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf51", category: "Food", title: "Cocktail & Food Study 51", img: "/photos/cocktail-food/cocktail-food-51.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf52", category: "Food", title: "Cocktail & Food Study 52", img: "/photos/cocktail-food/cocktail-food-52.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf53", category: "Food", title: "Cocktail & Food Study 53", img: "/photos/cocktail-food/cocktail-food-53.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf54", category: "Lifestyle", title: "Cocktail & Food Study 54", img: "/photos/cocktail-food/cocktail-food-54.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf55", category: "Food", title: "Cocktail & Food Study 55", img: "/photos/cocktail-food/cocktail-food-55.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf56", category: "Commercial", title: "Cocktail & Food Study 56", img: "/photos/cocktail-food/cocktail-food-56.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf57", category: "Commercial", title: "Cocktail & Food Study 57", img: "/photos/cocktail-food/cocktail-food-57.jpg", w: 1351, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf58", category: "Commercial", title: "Cocktail & Food Study 58", img: "/photos/cocktail-food/cocktail-food-58.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf59", category: "Food", title: "Cocktail & Food Study 59", img: "/photos/cocktail-food/cocktail-food-59.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf60", category: "Lifestyle", title: "Cocktail & Food Study 60", img: "/photos/cocktail-food/cocktail-food-60.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf61", category: "Lifestyle", title: "Cocktail & Food Study 61", img: "/photos/cocktail-food/cocktail-food-61.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf62", category: "Lifestyle", title: "Cocktail & Food Study 62", img: "/photos/cocktail-food/cocktail-food-62.jpg", w: 1350, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf63", category: "Food", title: "Cocktail & Food Study 63", img: "/photos/cocktail-food/cocktail-food-63.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf64", category: "Food", title: "Cocktail & Food Study 64", img: "/photos/cocktail-food/cocktail-food-64.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf65", category: "Food", title: "Cocktail & Food Study 65", img: "/photos/cocktail-food/cocktail-food-65.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf66", category: "Lifestyle", title: "Cocktail & Food Study 66", img: "/photos/cocktail-food/cocktail-food-66.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf67", category: "Food", title: "Cocktail & Food Study 67", img: "/photos/cocktail-food/cocktail-food-67.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf68", category: "Lifestyle", title: "Cocktail & Food Study 68", img: "/photos/cocktail-food/cocktail-food-68.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf69", category: "Lifestyle", title: "Cocktail & Food Study 69", img: "/photos/cocktail-food/cocktail-food-69.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf70", category: "Food", title: "Cocktail & Food Study 70", img: "/photos/cocktail-food/cocktail-food-70.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
  { id: "cf71", category: "Commercial", title: "Cocktail & Food Study 71", img: "/photos/cocktail-food/cocktail-food-71.jpg", w: 1920, h: 2400, meta: { camera: "Sony A7 IV", lens: "—", location: "Pune", year: "2025" } },
];

// Photos featured in the scrolling hero gallery — a curated subset of
// `gallery`, editable from the studio's Hero Section panel.
export const heroImages: string[] = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57, 62, 67].map(
  (n) => `/photos/cocktail-food/cocktail-food-${String(n).padStart(2, "0")}.jpg`
);

export const reelUrls: string[] = [
  "https://www.instagram.com/reel/DLoZRCgPMVR/",
  "https://www.instagram.com/reel/DLq--CmRGsK/",
  "https://www.instagram.com/reel/DLtkJUzKUnC/",
  "https://www.instagram.com/reel/DLwH7LGqZMb/",
  "https://www.instagram.com/reel/DLytArjKcmP/",
  "https://www.instagram.com/reel/DL1RcnGIk6P/",
  "https://www.instagram.com/reel/DL33t_xNtc4/",
  "https://www.instagram.com/reel/DcNfmrptcDn/",
];

export interface Film {
  id: string;
  title: string;
  category: string;
  duration: string;
  year: string;
  client?: string;
  thumb: string;
  description: string;
  award?: string;
  /** YouTube embed URL (https://www.youtube.com/embed/...) or an uploaded video file URL. */
  videoUrl?: string;
}

export const films: Film[] = [
  {
    id: "f1",
    title: "Souled Out — Marathi Mini Series",
    category: "Web Series",
    duration: "5 Episodes",
    year: "2026",
    thumb: "https://img.youtube.com/vi/S1nPfP8YMkk/hqdefault.jpg",
    description: "A 5-episode Marathi mini web series — cinematography, direction and edit.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLB3YE7sU2vNk",
  },
  {
    id: "f2",
    title: "Short Films",
    category: "Short Film",
    duration: "5 Films",
    year: "2025",
    thumb: "https://img.youtube.com/vi/MmLeylAPgiM/hqdefault.jpg",
    description: "A collection of independently shot and edited short films.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLBbZhk9liQDg",
  },
  {
    id: "f3",
    title: "KFC India — Creative Videos",
    category: "Commercial",
    duration: "3 Videos",
    year: "2024",
    client: "KFC India",
    thumb: "https://img.youtube.com/vi/Vkp6SFsJm9E/hqdefault.jpg",
    description: "Fast-paced commercial spots produced with Wit & Chai Media.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLFtmPTgk__eA",
  },
  {
    id: "f4",
    title: "Jewelry Ads",
    category: "Commercial",
    duration: "2 Videos",
    year: "2025",
    thumb: "https://img.youtube.com/vi/N4L7KcswXsA/hqdefault.jpg",
    description: "Product-led jewelry advertising films — lighting, macro camera work and edit.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLLXV3De6hRkI",
  },
  {
    id: "f5",
    title: "Cobbler & Crew — Restaurant Reels",
    category: "Hospitality",
    duration: "8 Reels",
    year: "2025",
    client: "Cobbler & Crew",
    thumb: "https://img.youtube.com/vi/BHlYtOAKQ5w/hqdefault.jpg",
    description: "Social-first reel series: concept, shoot and edit, end to end.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLc3Y_7qRHwJg",
  },
  {
    id: "f6",
    title: "Gather — Restaurant Reels",
    category: "Hospitality",
    duration: "3 Reels",
    year: "2025",
    client: "Gather",
    thumb: "https://img.youtube.com/vi/w_FEMWDLGt8/hqdefault.jpg",
    description: "Food and ambience-led reel series for a hospitality brand.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLR1AdWbayoFA",
  },
  {
    id: "f7",
    title: "Juju — Mexican Restaurant Reels",
    category: "Hospitality",
    duration: "2 Reels",
    year: "2025",
    client: "Juju",
    thumb: "https://img.youtube.com/vi/8CghmT-ESwA/hqdefault.jpg",
    description: "Vibrant social content for a Mexican restaurant brand.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLOHIrNopK1Bs",
  },
  {
    id: "f8",
    title: "Izipizi — Asian Restaurant Reels",
    category: "Hospitality",
    duration: "2 Reels",
    year: "2025",
    client: "Izipizi",
    thumb: "https://img.youtube.com/vi/-C1RwOVXUJQ/hqdefault.jpg",
    description: "Social content series for an Asian dining concept.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLc47sRhCoglM",
  },
  {
    id: "f9",
    title: "Finance Videos",
    category: "Corporate",
    duration: "4 Videos",
    year: "2025",
    client: "ECO",
    thumb: "https://img.youtube.com/vi/shlttZExlfE/hqdefault.jpg",
    description: "Corporate finance video series — clean, explainer-led visual storytelling.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLb7P6hq1m770",
  },
  {
    id: "f10",
    title: "Industrial, Architecture & Lifestyle",
    category: "Architecture",
    duration: "3 Videos",
    year: "2025",
    thumb: "https://img.youtube.com/vi/ND1Uv_6McWY/hqdefault.jpg",
    description: "Industrial and architectural visuals paired with lifestyle sequences.",
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PLBF551zHPhUI",
  },
  {
    id: "f11",
    title: "MPL Podcast",
    category: "Podcast",
    duration: "Episode",
    year: "2025",
    thumb: "https://img.youtube.com/vi/tKJdmGyz4Xc/hqdefault.jpg",
    description: "Podcast episode — camera, edit and post-production.",
    videoUrl: "https://www.youtube.com/embed/tKJdmGyz4Xc",
  },
];

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  cover: string;
  challenge: string;
  process: string;
  result: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "Elephant & Co. — Full-Funnel Content",
    client: "Elephant & Co. (via Rare Ideas)",
    year: "2025",
    category: "Hospitality / Food & Lifestyle",
    cover: "/photos/cocktail-food/cocktail-food-14.jpg",
    challenge:
      "A Pune hospitality brand needed consistent, scroll-stopping food and lifestyle content across digital platforms without an in-house production team.",
    process:
      "Owned production end to end — ideation, shoot direction, lighting, camera and edit — delivering a repeatable weekly content system.",
    result:
      "Established a distinct visual identity for the brand's digital presence, run continuously since Aug 2025.",
    gallery: [
      "/photos/cocktail-food/cocktail-food-30.jpg",
      "/photos/cocktail-food/cocktail-food-37.jpg",
      "/photos/cocktail-food/cocktail-food-44.jpg",
    ],
  },
  {
    id: "p2",
    title: "KFC India × Kotak 811 — National Campaigns",
    client: "KFC India, Kotak Mahindra Bank",
    year: "2024",
    category: "Commercial / Ad Films",
    cover: seededImg("yog-proj-2", 1600, 1000),
    challenge:
      "Deliver broadcast-ready ad films for two national brands under tight production timelines.",
    process:
      "As AV Executive at Wit & Chai Media, handled cinematography, editing and on-ground production — including budgeting and vendor coordination.",
    result: "Campaigns delivered on schedule for Amul, KFC India, Kotak and Godrej.",
    gallery: [seededImg("yog-proj-2a", 1200, 1500), seededImg("yog-proj-2b", 1200, 900)],
  },
  {
    id: "p3",
    title: "Kathak Adi Kathak — Documentary",
    client: "Bhandarkar Oriental Research Institute",
    year: "2021",
    category: "Documentary",
    cover: seededImg("yog-proj-3", 1600, 1000),
    challenge:
      "Document the classical Kathak dance form with enough visual depth to travel to international screenings.",
    process:
      "Served as cinematographer and photographer across a one-month production, capturing performance and rehearsal footage.",
    result: "A 1.5-hour documentary screened across India and the United States.",
    gallery: [seededImg("yog-proj-3a", 1200, 1500), seededImg("yog-proj-3b", 1200, 1500)],
  },
];

export const services = [
  { title: "Photography", desc: "Portrait, lifestyle, food, product and event photography.", deliverables: "Edited digital gallery, high-res exports", timeline: "3–7 days" },
  { title: "Films & Brand Video", desc: "Commercial films, brand stories, social-first video series.", deliverables: "Graded final cut, social cutdowns", timeline: "1–3 weeks" },
  { title: "Wedding Coverage", desc: "Cinematic wedding films and photography.", deliverables: "Highlight film, full gallery", timeline: "2–4 weeks" },
  { title: "Commercial Campaigns", desc: "End-to-end production for brand and ad campaigns.", deliverables: "Multi-format deliverables", timeline: "Custom" },
  { title: "Documentary", desc: "Long-form documentary cinematography and direction.", deliverables: "Full edit, festival-ready master", timeline: "Custom" },
  { title: "Creative Direction", desc: "Concept, shot-listing and on-set direction for content teams.", deliverables: "Shot list, mood board, on-set lead", timeline: "Custom" },
];

// Placeholder — replace with real client quotes once collected.
export const testimonials = [
  { name: "Studio Client", company: "Hospitality Brand, Pune", quote: "Placeholder testimonial — replace with a real client quote.", rating: 5 },
  { name: "Brand Manager", company: "F&B Campaign", quote: "Placeholder testimonial — replace with a real client quote.", rating: 5 },
  { name: "Production Lead", company: "Commercial Shoot", quote: "Placeholder testimonial — replace with a real client quote.", rating: 5 },
];

export const journal = [
  { id: "j1", title: "Lighting for Food: What Five Years Taught Me", category: "Photography", cover: seededImg("yog-journal-1", 1000, 700), excerpt: "Notes on shaping light for food and lifestyle content." },
  { id: "j2", title: "From Documentary to Ad Films", category: "Filmmaking", cover: seededImg("yog-journal-2", 1000, 700), excerpt: "How documentary discipline shapes faster commercial work." },
  { id: "j3", title: "A Pune Cinematographer's Kit, 2026", category: "Gear", cover: seededImg("yog-journal-3", 1000, 700), excerpt: "What's actually in the bag on a shoot day." },
];

export const equipment = [
  { category: "Camera", items: ["Sony A7 IV", "Canon C70"] },
  { category: "Lenses", items: ["24-70mm f/2.8", "35mm f/1.4", "50mm f/1.2", "85mm f/1.8", "90mm Macro"] },
  { category: "Drone", items: ["DJI Mavic 3"] },
  { category: "Lighting", items: ["Aputure 300D II", "LED panel kit"] },
  { category: "Audio", items: ["Rode Wireless GO II", "Boom + shotgun mic"] },
  { category: "Post", items: ["Adobe Premiere Pro", "Photoshop", "After Effects"] },
];

export const awards = [
  { year: "2021", title: "International Screening", detail: "\"Kathak Adi Kathak\" documentary screened across India and the U.S." },
  { year: "2024", title: "National Brand Campaigns", detail: "Delivered ad films for Amul, KFC India, Kotak and Godrej." },
  { year: "2021", title: "B.A. Photography — Distinction", detail: "MIT-WPU, Kothrud — 8.94 / 10 CGPA." },
];

export const socials = {
  behance: "https://www.behance.net/yogirajsomavan",
  instagram: "https://www.instagram.com/__yogi._?stkn=YWs2dHozZHI5Njdu",
  linkedin: "https://www.linkedin.com/in/yogiraj-somavanshi-443b371a5/",
};
