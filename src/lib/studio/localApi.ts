import {
  equipment as staticEquipment,
  films as staticFilms,
  gallery as staticGallery,
  profile as staticProfile,
  projects as staticProjects,
  services as staticServices,
} from "../../data/content";
import type {
  DbEquipmentGroup,
  DbFilm,
  DbGalleryImage,
  DbProfile,
  DbProject,
  DbService,
  NewEquipmentGroup,
  NewFilm,
  NewGalleryImage,
  NewProject,
  NewService,
} from "./types";

/**
 * Fully local, offline stand-in for lib/studio/api.ts — same function names
 * and signatures, backed by localStorage instead of Supabase, seeded with
 * the site's existing placeholder content as dummy data. Used automatically
 * whenever VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY aren't set (see dataApi.ts).
 * Dispatches a "studio-local-change" window event on every write so the
 * public site's useSiteData hooks can pick up edits live.
 */

const KEYS = {
  gallery: "studio_local_gallery",
  films: "studio_local_films",
  projects: "studio_local_projects",
  services: "studio_local_services",
  equipment: "studio_local_equipment",
  profile: "studio_local_profile",
} as const;

/**
 * Bump this whenever the underlying placeholder data in data/content.ts
 * changes (new photos, new films, re-categorized gallery, etc.) during local
 * development. On mismatch, every content cache except `profile` (which may
 * hold real admin edits) is cleared so the browser picks up the new seed
 * automatically — no more "still showing old stuff after a hard refresh"
 * because localStorage survives refreshes. Stop bumping this once real
 * content is being managed through /studio for keeps.
 */
const SEED_VERSION = "2026-09-18.2";
const VERSION_KEY = "studio_local_seed_version";

function ensureFreshSeed() {
  if (typeof localStorage === "undefined") return;
  if (localStorage.getItem(VERSION_KEY) === SEED_VERSION) return;
  (Object.keys(KEYS) as (keyof typeof KEYS)[]).forEach((k) => {
    if (k !== "profile") localStorage.removeItem(KEYS[k]);
  });
  localStorage.setItem(VERSION_KEY, SEED_VERSION);
}
ensureFreshSeed();

function seedGallery(): DbGalleryImage[] {
  return staticGallery.map((g, i) => ({
    id: g.id,
    title: g.title,
    category: g.category,
    image_url: g.img,
    camera: g.meta.camera,
    lens: g.meta.lens,
    location: g.meta.location,
    year: g.meta.year,
    width: g.w,
    height: g.h,
    sort_order: i,
  }));
}

function seedFilms(): DbFilm[] {
  return staticFilms.map((f, i) => ({
    id: f.id,
    title: f.title,
    category: f.category,
    year: f.year,
    duration: f.duration,
    award: f.award ?? null,
    client: f.client ?? null,
    description: f.description,
    thumb_url: f.thumb,
    video_url: f.videoUrl ?? null,
    sort_order: i,
  }));
}

function seedProjects(): DbProject[] {
  return staticProjects.map((p, i) => ({
    id: p.id,
    title: p.title,
    client: p.client,
    category: p.category,
    year: p.year,
    cover_url: p.cover,
    challenge: p.challenge,
    process: p.process,
    result: p.result,
    gallery_urls: p.gallery,
    sort_order: i,
  }));
}

function seedServices(): DbService[] {
  return staticServices.map((s, i) => ({
    id: crypto.randomUUID(),
    title: s.title,
    description: s.desc,
    deliverables: s.deliverables,
    timeline: s.timeline,
    sort_order: i,
  }));
}

function seedEquipment(): DbEquipmentGroup[] {
  return staticEquipment.map((e, i) => ({
    id: crypto.randomUUID(),
    category: e.category,
    items: e.items,
    sort_order: i,
  }));
}

function seedProfile(): DbProfile {
  return {
    id: 1,
    name: staticProfile.name,
    title: staticProfile.title,
    location: staticProfile.location,
    email: staticProfile.email,
    phone: staticProfile.phone,
    address: staticProfile.address,
    tagline: staticProfile.tagline,
    sub_tagline: staticProfile.subTagline,
    bio: staticProfile.bio,
    expertise: staticProfile.expertise,
    tools: staticProfile.tools,
  };
}

function readTable<T>(key: string, seed: () => T[]): T[] {
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw) as T[];
  const seeded = seed();
  localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
}

function writeTable<T>(key: string, rows: T[]) {
  localStorage.setItem(key, JSON.stringify(rows));
  window.dispatchEvent(new Event("studio-local-change"));
}

