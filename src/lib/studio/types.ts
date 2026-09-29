export interface DbGalleryImage {
  id: string;
  title: string;
  category: string;
  image_url: string;
  camera: string | null;
  lens: string | null;
  location: string | null;
  year: string | null;
  width: number;
  height: number;
  sort_order: number;
}

export type NewGalleryImage = Omit<DbGalleryImage, "id">;

export interface DbFilm {
  id: string;
  title: string;
  category: string;
  year: string | null;
  duration: string | null;
  award: string | null;
  client: string | null;
  description: string | null;
  thumb_url: string;
  video_url: string | null;
  sort_order: number;
}

export type NewFilm = Omit<DbFilm, "id">;

export interface DbProject {
  id: string;
  title: string;
  client: string | null;
  category: string | null;
  year: string | null;
  cover_url: string;
  challenge: string | null;
  process: string | null;
  result: string | null;
  gallery_urls: string[];
  sort_order: number;
}

export type NewProject = Omit<DbProject, "id">;

export interface DbService {
  id: string;
  title: string;
  description: string;
  deliverables: string | null;
  timeline: string | null;
  sort_order: number;
}

export type NewService = Omit<DbService, "id">;

export interface DbEquipmentGroup {
  id: string;
  category: string;
  items: string[];
  sort_order: number;
}

export type NewEquipmentGroup = Omit<DbEquipmentGroup, "id">;

export interface DbHeroImage {
  id: string;
  image_url: string;
  sort_order: number;
}

export type NewHeroImage = Omit<DbHeroImage, "id">;

export interface DbProfile {
  id: number;
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  tagline: string;
  sub_tagline: string;
  bio: string;
  expertise: string[];
  tools: string[];
}