async function listRows<T>(key: string, seed: () => T[]): Promise<T[]> {
  return readTable(key, seed);
}

async function insertRow<T extends { id: string; sort_order: number }>(
  key: string,
  seed: () => T[],
  row: Omit<T, "id">
): Promise<T> {
  const rows = readTable(key, seed);
  const created = { ...row, id: crypto.randomUUID() } as T;
  const next = [...rows, created];
  writeTable(key, next);
  return created;
}

async function updateRowLocal<T extends { id: string }>(
  key: string,
  seed: () => T[],
  id: string,
  patch: Partial<T>
): Promise<T> {
  const rows = readTable(key, seed);
  let updated: T | null = null;
  const next = rows.map((r) => {
    if (r.id === id) {
      updated = { ...r, ...patch };
      return updated;
    }
    return r;
  });
  if (!updated) throw new Error("Not found.");
  writeTable(key, next);
  return updated;
}

async function deleteRowLocal<T extends { id: string }>(key: string, seed: () => T[], id: string): Promise<void> {
  const rows = readTable(key, seed);
  writeTable(
    key,
    rows.filter((r) => r.id !== id)
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────
export const listGalleryImages = () => listRows(KEYS.gallery, seedGallery);
export const createGalleryImage = (row: NewGalleryImage) => insertRow(KEYS.gallery, seedGallery, row);
export const updateGalleryImage = (id: string, row: Partial<NewGalleryImage>) =>
  updateRowLocal<DbGalleryImage>(KEYS.gallery, seedGallery, id, row);
export const deleteGalleryImage = (id: string) => deleteRowLocal(KEYS.gallery, seedGallery, id);

// ── Films ─────────────────────────────────────────────────────────────────
export const listFilms = () => listRows(KEYS.films, seedFilms);
export const createFilm = (row: NewFilm) => insertRow(KEYS.films, seedFilms, row);
export const updateFilm = (id: string, row: Partial<NewFilm>) =>
  updateRowLocal<DbFilm>(KEYS.films, seedFilms, id, row);
export const deleteFilm = (id: string) => deleteRowLocal(KEYS.films, seedFilms, id);

// ── Projects ──────────────────────────────────────────────────────────────
export const listProjects = () => listRows(KEYS.projects, seedProjects);
export const createProject = (row: NewProject) => insertRow(KEYS.projects, seedProjects, row);
export const updateProject = (id: string, row: Partial<NewProject>) =>
  updateRowLocal<DbProject>(KEYS.projects, seedProjects, id, row);
export const deleteProject = (id: string) => deleteRowLocal(KEYS.projects, seedProjects, id);

// ── Services ──────────────────────────────────────────────────────────────
export const listServices = () => listRows(KEYS.services, seedServices);
export const createService = (row: NewService) => insertRow(KEYS.services, seedServices, row);
export const updateService = (id: string, row: Partial<NewService>) =>
  updateRowLocal<DbService>(KEYS.services, seedServices, id, row);
export const deleteService = (id: string) => deleteRowLocal(KEYS.services, seedServices, id);

// ── Equipment groups ──────────────────────────────────────────────────────
export const listEquipmentGroups = () => listRows(KEYS.equipment, seedEquipment);
export const createEquipmentGroup = (row: NewEquipmentGroup) => insertRow(KEYS.equipment, seedEquipment, row);
export const updateEquipmentGroup = (id: string, row: Partial<NewEquipmentGroup>) =>
  updateRowLocal<DbEquipmentGroup>(KEYS.equipment, seedEquipment, id, row);
export const deleteEquipmentGroup = (id: string) => deleteRowLocal(KEYS.equipment, seedEquipment, id);

// ── Profile (singleton) ───────────────────────────────────────────────────
export async function getProfile(): Promise<DbProfile | null> {
  const raw = localStorage.getItem(KEYS.profile);
  if (raw) return JSON.parse(raw) as DbProfile;
  const seeded = seedProfile();
  localStorage.setItem(KEYS.profile, JSON.stringify(seeded));
  return seeded;
}

export async function updateProfile(row: Partial<Omit<DbProfile, "id">>): Promise<DbProfile> {
  const current = (await getProfile()) ?? seedProfile();
  const updated = { ...current, ...row };
  localStorage.setItem(KEYS.profile, JSON.stringify(updated));
  window.dispatchEvent(new Event("studio-local-change"));
  return updated;
}

// ── "Storage": convert the upload to a data URL so it persists in localStorage ──
export async function uploadMedia(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}
